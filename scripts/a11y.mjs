// Accessibility check: serves the built site, runs axe on every route in both themes and
// fails on any critical or serious violation. Run `npm run build && npm run a11y`.
// Locally you can use an installed browser instead of Playwright's: CHANNEL=msedge npm run a11y
import { preview } from 'vite'
import { chromium } from 'playwright'
import AxeBuilder from '@axe-core/playwright'
import { services } from '../src/data/services.js'
import { posts } from '../src/data/blog.js'
import { demos } from '../src/data/hub.js'

const routes = [
  '/', '/services', ...services.map((s) => `/services/${s.slug}`),
  '/products', '/about', '/blog', `/blog/${posts[0].slug}`, '/contact',
  '/hub', '/hub/login', '/hub/request-access',
]
// Signed-in Innovation Hub pages, checked with a mocked admin session and sample data.
const hubRoutes = ['/hub/app', `/hub/demos/${demos[0].slug}`, '/hub/account', '/hub/admin']
const sampleUser = (id, status) => ({
  id, name: `Sample Person ${id}`, email: `sample${id}@example.com`, company: 'Sample Traders', phone: '+92 300 0000000',
  reason: 'We would like to try the WhatsApp chatbot.', role: 'user', status, created_at: '2026-10-20T10:00:00.000Z',
  approved_at: status === 'approved' ? '2026-10-21T10:00:00.000Z' : null, approved_by_name: 'Admin', last_login_at: null, demo_opens: 2,
})
const hubMocks = {
  '**/api/hub/me': { name: 'Test Admin', email: 'admin@example.com', role: 'admin' },
  '**/api/hub/admin/users*': { users: [sampleUser(1, 'pending'), sampleUser(2, 'pending')] },
  '**/api/hub/admin/stats': {
    users: { pending: 2, approved: 1, rejected: 0, revoked: 0 }, demoOpens: { total: 3, last7Days: 1 },
    recent: [{ demo_slug: demos[0].slug, at: '2026-10-22T10:00:00.000Z', name: 'Sample Person 3', email: 'sample3@example.com', company: 'Sample Traders' }],
  },
}

const server = await preview({ preview: { port: 4179 }, logLevel: 'warn' })
const base = server.resolvedUrls.local[0].replace(/\/$/, '') // next free port if 4179 is taken
const browser = await chromium.launch(process.env.CHANNEL ? { channel: process.env.CHANNEL } : {})
let failures = 0

try {
  for (const theme of ['light', 'dark']) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme })
    await ctx.addInitScript((t) => {
      sessionStorage.setItem('aftr-intro-seen', '1') // skip the intro animation
      localStorage.setItem('aftr-theme', t)
    }, theme)
    // show the chat launcher so it is checked too
    await ctx.route('**/api/health', (r) => r.fulfill({ json: { ready: true } }))
    // visitors are signed out of the Innovation Hub
    await ctx.route('**/api/hub/me', (r) => r.fulfill({ status: 401, json: { error: 'Please sign in.' } }))
    const page = await ctx.newPage()

    for (const route of [...routes, ...hubRoutes]) {
      if (route === hubRoutes[0]) {
        await ctx.unroute('**/api/hub/me')
        for (const [pattern, json] of Object.entries(hubMocks)) await ctx.route(pattern, (r) => r.fulfill({ json }))
      }
      await page.goto(base + route, { waitUntil: 'networkidle' })
      // reveal-on-scroll content starts transparent; show everything before checking
      await page.addStyleTag({ content: '.reveal{opacity:1!important;transform:none!important} *{transition:none!important}' })
      await page.waitForTimeout(2200)
      const { violations } = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
        .analyze()
      const serious = violations.filter((v) => v.impact === 'critical' || v.impact === 'serious')
      failures += serious.length
      console.log(`${serious.length ? 'FAIL' : 'ok  '} [${theme}] ${route}  serious: ${serious.length}, other: ${violations.length - serious.length}`)
      for (const v of violations) {
        console.log(`       ${v.impact} ${v.id}: ${v.help}`)
        for (const n of v.nodes.slice(0, 3)) console.log(`         ${n.target.join(' ')}`)
      }
    }
    await ctx.close()
  }
} finally {
  await browser.close()
  await new Promise((resolve) => server.httpServer.close(resolve))
}

if (failures) {
  console.error(`\n${failures} critical/serious accessibility violation(s).`)
  process.exit(1)
}
console.log('\nNo critical or serious accessibility violations.')
