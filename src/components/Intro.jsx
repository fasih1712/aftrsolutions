import { useEffect, useState } from 'react'
import markLight from '../assets/intro/mark-light.png'
import markDark from '../assets/intro/mark-dark.png'
import wordLight from '../assets/intro/word-light.png'
import wordDark from '../assets/intro/word-dark.png'
import tagLight from '../assets/intro/tag-light.png'
import tagDark from '../assets/intro/tag-dark.png'

const KEY = 'aftr-intro-seen'
const DURATION = 3000 // ms before the curtain lifts

function shouldPlay() {
  try {
    return sessionStorage.getItem(KEY) !== '1'
  } catch {
    return true
  }
}

/**
 * Opening animation: the A mark builds up from the base with a metallic shine,
 * the AFTR wordmark wipes in, SOLUTIONS settles, then the curtain lifts.
 * Plays once per browser session.
 */
export default function Intro({ theme }) {
  const [phase, setPhase] = useState(() => (shouldPlay() ? 'play' : 'done'))

  useEffect(() => {
    if (phase === 'done') {
      document.documentElement.classList.remove('intro-active')
      return
    }
    document.documentElement.classList.add('intro-active')
    document.body.style.overflow = 'hidden'
    const t1 = setTimeout(() => setPhase('exit'), DURATION)
    const t2 = setTimeout(() => finish(), DURATION + 900)
    return () => { clearTimeout(t1); clearTimeout(t2) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function finish() {
    try { sessionStorage.setItem(KEY, '1') } catch { /* ignore */ }
    document.body.style.overflow = ''
    document.documentElement.classList.remove('intro-active')
    setPhase('done')
  }

  if (phase === 'done') return null

  const dark = theme === 'dark'
  const mark = dark ? markDark : markLight

  return (
    <div className={`intro ${phase === 'exit' ? 'intro--exit' : ''}`} aria-hidden="true">
      <div className="intro__grid" />
      <div className="intro__stage">
        <div className="intro__mark">
          <img src={mark} alt="" />
          <span className="intro__shine" style={{ WebkitMaskImage: `url(${mark})`, maskImage: `url(${mark})` }} />
        </div>
        <span className="intro__line" />
        <img className="intro__word" src={dark ? wordDark : wordLight} alt="" />
        <img className="intro__tag" src={dark ? tagDark : tagLight} alt="" />
      </div>
      <div className="intro__progress"><span /></div>
      <button className="intro__skip" onClick={finish} aria-hidden="false">Skip</button>
    </div>
  )
}
