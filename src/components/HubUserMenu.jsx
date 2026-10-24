import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { useHubSession } from '../hooks/useHubSession'
import { firstName } from '../hooks/hubApi'

// Navbar menu for a signed-in Innovation Hub user (desktop; the mobile menu lists the same links).
export default function HubUserMenu() {
  const { status, user, signOut } = useHubSession()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const buttonRef = useRef(null)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!open) return
    const onDown = (e) => { if (!ref.current?.contains(e.target)) setOpen(false) }
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (status !== 'in') return null

  const leave = () => {
    setOpen(false)
    if (pathname.startsWith('/hub/')) navigate('/hub', { replace: true })
    signOut()
  }

  return (
    <div className="hub-menu" ref={ref}>
      <button
        ref={buttonRef}
        type="button"
        className="hub-menu__btn"
        aria-expanded={open}
        aria-controls="hub-menu-list"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="hub-menu__avatar" aria-hidden="true">{firstName(user.name).charAt(0).toUpperCase()}</span>
        {firstName(user.name)}
        <span className="sr-only">, Innovation Hub account menu</span>
        <ChevronDown size={14} className="nav__chev" aria-hidden="true" />
      </button>
      <div id="hub-menu-list" className="hub-menu__list" hidden={!open} onClick={(e) => { if (e.target.closest('a')) setOpen(false) }}>
        <p className="hub-menu__who">{user.email}</p>
        <Link to="/hub/app">Innovation Hub</Link>
        <Link to="/hub/account">Account</Link>
        {user.role === 'admin' && <Link to="/hub/admin">Admin</Link>}
        <button type="button" onClick={leave}>Sign out</button>
      </div>
    </div>
  )
}
