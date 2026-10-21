import { Link } from 'react-router-dom'
import { PageHeader } from '../components/Common'
import { site } from '../data/site'
import { usePageTitle } from '../hooks/usePageTitle'

const UPDATED = '21 October 2026'

export default function Privacy() {
  usePageTitle('Privacy policy')
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy policy" lead={`Last updated ${UPDATED}.`} />
      <article className="article">
        <div className="article__body container">
          <p>
            This policy explains what information AFTR Solutions (“we”, “us”) collects through aftrsolutions.com
            and how we use it. We keep it short because we collect very little.
          </p>

          <h2>What we collect</h2>
          <ul>
            <li><strong>Contact form and email.</strong> Your name, email, company and message, only when you send them to us.</li>
            <li><strong>AI chat assistant.</strong> The messages you type into the chat, so the assistant can reply. Please don’t share passwords, payment details or other sensitive information in the chat.</li>
            <li><strong>Basic server logs.</strong> IP address, browser type and the pages requested, kept for a short time for security and to keep the site running.</li>
          </ul>
          <p>We don’t sell your information, and we don’t use advertising trackers on this site.</p>

          <h2>How we use it</h2>
          <ul>
            <li>To reply to your enquiry and discuss a possible project.</li>
            <li>To answer your questions through the chat assistant.</li>
            <li>To protect the site against abuse, such as spam and excessive automated requests.</li>
          </ul>

          <h2>Service providers</h2>
          <p>
            We use a small number of trusted providers to run this site: Amazon Web Services for hosting, and an AI
            model provider (currently Google Gemini) to generate chat replies. Chat messages are sent to that provider
            to produce an answer and are handled under its own terms, which may include using them to improve its
            services. If the contact form is enabled, submissions are delivered to our inbox through a form-delivery
            service.
          </p>

          <h2>Storage on your device</h2>
          <p>
            The site stores your theme choice (light or dark), whether you have seen the intro animation and your
            current chat conversation in your browser’s local and session storage. These are not cookies and are not
            used for tracking. You can clear them at any time in your browser settings.
          </p>

          <h2>How long we keep it</h2>
          <p>
            Enquiries are kept for as long as needed to respond and, if we work together, for the duration of the
            relationship. Chat conversations are not stored by us after the reply is sent.
          </p>

          <h2>Your choices</h2>
          <p>
            You can ask us to see, correct or delete the information you have sent us by emailing{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a>. Questions about this policy go to the same address,
            or use our <Link to="/contact">contact page</Link>.
          </p>
        </div>
      </article>
    </>
  )
}
