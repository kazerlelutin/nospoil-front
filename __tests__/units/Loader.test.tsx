import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/preact'
import { Loader } from '@/components/Loader'

describe('Loader', () => {
  it('should render', () => {
    const { container } = render(<Loader />)
    expect(container).toMatchSnapshot()
  })
})
