import { LockupLogo } from './Logo'
import { nav, services, site } from '../data/site'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <LockupLogo />
          <p>Cloud, DevOps, AI and software engineering for businesses that plan to grow.</p>
        </div>
        <div>
          <h4>Services</h4>
          <ul>{services.slice(0, 5).map((s) => <li key={s.title}><a href="#services">{s.title}</a></li>)}</ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>{nav.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}</ul>
        </div>
        <div>
          <h4>Get in touch</h4>
          <ul>
            <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li>{site.location}</li>
            <li><a href={site.social.linkedin}>LinkedIn</a> · <a href={site.social.github}>GitHub</a></li>
          </ul>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© {year} AFTR Solutions. All rights reserved.</span>
        <span>Engineered in Karachi.</span>
      </div>
    </footer>
  )
}
