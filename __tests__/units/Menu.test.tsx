import { render, screen, fireEvent } from '@testing-library/preact'
import { Menu } from '@/components/Menu'
import { describe, it, expect, vi } from 'vitest'

// Mock i18n
vi.mock('@/utils/i18n', () => ({
  i18n: {
    t: vi.fn((key) => key),
  },
}))

describe('Menu', () => {
  it('should render the menu links', () => {
    render(<Menu />)
    expect(screen.getByText('home')).toBeInTheDocument()
  })

  it('should call handleClick when a link is clicked', () => {
    render(<Menu />)
    const link = screen.getByText('home')
    fireEvent.click(link)
    expect(
      document.querySelector('[data-menu]')?.getAttribute('data-menu')
    ).toBe('false')
  })

  it('should render the "buyMeACoffee" link', () => {
    render(<Menu />)
    expect(screen.getByText('buyMeACoffee')).toBeInTheDocument()
  })
})
