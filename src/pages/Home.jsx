import { Link } from 'react-router-dom'
import { ArrowRight, ArrowDown, ArrowUpRight } from 'lucide-react'
import { FullLogo } from '../components/Logo'
import ServiceCard from '../components/ServiceCard'
import { SectionHead, CTA, TechMarquee, LinkedInIcon } from '../components/Common'
import { services } from '../data/services'
import { products } from '../data/products'
import { team } from '../data/about'
import { initials, slugify } from '../utils'
import { technologies } from '../data/site'
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
            AFTR Solutions is a technology company that designs, builds and runs the AI, cloud, data,
            software and infrastructure modern businesses depend on — secure, scalable and made to last.
          </p>
          <div className="hero__cta reveal">
            <Link to="/contact" className="btn btn--primary">Start a project <ArrowRight size={18} /></Link>
            <a href="#about" className="btn btn--ghost">Who we are</a>
          </div>
        </div>
        <a href="#about" className="hero__scroll" aria-label="Scroll down"><ArrowDown size={18} /></a>
      </section>

      <section className="section" id="about">
        <div className="container who">
          <div className="who__text reveal">
            <p className="eyebrow">Who we are</p>
            <h2 className="section__title">Your technology partner, from idea to everyday operations.</h2>
            <p>
              AFTR Solutions is a Karachi-based technology company founded by four engineers. We help
              businesses put the right technology in place — and keep it working. That means building
              websites, apps and ERP systems, moving workloads to the cloud, organising data, automating
              work with AI, and managing the IT infrastructure behind it all.
            </p>
            <p>
              Instead of juggling separate agencies for the website, the servers and the automation, you
              get one team that owns the whole picture — and stays with you after launch.
            </p>
            <div className="who__actions">
              <Link to="/about" className="btn btn--primary">About the company <ArrowRight size={18} /></Link>
              <Link to="/services" className="btn btn--ghost">Our services</Link>
            </div>
          </div>
          <div className="facts reveal" style={{ '--d': '120ms' }}>
            <div className="fact"><strong>{team.length}</strong><span>Co-founders, hands-on in every project</span></div>
            <div className="fact"><strong>{services.length}</strong><span>Services under one roof</span></div>
            <div className="fact"><strong>{products.filter((p) => p.own).length}</strong><span>In-house products, incl. Phelix ERP</span></div>
            <div className="fact"><strong>{technologies.length}+</strong><span>Technologies and platforms we work with</span></div>
          </div>
        </div>
      </section>

      <TechMarquee />

      <section className="section">
        <div className="container">
          <SectionHead
            split
            eyebrow="Services we provide"
            title="Six services. One accountable team."
            lead="Engage us for a single project or as your long-term technology partner. Each service has its own page with full details."
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

      <section className="section section--alt">
        <div className="container">
          <SectionHead split eyebrow="Products" title="Products we built." lead="Our own Phelix ERP, Scrap Management system and AI chatbots for WhatsApp and websites — ready to deploy and tailored to you." />
          <div className="products">
            {products.map(({ icon: Icon, tag, title, text, own }, i) => (
              <Link to={`/products#${slugify(title)}`} className="product reveal" key={title} style={{ '--d': `${(i % 3) * 90}ms` }}>
                <div className="product__top"><span className="product__tag">{own ? `Our product · ${tag}` : tag}</span><Icon size={26} strokeWidth={1.4} /></div>
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
          <SectionHead
            split
            eyebrow="Founders"
            title="Built by four founders who do the work."
            lead="Cloud, data, ERP and AI specialists who founded AFTR together — you work directly with us, not a layer of account managers."
          />
          <div className="founders">
            {team.map((m, i) => (
              <div className="founder reveal" key={m.name} style={{ '--d': `${i * 90}ms` }}>
                {m.photo
                  ? <img className="avatar avatar--photo" src={m.photo} alt={m.name} loading="lazy" />
                  : <span className="avatar">{initials(m.name)}</span>}
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

      <CTA />
    </>
  )
}
