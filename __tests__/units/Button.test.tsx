import { render, screen } from '@testing-library/preact'
import { Button } from '@/components/Button'
import { describe, it, expect } from 'vitest'

describe('Button', () => {
  it('should render with the correct type', () => {
    render(<Button type="submit">Submit</Button>)
    const button = screen.getByText('Submit')
    expect(button).toHaveAttribute('type', 'submit')
  })

  it('should have the correct class names', () => {
    render(<Button type="reset">Reset</Button>)
    const button = screen.getByText('Reset')
    expect(button).toHaveClass(
      'disabled:opacity-50 border-solid border-1 border-dark-text text-dark-text bg-dark-bg rounded-sm px-2 py-1 cursor-pointer hover:bg-dark-text hover:text-dark-bg data-[type=reset]:border-white/20 data-[type=reset]:bg-white/5'
    )
  })

  it('should render correctly with various props', () => {
    const testCases = [
      { children: 'Click me', disabled: false, type: 'button' },
      { children: 'Submit', disabled: true, type: 'submit' },
      { children: 'Reset', disabled: false, type: 'reset' },
    ]

    testCases.forEach(({ children, disabled, type }) => {
      render(
        // @ts-ignore
        <Button type={type} disabled={disabled}>
          {children}
        </Button>
      )
      const button = screen.getByText(children)
      expect(button).toHaveAttribute('type', type)
      if (disabled) {
        expect(button).toBeDisabled()
      } else {
        expect(button).not.toBeDisabled()
      }
    })
  })
})
