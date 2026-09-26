import { useEffect } from 'react'

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — AFTR Solutions` : 'AFTR Solutions — AI, Cloud & Engineering'
  }, [title])
}
