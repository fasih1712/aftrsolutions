import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { technologies } from '../data/site'

export function PageHeader({ eyebrow, title, lead, children }) {
  return (
    <section className="page-header">
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />
      <div className="container page-header__inner">
        {eyebrow && <p className="eyebrow reveal">{eyebrow}</p>}
        <h1 className="page-header__title reveal">{title}</h1>
        {lead && <p className="page-header__lead reveal">{lead}</p>}
        {children}
      </div>
    </section>
  )
}

export function SectionHead({ eyebrow, title, lead, split = false, center = false }) {
  if (split) {
    return (
      <div className="section__head section__head--split reveal">
        <div>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 className="section__title">{title}</h2>
        </div>
        {lead && <p className="section__lead">{lead}</p>}
      </div>
    )
  }
  return (
    <div className={`section__head reveal ${center ? 'section__head--center' : ''}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="section__title">{title}</h2>
      {lead && <p className="section__lead">{lead}</p>}
    </div>
  )
}

export function CTA({ title = 'Let’s build what’s next.', text = 'Tell us about your project — we’ll reply within one business day with next steps.' }) {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta__box reveal">
          <div className="cta__glow" aria-hidden="true" />
          <h2>{title}</h2>
          <p>{text}</p>
          <div className="cta__actions">
            <Link to="/contact" className="btn btn--invert">Start a project <ArrowRight size={18} /></Link>
            <Link to="/services" className="btn btn--invert-ghost">View services</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export function TechMarquee() {
  const items = [...technologies, ...technologies]
  return (
    <section className="marquee" aria-label="Technologies we work with">
      <p className="marquee__label">Technologies we work with</p>
      <div className="marquee__track">
        <div className="marquee__row">
          {items.map((t, i) => (
            <span key={i} className="marquee__item" aria-hidden={i >= technologies.length}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

// lucide-react ships no brand icons, so LinkedIn is drawn inline.
export function LinkedInIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}
