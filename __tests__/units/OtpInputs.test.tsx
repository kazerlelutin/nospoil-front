import { render, screen, fireEvent, waitFor } from '@testing-library/preact'
import { OtpInputs } from '@/components/OtpInputs'
import { describe, it, expect, vi } from 'vitest'
import { supabase } from '@/utils/supabase'
import { useLocation } from 'preact-iso'

// Mock des dépendances
vi.mock('@/utils/supabase', () => ({
  supabase: {
    auth: {
      verifyOtp: vi.fn(),
    },
  },
}))

vi.mock('preact-iso', () => ({
  useLocation: vi.fn(),
}))

describe('OtpInputs', () => {
  const email = 'test@example.com'

  it('should render OTP inputs', () => {
    const routeMock = vi.fn()
    // @ts-ignore
    useLocation.mockReturnValue({ route: routeMock })
    render(<OtpInputs email={email} />)
    expect(screen.getAllByRole('textbox')).toHaveLength(6)
  })

  it('should update OTP state on input change', () => {
    render(<OtpInputs email={email} />)
    const inputs = screen.getAllByRole('textbox')
    fireEvent.input(inputs[0], { target: { value: '1' } })
    expect(inputs[0]).toHaveValue('1')
  })

  it('should submit OTP when all inputs are filled', async () => {
    const routeMock = vi.fn()
    // @ts-ignore
    useLocation.mockReturnValue({ route: routeMock })
    // @ts-ignore
    supabase.auth.verifyOtp.mockResolvedValue({ error: null })

    render(<OtpInputs email={email} />)
    const inputs = screen.getAllByRole('textbox')
    inputs.forEach((input, index) => {
      fireEvent.input(input, { target: { value: String(index + 1) } })
    })

    await waitFor(() => {
      expect(supabase.auth.verifyOtp).toHaveBeenCalledWith({
        email,
        token: '123456',
        type: 'email',
      })
      expect(routeMock).toHaveBeenCalledWith('/')
    })
  })

  it('should handle OTP verification error', async () => {
    const consoleLogMock = vi.spyOn(console, 'log').mockImplementation(() => {})
    // @ts-ignore
    supabase.auth.verifyOtp.mockResolvedValue({
      error: new Error('Invalid OTP'),
    })

    render(<OtpInputs email={email} />)
    const inputs = screen.getAllByRole('textbox')
    inputs.forEach((input, index) => {
      fireEvent.input(input, { target: { value: String(index + 1) } })
    })

    await waitFor(() => {
      expect(supabase.auth.verifyOtp).toHaveBeenCalledWith({
        email,
        token: '123456',
        type: 'email',
      })
      expect(consoleLogMock).toHaveBeenCalledWith(new Error('Invalid OTP'))
    })

    consoleLogMock.mockRestore()
  })

  it('should show loader while verifying OTP', async () => {
    supabase.auth.verifyOtp.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ error: null }), 100)
        )
    )

    render(<OtpInputs email={email} />)
    const inputs = screen.getAllByRole('textbox')
    inputs.forEach((input, index) => {
      fireEvent.input(input, { target: { value: String(index + 1) } })
    })

    expect(screen.getByText('Loading...')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })
  })
})
