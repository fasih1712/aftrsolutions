import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import ServiceCard from '../components/ServiceCard'
import { PageHeader, SectionHead, CTA, TechMarquee } from '../components/Common'
import { services, getService } from '../data/services'
import { steps, useCases } from '../data/site'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Services() {
  usePageTitle('Services')
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Everything you need to build, ship and scale."
        lead="Six focused practices delivered by one accountable team. Pick a service to see exactly what we deliver."
      />
      <section className="section section--tight">
        <div className="container">
          <div className="scards scards--wide">
            {services.map((s, i) => <ServiceCard key={s.slug} service={s} index={i} variant="large" />)}
          </div>
        </div>
      </section>
      <section className="section section--alt">
        <div className="container">
          <SectionHead split eyebrow="What we can build for you" title="Real problems we solve." lead="A few examples of what businesses come to us for — each one delivered end-to-end by our team." />
          <div className="usecases">
            {useCases.map((u, i) => {
              const svc = getService(u.service)
              const Icon = svc.icon
              return (
                <Link to={`/services/${u.service}`} className="usecase reveal" key={u.title} style={{ '--d': `${(i % 3) * 80}ms` }}>
                  <span className="usecase__tag"><Icon size={15} strokeWidth={1.8} /> {svc.title}</span>
                  <h3>{u.title}</h3>
                  <p>{u.text}</p>
                  <ArrowUpRight className="usecase__arrow" size={18} />
                </Link>
              )
            })}
          </div>
        </div>
      </section>
      <TechMarquee />
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="How we work" title="A clear path from idea to impact." />
          <ol className="steps">
            {steps.map((s, i) => (
              <li className="step reveal" key={s.n} style={{ '--d': `${i * 90}ms` }}>
                <span className="step__n">{s.n}</span><h3>{s.title}</h3><p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <CTA />
    </>
  )
}
