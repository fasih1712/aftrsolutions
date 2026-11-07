import { useId, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

// A password field with a show / hide toggle. The label is tied to the input by id (not by
// wrapping), so the toggle button's text never becomes part of the input's accessible name.
export default function PasswordField({ label, ...inputProps }) {
  const id = useId()
  const [shown, setShown] = useState(false)
  return (
    <div className="field">
      <label htmlFor={id} className="field__label">{label}</label>
      <div className="pw-input">
        <input id={id} {...inputProps} type={shown ? 'text' : 'password'} autoCapitalize="none" autoCorrect="off" spellCheck={false} />
        <button
          type="button" className="pw-input__toggle" onClick={() => setShown((s) => !s)}
          aria-label={shown ? 'Hide password' : 'Show password'} aria-pressed={shown} aria-controls={id}
        >
          {shown ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
        </button>
      </div>
    </div>
  )
}
