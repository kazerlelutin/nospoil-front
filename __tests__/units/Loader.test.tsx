import { describe, it, expect, afterEach } from 'vitest'
import { cleanup, render } from '@testing-library/preact'
import { Loader } from '@/components/Loader'

describe('Loader', () => {
  afterEach(cleanup)
  it('should render', () => {
    const { container } = render(<Loader />)
    expect(container).toMatchSnapshot()
  })
})
