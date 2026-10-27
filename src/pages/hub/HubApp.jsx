import { Link, useLocation } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageHeader } from '../../components/Common'
import DemoCard from '../../components/DemoCard'
import RequireHub from '../../components/RequireHub'
import { demos } from '../../data/hub'
import { useHubSession } from '../../hooks/useHubSession'
import { usePageTitle } from '../../hooks/usePageTitle'
import { useReveal } from '../../hooks/useReveal'

function Gallery() {
  const { user } = useHubSession()
  useReveal(useLocation().pathname) // this page loads after the layout's reveal pass
  return (
    <>
      <PageHeader
        eyebrow="Innovation Hub"
        className="page-header--welcome"
        title={`Welcome, ${user.name}.`}
        lead="Pick a product to see what it does and launch its demo. Every demo runs on sample data, so explore as much as you like."
      >
        <div className="hero__cta reveal">
          {user.role === 'admin' && <Link to="/hub/admin" className="btn btn--primary">Admin panel <ArrowRight size={18} /></Link>}
          <Link to="/hub/account" className="btn btn--ghost">Your account</Link>
        </div>
      </PageHeader>
      <section className="section section--tight">
        <div className="container">
          <h2 className="sr-only">Demos</h2>
          <div className="scards">
            {demos.map((d, i) => <DemoCard key={d.slug} demo={d} index={i} />)}
          </div>
        </div>
      </section>
    </>
  )
}

export default function HubApp() {
  usePageTitle()
  return <RequireHub><Gallery /></RequireHub>
}
