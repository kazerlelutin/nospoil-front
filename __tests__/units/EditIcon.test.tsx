import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/preact'
import { EditIcon } from '@/components/EditIcon'

describe('EditIcon', () => {
  it('should render', () => {
    const { container } = render(<EditIcon />)
    expect(container).toMatchSnapshot()
  })
})
