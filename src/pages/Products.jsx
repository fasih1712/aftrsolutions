import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { PageHeader, CTA } from '../components/Common'
import { products } from '../data/products'
import { usePageTitle } from '../hooks/usePageTitle'
import { slugify } from '../utils'

export default function Products() {
  usePageTitle('Products')
  return (
    <>
      <PageHeader
        eyebrow="Products"
        title="Software we built, ready to work."
        lead="From our own Phelix ERP to AI chatbots for WhatsApp and your website — ready-to-deploy products we tailor to your business."
      />
      <section className="section section--tight">
        <div className="container product-rows">
          {products.map(({ icon: Icon, tag, title, text, features, own }, i) => (
            <article id={slugify(title)} className={`product-row reveal ${i % 2 ? 'product-row--flip' : ''}`} key={title}>
              <div className="product-row__art" aria-hidden="true">
                <div className="product-row__glow" />
                <Icon size={88} strokeWidth={1} />
                <span className="product__tag">{tag}</span>
              </div>
              <div className="product-row__body">
                <span className="step__n">
                  {String(i + 1).padStart(2, '0')}
                  {own && <span className="product__own">Our product</span>}
                </span>
                <h2>{title}</h2>
                <p>{text}</p>
                <ul className="outcomes outcomes--compact">
                  {features.map((f) => <li key={f}><span><Check size={14} strokeWidth={2.4} /></span>{f}</li>)}
                </ul>
                <Link to="/contact?service=Products" className="btn btn--primary">Request a demo <ArrowRight size={18} /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CTA title="Need something custom?" text="Every product can be tailored — or we can build a new one around your workflow." />
    </>
  )
}
