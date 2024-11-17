import { useSession } from '@/providers/session'
import { Route, RouteProps, useLocation } from 'preact-iso'
import { useEffect } from 'preact/hooks'
import { JSX } from 'preact/jsx-runtime'

export function AuthRoute(props: RouteProps<JSX.Element>) {
  const session = useSession()
  const { route } = useLocation()

  useEffect(() => {
    if (!session?.start && !session.user?.id) return route('/login')
  }, [session])

  return <Route {...props} />
}
