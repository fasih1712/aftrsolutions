import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, Copy } from 'lucide-react'
import { PageHeader } from '../../components/Common'
import RequireHub from '../../components/RequireHub'
import { getDemo } from '../../data/hub'
import { useHubSession } from '../../hooks/useHubSession'
import { hubFetch } from '../../hooks/hubApi'
import { usePageTitle } from '../../hooks/usePageTitle'
import { useReveal } from '../../hooks/useReveal'

const TABS = [
  { id: 'pending', label: 'Pending' },
  { id: 'approved', label: 'Approved' },
  { id: 'closed', label: 'Rejected and revoked' },
]
const ACTIONS = { pending: ['approve', 'reject'], approved: ['revoke', 'reset-password'], closed: ['approve'] }
const LABELS = { approve: 'Approve', reject: 'Reject', revoke: 'Revoke access', 'reset-password': 'Reset password' }
const DONE = { approve: 'approved', reject: 'rejected', revoke: 'revoked' }

const when = (iso) => (iso ? new Date(iso).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }) : 'Never')

function UserCard({ person, tab, isSelf, onAction }) {
  const [confirming, setConfirming] = useState(null)
  const [busy, setBusy] = useState(false)
  const confirmRef = useRef(null)
  const isAdmin = person.role === 'admin'
  const actions = isSelf ? [] : isAdmin ? ['reset-password'] : ACTIONS[tab] || []

  useEffect(() => {
    if (confirming) confirmRef.current?.focus()
  }, [confirming])

  const run = async () => {
    setBusy(true)
    await onAction(person, confirming)
    setBusy(false)
    setConfirming(null)
  }

  return (
    <li className="card hub-user">
      <div className="hub-user__head">
        <div>
          <h3>{person.name}</h3>
          <a href={`mailto:${person.email}`}>{person.email}</a>
        </div>
        <span className={`hub-badge hub-badge--${person.status}`}>{isAdmin ? 'Admin' : person.status}</span>
      </div>
      <dl className="hub-user__meta">
        <div><dt>Company</dt><dd>{person.company || 'Not given'}</dd></div>
        {person.phone && <div><dt>Phone</dt><dd><a href={`tel:${person.phone.replace(/\s/g, '')}`}>{person.phone}</a></dd></div>}
        <div><dt>Requested</dt><dd>{when(person.created_at)}</dd></div>
        {person.approved_at && <div><dt>Approved</dt><dd>{when(person.approved_at)}{person.approved_by_name ? ` by ${person.approved_by_name}` : ''}</dd></div>}
        <div><dt>Last sign-in</dt><dd>{when(person.last_login_at)}</dd></div>
        <div><dt>Demos opened</dt><dd>{person.demo_opens}</dd></div>
      </dl>
      {person.reason && <p className="hub-user__reason"><strong>Wants to try:</strong> {person.reason}</p>}
      {actions.length > 0 && (
        <div className="hub-user__actions">
          {confirming ? (
            <>
              <span className="hub-user__confirm">{LABELS[confirming]} for {person.name}?</span>
              <button ref={confirmRef} type="button" className="btn btn--primary btn--sm" onClick={run} disabled={busy}>
                {busy ? 'Working…' : `Yes, ${LABELS[confirming].toLowerCase()}`}
              </button>
              <button type="button" className="btn btn--ghost btn--sm" onClick={() => setConfirming(null)} disabled={busy}>Cancel</button>
            </>
          ) : (
            actions.map((a, i) => (
              <button key={a} type="button" className={`btn btn--sm ${i === 0 ? 'btn--primary' : 'btn--ghost'}`} onClick={() => setConfirming(a)}>
                {LABELS[a]}
              </button>
            ))
          )}
        </div>
      )}
    </li>
  )
}

