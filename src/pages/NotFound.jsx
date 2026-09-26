import { Link } from 'react-router-dom'
import { PageHeader } from '../components/Common'
import { usePageTitle } from '../hooks/usePageTitle'

export default function NotFound() {
  usePageTitle('Page not found')
  return (
    <PageHeader eyebrow="404" title="This page doesn’t exist." lead="The link may be old or mistyped.">
      <div className="hero__cta reveal"><Link to="/" className="btn btn--primary">Back to home</Link></div>
    </PageHeader>
  )
}
