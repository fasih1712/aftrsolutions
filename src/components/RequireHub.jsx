import { useEffect } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useHubSession } from '../hooks/useHubSession'

// Placeholder while a Hub page or the session loads. Also what protected pages prerender to.
export function HubLoader() {
  return (
    <section className="hub-loader">
      <h1 className="sr-only">Innovation Hub</h1>
      <span className="hub-loader__dot" aria-hidden="true" />
      <p role="status">Loading the Innovation Hub…</p>
    </section>
  )
}

export function HubMessage({ title, text, children }) {
  return (
    <section className="page-header hub-message">
      <div className="hero__glow" aria-hidden="true" />
      <div className="container page-header__inner">
        <p className="eyebrow">Innovation Hub</p>
        <h1 className="page-header__title">{title}</h1>
        {text && <p className="page-header__lead">{text}</p>}
        <div className="hero__cta">{children}</div>
      </div>
    </section>
  )
}

/** Renders children only for a signed-in, approved user (or admin); otherwise sends them to sign in. */
export default function RequireHub({ role = 'user', children }) {
  const { status, user, error, check } = useHubSession()
  const { pathname, search } = useLocation()

  useEffect(() => {
    if (status === 'idle') check()
  }, [status, check])

  if (status === 'in') {
    if (role === 'admin' && user.role !== 'admin') {
      return (
        <HubMessage title="This page is for admins." text="Your account can use every demo in the Hub, but not the admin panel.">
          <Link to="/hub/app" className="btn btn--primary">Back to the Hub</Link>
        </HubMessage>
      )
    }
    return children
  }
  if (status === 'out') return <Navigate to={`/hub/login?next=${encodeURIComponent(pathname + search)}`} replace />
  if (status === 'error') {
    return (
      <HubMessage title="We couldn’t load the Hub." text={error}>
        <button type="button" className="btn btn--primary" onClick={check}>Try again</button>
      </HubMessage>
    )
  }
  return <HubLoader />
}
