import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { hubFetch, firstName } from '../../hooks/hubApi'
import { usePageTitle } from '../../hooks/usePageTitle'

const EMPTY = { name: '', email: '', company: '', phone: '', reason: '', password: '', confirm: '', consent: false }
const MIN_PASSWORD = 10

export default function HubRequestAccess() {
  usePageTitle()
  const [form, setForm] = useState(EMPTY)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [doneName, setDoneName] = useState('')
  const doneRef = useRef(null)

  useEffect(() => {
    if (doneName) doneRef.current?.focus()
  }, [doneName])

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    if (form.password.length < MIN_PASSWORD) return setError(`Your password must be at least ${MIN_PASSWORD} characters.`)
    if (form.password !== form.confirm) return setError('The two passwords don’t match.')
    if (!form.consent) return setError('Please agree to the privacy policy to continue.')
    setBusy(true)
    setError('')
    const { confirm: _confirm, ...body } = form
    const r = await hubFetch('/signup', { method: 'POST', body })
    setBusy(false)
    if (!r.ok) return setError(r.data.error)
    setDoneName(firstName(form.name))
    setForm(EMPTY)
  }

  const invalid = (when) => (error && when ? true : undefined)

  return (
    <section className="section contact contact--page hub-auth">
      <div className="hero__glow" aria-hidden="true" />
      <div className="container contact__inner">
        <div className="contact__info">
          <p className="eyebrow">Innovation Hub</p>
          <h1 className="page-header__title page-header__title--left">Request access.</h1>
          <p className="section__lead">
            Tell us who you are and what you’d like to try. Our team reviews every request, usually within one
            business day, and you can sign in as soon as it’s approved.
          </p>
          <p className="hub-auth__alt">
            Already approved? <Link to="/hub/login">Sign in</Link>
          </p>
        </div>

        {doneName ? (
          <div className="card contact__form contact__done" role="status">
            <CheckCircle2 size={40} strokeWidth={1.4} aria-hidden="true" />
            <h2 ref={doneRef} tabIndex={-1}>Thanks, {doneName}. Your request is in.</h2>
            <p>We’ll review it shortly and you’ll be able to sign in as soon as it’s approved.</p>
            <Link to="/hub" className="btn btn--ghost">Back to the Innovation Hub</Link>
          </div>
        ) : (
          <form className="card contact__form" onSubmit={submit}>
            <div className="field-row">
              <label className="field">
                <span>Full name</span>
                <input required maxLength={100} value={form.name} onChange={update('name')} autoComplete="name" />
              </label>
              <label className="field">
                <span>Work email</span>
                <input required type="email" maxLength={254} value={form.email} onChange={update('email')} autoComplete="email" placeholder="you@company.com" />
              </label>
            </div>
            <div className="field-row">
              <label className="field">
                <span>Company</span>
                <input required maxLength={120} value={form.company} onChange={update('company')} autoComplete="organization" />
              </label>
              <label className="field">
                <span>Phone <small>(optional)</small></span>
                <input type="tel" maxLength={40} value={form.phone} onChange={update('phone')} autoComplete="tel" />
              </label>
            </div>
            <label className="field">
              <span>What would you like to try?</span>
              <textarea
                required rows={4} maxLength={1000} value={form.reason} onChange={update('reason')}
                placeholder="For example: a WhatsApp chatbot for our clinic, or forecasting for our stores."
              />
            </label>
            <div className="field-row">
              <label className="field">
                <span>Password</span>
                <input
                  required type="password" minLength={MIN_PASSWORD} maxLength={200} value={form.password} onChange={update('password')}
                  autoComplete="new-password" aria-describedby="pw-hint request-error"
                  aria-invalid={invalid(form.password.length < MIN_PASSWORD || form.password !== form.confirm)}
                />
              </label>
              <label className="field">
                <span>Confirm password</span>
                <input
                  required type="password" maxLength={200} value={form.confirm} onChange={update('confirm')}
                  autoComplete="new-password" aria-describedby="request-error"
                  aria-invalid={invalid(form.password !== form.confirm)}
                />
              </label>
            </div>
            <p id="pw-hint" className="field-hint">At least {MIN_PASSWORD} characters. A short phrase is easy to remember.</p>
            <label className="check">
              <input type="checkbox" required checked={form.consent} onChange={update('consent')} aria-describedby="request-error" />
              <span>
                I agree that AFTR Solutions may store these details to review my request and contact me about it, as
                described in the <Link to="/privacy">privacy policy</Link>.
              </span>
            </label>
            <div id="request-error" className="form-alert" role="alert">{error}</div>
            <button type="submit" className="btn btn--primary btn--block" disabled={busy}>
              {busy ? 'Sending…' : <>Request access <ArrowRight size={16} /></>}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
