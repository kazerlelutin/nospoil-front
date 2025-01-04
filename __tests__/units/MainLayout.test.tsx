import { render, screen } from '@testing-library/preact'
import { MainLayout } from '@/components/MainLayout'
import { describe, it, expect, vi } from 'vitest'
import { useLocation } from 'preact-iso'

// Mock des dépendances
vi.mock('preact-iso', () => ({
  useLocation: vi.fn(),
}))

vi.mock('@/components/Header', () => ({
  Header: () => <div>Header</div>,
}))

vi.mock('@/components/Menu', () => ({
  Menu: () => <div>Menu</div>,
}))

vi.mock('@/providers/session', () => ({
  SessionProvider: ({ children }) => <div>{children}</div>,
}))

describe('MainLayout', () => {
  it('should render children directly if path starts with /login', () => {
    // @ts-ignore
    useLocation.mockReturnValue({ path: '/login' })

    render(
      <MainLayout>
        <div>Login Page</div>
      </MainLayout>
    )

    expect(screen.getByText('Login Page')).toBeInTheDocument()
    expect(screen.queryByText('Header')).not.toBeInTheDocument()
    expect(screen.queryByText('Menu')).not.toBeInTheDocument()
  })

  it('should render the layout with Header and Menu if path does not start with /login', () => {
    // @ts-ignore
    useLocation.mockReturnValue({ path: '/' })

    render(
      <MainLayout>
        <div>Home Page</div>
      </MainLayout>
    )

    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Menu')).toBeInTheDocument()
    expect(screen.getByText('Home Page')).toBeInTheDocument()
  })
})
