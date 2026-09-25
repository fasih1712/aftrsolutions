import fullLight from '../assets/logo-full-light.png'
import fullDark from '../assets/logo-full-dark.png'
import lockLight from '../assets/logo-lockup-light.png'
import lockDark from '../assets/logo-lockup-dark.png'

// Both theme versions are rendered; CSS shows the one matching the active theme.
export function FullLogo({ className = '' }) {
  return (
    <span className={`logo-swap ${className}`}>
      <img src={fullLight} alt="AFTR Solutions" className="for-light" />
      <img src={fullDark} alt="" aria-hidden="true" className="for-dark" />
    </span>
  )
}

export function LockupLogo({ className = '' }) {
  return (
    <span className={`logo-swap ${className}`}>
      <img src={lockLight} alt="AFTR Solutions" className="for-light" />
      <img src={lockDark} alt="" aria-hidden="true" className="for-dark" />
    </span>
  )
}
