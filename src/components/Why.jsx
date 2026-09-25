import { reasons } from '../data/site'

export default function Why() {
  return (
    <section className="section section--alt" id="why">
      <div className="container why">
        <div className="why__intro reveal">
          <p className="eyebrow">Why AFTR</p>
          <h2 className="section__title">Built on engineering discipline.</h2>
          <p className="section__lead">
            Certified cloud expertise and hands-on production experience — across Kubernetes,
            CI/CD, multi-cloud and enterprise IT — applied to every engagement.
          </p>
        </div>
        <div className="why__list">
          {reasons.map(({ icon: Icon, title, text }, i) => (
            <div className="why__item reveal" key={title} style={{ '--d': `${i * 80}ms` }}>
              <div className="why__icon"><Icon size={20} strokeWidth={1.6} /></div>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
