import { describe, it, expect, afterEach } from 'vitest'
import { cleanup, render } from '@testing-library/preact'
import { Logo } from '@/components/Logo'

describe('Logo', () => {
  afterEach(cleanup)
  it('should render', () => {
    const { container } = render(<Logo />)
    expect(container).toMatchSnapshot()
  })
})
