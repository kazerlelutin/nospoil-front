import { useEffect } from 'preact/hooks'
import { supabase } from '@/utils/supabase'
import { Session } from '@supabase/supabase-js'

export function useAuthStateChange(setSession: (session: Session) => void) {
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession)
      }
    )

    return () => {
      sub.subscription.unsubscribe()
    }
  }, [])
}
