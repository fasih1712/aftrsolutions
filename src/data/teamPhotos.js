// Founder photos: drop <name-slug>.jpg (or .png/.webp) into src/assets/team/, e.g.
// abdul-rafay.jpg, and it is picked up automatically. Kept apart from about.js because
// import.meta.glob is Vite-only and about.js is also read by scripts/build-knowledge.mjs.
const photos = import.meta.glob('../assets/team/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' })

export const photoFor = (name) => {
  const slug = name.toLowerCase().replace(/\s+/g, '-')
  return Object.entries(photos).find(([path]) => path.split('/').pop().split('.')[0] === slug)?.[1]
}
