import { Link } from 'react-router-dom'
import { ArrowRight, ArrowDown, ArrowUpRight } from 'lucide-react'
import { FullLogo } from '../components/Logo'
import ServiceCard from '../components/ServiceCard'
import { SectionHead, CTA, TechMarquee } from '../components/Common'
import { services } from '../data/services'
import { products } from '../data/products'
import { team } from '../data/about'
import { posts } from '../data/blog'
import PostCard from '../components/PostCard'
import { initials } from '../utils'
import { steps } from '../data/site'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Home() {
  usePageTitle()
  return (
    <>
      <section className="hero">
        <div className="hero__glow" aria-hidden="true" />
        <div className="hero__grid" aria-hidden="true" />
        <div className="container hero__inner">
          <div className="hero__logo reveal"><FullLogo /></div>
          <p className="eyebrow reveal">AI · Cloud · Development · Infrastructure</p>
          <h1 className="hero__title reveal">
            Technology, engineered<br className="br-desktop" /> for what comes next.
          </h1>
          <p className="hero__lead reveal">
            We design, build and run the AI, cloud, software and infrastructure that modern
            businesses depend on — secure, scalable and made to last.
          </p>
          <div className="hero__cta reveal">
            <Link to="/contact" className="btn btn--primary">Start a project <ArrowRight size={18} /></Link>
            <Link to="/services" className="btn btn--ghost">Explore services</Link>
          </div>
        </div>
        <a href="#tech" className="hero__scroll" aria-label="Scroll down"><ArrowDown size={18} /></a>
      </section>

      <div id="tech"><TechMarquee /></div>

      <section className="section">
        <div className="container">
          <SectionHead
            split
            eyebrow="What we do"
            title="Five practices. One accountable team."
            lead="Engage us for a single project or as your long-term technology partner — every service has a dedicated page with the details."
          />
          <div className="scards">
            {services.map((s, i) => <ServiceCard key={s.slug} service={s} index={i} />)}
            <Link to="/contact" className="scard scard--cta reveal" style={{ '--d': '160ms' }}>
              <h3 className="scard__title">Not sure what you need?</h3>
              <p className="scard__text">Tell us the problem — we’ll recommend the right mix of services.</p>
              <span className="scard__more">Talk to us <ArrowUpRight size={16} /></span>
            </Link>
          </div>
        </div>
      </section>

      <section className="statement">
        <div className="container">
          <p className="statement__text reveal">
            One partner. <span>From the first line of code</span> to the servers it runs on{' '}
            <span>— and the intelligence built into it.</span>
          </p>
          <div className="statement__pillars">
            <div className="reveal"><strong>Infrastructure</strong><span>Cloud, on-prem and hybrid platforms that stay fast and secure.</span></div>
            <div className="reveal" style={{ '--d': '100ms' }}><strong>Software</strong><span>Websites, apps and internal systems engineered for real users.</span></div>
            <div className="reveal" style={{ '--d': '200ms' }}><strong>Intelligence</strong><span>AI agents and solutions that automate work and surface what matters.</span></div>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <SectionHead split eyebrow="Products" title="Ready-to-deploy products." lead="Proven AI products we tailor to your business — running securely on your cloud or ours." />
          <div className="products">
            {products.map(({ icon: Icon, tag, title, text }, i) => (
              <Link to="/products" className="product reveal" key={title} style={{ '--d': `${i * 90}ms` }}>
                <div className="product__top"><span className="product__tag">{tag}</span><Icon size={26} strokeWidth={1.4} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
                <span className="product__link">Learn more <ArrowUpRight size={16} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="How we work" title="A clear path from idea to impact." />
          <ol className="steps">
            {steps.map((s, i) => (
              <li className="step reveal" key={s.n} style={{ '--d': `${i * 90}ms` }}>
                <span className="step__n">{s.n}</span><h3>{s.title}</h3><p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container about-teaser">
          <div className="reveal">
            <p className="eyebrow">About AFTR</p>
            <h2 className="section__title">A focused team of four — covering the whole stack.</h2>
            <p className="section__lead">
              Cloud engineers, AI builders, developers and infrastructure specialists working as one
              team, so nothing falls between the cracks.
            </p>
            <Link to="/about" className="btn btn--ghost" style={{ marginTop: 28 }}>Meet the team <ArrowRight size={18} /></Link>
          </div>
          <div className="avatars reveal" style={{ '--d': '120ms' }}>
            {team.map((m, i) => (
              <div className="avatar-card" key={i} style={{ '--i': i }}>
                <span className="avatar">{initials(m.name)}</span>
                <strong>{m.role}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead split eyebrow="Blog" title="Insights from the team." lead="Practical notes on AI, cloud and building reliable software." />
          <div className="posts">
            {posts.slice(0, 3).map((p, i) => <PostCard key={p.slug} post={p} index={i} />)}
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
