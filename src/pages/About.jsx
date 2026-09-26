import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { PageHeader, SectionHead, CTA, LinkedInIcon } from '../components/Common'
import { team, values } from '../data/about'
import { photoFor } from '../data/teamPhotos'
import { services } from '../data/services'
import { initials } from '../utils'
import { usePageTitle } from '../hooks/usePageTitle'

export default function About() {
  usePageTitle('About us')
  return (
    <>
      <PageHeader
        eyebrow="About AFTR"
        title="Four founders. Full stack. Real ownership."
        lead="AFTR Solutions was founded by four engineers who build and run technology for growing businesses, from AI agents and data platforms to the cloud they run on."
      />

      <section className="section section--tight">
        <div className="container story">
          <div className="story__num reveal">
            <strong>4</strong>
            <span>co-founders, one team</span>
          </div>
          <div className="story__text reveal" style={{ '--d': '100ms' }}>
            <p>
              We started AFTR because businesses kept telling us the same thing: they had one agency for
              their website, another for the cloud, a freelancer for automation, and nobody who owned the
              whole picture. When something broke, everyone pointed somewhere else.
            </p>
            <p>
              So the four of us founded a company that covers the full stack. Between us we bring hands-on
              experience in cloud and DevOps on AWS, Azure and Alibaba Cloud, Kubernetes, Python, data
              engineering and Power BI, LLMs and AI automation, ERP consulting, web and app development,
              and enterprise IT infrastructure.
            </p>
            <p>
              We are deliberately small. You work directly with the engineers building your system, with no
              layers of account managers, no hand-offs to strangers. We stay involved after launch, because
              we would rather build things that keep working than things that just ship.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <SectionHead eyebrow="Founders" title="The people behind AFTR." lead="All four of us are co-founders, and all four of us work directly on client projects." />
          <div className="team">
            {team.map((m, i) => (
              <article className="member reveal" key={m.name} style={{ '--d': `${i * 90}ms` }}>
                <div className="member__photo">
                  {photoFor(m.name) ? <img src={photoFor(m.name)} alt={m.name} loading="lazy" /> : <span>{initials(m.name)}</span>}
                </div>
                <h3>{m.name}</h3>
                <p className="member__role">{m.role}</p>
                <p className="member__bio">{m.bio}</p>
                <ul className="member__skills">{m.skills.map((k) => <li key={k}>{k}</li>)}</ul>
                <a className="member__link" href={m.linkedin} target="_blank" rel="noreferrer" aria-label={`${m.name} on LinkedIn`}>
                  <LinkedInIcon /> LinkedIn
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead split eyebrow="What we do" title="Six services, one partner." lead="Every engagement draws on the whole team, so your AI, data, software and infrastructure are designed to work together." />
          <div className="svc-list">
            {services.map((s, i) => {
              const Icon = s.icon
              return (
                <Link to={`/services/${s.slug}`} className="svc-list__item reveal" key={s.slug} style={{ '--d': `${i * 60}ms` }}>
                  <span className="svc-list__n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="svc-list__icon"><Icon size={22} strokeWidth={1.6} /></span>
                  <span className="svc-list__title">{s.title}{s.subtitle && <small> · {s.subtitle}</small>}</span>
                  <span className="svc-list__text">{s.short}</span>
                  <ArrowUpRight className="svc-list__arrow" size={20} />
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container why">
          <div className="why__intro reveal">
            <p className="eyebrow">Why AFTR</p>
            <h2 className="section__title">Built on engineering discipline.</h2>
            <p className="section__lead">The principles we bring to every project, big or small.</p>
          </div>
          <div className="why__list">
            {values.map(({ icon: Icon, title, text }, i) => (
              <div className="why__item reveal" key={title} style={{ '--d': `${i * 80}ms` }}>
                <div className="why__icon"><Icon size={20} strokeWidth={1.6} /></div>
                <div><h3>{title}</h3><p>{text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA title="Work with us." />
    </>
  )
}
