// Prerender: writes a real HTML file for every route, with its own <title>, description,
// canonical, Open Graph tags and JSON-LD, plus 404.html and sitemap.xml. Signed-in Innovation Hub
// pages are written too (as a noindex loader, so nginx can serve them) but stay out of the sitemap.
// Runs after `vite build` (client) and `vite build --ssr` (dist-ssr). See package.json "build".
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const ssr = join(root, 'dist-ssr')
const { render, allRoutes, privateRoutes, seoFor, headTags } = await import(pathToFileURL(join(ssr, 'entry-server.js')).href)

const template = readFileSync(join(dist, 'index.html'), 'utf8')
if (!template.includes('<!--seo:start-->') || !template.includes('<!--app-->')) {
  throw new Error('index.html is missing the <!--seo:start--> / <!--app--> markers')
}

function page(url) {
  const seo = seoFor(url)
  const html = template
    .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, headTags(seo))
    .replace('<!--app-->', render(url))
  return { seo, html }
}

// "/" -> index.html, "/services" -> services.html, "/services/x" -> services/x.html
// (nginx: try_files $uri $uri.html $uri/ =404)
const fileFor = (path) => (path === '/' ? 'index.html' : `${path.slice(1)}.html`)

const routes = allRoutes()
for (const { path } of routes) {
  const { seo, html } = page(path)
  if (seo.notFound) throw new Error(`Route ${path} resolved to "not found"`)
  const out = join(dist, fileFor(path))
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, html)
}
for (const path of privateRoutes()) {
  const out = join(dist, fileFor(path))
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, page(path).html)
}
writeFileSync(join(dist, '404.html'), page('/404').html)

const today = new Date().toISOString().slice(0, 10)
const urls = routes.map(({ path, lastmod, changefreq, priority }) => `  <url>
    <loc>${seoFor(path).canonical}</loc>
    <lastmod>${lastmod || today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`)
writeFileSync(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`)

rmSync(ssr, { recursive: true, force: true })
console.log(`Prerendered ${routes.length} pages + ${privateRoutes().length} Hub pages + 404.html, sitemap.xml with ${routes.length} URLs`)
