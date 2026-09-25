import { technologies } from '../data/site'

export default function TechMarquee() {
  const items = [...technologies, ...technologies]
  return (
    <section className="marquee" id="tech" aria-label="Technologies we work with">
      <p className="marquee__label">Technologies we work with</p>
      <div className="marquee__track">
        <div className="marquee__row">
          {items.map((t, i) => (
            <span key={i} className="marquee__item" aria-hidden={i >= technologies.length}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
