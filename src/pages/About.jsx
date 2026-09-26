import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { PageHeader, SectionHead, CTA } from '../components/Common'
import { team, values } from '../data/about'
import { services } from '../data/services'
import { initials } from '../utils'
import { usePageTitle } from '../hooks/usePageTitle'

export default function About() {
  usePageTitle('About us')
  return (
    <>
      <PageHeader
        eyebrow="About AFTR"
        title="Small team. Full stack. Real ownership."
        lead="AFTR Solutions is a team of four engineers who build and run technology for growing businesses — from AI agents to the cloud they run on."
      />

      <section className="section section--tight">
        <div className="container story">
          <div className="story__num reveal">
            <strong>4</strong>
            <span>specialists, one team</span>
          </div>
          <div className="story__text reveal" style={{ '--d': '100ms' }}>
            <p>
              We started AFTR because businesses kept telling us the same thing: they had one agency for
              their website, another for the cloud, a freelancer for automation — and nobody who owned the
              whole picture. When something broke, everyone pointed somewhere else.
            </p>
            <p>
              So we built a team that covers the full stack. Between the four of us we bring hands-on
              production experience in Kubernetes and CI/CD, multi-cloud platforms (with AWS and Alibaba
              Cloud certifications), AI and automation, web and app development, and enterprise IT
              infrastructure.
            </p>
            <p>
              We are deliberately small. You work directly with the engineers building your system — no
              layers of account managers, no hand-offs to strangers. We stay involved after launch, because
              we would rather build things that keep working than things that just ship.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <SectionHead eyebrow="Our team" title="The people behind AFTR." />
          <div className="team">
            {team.map((m, i) => (
              <article className="member reveal" key={i} style={{ '--d': `${i * 90}ms` }}>
                <div className="member__photo">
                  {m.photo ? <img src={m.photo} alt={m.name} /> : <span>{initials(m.name)}</span>}
                </div>
                <h3>{m.name}</h3>
                <p className="member__role">{m.role}</p>
                <p className="member__bio">{m.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead split eyebrow="What we do" title="Multiple services, one partner." lead="Every engagement draws on the whole team — so your AI, software and infrastructure are designed to work together." />
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
