// AFTR Innovation Hub API: sign-up, admin approval, sessions, and the auth check that
// Caddy's forward_auth uses to protect the live demo subdomains. nginx (aftr-web)
// proxies /api/hub/* here (see nginx.conf); plain node:http like server/index.mjs.
//
//   public  POST /signup, POST /login, GET /health, GET /auth/verify (Caddy forward_auth)
//   user    POST /logout, GET /me, POST /change-password, GET /demos, POST /demos/:slug/open
//   admin   GET /admin/users?status=, POST /admin/users/:id/(approve|reject|revoke|reset-password), GET /admin/stats
import http from 'node:http'
import { createHash, randomBytes } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { hash, verify } from '@node-rs/argon2'
import { openDb } from './db.mjs'
import { checkNotify, notifyNewRequest } from './notify.mjs'
import { demos } from '../src/data/hub.js'

const PORT = Number(process.env.PORT || 8790)
const PROD = process.env.NODE_ENV === 'production'
const DB_FILE = process.env.HUB_DB || (PROD ? '/data/hub.db' : fileURLToPath(new URL('./data/hub.db', import.meta.url)))
const COOKIE = 'aftr_hub'
const SESSION_SECONDS = 7 * 24 * 60 * 60
// Shared with the demo subdomains, so one sign-in works on demo-*.aftrsolutions.com too.
const COOKIE_DOMAIN = process.env.HUB_COOKIE_DOMAIN || '.aftrsolutions.com'
const SITE = 'https://aftrsolutions.com'
const ORIGINS = (process.env.HUB_ALLOWED_ORIGINS || `${SITE},https://www.aftrsolutions.com`).split(',').map((o) => o.trim()).filter(Boolean)
const ARGON = { algorithm: 2 } // Argon2id, library defaults: 19 MiB memory, 2 passes
const MIN_PASSWORD = 10
const MAX_PASSWORD = 200

const { db, q } = openDb(DB_FILE)
const now = () => new Date().toISOString()
const sha256 = (s) => createHash('sha256').update(s).digest('hex')

// ---------- Rate limits (in memory, per IP, like the chat service) ----------
function limiter(windowMs, max) {
  const hits = new Map()
  setInterval(() => {
    const t = Date.now()
    for (const [key, times] of hits) if (times.every((x) => t - x >= windowMs)) hits.delete(key)
  }, windowMs).unref()
  return (key) => {
    const t = Date.now()
    const recent = (hits.get(key) || []).filter((x) => t - x < windowMs)
    recent.push(t)
    hits.set(key, recent)
    return recent.length > max
  }
}
const loginLimited = limiter(15 * 60 * 1000, 10)
const signupLimited = limiter(60 * 60 * 1000, 5)

// ---------- HTTP helpers ----------
class HttpError extends Error {
  constructor(status, message) { super(message); this.status = status }
}

const BASE_HEADERS = { 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'no-store' }

function send(res, status, body, headers = {}) {
  res.writeHead(status, { ...BASE_HEADERS, 'Content-Type': 'application/json', ...headers })
  res.end(body === undefined ? '' : JSON.stringify(body))
}

function readJson(req, limit = 16 * 1024) {
  if (req.headers['content-type']?.split(';')[0].trim() !== 'application/json') {
    return Promise.reject(new HttpError(415, 'Invalid request.'))
  }
  return new Promise((resolve, reject) => {
    let size = 0
    const chunks = []
    req.on('data', (c) => {
      size += c.length
      if (size > limit) { reject(new HttpError(413, 'Invalid request.')); req.destroy() } else chunks.push(c)
    })
    req.on('end', () => {
      try {
        const body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
        if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('not an object')
        resolve(body)
      } catch {
        reject(new HttpError(400, 'Invalid request.'))
      }
    })
    req.on('error', reject)
  })
}

// CSRF protection: state-changing requests must come from the site itself.
function originAllowed(origin) {
  if (!origin) return false
  if (ORIGINS.includes(origin)) return true
  return !PROD && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
}

const clientIp = (req) => String(req.headers['x-real-ip'] || req.socket.remoteAddress || 'unknown')

function readCookie(req, name) {
  for (const part of String(req.headers.cookie || '').split(';')) {
    const i = part.indexOf('=')
    if (i > 0 && part.slice(0, i).trim() === name) return part.slice(i + 1).trim()
  }
  return null
}

function cookieHeader(value, maxAge) {
  const parts = [`${COOKIE}=${value}`, 'Path=/', 'HttpOnly', 'SameSite=Lax', `Max-Age=${maxAge}`]
  // Local dev runs on plain http://localhost: no Secure, no shared domain.
  if (PROD) parts.push('Secure', `Domain=${COOKIE_DOMAIN}`)
  return parts.join('; ')
}

