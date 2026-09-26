import ServiceCard from '../components/ServiceCard'
import { PageHeader, SectionHead, CTA, TechMarquee } from '../components/Common'
import { services } from '../data/services'
import { steps } from '../data/site'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Services() {
  usePageTitle('Services')
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Everything you need to build, ship and scale."
        lead="Five focused practices delivered by one accountable team. Pick a service to see exactly what we deliver."
      />
      <section className="section section--tight">
        <div className="container">
          <div className="scards scards--wide">
            {services.map((s, i) => <ServiceCard key={s.slug} service={s} index={i} variant="large" />)}
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
