import { useCallback, useEffect, useMemo, useState } from 'react'
import { HubSessionContext } from '../hooks/useHubSession'
import { hubFetch, hubHinted, rememberHub } from '../hooks/hubApi'

// Holds the Innovation Hub session for the whole app (navbar + Hub pages).
// Only browsers that signed in before ask the server on load; Hub pages check on demand.
export default function HubSessionProvider({ children }) {
  // Prerendering has no storage, so this is always 'idle' there.
  const [state, setState] = useState(() => ({ status: hubHinted() ? 'loading' : 'idle', user: null, error: '' }))

  // Applies a /api/hub/me response.
  const apply = useCallback((r) => {
    if (r.ok) {
      rememberHub(true)
      setState({ status: 'in', user: r.data, error: '' })
    } else if (r.status === 401) {
      rememberHub(false)
      setState({ status: 'out', user: null, error: '' })
    } else {
      setState({ status: 'error', user: null, error: r.data.error })
    }
  }, [])

  useEffect(() => {
    if (hubHinted()) hubFetch('/me').then(apply)
  }, [apply])

  const check = useCallback(() => {
    setState((s) => (s.status === 'in' ? s : { status: 'loading', user: null, error: '' }))
    return hubFetch('/me').then(apply)
  }, [apply])

  const signIn = useCallback((user) => {
    rememberHub(true)
    setState({ status: 'in', user, error: '' })
  }, [])

  const expire = useCallback(() => {
    rememberHub(false)
    setState({ status: 'out', user: null, error: '' })
  }, [])

  const signOut = useCallback(async () => {
    await hubFetch('/logout', { method: 'POST', body: {} })
    expire()
  }, [expire])

  const value = useMemo(() => ({ ...state, check, signIn, signOut, expire }), [state, check, signIn, signOut, expire])
  return <HubSessionContext.Provider value={value}>{children}</HubSessionContext.Provider>
}