function AdminPanel() {
  const { user, expire } = useHubSession()
  useReveal(useLocation().pathname)
  const [tab, setTab] = useState('pending')
  const [users, setUsers] = useState(null)
  const [stats, setStats] = useState(null)
  const [error, setError] = useState('')
  const [announce, setAnnounce] = useState('')
  const [temp, setTemp] = useState(null)
  const tabRefs = useRef({})

  const [version, setVersion] = useState(0)
  const load = useCallback(() => setVersion((v) => v + 1), [])

  useEffect(() => {
    let current = true
    Promise.all([hubFetch(`/admin/users?status=${tab}`), hubFetch('/admin/stats')]).then(([u, s]) => {
      if (!current) return
      if (u.status === 401 || s.status === 401) return expire()
      if (!u.ok || !s.ok) return setError(u.data.error || s.data.error)
      setError('')
      setUsers(u.data.users)
      setStats(s.data)
    })
    return () => { current = false }
  }, [tab, version, expire])

  const onAction = async (person, action) => {
    const r = await hubFetch(`/admin/users/${person.id}/${action}`, { method: 'POST', body: {} })
    if (r.status === 401) return expire()
    if (!r.ok) return setAnnounce(r.data.error)
    if (action === 'reset-password') {
      setTemp({ name: person.name, email: person.email, password: r.data.password })
      setAnnounce(`Password reset for ${person.name}. The temporary password is shown above the list.`)
    } else {
      setAnnounce(`${person.name} has been ${DONE[action]}.`)
    }
    load()
  }

  const selectTab = (id) => {
    setTab(id)
    setUsers(null)
    setTemp(null)
  }

  // Arrow keys move between tabs (WAI-ARIA tabs pattern).
  const onTabKey = (e) => {
    const i = TABS.findIndex((t) => t.id === tab)
    const next = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: TABS.length - 1 }[e.key]
    if (next === undefined) return
    e.preventDefault()
    const id = TABS[(next + TABS.length) % TABS.length].id
    selectTab(id)
    tabRefs.current[id]?.focus()
  }

  const counts = stats ? { pending: stats.users.pending, approved: stats.users.approved, closed: stats.users.rejected + stats.users.revoked } : {}

  return (
    <>
      <PageHeader eyebrow="Innovation Hub" title="Admin" lead="Review access requests, manage who can use the demos and see what people are trying.">
        <div className="hero__cta reveal">
          <Link to="/hub/app" className="btn btn--ghost"><ArrowLeft size={18} /> Back to the Hub</Link>
        </div>
      </PageHeader>

      <section className="section section--tight">
        <div className="container">
          {stats && (
            <dl className="hub-stats">
              <div><dt>Pending requests</dt><dd>{stats.users.pending}</dd></div>
              <div><dt>Approved users</dt><dd>{stats.users.approved}</dd></div>
              <div><dt>Demos opened, last 7 days</dt><dd>{stats.demoOpens.last7Days}</dd></div>
              <div><dt>Demos opened, all time</dt><dd>{stats.demoOpens.total}</dd></div>
            </dl>
          )}

          <div role="status" aria-live="polite" className="form-note hub-announce">{announce}</div>
          {error && <p className="form-alert" role="alert">{error}</p>}

          <h2 className="hub-section-title">Access requests</h2>
          <div className="hub-tabs" role="tablist" aria-label="Users by status" onKeyDown={onTabKey}>
            {TABS.map((t) => (
              <button
                key={t.id}
                ref={(el) => { tabRefs.current[t.id] = el }}
                type="button"
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={tab === t.id}
                aria-controls="hub-tabpanel"
                tabIndex={tab === t.id ? 0 : -1}
                className="hub-tabs__tab"
                onClick={() => selectTab(t.id)}
              >
                {t.label}{counts[t.id] !== undefined && <span className="hub-tabs__count">{counts[t.id]}</span>}
              </button>
            ))}
          </div>

          <div id="hub-tabpanel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="hub-tabpanel">
            {temp && (
              <div className="card hub-temp" role="note">
                <p>Temporary password for <strong>{temp.name}</strong> ({temp.email}). Share it privately; it won’t be shown again. They should change it on their Account page after signing in.</p>
                <div className="hub-temp__row">
                  <code>{temp.password}</code>
                  <button type="button" className="btn btn--ghost btn--sm" onClick={() => navigator.clipboard?.writeText(temp.password).then(() => setAnnounce('Password copied.'))}>
                    Copy <Copy size={14} />
                  </button>
                  <button type="button" className="btn btn--ghost btn--sm" onClick={() => setTemp(null)}>Done</button>
                </div>
              </div>
            )}
            {users === null ? (
              <p className="form-note">Loading…</p>
            ) : users.length === 0 ? (
              <p className="hub-empty">Nothing here right now.</p>
            ) : (
              <ul className="hub-users">
                {users.map((p) => <UserCard key={`${p.id}-${p.status}`} person={p} tab={tab} isSelf={p.email === user.email} onAction={onAction} />)}
              </ul>
            )}
          </div>

          <h2 className="hub-section-title">Recent demo activity</h2>
          {stats?.recent.length ? (
            <div className="hub-table-wrap" tabIndex={0} role="region" aria-label="Recent demo activity">
              <table className="hub-table">
                <thead><tr><th scope="col">When</th><th scope="col">Who</th><th scope="col">Company</th><th scope="col">Demo</th></tr></thead>
                <tbody>
                  {stats.recent.map((r, i) => (
                    <tr key={`${r.at}-${i}`}>
                      <td>{when(r.at)}</td>
                      <td>{r.name}<small>{r.email}</small></td>
                      <td>{r.company || 'Not given'}</td>
                      <td>{getDemo(r.demo_slug)?.product || r.demo_slug}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="hub-empty">{stats ? 'No demos have been opened yet.' : 'Loading…'}</p>
          )}
        </div>
      </section>
    </>
  )
}

export default function HubAdmin() {
  usePageTitle()
  return <RequireHub role="admin"><AdminPanel /></RequireHub>
}
