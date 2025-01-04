import { render, screen } from '@testing-library/preact'
import { NotFound } from '@/pages/_404'
import { describe, it, expect, vi } from 'vitest'
import { i18n } from '@/utils/i18n'

vi.mock('@/utils/i18n', () => ({
  i18n: {
    t: vi.fn((key) => key),
  },
}))

vi.mock('@/components/Spoiler', () => ({
  Spoiler: ({ children }) => <div>{children}</div>,
}))

describe('NotFound', () => {
  it('should render the 404 title', () => {
    //@ts-ignore
    i18n.t.mockReturnValueOnce('404 Not Found')

    render(<NotFound />)

    expect(screen.getByText('404 Not Found')).toBeInTheDocument()
  })

  it('should render the 404 message inside Spoiler', () => {
    //@ts-ignore
    i18n.t.mockReturnValueOnce('404 Not Found')
    //@ts-ignore
    i18n.t.mockReturnValueOnce('The page you are looking for does not exist.')

    render(<NotFound />)

    expect(screen.getByText('404 Not Found')).toBeInTheDocument()
    expect(
      screen.getByText('The page you are looking for does not exist.')
    ).toBeInTheDocument()
  })
})
