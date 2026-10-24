// Small client for the Innovation Hub API (hub/index.mjs, proxied by nginx at /api/hub).

// Remembers that this browser signed in to the Hub, so ordinary visitors never call /api/hub/me.
const HINT = 'aftr-hub'

export function rememberHub(signedIn) {
  try {
    if (signedIn) localStorage.setItem(HINT, '1')
    else localStorage.removeItem(HINT)
  } catch { /* storage unavailable */ }
}

export function hubHinted() {
  try { return localStorage.getItem(HINT) === '1' } catch { return false }
}

/** Calls /api/hub{path}. Always resolves to { ok, status, data }, with data.error set on failure. */
export async function hubFetch(path, { method = 'GET', body } = {}) {
  let res
  try {
    res = await fetch(`/api/hub${path}`, {
      method,
      credentials: 'same-origin',
      headers: { Accept: 'application/json', ...(body !== undefined && { 'Content-Type': 'application/json' }) },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
  } catch {
    return { ok: false, status: 0, data: { error: 'We couldn’t reach the server. Check your connection and try again.' } }
  }
  const data = await res.json().catch(() => ({}))
  if (!res.ok && !data.error) {
    data.error = res.status >= 500
      ? 'The Innovation Hub is temporarily unavailable. Please try again in a few minutes.'
      : 'Something went wrong. Please try again.'
  }
  return { ok: res.ok, status: res.status, data }
}

/** Where to go after sign-in: a path on this site, or an https page on aftrsolutions.com or a subdomain (the demos). */
export function safeNext(next) {
  if (!next || next.length > 2000) return null
  if (next.startsWith('/') && !next.startsWith('//') && !next.startsWith('/\\')) return next
  try {
    const u = new URL(next)
    const host = u.hostname.toLowerCase()
    if (u.protocol === 'https:' && !u.username && (host === 'aftrsolutions.com' || host.endsWith('.aftrsolutions.com'))) return u.href
  } catch { /* not a URL */ }
  return null
}

export const firstName = (name = '') => name.trim().split(/\s+/)[0] || name
