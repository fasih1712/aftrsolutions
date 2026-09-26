export function initials(name) {
  if (!name) return 'A'
  return name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()
}
