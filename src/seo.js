// Per-page SEO: <title>, meta description, canonical URL, Open Graph tags and JSON-LD.
// Used at build time by scripts/prerender.mjs (so every page ships real HTML + meta to
// Google, LinkedIn, WhatsApp etc.) and in the browser by hooks/usePageTitle.js.
import { site } from './data/site.js'
import { services, getService } from './data/services.js'
import { posts, getPost } from './data/blog.js'
import { team } from './data/about.js'

export const ORIGIN = 'https://aftrsolutions.com'
export const OG_IMAGE = `${ORIGIN}/og-image.png`
const BRAND = 'AFTR Solutions'

const ORG_ID = `${ORIGIN}/#organization`

const organization = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: BRAND,
  alternateName: 'AFTR',
  url: ORIGIN,
  logo: `${ORIGIN}/favicon-light-512.png`,
  image: OG_IMAGE,
  email: site.email,
  ...(site.phone ? { telephone: site.phone } : {}),
  description:
    'AI-first technology company in Karachi, Pakistan: AI automation and chatbots, data engineering, cloud and DevOps, web, app and ERP development, digital marketing and managed IT infrastructure.',
  address: { '@type': 'PostalAddress', addressLocality: 'Karachi', addressRegion: 'Sindh', addressCountry: 'PK' },
  founder: team.map((m) => ({ '@type': 'Person', name: m.name, jobTitle: m.role, sameAs: m.linkedin ? [m.linkedin] : undefined })),
  numberOfEmployees: { '@type': 'QuantitativeValue', value: team.length },
  knowsAbout: services.map((s) => s.title),
  sameAs: [site.social.linkedin, site.social.github].filter(Boolean),
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: site.email,
    ...(site.phone ? { telephone: site.phone } : {}),
    areaServed: 'Worldwide',
    availableLanguage: ['English', 'Urdu'],
  },
}

const breadcrumbs = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Home', path: '/' }, ...items].map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: ORIGIN + it.path,
  })),
})

// Static pages. Titles stay under ~60 characters and descriptions under ~160 so Google shows them in full.
const pages = {
  '/': {
    title: 'AFTR Solutions | AI, Software & Digital Marketing Company in Karachi',
    description:
      'AI-first tech company in Karachi, Pakistan. WhatsApp and website AI chatbots, AI agents, cloud and DevOps, web, app and ERP development, and digital marketing.',
    schema: [
      { '@type': 'WebSite', '@id': `${ORIGIN}/#website`, url: ORIGIN, name: BRAND, publisher: { '@id': ORG_ID }, inLanguage: 'en' },
    ],
  },
  '/services': {
    title: 'IT, AI & Digital Marketing Services in Pakistan | AFTR Solutions',
    description:
      'Seven services, one team: AI automation and agents, AI solutions, data engineering, DevOps and cloud, web, app and ERP development, digital marketing and managed IT.',
    crumbs: [{ name: 'Services', path: '/services' }],
  },
  '/products': {
    title: 'WhatsApp AI Chatbot, Website Chatbot & Phelix ERP | AFTR Solutions',
    description:
      'Ready-to-deploy AI products from AFTR: WhatsApp AI chatbot, website AI chatbot, AI forecasting and analytics, Phelix ERP and scrap management software.',
    crumbs: [{ name: 'Products', path: '/products' }],
  },
  '/about': {
    title: 'About Us: Four Engineers, One Accountable Team | AFTR Solutions',
    description:
      'Meet the four co-founders behind AFTR Solutions in Karachi, engineers in AI, data engineering, ERP, cloud and DevOps who build and run technology for growing businesses.',
    crumbs: [{ name: 'About us', path: '/about' }],
  },
  '/blog': {
    title: 'Blog: AI, Cloud, ERP & Digital Marketing Guides | AFTR Solutions',
    description:
      'Practical guides on AI chatbots and agents, cloud cost optimisation, Docker and Kubernetes, ERP, data and digital marketing, written by the AFTR Solutions team.',
    crumbs: [{ name: 'Blog', path: '/blog' }],
  },
  '/contact': {
    title: 'Contact AFTR Solutions | Start Your Project Today',
    description: `Tell us about your project in AI, cloud, software or digital marketing. Email ${site.email}; we reply within one business day.`,
    crumbs: [{ name: 'Contact', path: '/contact' }],
    schema: [{ '@type': 'ContactPage', url: `${ORIGIN}/contact`, name: 'Contact AFTR Solutions', about: { '@id': ORG_ID } }],
  },
  '/privacy': {
    title: 'Privacy Policy | AFTR Solutions',
    description: 'How AFTR Solutions handles information you share through this website, the contact form and the AI chat assistant.',
    crumbs: [{ name: 'Privacy policy', path: '/privacy' }],
  },
}

