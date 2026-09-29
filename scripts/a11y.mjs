// Accessibility check: serves the built site, runs axe on every route in both themes and
// fails on any critical or serious violation. Run `npm run build && npm run a11y`.
// Locally you can use an installed browser instead of Playwright's: CHANNEL=msedge npm run a11y
import { preview } from 'vite'
import { chromium } from 'playwright'
import AxeBuilder from '@axe-core/playwright'
import { services } from '../src/data/services.js'
import { posts } from '../src/data/blog.js'

const routes = [
  '/', '/services', ...services.map((s) => `/services/${s.slug}`),
  '/products', '/about', '/blog', `/blog/${posts[0].slug}`, '/contact',
]

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
    const page = await ctx.newPage()

    for (const route of routes) {
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
