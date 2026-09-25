import { ArrowUpRight } from 'lucide-react'
import { products } from '../data/site'

export default function Products() {
  return (
    <section className="section section--alt" id="products">
      <div className="container">
        <div className="section__head section__head--split reveal">
          <div>
            <p className="eyebrow">AI Products</p>
            <h2 className="section__title">Intelligence, ready to work.</h2>
          </div>
          <p className="section__lead">
            AI-based products we deploy and tailor to your business — running securely on your
            cloud or ours, connected to the tools your team already uses.
          </p>
        </div>

        <div className="products">
          {products.map(({ icon: Icon, tag, title, text }, i) => (
            <article className="product reveal" key={title} style={{ '--d': `${i * 90}ms` }}>
              <div className="product__top">
                <span className="product__tag">{tag}</span>
                <Icon size={26} strokeWidth={1.4} />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
              <a href="#contact" className="product__link">
                Request a demo <ArrowUpRight size={16} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
