import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useHubSession } from '../../hooks/useHubSession'
import { hubFetch, safeNext } from '../../hooks/hubApi'
import { usePageTitle } from '../../hooks/usePageTitle'

export default function HubLogin() {
  usePageTitle()
  const [params] = useSearchParams()
  const next = safeNext(params.get('next'))
  const { status, check, signIn } = useHubSession()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (status === 'idle') check()
  }, [status, check])

  // Signed in (just now, or already): continue to the demo or page that sent them here.
  useEffect(() => {
    if (status !== 'in') return
    if (next?.startsWith('https://')) window.location.assign(next)
    else navigate(next || '/hub/app', { replace: true })
  }, [status, next, navigate])

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    const r = await hubFetch('/login', { method: 'POST', body: { ...form, next } })
    if (r.ok) {
      signIn(r.data.user)
      return
    }
    setError(r.data.error)
    setBusy(false)
  }

  return (
    <section className="section contact contact--page hub-auth">
      <div className="hero__glow" aria-hidden="true" />
      <div className="container contact__inner">
        <div className="contact__info">
          <p className="eyebrow">Innovation Hub</p>
          <h1 className="page-header__title page-header__title--left">Sign in to the Hub.</h1>
          <p className="section__lead">
            Explore live demos of our AI products. Access is by approval, so use the email you requested access with.
          </p>
          <p className="hub-auth__alt">
            No access yet? <Link to="/hub/request-access">Request access</Link>
          </p>
        </div>

        <form className="card contact__form" onSubmit={submit}>
          <label className="field">
            <span>Email</span>
            <input
              required type="email" value={form.email} onChange={update('email')}
              autoComplete="username" placeholder="you@company.com"
              aria-invalid={error ? true : undefined} aria-describedby="login-error"
            />
          </label>
          <label className="field">
            <span>Password</span>
            <input
              required type="password" value={form.password} onChange={update('password')}
              autoComplete="current-password"
              aria-invalid={error ? true : undefined} aria-describedby="login-error"
            />
          </label>
          <div id="login-error" className="form-alert" role="alert">{error}</div>
          <button type="submit" className="btn btn--primary btn--block" disabled={busy}>
            {busy ? 'Signing in…' : <>Sign in <ArrowRight size={16} /></>}
          </button>
          <p className="form-note">
            Forgot your password? <Link to="/contact?service=Products">Contact us</Link> and we’ll reset it for you.
          </p>
        </form>
      </div>
    </section>
  )
}
