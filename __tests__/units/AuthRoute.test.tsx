import { render } from '@testing-library/preact'
import { AuthRoute } from '@/components/AuthRoute'
import { useAuthRedirect } from '@/hooks/useAuthRedirect'
import { vi, describe, it, expect } from 'vitest'

// Mock the useAuthRedirect hook
vi.mock('@/hooks/useAuthRedirect')
vi.mock('preact-iso', () => ({
  Route: ({ component: Component, ...props }) => <Component {...props} />,
}))

describe('AuthRoute', () => {
  it('should call useAuthRedirect', () => {
    render(
      <AuthRoute path="/protected" component={() => <div>Protected</div>} />
    )

    expect(useAuthRedirect).toHaveBeenCalled()
  })

  it('should render the Route component with the given props', () => {
    const { getByText } = render(
      <AuthRoute path="/protected" component={() => <div>Protected</div>} />
    )

    expect(getByText('Protected')).toBeInTheDocument()
  })
})