// Only redirect back to this site or one of its subdomains (the demos), never elsewhere.
function safeNext(next) {
  if (typeof next !== 'string' || !next || next.length > 2000) return null
  if (next.startsWith('/') && !next.startsWith('//') && !next.startsWith('/\\')) return next
  try {
    const u = new URL(next)
    const host = u.hostname.toLowerCase()
    if (u.protocol === 'https:' && !u.username && !u.password && (host === 'aftrsolutions.com' || host.endsWith('.aftrsolutions.com'))) return u.href
  } catch { /* not a URL */ }
  return null
}

// ---------- Validation ----------
function text(body, key, { label, max, required = true, multiline = false }) {
  const raw = body[key]
  if (raw !== undefined && raw !== null && typeof raw !== 'string') throw new HttpError(400, `${label} is invalid.`)
  let value = String(raw ?? '').trim()
  if (!multiline) value = value.replace(/\s+/g, ' ')
  // Drop control characters (keep newlines in multi-line fields).
  value = value.replace(multiline ? /(?!\n)\p{Cc}/gu : /\p{Cc}/gu, '')
  if (required && !value) throw new HttpError(400, `${label} is required.`)
  if (value.length > max) throw new HttpError(400, `${label} must be ${max} characters or fewer.`)
  return value
}

function email(body) {
  const value = text(body, 'email', { label: 'Email', max: 254 }).toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) throw new HttpError(400, 'Please enter a valid email address.')
  return value
}

function password(body, key = 'password', label = 'Password') {
  const value = body[key]
  if (typeof value !== 'string' || !value) throw new HttpError(400, `${label} is required.`)
  if (value.length < MIN_PASSWORD) throw new HttpError(400, `${label} must be at least ${MIN_PASSWORD} characters.`)
  if (value.length > MAX_PASSWORD) throw new HttpError(400, `${label} must be ${MAX_PASSWORD} characters or fewer.`)
  return value
}

// ---------- Sessions ----------
function currentUser(req) {
  const token = readCookie(req, COOKIE)
  if (!token || token.length > 100) return null
  const row = q.sessionUser.get(sha256(token))
  if (!row || row.expires_at <= now() || row.status !== 'approved') return null
  return row
}

function requireUser(req, role) {
  const user = currentUser(req)
  if (!user) throw new HttpError(401, 'Please sign in.')
  if (role === 'admin' && user.role !== 'admin') throw new HttpError(403, 'Admins only.')
  return user
}

function startSession(req, user) {
  const token = randomBytes(32).toString('base64url')
  const created = new Date()
  q.insertSession.run({
    user_id: user.id,
    token_hash: sha256(token),
    created_at: created.toISOString(),
    expires_at: new Date(created.getTime() + SESSION_SECONDS * 1000).toISOString(),
    ip: clientIp(req).slice(0, 64),
    user_agent: String(req.headers['user-agent'] || '').slice(0, 300),
  })
  q.touchLogin.run(created.toISOString(), user.id)
  return cookieHeader(token, SESSION_SECONDS)
}

const publicUser = (u) => ({ name: u.name, email: u.email, role: u.role })

// A real hash to verify against when the email is unknown, so response time doesn't reveal it.
const DUMMY_HASH = await hash(randomBytes(16).toString('hex'), ARGON)

// ---------- Handlers ----------
const SIGNUP_OK = { ok: true }

async function signup(req, res) {
  if (signupLimited(clientIp(req))) throw new HttpError(429, 'Too many requests. Please try again later.')
  const body = await readJson(req)
  const user = {
    name: text(body, 'name', { label: 'Name', max: 100 }),
    email: email(body),
    company: text(body, 'company', { label: 'Company', max: 120 }),
    phone: text(body, 'phone', { label: 'Phone', max: 40, required: false }),
    reason: text(body, 'reason', { label: 'What you would like to try', max: 1000, multiline: true }),
  }
  if (user.phone && !/^[0-9+()\-.\s]{6,40}$/.test(user.phone)) throw new HttpError(400, 'Please enter a valid phone number, or leave it empty.')
  const pass = password(body)
  if (body.consent !== true) throw new HttpError(400, 'Please agree to the privacy policy.')

  // Same answer whether or not the email is already registered (no account discovery).
  if (q.userByEmail.get(user.email)) return send(res, 201, SIGNUP_OK)
  try {
    q.insertUser.run({ ...user, password_hash: await hash(pass, ARGON), role: 'user', status: 'pending', created_at: now(), approved_at: null })
  } catch (error) {
    if (error?.code !== 'SQLITE_CONSTRAINT_UNIQUE') throw error // two sign-ups racing for one email
    return send(res, 201, SIGNUP_OK)
  }
  console.log('hub: new access request')
  notifyNewRequest(user, `${SITE}/hub/admin`)
  send(res, 201, SIGNUP_OK)
}

