import { describe, it, expect, afterEach } from 'vitest'
import { cleanup, render } from '@testing-library/preact'
import { EditIcon } from '@/components/EditIcon'

describe('EditIcon', () => {
  afterEach(cleanup)
  it('should render', () => {
    const { container } = render(<EditIcon />)
    expect(container).toMatchSnapshot()
  })
})
