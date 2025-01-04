import { render, screen, fireEvent } from '@testing-library/preact'
import { Spoiler } from '@/components/Spoiler'
import { describe, it, expect } from 'vitest'

describe('Spoiler', () => {
  it('should render children when not hidden initially', () => {
    render(
      <Spoiler initialHidden={false}>
        <div>Visible Content</div>
      </Spoiler>
    )
    expect(screen.getByText('Visible Content')).toBeInTheDocument()
  })

  it('should render fake content when hidden initially', () => {
    render(
      <Spoiler initialHidden={true} fake={<div>Fake Content</div>}>
        <div>Real Content</div>
      </Spoiler>
    )
    expect(screen.getByText('Fake Content')).toBeInTheDocument()
    expect(screen.queryByText('Real Content')).not.toBeInTheDocument()
  })

  it('should toggle content visibility on click', () => {
    render(
      <Spoiler initialHidden={true} fake={<div>Fake Content</div>}>
        <div>Real Content</div>
      </Spoiler>
    )
    const spoilerElement = screen.getByText('Fake Content').parentElement
    fireEvent.click(spoilerElement)
    expect(screen.getByText('Real Content')).toBeInTheDocument()
    expect(screen.queryByText('Fake Content')).not.toBeInTheDocument()
  })

  it('should render children when no fake content is provided', () => {
    render(
      <Spoiler initialHidden={true}>
        <div>Real Content</div>
      </Spoiler>
    )
    expect(screen.getByText('Real Content')).toBeInTheDocument()
  })
})