// Search-focused titles and descriptions per service (what people actually type into Google).
const serviceSeo = {
  'ai-automation-agents': {
    title: 'AI Automation, AI Agents & Chatbots in Pakistan | AFTR Solutions',
    description: 'Custom AI agents, WhatsApp and website chatbots and workflow automation (n8n, LangChain) that take repetitive work off your team. Built in Karachi, live in weeks.',
  },
  'ai-solutions': {
    title: 'AI Solutions: LLM Apps, AI Search & Forecasting | AFTR Solutions',
    description: 'Private AI search over your documents, LLM-powered apps and machine learning forecasting, grounded in your own data with accurate, cited answers.',
  },
  'data-engineering': {
    title: 'Data Engineering, BI & Power BI Dashboards | AFTR Solutions',
    description: 'Data pipelines, warehouses and Power BI dashboards that connect your ERP, CRM, sales and finance data into one reliable source of truth.',
  },
  'devops-cloud': {
    title: 'DevOps & Cloud Services: AWS, Azure, Kubernetes | AFTR Solutions',
    description: 'Cloud migration to AWS, Azure and Alibaba Cloud, CI/CD pipelines, Docker and Kubernetes, and cloud cost optimisation from certified engineers in Karachi.',
  },
  development: {
    title: 'Website, Mobile App & ERP Development in Pakistan | AFTR Solutions',
    description: 'Fast, SEO-ready websites, React and React Native apps, and ERP systems set up around how your business works. Designed, built and supported by one team.',
  },
  'digital-marketing': {
    title: 'Digital Marketing Agency in Karachi: SEO, Social & Ads | AFTR',
    description: 'SEO, social media management, Google and Meta ads and conversion tracking that is measured on leads and revenue, not likes. Monthly reporting, no lock-in.',
  },
  'managed-infrastructure': {
    title: 'Managed IT Services: Servers, Microsoft 365 & Backups | AFTR',
    description: 'Managed servers, Windows Server and Active Directory, Microsoft 365, identity, monitoring and backups, so your IT just works and your team can focus.',
  },
}

function servicePage(s) {
  const path = `/services/${s.slug}`
  return {
    title: serviceSeo[s.slug]?.title || `${s.title} Services in Pakistan | ${BRAND}`,
    description: serviceSeo[s.slug]?.description || s.short,
    crumbs: [{ name: 'Services', path: '/services' }, { name: s.title, path }],
    schema: [
      {
        '@type': 'Service',
        '@id': `${ORIGIN}${path}#service`,
        name: s.title,
        serviceType: s.subtitle,
        description: s.intro,
        url: ORIGIN + path,
        provider: { '@id': ORG_ID },
        areaServed: 'Worldwide',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: s.title,
          itemListElement: s.offerings.map((o) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: o.title, description: o.text } })),
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: s.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  }
}

