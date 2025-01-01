import { render, screen, fireEvent } from '@testing-library/preact'
import { Login } from '@/pages/Auth'
import { describe, it, expect, vi } from 'vitest'
import { i18n } from '@/utils/i18n'

// Mock des dépendances
vi.mock('@/utils/i18n', () => ({
  i18n: {
    t: vi.fn((key) => key),
  },
}))

vi.mock('@/utils/supabase', () => ({
  supabase: {
    auth: {
      signInWithOtp: vi.fn().mockResolvedValue({ error: null }),
    },
  },
}))

vi.mock('@/components/Logo', () => ({
  Logo: () => <div>Logo Component</div>,
}))

vi.mock('@/components/EmailStep', () => ({
  EmailStep: ({ email, setEmail, handleSubmit }) => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onInput={(e) => setEmail(e.currentTarget.value)}
        placeholder="Email"
      />
      <button type="submit">Submit</button>
    </form>
  ),
}))

vi.mock('@/components/OtpStep', () => ({
  OtpStep: ({ email, error }) => <div>OtpStep Component</div>,
}))

describe('Login', () => {
  it('should render the Logo component and title', () => {
    //@ts-ignore
    i18n.t.mockReturnValueOnce('logOtp')

    render(<Login />)

    expect(screen.getByText('Logo Component')).toBeInTheDocument()
    expect(screen.getByText('logOtp')).toBeInTheDocument()
  })

  it('should render the EmailStep component initially', () => {
    render(<Login />)

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
  })

  it('should render the OtpStep component after email submission', async () => {
    render(<Login />)

    fireEvent.input(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.submit(screen.getByText('Submit'))

    expect(await screen.findByText('OtpStep Component')).toBeInTheDocument()
  })
})
