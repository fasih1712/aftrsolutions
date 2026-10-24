import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Moon, Sun, Menu, X, ChevronDown, ArrowRight } from 'lucide-react'
import { LockupLogo } from './Logo'
import HubUserMenu from './HubUserMenu'
import { useHubSession } from '../hooks/useHubSession'
import { firstName } from '../hooks/hubApi'
import { nav } from '../data/site'
import { services } from '../data/services'

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  // Hover keeps the mega menu open, so after a click we hide it until the pointer leaves.
  const [megaClosed, setMegaClosed] = useState(false)
  const { pathname } = useLocation()
  const hub = useHubSession()
  const navigate = useNavigate()

  const hubSignOut = () => {
    if (pathname.startsWith('/hub/')) navigate('/hub', { replace: true })
    hub.signOut()
  }

  useEffect(() => {
    setMegaClosed(true)
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="container nav__inner">
        <Link to="/" className="nav__brand" aria-label="AFTR Solutions home">
          <LockupLogo />
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {nav.map((l) =>
            l.hasMenu ? (
              <div
                className={`nav__item nav__item--menu ${megaClosed ? 'nav__item--closed' : ''}`}
                key={l.to}
                onMouseEnter={() => setMegaClosed(false)}
                onMouseLeave={() => setMegaClosed(false)}
              >
                <NavLink to={l.to} className="nav__link">
                  {l.label} <ChevronDown size={14} className="nav__chev" />
                </NavLink>
                <div className="mega">
                  <div className="mega__inner">
                    {services.map(({ slug, icon: Icon, title, short }) => (
                      <Link to={`/services/${slug}`} className="mega__item" key={slug}>
                        <span className="mega__icon"><Icon size={18} strokeWidth={1.7} /></span>
                        <span>
                          <strong>{title}</strong>
                          <small>{short}</small>
                        </span>
                      </Link>
                    ))}
                    <Link to="/services" className="mega__all">
                      All services <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <NavLink key={l.to} to={l.to} end={l.end} className="nav__link">{l.label}</NavLink>
            )
          )}
        </nav>

        <div className="nav__actions">
          <button
            className="icon-btn theme-btn"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            title={theme === 'dark' ? 'Light theme' : 'Dark theme'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <HubUserMenu />
          <Link to="/contact" className="btn btn--primary btn--sm nav__cta">Let’s talk</Link>
          <button
            className="icon-btn nav__burger"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div className="nav__mobile" hidden={!open} onClick={(e) => { if (e.target.closest('a')) setOpen(false) }}>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/services">Services</NavLink>
        <div className="nav__mobile-sub">
          {services.map((s) => (
            <Link key={s.slug} to={`/services/${s.slug}`}>{s.title}</Link>
          ))}
        </div>
        {nav.filter((l) => !l.hasMenu && l.to !== '/').map((l) => (
          <NavLink key={l.to} to={l.to}>{l.label}</NavLink>
        ))}
        {hub.status === 'in' && (
          <div className="nav__mobile-sub nav__mobile-hub">
            <p>Signed in as {firstName(hub.user.name)}</p>
            <Link to="/hub/app">Your demos</Link>
            <Link to="/hub/account">Account</Link>
            {hub.user.role === 'admin' && <Link to="/hub/admin">Admin</Link>}
            <button type="button" onClick={() => { setOpen(false); hubSignOut() }}>Sign out</button>
          </div>
        )}
        <Link to="/contact" className="btn btn--primary">Let’s talk</Link>
      </div>
    </header>
  )
}
