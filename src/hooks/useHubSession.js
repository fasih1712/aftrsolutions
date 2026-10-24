import { createContext, useContext } from 'react'

// Filled by components/HubSessionProvider.jsx.
// status: 'idle' (not checked yet) | 'loading' | 'in' | 'out' | 'error'
export const HubSessionContext = createContext({
  status: 'idle',
  user: null,
  error: '',
  check: () => {},
  signIn: () => {},
  signOut: async () => {},
  expire: () => {},
})

/** The signed-in Hub user ({ name, email, role }) and helpers to check, sign in and sign out. */
export function useHubSession() {
  return useContext(HubSessionContext)
}
