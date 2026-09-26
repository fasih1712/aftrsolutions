import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

// Card with hover lift, deep shadow, glowing gradient border and a
// spotlight that follows the cursor (CSS vars --mx / --my).
export default function ServiceCard({ service, index = 0, variant = 'default' }) {
  const { slug, icon: Icon, title, subtitle, short } = service

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <Link
      to={`/services/${slug}`}
      className={`scard scard--${variant} reveal`}
      style={{ '--d': `${(index % 3) * 80}ms` }}
      onMouseMove={onMove}
    >
      <span className="scard__spot" aria-hidden="true" />
      <span className="scard__num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      <span className="scard__icon"><Icon size={24} strokeWidth={1.6} /></span>
      <h3 className="scard__title">
        {title}
        {subtitle && <small>{subtitle}</small>}
      </h3>
      <p className="scard__text">{short}</p>
      <span className="scard__more">
        Explore service <ArrowUpRight size={16} />
      </span>
    </Link>
  )
}
