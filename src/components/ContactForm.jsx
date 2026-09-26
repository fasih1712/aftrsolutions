import { useState } from 'react'
import { Send } from 'lucide-react'
import { site } from '../data/site'
import { services } from '../data/services'

export default function ContactForm({ defaultService = '' }) {
  const [form, setForm] = useState({ name: '', email: '', company: '', service: defaultService, message: '' })
  const [sent, setSent] = useState(false)

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  // No backend yet: opens the visitor's email client with the enquiry pre-filled.
  // Swap this for Formspree / an API endpoint when ready.
  const submit = (e) => {
    e.preventDefault()
    const subject = `Project enquiry: ${form.name}${form.company ? ` (${form.company})` : ''}`
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.company && `Company: ${form.company}`,
      form.service && `Interested in: ${form.service}`,
      '',
      form.message,
    ].filter((l) => l !== false).join('\n')
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <form className="card contact__form reveal" onSubmit={submit} style={{ '--d': '100ms' }}>
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
      <button type="submit" className="btn btn--primary btn--block">
        Send message <Send size={16} />
      </button>
      {sent && (
        <p className="form-note">
          Your email app should open with the message ready to send. If it didn’t, email us directly at{' '}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      )}
    </form>
  )
}
