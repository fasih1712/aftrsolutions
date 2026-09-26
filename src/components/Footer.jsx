import { Link } from 'react-router-dom'
import { LockupLogo } from './Logo'
import { site } from '../data/site'
import { services } from '../data/services'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <LockupLogo />
          <p>AI automation, cloud, development and managed infrastructure for businesses that plan to grow.</p>
        </div>
        <div>
          <h4>Services</h4>
          <ul>{services.map((s) => <li key={s.slug}><Link to={`/services/${s.slug}`}>{s.title}</Link></li>)}</ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4>Get in touch</h4>
          <ul>
            <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li>{site.location}</li>
            <li>
              {site.social.linkedin && <><a href={site.social.linkedin} target="_blank" rel="noreferrer">LinkedIn</a> · </>}
              <a href={site.social.github} target="_blank" rel="noreferrer">GitHub</a>
            </li>
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
