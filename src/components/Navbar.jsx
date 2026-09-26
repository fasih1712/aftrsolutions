import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Moon, Sun, Menu, X, ChevronDown, ArrowRight } from 'lucide-react'
import { LockupLogo } from './Logo'
import { nav } from '../data/site'
import { services } from '../data/services'

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

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
              <div className="nav__item nav__item--menu" key={l.to}>
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
              <NavLink key={l.to} to={l.to} className="nav__link">{l.label}</NavLink>
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
        {nav.filter((l) => !l.hasMenu).map((l) => (
          <NavLink key={l.to} to={l.to}>{l.label}</NavLink>
        ))}
        <Link to="/contact" className="btn btn--primary">Let’s talk</Link>
      </div>
    </header>
  )
}
