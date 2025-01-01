import { render, screen } from '@testing-library/preact'
import { OtpStep } from '@/components/OtpStep'
import { describe, it, expect, vi } from 'vitest'

// Mock des dépendances
vi.mock('@/utils/i18n', () => ({
  i18n: {
    t: vi.fn((key) => key),
  },
}))

vi.mock('@/components/OtpInputs', () => ({
  OtpInputs: ({ email }) => <div>OtpInputs for {email}</div>,
}))

describe('OtpStep', () => {
  const email = 'test@example.com'
  const error = false

  it('should render the OTP input fields', () => {
    render(<OtpStep email={email} error={error} />)

    expect(screen.getByText('otpCodeEnter')).toBeInTheDocument()
    expect(screen.getByText(`OtpInputs for ${email}`)).toBeInTheDocument()
  })

  it('should render error message when error occurs', () => {
    render(<OtpStep email={email} error={true} />)

    expect(screen.getByText('AErrorHasOccured')).toBeInTheDocument()
  })
})
