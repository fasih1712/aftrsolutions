import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { PageHeader } from '../../components/Common'
import RequireHub from '../../components/RequireHub'
import { useHubSession } from '../../hooks/useHubSession'
import { hubFetch } from '../../hooks/hubApi'
import { usePageTitle } from '../../hooks/usePageTitle'
import { useReveal } from '../../hooks/useReveal'

const EMPTY = { currentPassword: '', newPassword: '', confirm: '' }
const MIN_PASSWORD = 10

function AccountPage() {
  const { user, signOut, expire } = useHubSession()
  const navigate = useNavigate()
  useReveal(useLocation().pathname)
  const [form, setForm] = useState(EMPTY)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [busy, setBusy] = useState(false)

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    if (form.newPassword.length < MIN_PASSWORD) return setMessage({ type: 'error', text: `Your new password must be at least ${MIN_PASSWORD} characters.` })
    if (form.newPassword !== form.confirm) return setMessage({ type: 'error', text: 'The new passwords don’t match.' })
    setBusy(true)
    setMessage({ type: '', text: '' })
    const r = await hubFetch('/change-password', { method: 'POST', body: { currentPassword: form.currentPassword, newPassword: form.newPassword } })
    setBusy(false)
    if (r.status === 401) return expire()
    if (!r.ok) return setMessage({ type: 'error', text: r.data.error })
    setForm(EMPTY)
    setMessage({ type: 'ok', text: 'Your password has been changed. Any other devices have been signed out.' })
  }

  const leave = () => {
    navigate('/hub', { replace: true })
    signOut()
  }

  return (
    <>
      <PageHeader eyebrow="Innovation Hub" title="Your account" lead={`Signed in as ${user.email}.`}>
        <div className="hero__cta reveal">
          <button type="button" className="btn btn--ghost" onClick={leave}>Sign out <LogOut size={18} /></button>
        </div>
      </PageHeader>
      <section className="section section--tight">
        <div className="container hub-narrow">
          <form className="card contact__form reveal" onSubmit={submit}>
            <h2 className="hub-form__title">Change password</h2>
            <label className="field">
              <span>Current password</span>
              <input required type="password" value={form.currentPassword} onChange={update('currentPassword')} autoComplete="current-password" aria-describedby="account-message" />
            </label>
            <label className="field">
              <span>New password</span>
              <input required type="password" minLength={MIN_PASSWORD} maxLength={200} value={form.newPassword} onChange={update('newPassword')} autoComplete="new-password" aria-describedby="new-pw-hint account-message" />
            </label>
            <label className="field">
              <span>Confirm new password</span>
              <input required type="password" maxLength={200} value={form.confirm} onChange={update('confirm')} autoComplete="new-password" aria-describedby="account-message" />
            </label>
            <p id="new-pw-hint" className="field-hint">At least {MIN_PASSWORD} characters.</p>
            <div id="account-message" className="form-alert" role="alert">{message.type === 'error' ? message.text : ''}</div>
            <div className="form-alert form-alert--ok" role="status">{message.type === 'ok' ? message.text : ''}</div>
            <button type="submit" className="btn btn--primary btn--block" disabled={busy}>{busy ? 'Saving…' : 'Change password'}</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default function HubAccount() {
  usePageTitle()
  return <RequireHub><AccountPage /></RequireHub>
}
