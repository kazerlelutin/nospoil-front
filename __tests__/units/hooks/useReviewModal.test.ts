import { useReviewModal } from '@/hooks/useReviewModal'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useSession } from '@/providers/session'
import { useMedia } from '@/hooks/useMedia'
import { http, HttpResponse } from 'msw'
import { renderHook, waitFor } from '@testing-library/preact'
import { server } from '../setupTests'
import { title } from 'process'

// Mock des dépendances
vi.mock('@/providers/session', () => ({
  useSession: vi.fn(),
}))

vi.mock('@/hooks/useMedia', () => ({
  useMedia: vi.fn(),
}))

describe('useReviewModal', () => {
  const session = { user: { id: 'user1' } }
  const media = { id: '1', title: 'Test Movie', name: 'Test Movie' }
  const watchlist = {
    id: '1',
    tmdb_id: '1',
    current_episode: 1,
    current_season: 1,
    status: 'watching',
  }

  beforeEach(() => {
    // @ts-ignore
    useSession.mockReturnValue(session)
    // @ts-ignore
    useMedia.mockReturnValue({ watchlist, media })
  })

  it('should fetch review state', async () => {
    const { result } = renderHook(() =>
      useReviewModal({ id: '1', type: 'movie', page: 1, callback: vi.fn() })
    )

    await waitFor(() => {
      expect(result.current.initValue).toEqual(
        expect.objectContaining({
          id: 1,
          content: 'Great movie!',
          rating: 'good',
          profiles: { username: 'user1', avatar: '', id: '1' },
        })
      )
      expect(result.current.rating).toBe('good')
      expect(result.current.loading).toBe(false)
    })
  })

  it('should save review', async () => {
    const { result } = renderHook(() =>
      useReviewModal({ id: '1', type: 'movie', page: 1, callback: vi.fn() })
    )

    await waitFor(() => {
      result.current.setReview('Amazing movie!')
      result.current.setRating('excellent')
    })

    await waitFor(async () => {
      await result.current.save(vi.fn())
    })

    await waitFor(() => {
      expect(result.current.initValue).toEqual(
        expect.objectContaining({
          id: 1,
          content: 'Great movie!',
          rating: 'good',
          profiles: { username: 'user1', avatar: '', id: '1' },
        })
      )
      expect(result.current.rating).toBe('good')
    })
  })

  it('should handle fetch error', async () => {
    server.use(
      http.get(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/posts`, () => {
        return new HttpResponse('Fetch error', {
          statusText: 'Fetch error',
          status: 500,
        })
      })
    )

    const { result } = renderHook(() =>
      useReviewModal({ id: '1', type: 'movie', page: 1, callback: vi.fn() })
    )

    await waitFor(() => {
      expect(result.current.error).toBe('Fetch error')
      expect(result.current.loading).toBe(false)
    })
  })

  it('should open modal and insert into watchlist if not exists', async () => {
    const newWatchlist = {
      id: null,
      tmdb_id: '1',
      current_episode: 1,
      current_season: 1,
      status: 'not_seen',
    }
    // @ts-ignore
    useMedia.mockReturnValue({ watchlist: newWatchlist, media })

    const { result } = renderHook(() =>
      useReviewModal({ id: '1', type: 'movie', page: 1, callback: vi.fn() })
    )

    const openCb = vi.fn()
    await waitFor(async () => {
      await result.current.openModal(openCb)
    })

    await waitFor(() => {
      expect(openCb).toHaveBeenCalled()
      expect(result.current.loading).toBe(false)
    })
  })

  it('should open modal and insert TV into watchlist if not exists', async () => {
    const newWatchlist = {
      id: null,
      tmdb_id: '1',
      current_episode: 1,
      current_season: 1,
      status: 'not_seen',
    }
    // @ts-ignore
    useMedia.mockReturnValue({
      watchlist: newWatchlist,
      media: {
        ...media,
        title: 'Test TV Show',
      },
    })

    const { result } = renderHook(() =>
      useReviewModal({ id: '1', type: 'tv', page: 1, callback: vi.fn() })
    )

    const openCb = vi.fn()
    await waitFor(async () => {
      await result.current.openModal(openCb)
    })

    await waitFor(() => {
      expect(openCb).toHaveBeenCalled()

      expect(result.current.loading).toBe(false)
    })
  })
})
