// Build-time renderer: `vite build --ssr src/entry-server.jsx` bundles this, and
// scripts/prerender.mjs calls render() for every route to write static HTML.
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { AppShell } from './App.jsx'

export { allRoutes, privateRoutes, seoFor, headTags } from './seo.js'

export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <AppShell />
    </StaticRouter>,
  )
}
