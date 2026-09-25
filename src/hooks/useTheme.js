import { useCallback, useEffect, useState } from 'react'

const KEY = 'aftr-theme'

function initial() {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.getAttribute('data-theme') || 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState(initial)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    const meta = document.querySelectorAll('meta[name="theme-color"]')
    meta.forEach((m) => m.setAttribute('content', theme === 'dark' ? '#0a0b0e' : '#ffffff'))
    try { localStorage.setItem(KEY, theme) } catch { /* storage unavailable */ }
  }, [theme])

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])
  return { theme, toggle }
}
