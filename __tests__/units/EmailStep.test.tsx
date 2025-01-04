import { render, screen, fireEvent } from '@testing-library/preact'
import { EmailStep } from '@/components/EmailStep'
import { describe, it, expect, vi } from 'vitest'

// Mock des dépendances
vi.mock('@/utils/i18n', () => ({
  i18n: {
    t: vi.fn((key) => key),
  },
}))

describe('EmailStep', () => {
  const email = 'test@example.com'
  const setEmail = vi.fn()
  const handleSubmit = vi.fn()
  const resetEmail = vi.fn()
  const loading = false
  const error = false

  it('should render the email input', () => {
    render(
      <EmailStep
        email={email}
        setEmail={setEmail}
        handleSubmit={handleSubmit}
        resetEmail={resetEmail}
        loading={loading}
        error={error}
      />
    )

    expect(screen.getByLabelText('email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('emailPlaceholder')).toBeInTheDocument()
  })

  it('should call setEmail on input change', () => {
    render(
      <EmailStep
        email={email}
        setEmail={setEmail}
        handleSubmit={handleSubmit}
        resetEmail={resetEmail}
        loading={loading}
        error={error}
      />
    )

    fireEvent.input(screen.getByLabelText('email'), {
      target: { value: 'new@example.com' },
    })
    expect(setEmail).toHaveBeenCalledWith('new@example.com')
  })

  it('should call handleSubmit on form submit', () => {
    render(
      <EmailStep
        email={email}
        setEmail={setEmail}
        handleSubmit={handleSubmit}
        resetEmail={resetEmail}
        loading={loading}
        error={error}
      />
    )

    fireEvent.submit(screen.getByRole('form'))
    expect(handleSubmit).toHaveBeenCalled()
  })

  it('should call resetEmail on reset button click', () => {
    render(
      <EmailStep
        email={email}
        setEmail={setEmail}
        handleSubmit={handleSubmit}
        resetEmail={resetEmail}
        loading={loading}
        error={error}
      />
    )

    fireEvent.click(screen.getByText('reset'))
    expect(resetEmail).toHaveBeenCalled()
  })

  it('should render loader when loading', () => {
    render(
      <EmailStep
        email={email}
        setEmail={setEmail}
        handleSubmit={handleSubmit}
        resetEmail={resetEmail}
        loading={true}
        error={error}
      />
    )

    expect(screen.getByText('loading')).toBeInTheDocument()
  })

  it('should render error message when error occurs', () => {
    render(
      <EmailStep
        email={email}
        setEmail={setEmail}
        handleSubmit={handleSubmit}
        resetEmail={resetEmail}
        loading={loading}
        error={true}
      />
    )

    expect(screen.getByText('AErrorHasOccured')).toBeInTheDocument()
  })
})
