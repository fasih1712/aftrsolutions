import { steps } from '../data/site'

export default function Approach() {
  return (
    <section className="section" id="approach">
      <div className="container">
        <div className="section__head reveal">
          <p className="eyebrow">How we work</p>
          <h2 className="section__title">A clear path from idea to impact.</h2>
        </div>
        <ol className="steps">
          {steps.map((s, i) => (
            <li className="step reveal" key={s.n} style={{ '--d': `${i * 90}ms` }}>
              <span className="step__n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
