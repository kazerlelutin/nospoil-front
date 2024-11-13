import { Hamburger } from '@/components/Hamburger'
import { LS_KEYS } from '@/utils/constants'
import { fireEvent, render } from '@testing-library/preact'
import { describe, expect, it } from 'vitest'

describe('Hamburger', () => {
  it('initializes menu state based on localStorage', () => {
    localStorage.setItem(LS_KEYS.MENU_OPEN, 'true')

    const main = document.createElement('main')
    main.setAttribute('data-menu', 'true')
    document.body.appendChild(main)

    const { container } = render(<Hamburger />)
    const button = container.querySelector('button')

    expect(main.getAttribute('data-menu')).toBe('true')

    fireEvent.click(button!)
    expect(localStorage.getItem(LS_KEYS.MENU_OPEN)).toBe('false')
    expect(main.getAttribute('data-menu')).toBe('false')
  })
})
