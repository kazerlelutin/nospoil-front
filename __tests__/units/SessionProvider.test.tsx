import { cleanup, render, screen, waitFor } from '@testing-library/preact'
import { SessionProvider, useSession } from '@/providers/session'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { supabase } from '@/utils/supabase'

// Mock des dépendances
vi.mock('@/utils/supabase', () => ({
  supabase: {
    auth: {
      getSession: vi.fn().mockResolvedValue({
        data: { session: { user: { id: '1', email: 'test@example.com' } } },
      }),
      onAuthStateChange: vi.fn(() => ({
        data: {
          subscription: {
            unsubscribe: vi.fn(),
          },
        },
      })),
    },
  },
}))

describe('SessionProvider', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('should provide the correct session context value', async () => {
    const TestComponent = () => {
      const session = useSession()
      return (
        <div>
          <span>{session?.user?.email}</span>
        </div>
      )
    }

    render(
      <SessionProvider>
        <TestComponent />
      </SessionProvider>
    )

    expect(await screen.findByText('test@example.com')).toBeInTheDocument()
  })

  it('should update session context on auth state change', async () => {
    const TestComponent = () => {
      const session = useSession()
      return (
        <div>
          <span>{session?.user?.email}</span>
        </div>
      )
    }

    const { rerender } = render(
      <SessionProvider>
        <TestComponent />
      </SessionProvider>
    )

    // Simulate auth state change
    const newSession = { user: { id: '2', email: 'new@example.com' } }
    // @ts-ignore
    supabase.auth.onAuthStateChange.mock.calls[0][0]('SIGNED_IN', newSession)

    rerender(
      <SessionProvider>
        <TestComponent />
      </SessionProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('new@example.com')).toBeInTheDocument()
    })
  })
})
