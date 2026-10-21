import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { seoFor } from '../seo'

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector)
  if (el && value) el.setAttribute(attr, value)
}

// Keeps <title>, description, canonical and Open Graph tags in sync on client-side navigation.
// The same values are written into each page's HTML at build time (scripts/prerender.mjs).
// The arguments are kept for the existing call sites; src/seo.js is the source of truth.
// eslint-disable-next-line no-unused-vars
export function usePageTitle(_title, _description) {
  const { pathname } = useLocation()
  useEffect(() => {
    const seo = seoFor(pathname)
    document.title = seo.title
    setMeta('meta[name="description"]', 'content', seo.description)
    setMeta('link[rel="canonical"]', 'href', seo.canonical)
    setMeta('meta[property="og:url"]', 'content', seo.canonical)
    setMeta('meta[property="og:title"]', 'content', seo.title)
    setMeta('meta[property="og:description"]', 'content', seo.description)
  }, [pathname])
}
