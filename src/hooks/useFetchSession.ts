import { useEffect, useState } from 'preact/hooks'
import { supabase } from '@/utils/supabase'
import { Session } from '@supabase/supabase-js'

type AppSession = Session & { start?: boolean }

export function useFetchSession() {
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
  }, [])

  return {
    session,
    setSession,
  }
}
