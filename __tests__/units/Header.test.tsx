import { render, screen } from '@testing-library/preact'
import { Header } from '@/components/Header'
import { describe, it, expect, vi } from 'vitest'

vi.mock('@/components/Hamburger', () => ({
  Hamburger: () => <div>Hamburger</div>,
}))
vi.mock('@/components/Logo', () => ({
  Logo: () => <div>Logo</div>,
}))
vi.mock('@/components/Profile', () => ({
  Profile: () => <div>Profile</div>,
}))

describe('Header', () => {
  it('should render the Hamburger component', () => {
    render(<Header />)
    expect(screen.getByText('Hamburger')).toBeInTheDocument()
  })

  it('should render the Logo component', () => {
    render(<Header />)
    expect(screen.getByText('Logo')).toBeInTheDocument()
  })

  it('should render the Profile component', () => {
    render(<Header />)
    expect(screen.getByText('Profile')).toBeInTheDocument()
  })
})
