import { Check } from 'lucide-react'
import { services } from '../data/site'

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section__head reveal">
          <p className="eyebrow">What we do</p>
          <h2 className="section__title">Everything you need to build, ship and scale.</h2>
          <p className="section__lead">
            Six focused practices, one accountable team. Engage us for a single project or as your
            long-term technology partner.
          </p>
        </div>

        <div className="services">
          {services.map(({ icon: Icon, title, text, points }, i) => (
            <article className="card service reveal" key={title} style={{ '--d': `${(i % 3) * 80}ms` }}>
              <div className="service__icon"><Icon size={22} strokeWidth={1.6} /></div>
              <h3>{title}</h3>
              <p>{text}</p>
              <ul>
                {points.map((p) => (
                  <li key={p}><Check size={15} strokeWidth={2} /> {p}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
