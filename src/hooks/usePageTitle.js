import { useEffect } from 'react'

const DEFAULT_DESCRIPTION =
  'AFTR Solutions builds and runs modern technology — AI automation, cloud & DevOps, websites and apps, and managed infrastructure for growing businesses.'

export function usePageTitle(title, description) {
  useEffect(() => {
    document.title = title ? `${title} — AFTR Solutions` : 'AFTR Solutions — AI, Cloud & Engineering'
    document.querySelector('meta[name="description"]')?.setAttribute('content', description || DEFAULT_DESCRIPTION)
  }, [title, description])
}
