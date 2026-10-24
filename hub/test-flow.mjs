// End-to-end check of the Hub API: sign-up, approval, sessions, revoke and the security rules.
//
//   HUB_ADMIN_EMAILS=admin@example.com HUB_ADMIN_PASSWORD=... node index.mjs        (terminal 1)
//   ADMIN_EMAIL=admin@example.com ADMIN_PASSWORD=... node test-flow.mjs            (terminal 2)
//
// Env: HUB_BASE (default http://127.0.0.1:8790; or http://127.0.0.1:8081 through nginx),
// HUB_ORIGIN (default http://localhost:5173; use https://aftrsolutions.com against production mode),
// EXPECT_SECURE=1 to require the Secure + Domain cookie flags. The rate-limit check runs last
// because it locks sign-in for the calling IP for 15 minutes.
import assert from 'node:assert/strict'

const BASE = (process.env.HUB_BASE || 'http://127.0.0.1:8790').replace(/\/$/, '')
const ORIGIN = process.env.HUB_ORIGIN || 'http://localhost:5173'
const ADMIN = { email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD }
assert.ok(ADMIN.email && ADMIN.password, 'set ADMIN_EMAIL and ADMIN_PASSWORD')
// Direct runs can spread requests over fake IPs (nginx overwrites X-Real-IP, so this is harmless there).
const IP = `10.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}.1`

let passed = 0
async function step(name, fn) {
  await fn()
  passed += 1
  console.log(`ok  ${name}`)
}

async function call(path, { method = 'GET', body, cookie, origin = ORIGIN, ip = IP } = {}) {
  const headers = { 'X-Real-IP': ip }
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (method !== 'GET' && origin) headers.Origin = origin
  if (cookie) headers.Cookie = cookie
  const res = await fetch(`${BASE}/api/hub${path}`, { method, headers, body: body === undefined ? undefined : JSON.stringify(body), redirect: 'manual' })
  const textBody = await res.text()
  let data = null
  try { data = JSON.parse(textBody) } catch { /* empty or plain */ }
  return { status: res.status, data, headers: res.headers }
}

const sessionCookie = (res) => {
  const raw = res.headers.get('set-cookie') || ''
  return { raw, pair: raw.split(';')[0] }
}

const stamp = Date.now()
const visitor = {
  name: 'Flow Test',
  email: `flow.test.${stamp}@example.com`,
  company: 'Example Ltd',
  phone: '+92 300 0000000',
  reason: 'Testing the Innovation Hub flow.',
  password: `correct-horse-${stamp}`,
  consent: true,
}
let admin, user, userId

await step('health', async () => {
  const r = await call('/health')
  assert.equal(r.status, 200)
})

await step('POST without the right Origin is refused (403)', async () => {
  assert.equal((await call('/signup', { method: 'POST', body: visitor, origin: 'https://evil.example' })).status, 403)
  assert.equal((await call('/login', { method: 'POST', body: ADMIN, origin: null })).status, 403)
})

await step('sign-up validates fields', async () => {
  const r = await call('/signup', { method: 'POST', body: { ...visitor, password: 'short' } })
  assert.equal(r.status, 400)
  assert.match(r.data.error, /at least 10/)
})

await step('sign-up -> pending', async () => {
  assert.equal((await call('/signup', { method: 'POST', body: visitor })).status, 201)
  // a second request for the same email looks identical (no account discovery)
  assert.equal((await call('/signup', { method: 'POST', body: visitor })).status, 201)
})

await step('pending user cannot sign in', async () => {
  const r = await call('/login', { method: 'POST', body: { email: visitor.email, password: visitor.password } })
  assert.equal(r.status, 403)
  assert.match(r.data.error, /being reviewed/)
  assert.equal(r.headers.get('set-cookie'), null)
})

await step('wrong password and unknown email get the same message', async () => {
  const a = await call('/login', { method: 'POST', body: { email: visitor.email, password: 'wrong-password-123' } })
  const b = await call('/login', { method: 'POST', body: { email: `nobody.${stamp}@example.com`, password: 'wrong-password-123' } })
  assert.equal(a.status, 401)
  assert.equal(b.status, 401)
  assert.equal(a.data.error, 'Email or password is incorrect.')
  assert.equal(b.data.error, a.data.error)
})

await step('admin signs in; cookie flags', async () => {
  const r = await call('/login', { method: 'POST', body: { ...ADMIN, next: 'https://evil.example/x' } })
  assert.equal(r.status, 200, JSON.stringify(r.data))
  assert.equal(r.data.next, null, 'unsafe next must be dropped')
  const c = sessionCookie(r)
  assert.match(c.raw, /HttpOnly/)
  assert.match(c.raw, /SameSite=Lax/)
  assert.match(c.raw, /Max-Age=604800/)
  if (process.env.EXPECT_SECURE) {
    assert.match(c.raw, /;\s*Secure/)
    assert.match(c.raw, /Domain=\.aftrsolutions\.com/)
  }
  admin = c.pair
})

await step('non-admin areas: anonymous gets 401', async () => {
  assert.equal((await call('/me')).status, 401)
  assert.equal((await call('/admin/users')).status, 401)
})

await step('admin sees the request and approves it', async () => {
  const list = await call('/admin/users?status=pending', { cookie: admin })
  assert.equal(list.status, 200)
  const row = list.data.users.find((u) => u.email === visitor.email)
  assert.ok(row, 'new user is listed as pending')
  userId = row.id
  assert.equal((await call(`/admin/users/${userId}/approve`, { method: 'POST', body: {}, cookie: admin })).status, 200)
})

