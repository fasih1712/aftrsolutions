import { ArrowRight, ArrowDown } from 'lucide-react'
import { FullLogo } from './Logo'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__logo reveal">
          <FullLogo />
        </div>
        <p className="eyebrow reveal">Cloud · DevOps · AI · Software</p>
        <h1 className="hero__title reveal">
          Technology, engineered<br className="br-desktop" /> for what comes next.
        </h1>
        <p className="hero__lead reveal">
          We design, build and run the infrastructure, software and AI that modern businesses
          depend on — secure, scalable and made to last.
        </p>
        <div className="hero__cta reveal">
          <a href="#contact" className="btn btn--primary">
            Start a project <ArrowRight size={18} />
          </a>
          <a href="#services" className="btn btn--ghost">Explore services</a>
        </div>
      </div>
      <a href="#tech" className="hero__scroll" aria-label="Scroll down">
        <ArrowDown size={18} />
      </a>
    </section>
  )
}
