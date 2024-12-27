import { describe, it, expect } from 'vitest'
import { cleanup, render } from '@testing-library/preact'
import { EditIcon } from '@/components/EditIcon'
import { afterEach } from 'node:test'

describe('EditIcon', () => {
  afterEach(cleanup)
  it('should render', () => {
    const { container } = render(<EditIcon />)
    expect(container).toMatchSnapshot()
  })
})
