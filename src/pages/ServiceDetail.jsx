import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Check, Plus } from 'lucide-react'
import ServiceCard from '../components/ServiceCard'
import { SectionHead, CTA } from '../components/Common'
import { services, getService } from '../data/services'
import { steps } from '../data/site'
import { usePageTitle } from '../hooks/usePageTitle'
import NotFound from './NotFound'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getService(slug)
  usePageTitle(service?.title, service?.short)
  if (!service) return <NotFound />

  const { icon: Icon, title, subtitle, tagline, intro, offerings, stack, outcomes, faqs } = service
  const others = services.filter((s) => s.slug !== slug).slice(0, 4)

  return (
    <>
      <section className="page-header page-header--service">
        <div className="hero__glow" aria-hidden="true" />
        <div className="hero__grid" aria-hidden="true" />
        <div className="container svc-hero">
          <div>
            <Link to="/services" className="back-link reveal"><ArrowLeft size={16} /> All services</Link>
            <p className="eyebrow reveal">{subtitle ? `${title} · ${subtitle}` : title}</p>
            <h1 className="page-header__title page-header__title--left reveal">{tagline}</h1>
            <p className="page-header__lead page-header__lead--left reveal">{intro}</p>
            <div className="hero__cta hero__cta--left reveal">
              <Link to="/contact" className="btn btn--primary">Discuss your project <ArrowRight size={18} /></Link>
            </div>
          </div>
          <div className="svc-hero__badge reveal" aria-hidden="true">
            <div className="svc-hero__ring" />
            <div className="svc-hero__ring svc-hero__ring--2" />
            <span className="svc-hero__icon"><Icon size={56} strokeWidth={1.2} /></span>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <SectionHead eyebrow="What we deliver" title={`${title}, end to end.`} />
          <div className="offerings">
            {offerings.map((o, i) => (
              <div className="offering reveal" key={o.title} style={{ '--d': `${(i % 3) * 80}ms` }}>
                <span className="offering__n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{o.title}</h3>
                <p>{o.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container svc-split">
          <div className="reveal">
            <p className="eyebrow">Outcomes</p>
            <h2 className="section__title">What changes for you.</h2>
            <ul className="outcomes">
              {outcomes.map((o) => <li key={o}><span><Check size={16} strokeWidth={2.4} /></span>{o}</li>)}
            </ul>
          </div>
          <div className="reveal" style={{ '--d': '120ms' }}>
            <p className="eyebrow">Tools & technologies</p>
            <div className="chips">
              {stack.map((t) => <span className="chip" key={t}>{t}</span>)}
            </div>
            <div className="mini-steps">
              {steps.map((s) => (
                <div key={s.n}><span>{s.n}</span><strong>{s.title}</strong></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container faq-wrap">
          <SectionHead eyebrow="FAQ" title="Common questions." />
          <div className="faqs reveal">
            {faqs.map((f) => <Faq key={f.q} {...f} />)}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <SectionHead eyebrow="Explore more" title="Other services." />
          <div className="scards scards--four">
            {others.map((s) => <ServiceCard key={s.slug} service={s} index={services.indexOf(s)} variant="compact" />)}
          </div>
        </div>
      </section>

      <CTA title={`Let’s talk ${title}.`} />
    </>
  )
}

function Faq({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq ${open ? 'faq--open' : ''}`}>
      <button className="faq__q" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        {q} <Plus size={18} />
      </button>
      <div className="faq__a"><div><p>{a}</p></div></div>
    </div>
  )
}
