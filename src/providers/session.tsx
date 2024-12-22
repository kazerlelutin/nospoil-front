import { supabase } from '@/utils/supabase'
import { Session } from '@supabase/supabase-js'
import { createContext } from 'preact'
import { useContext, useEffect, useState } from 'preact/hooks'

type AppSession = Session & { start?: boolean }
const SessionContext = createContext({} as AppSession)

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState<AppSession>({
    start: true,
  } as AppSession)

  const getSession = async () => {
    const {
      data: { session: distantSession },
    } = await supabase.auth.getSession()

    setSession({
      ...distantSession,
      start: false,
    })
  }

  useEffect(() => {
    getSession()

    // Listen to changes on auth state (logged in, signed out, etc.)
    const { data: sub } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession)
      }
    )

    return () => {
      sub.subscription.unsubscribe()
    }
  }, [])

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  )
}

export const useSession = () => {
  return useContext(SessionContext)
}
