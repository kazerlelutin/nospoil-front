import { createContext } from 'preact'
import { useContext } from 'preact/hooks'
import { useFetchSession } from '@/hooks/useFetchSession'
import { useAuthStateChange } from '@/hooks/useAuthStateChange'
import { Session } from '@supabase/supabase-js'

type AppSession = Session & { start?: boolean }
const SessionContext = createContext({} as AppSession)

export const SessionProvider = ({ children }) => {
  const { session, setSession } = useFetchSession()
  useAuthStateChange((newSession) => {
    setSession(newSession)
  })

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  )
}

export const useSession = () => {
  return useContext(SessionContext)
}