async function login(req, res) {
  if (loginLimited(clientIp(req))) throw new HttpError(429, 'Too many sign-in attempts. Please wait 15 minutes and try again.')
  const body = await readJson(req)
  const address = typeof body.email === 'string' ? body.email.trim().toLowerCase().slice(0, 254) : ''
  const pass = typeof body.password === 'string' ? body.password.slice(0, MAX_PASSWORD) : ''
  const user = address ? q.userByEmail.get(address) : null
  const ok = await verify(user ? user.password_hash : DUMMY_HASH, pass || '-').catch(() => false)
  if (!user || !ok) throw new HttpError(401, 'Email or password is incorrect.')
  // Status is only revealed to someone who knows the password.
  if (user.status === 'pending' || user.status === 'rejected') throw new HttpError(403, 'Your access request is being reviewed. We’ll let you know as soon as it’s approved.')
  if (user.status !== 'approved') throw new HttpError(403, 'Your access to the Innovation Hub has ended. Contact us if you think this is a mistake.')
  send(res, 200, { user: publicUser(user), next: safeNext(body.next) }, { 'Set-Cookie': startSession(req, user) })
}

async function logout(req, res) {
  const token = readCookie(req, COOKIE)
  if (token) q.deleteSession.run(sha256(token))
  send(res, 200, { ok: true }, { 'Set-Cookie': cookieHeader('', 0) })
}

async function changePassword(req, res, user) {
  if (loginLimited(clientIp(req))) throw new HttpError(429, 'Too many attempts. Please wait 15 minutes and try again.')
  const body = await readJson(req)
  const current = typeof body.currentPassword === 'string' ? body.currentPassword.slice(0, MAX_PASSWORD) : ''
  const next = password(body, 'newPassword', 'New password')
  const row = q.userById.get(user.id)
  if (!(await verify(row.password_hash, current || '-').catch(() => false))) throw new HttpError(400, 'Your current password is incorrect.')
  q.setPassword.run(await hash(next, ARGON), user.id)
  q.deleteOtherSessions.run(user.id, user.session_id) // sign out everywhere else
  send(res, 200, { ok: true })
}

const publicDemo = ({ slug, product, summary, type, url, videoUrl, tryThis }) =>
  ({ slug, product, summary, type, url: type === 'live' ? url : undefined, videoUrl: type === 'video' ? videoUrl : undefined, tryThis })

function openDemo(req, res, user, slug) {
  const demo = demos.find((d) => d.slug === slug)
  if (!demo) throw new HttpError(404, 'Demo not found.')
  const target = demo.type === 'live' ? demo.url : demo.type === 'video' ? demo.videoUrl : null
  if (!target) throw new HttpError(409, 'This demo is coming soon.')
  q.logAccess.run(user.id, demo.slug, now())
  send(res, 200, { url: target })
}

// Caddy forward_auth: 200 lets the request through to the demo, anything else is returned
// to the visitor. With ?redirect=1 an unauthenticated visitor is sent to the sign-in page.
function verifySession(req, res, url) {
  const user = currentUser(req)
  if (user) return send(res, 200, undefined, { 'X-Hub-User': user.email, 'Content-Type': 'text/plain' })
  if (url.searchParams.get('redirect') === '1') {
    const host = String(req.headers['x-forwarded-host'] || '').split(',')[0].trim()
    const uri = String(req.headers['x-forwarded-uri'] || '/')
    const next = safeNext(`https://${host}${uri.startsWith('/') ? uri : '/'}`)
    const location = `${SITE}/hub/login${next ? `?next=${encodeURIComponent(next)}` : ''}`
    return send(res, 302, undefined, { Location: location, 'Content-Type': 'text/plain' })
  }
  send(res, 401, undefined, { 'Content-Type': 'text/plain' })
}

function listUsers(res, url) {
  const status = url.searchParams.get('status') || 'pending'
  if (!['pending', 'approved', 'rejected', 'revoked', 'closed', 'all'].includes(status)) throw new HttpError(400, 'Unknown status.')
  send(res, 200, { users: q.listUsers.all({ status }) })
}

const ACTIONS = { approve: 'approved', reject: 'rejected', revoke: 'revoked' }

async function adminAction(res, admin, id, action) {
  const target = q.userById.get(id)
  if (!target) throw new HttpError(404, 'User not found.')
  if (target.id === admin.id) throw new HttpError(400, 'You can’t change your own account here. Use the Account page.')

  if (action === 'reset-password') {
    const temporary = randomBytes(12).toString('base64url') // 16 characters
    q.setPassword.run(await hash(temporary, ARGON), target.id)
    q.deleteSessionsFor.run(target.id)
    console.log(`hub: admin ${admin.id} reset the password of user ${target.id}`)
    return send(res, 200, { password: temporary })
  }

  if (target.role === 'admin') throw new HttpError(400, 'Admin accounts can’t be approved, rejected or revoked here.')
  const status = ACTIONS[action]
  const approved = status === 'approved'
  db.transaction(() => {
    q.setStatus.run({ id: target.id, status, approved_at: approved ? now() : target.approved_at, approved_by: approved ? admin.id : target.approved_by })
    if (!approved) q.deleteSessionsFor.run(target.id) // revoking signs them out everywhere, demos included
  })()
  console.log(`hub: admin ${admin.id} set user ${target.id} to ${status}`)
  send(res, 200, { ok: true, status })
}

