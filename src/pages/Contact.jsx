import { Mail, MapPin, Phone } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import ContactForm from '../components/ContactForm'
import { site } from '../data/site'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Contact() {
  usePageTitle('Contact')
  const [params] = useSearchParams()
  return (
    <section className="section contact contact--page">
      <div className="hero__glow" aria-hidden="true" />
      <div className="container contact__inner">
        <div className="contact__info reveal">
          <p className="eyebrow">Contact</p>
          <h1 className="page-header__title page-header__title--left">Let’s build what’s next.</h1>
          <p className="section__lead">
            Tell us about your project. We’ll get back within one business day with next steps.
          </p>
          <ul className="contact__list">
            <li><Mail size={18} /> <a href={`mailto:${site.email}`}>{site.email}</a></li>
            {site.phone && <li><Phone size={18} /> <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a></li>}
            <li><MapPin size={18} /> {site.location}</li>
          </ul>
        </div>
        <ContactForm defaultService={params.get('service') || ''} />
      </div>
    </section>
  )
}
