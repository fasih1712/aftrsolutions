import { products } from './data/products'

export function initials(name) {
  if (!name) return 'A'
  return name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()
}

export const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

// Innovation Hub: badge text per demo type, and the products.js entry a demo belongs to.
export const DEMO_LABELS = { live: 'Live demo', video: 'Video demo', 'coming-soon': 'Coming soon' }
export const productFor = (demo) => products.find((p) => p.title === demo.product)
