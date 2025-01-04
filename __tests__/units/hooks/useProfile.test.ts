import { useProfile } from '@/hooks/useProfile'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useSession } from '@/providers/session'
import { renderHook, waitFor } from '@testing-library/preact'
import { server } from '../setupTests'
import { http, HttpResponse } from 'msw'

vi.mock('@/providers/session', () => ({
  useSession: vi.fn(),
}))

describe('useProfile', () => {
  const session = { user: { id: 'user1' } }

  beforeEach(() => {
    // @ts-ignore
    useSession.mockReturnValue(session)
    global.URL.createObjectURL = vi.fn(() => 'blob:mock-url')
  })

  it('should fetch profile', async () => {
    const { result } = renderHook(() => useProfile())

    await waitFor(() => {
      expect(result.current.profile).toEqual(
        expect.objectContaining({
          username: 'User 1',
          avatar: '/avatar1.png',
          id: 'user1',
        })
      )
      expect(result.current.isInit).toBe(true)
    })
  })

  it('should update profile', async () => {
    const { result } = renderHook(() => useProfile())

    await waitFor(() => {
      result.current.setProfile({
        ...result.current.profile,
        username: 'newuser',
      })
    })

    await waitFor(async () => {
      await result.current.updateProfile(result.current.profile, vi.fn())
    })

    expect(result.current.profile.username).toBe('newuser')
  })

  it('should handle username already exists error', async () => {
    server.use(
      http.get(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/profiles`, () => {
        return HttpResponse.json({ username: 'newuser' })
      })
    )

    const { result } = renderHook(() => useProfile())

    await waitFor(() => {
      result.current.setProfile({
        ...result.current.profile,
        username: 'newuser',
      })
    })

    await waitFor(async () => {
      await result.current.updateProfile(result.current.profile, vi.fn())
    })

    await waitFor(() => {
      expect(result.current.alreadyExist).toBe(true)
    })
  })

  it('should update avatar', async () => {
    const { result } = renderHook(() => useProfile())

    const file = new File(['avatar'], 'avatar.png', { type: 'image/png' })
    const event = { target: { files: [file] } }

    await waitFor(async () => {
      await result.current.updateAvatar(event, vi.fn())
    })
    await waitFor(async () => {
      expect(result.current.profile.avatar).toBe('/avatar1.png')
    })
  })

  it('should update avatar should is error', async () => {
    server.use(
      http.patch(
        `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/profiles`,
        () => {
          return new HttpResponse('error', { status: 500 })
        }
      )
    )
    const { result } = renderHook(() => useProfile())

    const file = new File(['avatar'], 'avatar.png', { type: 'image/png' })
    const event = { target: { files: [file] } }

    await waitFor(async () => {
      await result.current.updateProfile(
        {
          ...result.current.profile,
          avatar: 'avatar2.png',
        },
        vi.fn()
      )
    })
    await waitFor(async () => {
      expect(result.current.profile.avatar).toBe('/avatar1.png')
    })
  })
})
