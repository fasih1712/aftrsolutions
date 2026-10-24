import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { DEMO_LABELS, productFor } from '../utils'

// Innovation Hub demo card: same hover treatment as ServiceCard (lift, gradient border, cursor spotlight).
export default function DemoCard({ demo, index = 0 }) {
  const product = productFor(demo)
  const Icon = product?.icon

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <Link
      to={`/hub/demos/${demo.slug}`}
      className="scard demo-card reveal"
      style={{ '--d': `${(index % 3) * 80}ms` }}
      onMouseMove={onMove}
    >
      <span className="scard__spot" aria-hidden="true" />
      <span className="demo-card__top">
        {Icon && <span className="scard__icon"><Icon size={24} strokeWidth={1.6} /></span>}
        <span className={`hub-badge hub-badge--${demo.type}`}>{DEMO_LABELS[demo.type]}</span>
      </span>
      <h3 className="scard__title">
        {demo.product}
        {product?.tag && <small>{product.tag}</small>}
      </h3>
      <p className="scard__text">{demo.summary}</p>
      <span className="scard__more">
        {demo.type === 'coming-soon' ? 'See what’s coming' : 'Open demo'} <ArrowUpRight size={16} />
      </span>
    </Link>
  )
}
