import { useEffect } from 'preact/hooks'
import { useLocation } from 'preact-iso'
import { useSession } from '@/providers/session'

export function useAuthRedirect() {
  const session = useSession()
  const { route } = useLocation()

  useEffect(() => {
    if (!session?.start && !session.user?.id) {
      route('/login')
    }
  }, [session, route])
}
