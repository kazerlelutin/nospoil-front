import { useAuthRedirect } from '@/hooks/useAuthRedirect'
import { Route, RouteProps } from 'preact-iso'
import { JSX } from 'preact/jsx-runtime'

//SOLID
export function AuthRoute(props: RouteProps<JSX.Element>) {
  useAuthRedirect()

  return <Route {...props} />
}
