import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageHeader, SectionHead, CTA } from '../components/Common'
import DemoCard from '../components/DemoCard'
import { demos } from '../data/hub'
import { useHubSession } from '../hooks/useHubSession'
import { usePageTitle } from '../hooks/usePageTitle'

const steps = [
  { n: '01', title: 'Request access', text: 'Tell us who you are and what you’d like to try.' },
  { n: '02', title: 'Get approved', text: 'Our team reviews requests, usually within one business day.' },
  { n: '03', title: 'Explore', text: 'Sign in and launch any live demo, as often as you like.' },
]

export default function Hub() {
  usePageTitle()
  const { status } = useHubSession()
  return (
    <>
      <PageHeader
        eyebrow="Innovation Hub"
        title="See it working. Then decide."
        lead="The Innovation Hub is where we put our products in your hands. Request access, and once approved you can explore live demos of our AI assistants, automations and analytics. No sales call required."
      >
        <div className="hero__cta reveal">
          {status === 'in' ? (
            <Link to="/hub/app" className="btn btn--primary">Open the Hub <ArrowRight size={18} /></Link>
          ) : (
            <>
              <Link to="/hub/request-access" className="btn btn--primary">Request access <ArrowRight size={18} /></Link>
              <Link to="/hub/login" className="btn btn--ghost">Sign in</Link>
            </>
          )}
        </div>
      </PageHeader>

      <section className="section section--tight">
        <div className="container">
          <SectionHead eyebrow="How it works" title="Three steps to a working demo." />
          <div className="steps steps--three">
            {steps.map((s, i) => (
              <div className="step reveal" key={s.n} style={{ '--d': `${i * 90}ms` }}>
                <span className="step__n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <SectionHead
            split
            eyebrow="Demos"
            title="Our products, ready to try."
            lead="Every demo runs on sample data, never real client data. New demos appear here as soon as they are ready."
          />
          <div className="scards">
            {demos.map((d, i) => <DemoCard key={d.slug} demo={d} index={i} />)}
          </div>
        </div>
      </section>

      <CTA title="Prefer to talk first?" text="Tell us what you’re trying to solve and we’ll walk you through the right product, live." />
    </>
  )
}
