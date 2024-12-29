import { render, screen, fireEvent, cleanup } from '@testing-library/preact'
import { Button } from '@/components/Button'
import { describe, it, expect, vi, afterEach } from 'vitest'
import * as fc from 'fast-check'

describe('Button', () => {
  afterEach(cleanup)

  it('should render with the correct children', () => {
    render(<Button>Click Me</Button>)

    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })

  it('should call onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click Me</Button>)

    fireEvent.click(screen.getByText('Click Me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when the disabled prop is true', () => {
    render(<Button disabled>Click Me</Button>)

    const button = screen.getByText('Click Me')
    expect(button).toBeDisabled()
  })

  it('should have the correct type attribute', () => {
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
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }),
        fc.boolean(),
        fc.oneof(
          fc.constant('button'),
          fc.constant('submit'),
          fc.constant('reset')
        ),
        (children, disabled, type) => {
          //Fast-check run the multiple test cases
          cleanup()
          render(
            <Button
              disabled={disabled}
              type={type as 'button' | 'submit' | 'reset'}
            >
              {children}
            </Button>
          )
          const button = screen.getByText(children.trim())

          expect(button.innerText)

          expect(button).toHaveAttribute('type', type)

          if (disabled) {
            expect(button).toBeDisabled()
          } else {
            expect(button).not.toBeDisabled()
          }
        }
      )
    )
  })
})