function stats(res) {
  const counts = { pending: 0, approved: 0, rejected: 0, revoked: 0 }
  for (const { status, n } of q.countByStatus.all()) counts[status] = n
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  send(res, 200, {
    users: counts,
    demoOpens: { total: q.accessTotal.get().n, last7Days: q.accessSince.get(weekAgo).n },
    recent: q.recentAccess.all(30),
  })
}

// ---------- Router ----------
const PREFIX = '/api/hub'

async function route(req, res) {
  const url = new URL(req.url, 'http://localhost')
  if (!url.pathname.startsWith(`${PREFIX}/`)) throw new HttpError(404, 'Not found.')
  const path = url.pathname.slice(PREFIX.length).replace(/\/+$/, '')
  const { method } = req

  if (method === 'POST' && !originAllowed(req.headers.origin)) throw new HttpError(403, 'Request blocked.')

  if (method === 'GET' && path === '/health') return send(res, 200, { ok: true })
  if (method === 'GET' && path === '/auth/verify') return verifySession(req, res, url)
  if (method === 'POST' && path === '/signup') return signup(req, res)
  if (method === 'POST' && path === '/login') return login(req, res)
  if (method === 'POST' && path === '/logout') return logout(req, res)

  if (method === 'GET' && path === '/me') return send(res, 200, publicUser(requireUser(req)))
  if (method === 'POST' && path === '/change-password') return changePassword(req, res, requireUser(req))
  if (method === 'GET' && path === '/demos') { requireUser(req); return send(res, 200, { demos: demos.map(publicDemo) }) }
  let m = path.match(/^\/demos\/([a-z0-9-]{1,60})\/open$/)
  if (method === 'POST' && m) return openDemo(req, res, requireUser(req), m[1])

  if (path.startsWith('/admin/')) {
    const admin = requireUser(req, 'admin')
    if (method === 'GET' && path === '/admin/users') return listUsers(res, url)
    if (method === 'GET' && path === '/admin/stats') return stats(res)
    m = path.match(/^\/admin\/users\/(\d{1,10})\/(approve|reject|revoke|reset-password)$/)
    if (method === 'POST' && m) return adminAction(res, admin, Number(m[1]), m[2])
  }
  throw new HttpError(404, 'Not found.')
}

// ---------- Admin bootstrap ----------
// HUB_ADMIN_EMAILS (comma-separated) + HUB_ADMIN_PASSWORD create the admins on first start.
// Existing accounts are never touched, so changing the password afterwards sticks.
async function bootstrapAdmins() {
  const emails = (process.env.HUB_ADMIN_EMAILS || '').split(',').map((e) => e.trim().toLowerCase()).filter(Boolean)
  const pass = process.env.HUB_ADMIN_PASSWORD || ''
  if (!emails.length || !pass) return
  if (pass.length < MIN_PASSWORD) { console.warn(`hub: HUB_ADMIN_PASSWORD is shorter than ${MIN_PASSWORD} characters, admins not created`); return }
  for (const address of emails) {
    if (q.userByEmail.get(address)) continue
    const local = address.split('@')[0].replace(/[._-]+/g, ' ')
    const name = local.charAt(0).toUpperCase() + local.slice(1)
    const t = now()
    q.insertUser.run({ name, email: address, company: 'AFTR Solutions', phone: '', reason: '', password_hash: await hash(pass, ARGON), role: 'admin', status: 'approved', created_at: t, approved_at: t })
    console.log(`hub: created admin ${address}`)
  }
}

await bootstrapAdmins()
checkNotify()
setInterval(() => q.deleteExpired.run(now()), 60 * 60 * 1000).unref()

const server = http.createServer(async (req, res) => {
  try {
    await route(req, res)
  } catch (error) {
    if (res.headersSent) return res.end()
    if (error instanceof HttpError) return send(res, error.status, { error: error.message })
    console.error('hub: error', error?.message ?? error)
    send(res, 500, { error: 'Something went wrong. Please try again.' })
  }
})
server.listen(PORT, () => console.log(`AFTR Innovation Hub API listening on :${PORT} (${PROD ? 'production' : 'development'}, ${demos.length} demos)`))

function shutdown() {
  server.close(() => { db.close(); process.exit(0) })
  setTimeout(() => process.exit(0), 3000).unref()
}
process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)