function postPage(p) {
  const path = `/blog/${p.slug}`
  return {
    title: `${p.title} | ${BRAND}`,
    description: p.excerpt,
    type: 'article',
    published: p.date,
    crumbs: [{ name: 'Blog', path: '/blog' }, { name: p.title, path }],
    schema: [
      {
        '@type': 'BlogPosting',
        headline: p.title,
        description: p.excerpt,
        datePublished: p.date,
        dateModified: p.updated || p.date,
        articleSection: p.category,
        author: { '@type': 'Organization', name: p.author || BRAND, url: ORIGIN },
        publisher: { '@id': ORG_ID },
        image: OG_IMAGE,
        mainEntityOfPage: ORIGIN + path,
        inLanguage: 'en',
      },
    ],
  }
}

/** Every indexable route, for prerendering and the sitemap. */
export function allRoutes() {
  return [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/services', priority: '0.9', changefreq: 'monthly' },
    ...services.map((s) => ({ path: `/services/${s.slug}`, priority: '0.9', changefreq: 'monthly' })),
    { path: '/products', priority: '0.8', changefreq: 'monthly' },
    { path: '/about', priority: '0.7', changefreq: 'monthly' },
    { path: '/blog', priority: '0.7', changefreq: 'weekly', lastmod: posts.map((p) => p.updated || p.date).sort().at(-1) },
    ...posts.map((p) => ({ path: `/blog/${p.slug}`, priority: '0.6', changefreq: 'yearly', lastmod: p.updated || p.date })),
    { path: '/contact', priority: '0.8', changefreq: 'yearly' },
    { path: '/privacy', priority: '0.2', changefreq: 'yearly' },
  ]
}

/** SEO data for a pathname. Returns `notFound: true` for anything that is not a real page. */
export function seoFor(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'
  let page = pages[path]
  if (!page) {
    const svc = path.match(/^\/services\/([^/]+)$/)
    const post = path.match(/^\/blog\/([^/]+)$/)
    if (svc && getService(svc[1])) page = servicePage(getService(svc[1]))
    else if (post && getPost(post[1])) page = postPage(getPost(post[1]))
  }
  if (!page) {
    return { notFound: true, title: `Page not found | ${BRAND}`, description: 'This page does not exist.', canonical: null, robots: 'noindex', schema: [] }
  }
  const graph = [organization, ...(page.schema || [])]
  if (page.crumbs) graph.push(breadcrumbs(page.crumbs))
  return {
    title: page.title,
    description: page.description,
    canonical: ORIGIN + (path === '/' ? '/' : path),
    type: page.type || 'website',
    published: page.published,
    image: OG_IMAGE,
    schema: [{ '@context': 'https://schema.org', '@graph': graph }],
  }
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** The <head> tags for a page, as an HTML string (build time). */
export function headTags(seo) {
  const tags = [
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(seo.description)}" />`,
  ]
  if (seo.robots) tags.push(`<meta name="robots" content="${seo.robots}" />`)
  if (seo.canonical) {
    tags.push(
      `<link rel="canonical" href="${seo.canonical}" />`,
      `<meta property="og:type" content="${seo.type}" />`,
      `<meta property="og:site_name" content="${BRAND}" />`,
      `<meta property="og:locale" content="en_US" />`,
      `<meta property="og:title" content="${esc(seo.title)}" />`,
      `<meta property="og:description" content="${esc(seo.description)}" />`,
      `<meta property="og:url" content="${seo.canonical}" />`,
      `<meta property="og:image" content="${seo.image}" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
      `<meta property="og:image:alt" content="${BRAND} logo" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${esc(seo.title)}" />`,
      `<meta name="twitter:description" content="${esc(seo.description)}" />`,
      `<meta name="twitter:image" content="${seo.image}" />`,
    )
    if (seo.published) tags.push(`<meta property="article:published_time" content="${seo.published}" />`)
  }
  for (const s of seo.schema) {
    // `<` escaped so text inside the JSON can never close the script tag
    tags.push(`<script type="application/ld+json">${JSON.stringify(s).replace(/</g, '\\u003c')}</script>`)
  }
  return tags.join('\n    ')
}