await step('approved user signs in -> /me 200 -> verify 200', async () => {
  const r = await call('/login', { method: 'POST', body: { email: visitor.email.toUpperCase(), password: visitor.password, next: 'https://demo-chatbot.aftrsolutions.com/x?y=1' } })
  assert.equal(r.status, 200, JSON.stringify(r.data))
  assert.equal(r.data.next, 'https://demo-chatbot.aftrsolutions.com/x?y=1')
  user = sessionCookie(r).pair
  const me = await call('/me', { cookie: user })
  assert.equal(me.status, 200)
  assert.equal(me.data.email, visitor.email)
  assert.equal(me.data.role, 'user')
  const v = await call('/auth/verify', { cookie: user })
  assert.equal(v.status, 200)
  assert.equal(v.headers.get('x-hub-user'), visitor.email)
})

await step('user is not an admin (403)', async () => {
  assert.equal((await call('/admin/stats', { cookie: user })).status, 403)
})

await step('demos list; coming-soon demo cannot be opened', async () => {
  const d = await call('/demos', { cookie: user })
  assert.equal(d.status, 200)
  assert.ok(d.data.demos.length > 0)
  const soon = d.data.demos.find((x) => x.type === 'coming-soon')
  if (soon) assert.equal((await call(`/demos/${soon.slug}/open`, { method: 'POST', body: {}, cookie: user })).status, 409)
  assert.equal((await call('/demos/nope/open', { method: 'POST', body: {}, cookie: user })).status, 404)
})

await step('logout -> verify 401', async () => {
  assert.equal((await call('/logout', { method: 'POST', body: {}, cookie: user })).status, 200)
  assert.equal((await call('/auth/verify', { cookie: user })).status, 401)
  assert.equal((await call('/me', { cookie: user })).status, 401)
})

await step('verify?redirect=1 sends visitors to sign-in with a safe next', async () => {
  const res = await fetch(`${BASE}/api/hub/auth/verify?redirect=1`, {
    redirect: 'manual',
    headers: { 'X-Forwarded-Host': 'demo-chatbot.aftrsolutions.com', 'X-Forwarded-Uri': '/chat?a=1' },
  })
  assert.equal(res.status, 302)
  assert.equal(res.headers.get('location'), `https://aftrsolutions.com/hub/login?next=${encodeURIComponent('https://demo-chatbot.aftrsolutions.com/chat?a=1')}`)
  const evil = await fetch(`${BASE}/api/hub/auth/verify?redirect=1`, { redirect: 'manual', headers: { 'X-Forwarded-Host': 'evil.example' } })
  assert.equal(evil.headers.get('location'), 'https://aftrsolutions.com/hub/login')
})

await step('revoke while signed in -> verify 401, sign-in refused', async () => {
  const r = await call('/login', { method: 'POST', body: { email: visitor.email, password: visitor.password } })
  user = sessionCookie(r).pair
  assert.equal((await call('/auth/verify', { cookie: user })).status, 200)
  assert.equal((await call(`/admin/users/${userId}/revoke`, { method: 'POST', body: {}, cookie: admin })).status, 200)
  assert.equal((await call('/auth/verify', { cookie: user })).status, 401)
  assert.equal((await call('/login', { method: 'POST', body: { email: visitor.email, password: visitor.password } })).status, 403)
})

await step('admin reset-password returns a working temporary password', async () => {
  await call(`/admin/users/${userId}/approve`, { method: 'POST', body: {}, cookie: admin })
  const r = await call(`/admin/users/${userId}/reset-password`, { method: 'POST', body: {}, cookie: admin })
  assert.equal(r.status, 200)
  assert.ok(r.data.password.length >= 10)
  assert.equal((await call('/login', { method: 'POST', body: { email: visitor.email, password: visitor.password } })).status, 401)
  const ok = await call('/login', { method: 'POST', body: { email: visitor.email, password: r.data.password } })
  assert.equal(ok.status, 200)
  const cp = await call('/change-password', { method: 'POST', body: { currentPassword: r.data.password, newPassword: visitor.password }, cookie: sessionCookie(ok).pair })
  assert.equal(cp.status, 200)
  await call(`/admin/users/${userId}/revoke`, { method: 'POST', body: {}, cookie: admin })
})

await step('admin stats', async () => {
  const s = await call('/admin/stats', { cookie: admin })
  assert.equal(s.status, 200)
  assert.ok(s.data.users.revoked >= 1)
})

await step('11 bad sign-ins from one IP -> 429', async () => {
  const ip = `10.250.${Math.floor(Math.random() * 250)}.9`
  const statuses = []
  for (let i = 0; i < 11; i += 1) {
    statuses.push((await call('/login', { method: 'POST', body: { email: visitor.email, password: `bad-password-${i}` }, ip })).status)
  }
  // Through nginx every step above shares one IP, so the limit can kick in earlier than the 11th.
  const first = statuses.indexOf(429)
  assert.ok(first !== -1, `expected a 429, got ${statuses.join(',')}`)
  assert.ok(statuses.slice(0, first).every((s) => s === 401))
  assert.ok(statuses.slice(first).every((s) => s === 429))
})

console.log(`\nAll ${passed} checks passed against ${BASE}`)
