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
        title="AI products, ready to work."
        lead="AI chatbots for WhatsApp and your website, AI forecasting, and our own Phelix ERP and Scrap Management system. Ready-to-deploy products that we tailor to your business."
      />
      <section className="section section--tight">
        <div className="container product-rows">
          {products.map(({ icon: Icon, tag, title, text, features, own, anim }, i) => (
            <article id={slugify(title)} className={`product-row reveal ${i % 2 ? 'product-row--flip' : ''}`} key={title}>
              <div className={`product-row__art art art--${anim}`} aria-hidden="true">
                <div className="product-row__glow" />
                <span className="art__ring art__ring--outer" />
                <span className="art__ring art__ring--inner" />
                <span className="art__orbit"><i /></span>
                <span className="art__icon"><Icon size={88} strokeWidth={1} /></span>
                {anim === 'stack' && <span className="art__cubes"><i /><i /><i /></span>}
                {anim === 'chat' && <><span className="art__ripple"><i /><i /></span><span className="art__typing"><i /><i /><i /></span></>}
                {anim === 'bot' && <span className="art__window"><span className="art__bar"><i /><i /><i /></span><span className="art__reply"><i /><i /></span></span>}
                {anim === 'chart' && <span className="art__bars"><i /><i /><i /><i /><i /></span>}
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
      <CTA title="Need something custom?" text="Every product can be tailored, or we can build a new one around your workflow." />
    </>
  )
}
