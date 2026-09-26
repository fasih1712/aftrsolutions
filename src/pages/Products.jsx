import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { PageHeader, CTA } from '../components/Common'
import { products } from '../data/products'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Products() {
  usePageTitle('Products')
  return (
    <>
      <PageHeader
        eyebrow="Products"
        title="Intelligence, ready to work."
        lead="Ready-to-deploy products we tailor to your business — running securely on your cloud or ours, connected to the tools your team already uses."
      />
      <section className="section section--tight">
        <div className="container product-rows">
          {products.map(({ icon: Icon, tag, title, text, features }, i) => (
            <article className={`product-row reveal ${i % 2 ? 'product-row--flip' : ''}`} key={title}>
              <div className="product-row__art" aria-hidden="true">
                <div className="product-row__glow" />
                <Icon size={88} strokeWidth={1} />
                <span className="product__tag">{tag}</span>
              </div>
              <div className="product-row__body">
                <span className="step__n">{String(i + 1).padStart(2, '0')}</span>
                <h2>{title}</h2>
                <p>{text}</p>
                <ul className="outcomes outcomes--compact">
                  {features.map((f) => <li key={f}><span><Check size={14} strokeWidth={2.4} /></span>{f}</li>)}
                </ul>
                <Link to="/contact" className="btn btn--primary">Request a demo <ArrowRight size={18} /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CTA title="Need something custom?" text="Every product can be tailored — or we can build a new one around your workflow." />
    </>
  )
}
