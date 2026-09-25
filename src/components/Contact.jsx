import { useState } from 'react'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { site, services } from '../data/site'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' })
  const [sent, setSent] = useState(false)

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  // No backend yet: opens the visitor's email client with the enquiry pre-filled.
  // Swap this for Formspree / an API endpoint when ready.
  const submit = (e) => {
    e.preventDefault()
    const subject = `Project enquiry — ${form.name}${form.company ? ` (${form.company})` : ''}`
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
    <section className="section contact" id="contact">
      <div className="container contact__inner">
        <div className="contact__info reveal">
          <p className="eyebrow">Contact</p>
          <h2 className="section__title">Let’s build what’s next.</h2>
          <p className="section__lead">
            Tell us about your project. We’ll get back within one business day with next steps.
          </p>
          <ul className="contact__list">
            <li><Mail size={18} /> <a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li><Phone size={18} /> <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a></li>
            <li><MapPin size={18} /> {site.location}</li>
          </ul>
        </div>

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
                {services.map((s) => <option key={s.title}>{s.title}</option>)}
                <option>AI Products</option>
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
          {sent && <p className="form-note">Your email app should open with the message ready to send.</p>}
        </form>
      </div>
    </section>
  )
}
