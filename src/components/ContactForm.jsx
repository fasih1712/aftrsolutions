import { useState } from 'react'
import { Send, CheckCircle2 } from 'lucide-react'
import { site } from '../data/site'
import { services } from '../data/services'

const EMPTY = { name: '', email: '', company: '', service: '', message: '' }

export default function ContactForm({ defaultService = '' }) {
  const [form, setForm] = useState({ ...EMPTY, service: defaultService })
  // idle | sending | sent | error | mailto
  const [status, setStatus] = useState('idle')

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const subject = `Project enquiry: ${form.name}${form.company ? ` (${form.company})` : ''}`

  // Without a Web3Forms key, open the visitor's email client with the enquiry pre-filled.
  const openMail = () => {
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.company && `Company: ${form.company}`,
      form.service && `Interested in: ${form.service}`,
      '',
      form.message,
    ].filter((l) => l !== false).join('\n')
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!site.formKey) {
      openMail()
      setStatus('mailto')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: site.formKey,
          subject,
          from_name: 'AFTR Solutions website',
          replyto: form.email,
          name: form.name,
          email: form.email,
          company: form.company || '-',
          service: form.service || '-',
          message: form.message,
          botcheck: new FormData(e.currentTarget).get('botcheck') || '',
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.success) throw new Error(data.message)
      setStatus('sent')
      setForm({ ...EMPTY })
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="card contact__form contact__done" role="status">
        <CheckCircle2 size={40} strokeWidth={1.4} aria-hidden="true" />
        <h2>Thanks, your message is on its way.</h2>
        <p>We’ll reply within one business day. If it’s urgent, email us at <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
        <button type="button" className="btn btn--ghost" onClick={() => setStatus('idle')}>Send another message</button>
      </div>
    )
  }

  return (
    <form className="card contact__form reveal" onSubmit={submit} style={{ '--d': '100ms' }}>
      {/* honeypot: people never see or fill this, bots usually do */}
      <input type="checkbox" name="botcheck" className="sr-only" tabIndex={-1} aria-hidden="true" autoComplete="off" />
      <div className="field-row">
        <label className="field">
          <span>Name</span>
          <input required value={form.name} onChange={update('name')} placeholder="Your name" autoComplete="name" />
        </label>
        <label className="field">
          <span>Email</span>
          <input required type="email" value={form.email} onChange={update('email')} placeholder="you@company.com" autoComplete="email" />
        </label>
      </div>
      <div className="field-row">
        <label className="field">
          <span>Company</span>
          <input value={form.company} onChange={update('company')} placeholder="Optional" autoComplete="organization" />
        </label>
        <label className="field">
          <span>Interested in</span>
          <select value={form.service} onChange={update('service')}>
            <option value="">Select a service</option>
            {services.map((s) => <option key={s.slug}>{s.title}</option>)}
            <option>Products</option>
            <option>Something else</option>
          </select>
        </label>
      </div>
      <label className="field">
        <span>Project details</span>
        <textarea required rows={5} value={form.message} onChange={update('message')} placeholder="What are you looking to build or improve?" />
      </label>
      <button type="submit" className="btn btn--primary btn--block" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : <>Send message <Send size={16} /></>}
      </button>
      <div role="status" aria-live="polite">
        {status === 'mailto' && (
          <p className="form-note">
            Your email app should open with the message ready to send. If it didn’t, email us directly at{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        )}
        {status === 'error' && (
          <p className="form-note">
            Sorry, the message couldn’t be sent. Please try again, or email us directly at{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        )}
      </div>
    </form>
  )
}
