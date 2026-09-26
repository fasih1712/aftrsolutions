import { useEffect, useRef, useState } from 'react'

// Counts up from 0 to `to` every time it scrolls into view, and resets when it leaves.
export default function Counter({ to, suffix = '', duration = 1600 }) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let frame
    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame)
      if (!entry.isIntersecting) {
        setValue(0)
        return
      }
      const start = performance.now()
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1)
        setValue(Math.round(to * (1 - Math.pow(1 - t, 3))))
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => { observer.disconnect(); cancelAnimationFrame(frame) }
  }, [to, duration])

  return <span ref={ref} aria-label={`${to}${suffix}`}>{value}{suffix}</span>
}
