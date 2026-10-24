import { Link } from 'react-router-dom'
import { ArrowRight, ArrowDown, ArrowUpRight, Search, Sparkles, MousePointerClick, BarChart3 } from 'lucide-react'
import { FullLogo } from '../components/Logo'
import ServiceCard from '../components/ServiceCard'
import { SectionHead, CTA, TechMarquee, LinkedInIcon } from '../components/Common'
import { services } from '../data/services'
import { products } from '../data/products'
import { team } from '../data/about'
import { photoFor } from '../data/teamPhotos'
import { initials, slugify } from '../utils'
import { technologies } from '../data/site'
import { usePageTitle } from '../hooks/usePageTitle'
import Counter from '../components/Counter'

const ownProducts = products.filter((p) => p.own)

const growthPillars = [
  { icon: Search, title: 'Get found', text: 'SEO and Google Business Profile that put you in front of buyers searching right now.' },
  { icon: Sparkles, title: 'Get noticed', text: 'Social content and paid campaigns built around a brand people remember.' },
  { icon: MousePointerClick, title: 'Get leads', text: 'Landing pages and offers designed, built and tested by our own developers.' },
  { icon: BarChart3, title: 'Get results', text: 'Tracking, automation and reporting that show exactly what every channel returns.' },
]

export default function Home() {
  usePageTitle()
  return (
    <>
      <section className="hero">
        <div className="hero__glow" aria-hidden="true" />
        <div className="hero__grid" aria-hidden="true" />
        <div className="container hero__inner">
          <div className="hero__logo reveal"><FullLogo /></div>
          <p className="eyebrow reveal">AI · Software · Marketing</p>
          <h1 className="hero__title reveal">
            AI-powered technology,<br className="br-desktop" /> built for what comes next.
          </h1>
          <p className="hero__lead reveal">
            We design, build and grow the technology modern businesses depend on: AI, cloud, software and
            digital marketing, delivered by one accountable team.
          </p>
          <div className="hero__cta reveal">
            <Link to="/contact" className="btn btn--primary">Start a project <ArrowRight size={18} /></Link>
            <Link to="/about" className="btn btn--ghost">About us</Link>
          </div>
        </div>
        <a href="#about" className="hero__scroll" aria-label="Scroll down"><ArrowDown size={18} /></a>
      </section>

      <section className="section" id="about">
        <div className="container">
          <div className="who">
            <div className="who__head reveal">
              <p className="eyebrow">Who we are</p>
              <h2 className="section__title">Your technology partner, from the first idea to everyday operations.</h2>
            </div>
            <div className="who__text reveal" style={{ '--d': '100ms' }}>
              <p>
                AFTR Solutions is an AI-first technology company from Karachi, founded by four engineers.
                We help businesses put AI to real use: chatbots that answer customers on WhatsApp and the web,
                agents that take over repetitive work, and analytics that turn data into decisions. Around
                that we build the websites, apps and ERP systems, cloud and DevOps, and IT infrastructure
                that everything runs on, and the digital marketing that brings customers to it.
              </p>
              <p>
                You don’t need a separate agency for the website, another for the servers and a freelancer
                for automation. You get one team that understands the whole picture, answers for all of it,
                and stays with you after launch.
              </p>
              <div className="who__actions">
                <Link to="/about" className="btn btn--primary">About us <ArrowRight size={18} /></Link>
                <Link to="/services" className="btn btn--ghost">Our services</Link>
              </div>
            </div>
          </div>
          <div className="facts">
            {[
              { n: 50, suffix: '+', label: 'Projects delivered' },
              { n: team.length, label: 'Co-founders, hands-on in every project' },
              { n: services.length, label: 'Services under one roof' },
              { n: ownProducts.length, label: 'In-house products, including Phelix ERP' },
              { n: technologies.length, suffix: '+', label: 'Technologies and platforms' },
            ].map((f, i) => (
              <div className="fact reveal" key={f.label} style={{ '--d': `${i * 80}ms` }}>
                <strong><Counter to={f.n} suffix={f.suffix} /></strong>
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TechMarquee />

      <section className="section">
        <div className="container">
          <SectionHead
            split
            eyebrow="Services we provide"
            title="AI first. Seven services, one team."
            lead="AI sits at the centre of what we do, backed by the data, cloud and software skills to make it work in the real world. Each service has its own page with full details."
          />
          <div className="scards">
            {services.map((s, i) => <ServiceCard key={s.slug} service={s} index={i} />)}
          </div>
          <Link to="/contact" className="help-strip reveal">
            <span><strong>Not sure what you need?</strong> Tell us the problem and we’ll recommend the right mix of services.</span>
            <span className="help-strip__cta">Talk to us <ArrowUpRight size={16} /></span>
          </Link>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <SectionHead
            split
            eyebrow="Digital marketing"
            title="Engineered for growth."
            lead="Most agencies stop at the ad. We build the whole journey: the campaign, the landing page, the tracking and the follow-up, so more of your traffic turns into customers."
          />
          <div className="usecases usecases--four">
            {growthPillars.map(({ icon: Icon, title, text }, i) => (
              <div className="usecase growth-pillar reveal" key={title} style={{ '--d': `${i * 80}ms` }}>
                <span className="growth-pillar__icon" aria-hidden="true"><Icon size={20} strokeWidth={1.6} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <div className="founders__more reveal">
            <Link to="/services/digital-marketing" className="btn btn--primary">Explore digital marketing <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>

      <section className="statement">
        <div className="container">
          <p className="statement__text reveal">
            One partner. <span>From the first line of code</span> to the servers it runs on,{' '}
            <span>the data behind it, and the intelligence built into it.</span>
          </p>
          <div className="statement__pillars">
            <div className="reveal"><strong>Intelligence</strong><span>AI chatbots, agents and models that take routine work off your team.</span></div>
            <div className="reveal" style={{ '--d': '100ms' }}><strong>Data</strong><span>Pipelines, analysis and dashboards that give you one source of truth.</span></div>
            <div className="reveal" style={{ '--d': '200ms' }}><strong>Software</strong><span>Websites, apps and ERP systems engineered for the people who use them.</span></div>
            <div className="reveal" style={{ '--d': '300ms' }}><strong>Infrastructure</strong><span>Cloud, on-prem and hybrid platforms that stay fast and secure.</span></div>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <SectionHead split eyebrow="Products" title="AI products and business software." lead="AI chatbots for WhatsApp and websites, plus our own Phelix ERP and Scrap Management system. Ready to deploy and tailored to you." />
          <div className="products products--four">
            {ownProducts.map(({ icon: Icon, tag, title, text }, i) => (
              <Link to={`/products#${slugify(title)}`} className="product reveal" key={title} style={{ '--d': `${i * 90}ms` }}>
                <div className="product__top"><span className="product__tag">{tag}</span><Icon className="product__icon" size={28} strokeWidth={1.4} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
                <span className="product__link">Learn more <ArrowUpRight size={16} /></span>
              </Link>
            ))}
          </div>
          <div className="founders__more reveal">
            <Link to="/products" className="btn btn--ghost">View all products <ArrowRight size={18} /></Link>
          </div>
          <div className="hub-teaser reveal">
            <div className="cta__glow" aria-hidden="true" />
            <div className="hub-teaser__text">
              <p className="eyebrow">Innovation Hub</p>
              <h2>Try our products before you talk to us.</h2>
              <p>Request access to live demos of our AI products. Deployed, working and ready to explore.</p>
            </div>
            <Link to="/hub" className="btn btn--invert">Visit the Innovation Hub <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            split
            eyebrow="Founders"
            title="Four founders who do the work themselves."
            lead="Cloud, data, ERP and AI specialists who started AFTR together. You work directly with us, never through a chain of account managers."
          />
          <div className="founders">
            {team.map((m, i) => (
              <div className="founder reveal" key={m.name} style={{ '--d': `${i * 90}ms` }}>
                {photoFor(m.name)
                  ? <img className="avatar avatar--photo" src={photoFor(m.name)} alt={`${m.name}, ${m.role}`} loading="lazy" />
                  : <span className="avatar" aria-hidden="true">{initials(m.name)}</span>}
                <h3>{m.name}</h3>
                <p className="founder__role">{m.role.replace('Co-founder · ', '')}</p>
                <p className="founder__text">{m.short}</p>
                <ul className="member__skills">{m.skills.slice(0, 4).map((k) => <li key={k}>{k}</li>)}</ul>
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
