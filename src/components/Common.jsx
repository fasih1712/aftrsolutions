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
