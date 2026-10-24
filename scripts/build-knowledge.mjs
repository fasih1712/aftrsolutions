// Builds server/knowledge.md from the website's own data files, so the chatbot only
// ever talks about what the site says. Run with `npm run knowledge` (the chat Docker
// image runs it automatically).
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { site, steps, useCases, technologies } from '../src/data/site.js'
import { services } from '../src/data/services.js'
import { products } from '../src/data/products.js'
import { team, values } from '../src/data/about.js'
import { posts } from '../src/data/blog.js'
import { demos } from '../src/data/hub.js'

const url = (path) => `https://aftrsolutions.com${path}`
const out = []
const line = (s = '') => out.push(s)

line('# AFTR Solutions: website knowledge')
line()
line('## Company')
line(`${site.name} is an AI-first technology company based in ${site.location}, founded by four engineers who work directly on every client project.`)
line('It builds AI chatbots, AI agents and data solutions, plus the websites, apps, ERP systems, cloud and DevOps platforms and IT infrastructure they run on.')
line('Clients get one accountable team for the whole picture instead of separate agencies, and the team stays involved after launch.')
line(`Contact: email ${site.email}, or the contact form at ${url('/contact')}. The team replies within one business day.`)
line(`Website pages: Home ${url('/')}, Services ${url('/services')}, Products ${url('/products')}, Innovation Hub ${url('/hub')}, About ${url('/about')}, Blog ${url('/blog')}, Contact ${url('/contact')}.`)
line()
line('## Values')
for (const v of values) line(`- ${v.title}: ${v.text}`)
line()
line('## Founders (public roles only)')
for (const m of team) line(`- ${m.name}: ${m.role.replace('Co-founder · ', 'Co-founder, ')}. Works with ${m.skills.join(', ')}.`)
line()
line('## Services')
for (const s of services) {
  line()
  line(`### ${s.title}${s.subtitle ? ` (${s.subtitle})` : ''}`)
  line(`Page: ${url(`/services/${s.slug}`)}`)
  line(`Summary: ${s.short}`)
  line(s.intro)
  line('What we deliver:')
  for (const o of s.offerings) line(`- ${o.title}: ${o.text}`)
  line(`Tools and platforms: ${s.stack.join(', ')}.`)
  line(`Outcomes: ${s.outcomes.join('; ')}.`)
  line('FAQ:')
  for (const f of s.faqs) line(`- Q: ${f.q} A: ${f.a}`)
}
line()
line('## Products')
for (const p of products) {
  line()
  line(`### ${p.title}${p.own ? ' (built in-house by AFTR)' : ''}`)
  line(`Page: ${url('/products')}`)
  line(p.text)
  line(`Features: ${p.features.join('; ')}.`)
  const demo = demos.find((d) => d.product === p.title)
  line(demo?.type === 'live' || demo?.type === 'video'
    ? `A ${demo.type === 'live' ? 'live' : 'video'} demo is available in the Innovation Hub (${url('/hub')}) for approved users.`
    : 'Its Innovation Hub demo is coming soon; until then the team can show it on a call booked through the contact page.')
}
line()
line('## Innovation Hub (product demos)')
line(`The Innovation Hub (${url('/hub')}) is where potential clients can try AFTR products themselves before talking to sales.`)
line(`How it works: 1. Request access at ${url('/hub/request-access')} with your name, work email, company and what you would like to try. 2. The AFTR team reviews each request, usually within one business day. 3. Once approved, sign in at ${url('/hub/login')} and open the demos as often as you like.`)
line('Every demo runs on sample data, never real client data. Access is by approval only, so the assistant cannot approve requests or check their status; for that, visitors should email the team.')
line(`Forgotten passwords are reset by the team: contact ${site.email}.`)
line('Demos:')
for (const d of demos) line(`- ${d.product}: ${d.summary} Status: ${d.type === 'live' ? 'live' : d.type === 'video' ? 'video walkthrough' : 'coming soon'}.`)
line()
line('## How we work')
for (const s of steps) line(`${s.n}. ${s.title}: ${s.text}`)
line()
line('## Examples of what we build')
for (const u of useCases) line(`- ${u.title}: ${u.text} (${url(`/services/${u.service}`)})`)
line()
line('## Technologies we work with')
line(technologies.join(', '))
line()
line('## Blog articles')
for (const p of posts) line(`- "${p.title}" (${p.category}): ${p.excerpt} ${url(`/blog/${p.slug}`)}`)

const target = fileURLToPath(new URL('../server/knowledge.md', import.meta.url))
writeFileSync(target, out.join('\n') + '\n')
console.log(`wrote ${target} (${out.length} lines)`)
