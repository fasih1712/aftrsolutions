import { Link } from 'react-router-dom'
import { ArrowRight, ArrowDown, ArrowUpRight } from 'lucide-react'
import { FullLogo } from '../components/Logo'
import ServiceCard from '../components/ServiceCard'
import { SectionHead, CTA, TechMarquee, LinkedInIcon } from '../components/Common'
import { services } from '../data/services'
import { products } from '../data/products'
import { team } from '../data/about'
import { posts } from '../data/blog'
import PostCard from '../components/PostCard'
import { initials } from '../utils'
import { steps, useCases } from '../data/site'
import { getService } from '../data/services'
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
          <p className="eyebrow reveal">AI · Cloud · Data · Development · Infrastructure</p>
          <h1 className="hero__title reveal">
            Technology, engineered<br className="br-desktop" /> for what comes next.
          </h1>
          <p className="hero__lead reveal">
            We design, build and run the AI, cloud, data, software and infrastructure that modern
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
            title="Six practices. One accountable team."
            lead="Engage us for a single project or as your long-term technology partner — every service has a dedicated page with the details."
          />
          <div className="scards">
            {services.map((s, i) => <ServiceCard key={s.slug} service={s} index={i} />)}
          </div>
          <Link to="/contact" className="help-strip reveal">
            <span><strong>Not sure what you need?</strong> Tell us the problem — we’ll recommend the right mix of services.</span>
            <span className="help-strip__cta">Talk to us <ArrowUpRight size={16} /></span>
          </Link>
        </div>
      </section>

      <section className="statement">
        <div className="container">
          <p className="statement__text reveal">
            One partner. <span>From the first line of code</span> to the servers it runs on{' '}
            <span>— the data behind it, and the intelligence built into it.</span>
          </p>
          <div className="statement__pillars">
            <div className="reveal"><strong>Infrastructure</strong><span>Cloud, on-prem and hybrid platforms that stay fast and secure.</span></div>
            <div className="reveal" style={{ '--d': '100ms' }}><strong>Software</strong><span>Websites, apps and internal systems engineered for real users.</span></div>
            <div className="reveal" style={{ '--d': '200ms' }}><strong>Data</strong><span>Pipelines, warehouses and dashboards that give you one source of truth.</span></div>
            <div className="reveal" style={{ '--d': '300ms' }}><strong>Intelligence</strong><span>AI agents and solutions that automate work and surface what matters.</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead split eyebrow="What we can build for you" title="Real problems we solve." lead="A few examples of what businesses come to us for — each one delivered end-to-end by our team." />
          <div className="usecases">
            {useCases.map((u, i) => {
              const svc = getService(u.service)
              const Icon = svc.icon
              return (
                <Link to={`/services/${u.service}`} className="usecase reveal" key={u.title} style={{ '--d': `${(i % 3) * 80}ms` }}>
                  <span className="usecase__tag"><Icon size={15} strokeWidth={1.8} /> {svc.title}</span>
                  <h3>{u.title}</h3>
                  <p>{u.text}</p>
                  <ArrowUpRight className="usecase__arrow" size={18} />
                </Link>
              )
            })}
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
        <div className="container">
          <SectionHead
            split
            eyebrow="Founders"
            title="Built by four founders who do the work."
            lead="Cloud, data, ERP and AI specialists who founded AFTR together — you work directly with us, not a layer of account managers."
          />
          <div className="founders">
            {team.map((m, i) => (
              <div className="founder reveal" key={m.name} style={{ '--d': `${i * 90}ms` }}>
                <span className="avatar">{initials(m.name)}</span>
                <h3>{m.name}</h3>
                <p className="founder__role">{m.role.replace('Co-founder · ', '')}</p>
                <div className="founder__links">
                  <a href={m.linkedin} target="_blank" rel="noreferrer" aria-label={`${m.name} on LinkedIn`}><LinkedInIcon /> LinkedIn</a>
                </div>
              </div>
            ))}
          </div>
          <div className="founders__more reveal">
            <Link to="/about" className="btn btn--ghost">Meet the founders <ArrowRight size={18} /></Link>
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
