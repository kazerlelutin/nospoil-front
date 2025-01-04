import { useAuthRedirect } from '@/hooks/useAuthRedirect'
import { useSession } from '@/providers/session'
import { renderHook } from '@testing-library/preact'
import { describe } from 'node:test'
import { useLocation } from 'preact-iso'
import { expect, it, Mock, vi } from 'vitest'

vi.mock('@/providers/session')
vi.mock('preact-iso')

describe('useAuthRedirect', () => {
  it('should redirect to /login if user is not authenticated', () => {
    const mockRoute = vi.fn()
    ;(useSession as Mock).mockReturnValue({ start: false, user: null })
    ;(useLocation as Mock).mockReturnValue({ route: mockRoute })

    renderHook(() => useAuthRedirect())

    expect(mockRoute).toHaveBeenCalledWith('/login')
  })

  it('should not redirect if user is authenticated', () => {
    const mockRoute = vi.fn()
    ;(useSession as Mock).mockReturnValue({
      start: true,
      user: { id: '123' },
    })
    ;(useLocation as Mock).mockReturnValue({ route: mockRoute })

    renderHook(() => useAuthRedirect())

    expect(mockRoute).not.toHaveBeenCalled()
  })
})
