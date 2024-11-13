import { cleanup, render } from '@testing-library/preact'
import { axe } from 'vitest-axe'
import { afterEach, describe, expect, it } from 'vitest'
import { Title } from '@/ui/Title'
import fc from 'fast-check'

describe('Title Component', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders the title correctly', () => {
    fc.assert(
      fc.property(fc.string(), (title) => {
        const { container } = render(<Title title={title} />)
        expect(container.textContent).toEqual(title)
      })
    )
  })

  it.each([1, 2, 3, 4, 5, 6])(
    'renders correctly with size %s',
    async (size: (typeof Title)['arguments']['size']) => {
      const title = `Header Size ${size}`
      const { container } = render(<Title title={title} size={size} />)
      const heading = container.querySelector(`h${size}`)
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent(title)
      const results = await axe(container)

      expect(results).toHaveNoViolations()
    }
  )
})
