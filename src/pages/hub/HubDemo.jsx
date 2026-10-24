import { useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Check, PlayCircle } from 'lucide-react'
import { PageHeader } from '../../components/Common'
import RequireHub from '../../components/RequireHub'
import NotFound from '../NotFound'
import { getDemo } from '../../data/hub'
import { useHubSession } from '../../hooks/useHubSession'
import { hubFetch } from '../../hooks/hubApi'
import { usePageTitle } from '../../hooks/usePageTitle'
import { useReveal } from '../../hooks/useReveal'
import { DEMO_LABELS, productFor } from '../../utils'

function Demo({ demo }) {
  const { expire } = useHubSession()
  const [note, setNote] = useState('')
  useReveal(useLocation().pathname)
  const product = productFor(demo)
  const target = demo.type === 'live' ? demo.url : demo.type === 'video' ? demo.videoUrl : null

  // The link itself opens the demo (so popup blockers never interfere); this records the visit.
  const logOpen = async () => {
    const r = await hubFetch(`/demos/${demo.slug}/open`, { method: 'POST', body: {} })
    if (r.status === 401) {
      setNote('Your session has ended. Please sign in again to use the demo.')
      expire()
    }
  }

  return (
    <>
      <PageHeader eyebrow={product?.tag || 'Innovation Hub'} title={demo.product} lead={demo.summary}>
        <div className="hero__cta reveal">
          {target ? (
            <a href={target} target="_blank" rel="noopener" className="btn btn--primary" onClick={logOpen}>
              {demo.type === 'video' ? <>Watch the demo <PlayCircle size={18} /></> : <>Launch demo <ArrowUpRight size={18} /></>}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            <Link to="/contact?service=Products" className="btn btn--primary">Ask for a live walkthrough <ArrowUpRight size={18} /></Link>
          )}
          <Link to="/hub/app" className="btn btn--ghost"><ArrowLeft size={18} /> All demos</Link>
        </div>
        <p className="hub-demo__status reveal">
          <span className={`hub-badge hub-badge--${demo.type}`}>{demo.type === 'coming-soon' ? 'Demo coming soon' : DEMO_LABELS[demo.type]}</span>
        </p>
        <div aria-live="polite" className="form-note">{note}</div>
      </PageHeader>

      <section className="section section--tight">
        <div className="container hub-demo">
          <div className="card hub-demo__card reveal">
            <h2>Things to try</h2>
            <ul className="outcomes outcomes--compact">
              {demo.tryThis.map((t) => <li key={t}><span><Check size={14} strokeWidth={2.4} /></span>{t}</li>)}
            </ul>
            {demo.type === 'coming-soon' && (
              <p className="hub-demo__soon">
                This demo isn’t live yet. We’ll add it here as soon as it is, and in the meantime we’re happy to show
                it to you on a short call.
              </p>
            )}
          </div>
          {product && (
            <div className="card hub-demo__card reveal" style={{ '--d': '90ms' }}>
              <h2>What it does</h2>
              <p>{product.text}</p>
              <ul className="outcomes outcomes--compact">
                {product.features.map((f) => <li key={f}><span><Check size={14} strokeWidth={2.4} /></span>{f}</li>)}
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default function HubDemo() {
  usePageTitle()
  const demo = getDemo(useParams().slug)
  if (!demo) return <NotFound />
  return <RequireHub><Demo demo={demo} /></RequireHub>
}
