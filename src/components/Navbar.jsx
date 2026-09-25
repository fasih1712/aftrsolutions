import { useEffect, useState } from 'react'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { LockupLogo } from './Logo'
import { nav } from '../data/site'

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

  const close = () => setOpen(false)

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="container nav__inner">
        <a href="#top" className="nav__brand" onClick={close} aria-label="AFTR Solutions home">
          <LockupLogo />
        </a>

        <nav className="nav__links" aria-label="Primary">
          {nav.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>

        <div className="nav__actions">
          <button
            className="icon-btn"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            title={theme === 'dark' ? 'Light theme' : 'Dark theme'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a href="#contact" className="btn btn--primary btn--sm nav__cta">Let’s talk</a>
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

      <div className="nav__mobile" hidden={!open}>
        {nav.map((l) => (
          <a key={l.href} href={l.href} onClick={close}>{l.label}</a>
        ))}
        <a href="#contact" className="btn btn--primary" onClick={close}>Let’s talk</a>
      </div>
    </header>
  )
}
