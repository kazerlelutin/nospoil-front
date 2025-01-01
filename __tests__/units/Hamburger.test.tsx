import { render, screen, fireEvent } from '@testing-library/preact'
import { Hamburger } from '@/components/Hamburger'
import { describe, it, expect } from 'vitest'

describe('Hamburger', () => {
  it('should toggle the menu state on click', () => {
    document.body.innerHTML = '<nav data-menu="false"></nav>'

    render(<Hamburger />)

    const button = screen.getByRole('button', { name: /menu/i })
    const nav = document.querySelector('[data-menu]')

    // Initial state
    expect(nav?.getAttribute('data-menu')).toBe('false')

    // Click to open menu
    fireEvent.click(button)
    expect(nav?.getAttribute('data-menu')).toBe('true')

    // Click to close menu
    fireEvent.click(button)
    expect(nav?.getAttribute('data-menu')).toBe('false')
  })
})
