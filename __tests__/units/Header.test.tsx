import { Header } from '@/components/Header'
import { render } from '@testing-library/preact'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'

describe('Header', () => {
  it('should render the header', async () => {
    const { container } = render(<Header />)
    expect(container.textContent).toContain('breadcrumb')
    expect(await axe(container.innerHTML)).toHaveNoViolations()
  })
})
