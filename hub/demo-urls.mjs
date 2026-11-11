// Live demo URLs, by demo slug. Server-side only: src/data/hub.js ships in the public JS
// bundle, so the URLs live here and are only returned by the signed-in Hub API
// (GET /api/hub/demos and POST /api/hub/demos/:slug/open).
//
// Normally a demo URL is an https://demo-*.aftrsolutions.com subdomain behind Caddy forward_auth.
// Entries listed in RAW_URL_EXCEPTIONS are temporary, explicit exceptions to that rule.
// A demo with a public `openUrl` in src/data/hub.js uses that when it has no entry here.
import { demos } from '../src/data/hub.js'

export const demoUrls = {
  // 'demo-chatbot': 'https://demo-chatbot.aftrsolutions.com',
}

// TODO: remove once the scrap demo moves to https://demo-scrap.aftrsolutions.com (see DEPLOY.md).
const RAW_URL_EXCEPTIONS = new Set(['scrap-management'])

/** The URL for a live demo, or null when it isn't set or isn't allowed. */
export function demoUrl(slug) {
  const raw = demoUrls[slug] || demos.find((d) => d.slug === slug)?.openUrl
  if (!raw) return null
  try {
    const u = new URL(raw)
    const host = u.hostname.toLowerCase()
    if (u.username || u.password) return null
    if (u.protocol === 'https:' && (host === 'aftrsolutions.com' || host.endsWith('.aftrsolutions.com'))) return u.href
    if (RAW_URL_EXCEPTIONS.has(slug) && (u.protocol === 'http:' || u.protocol === 'https:')) return u.href
  } catch { /* not a URL */ }
  return null
}
