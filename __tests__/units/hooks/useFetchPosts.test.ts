import { useFetchPosts } from '@/hooks/useFetchPosts'
import { renderHook, waitFor } from '@testing-library/preact'
import { describe, it, expect } from 'vitest'
import { server } from '../setupTests'
import { http, HttpResponse } from 'msw'

describe('useFetchPosts', () => {
  it('should fetch and set posts', async () => {
    const { result } = renderHook(() => useFetchPosts())

    expect(result.current.loading).toBe(true)
    expect(result.current.posts).toEqual([])

    await waitFor(async () => {
      await result.current.fetchPosts(1)
    })

    await waitFor(async () => {
      expect(result.current.loading).toBe(false)
      expect(result.current.posts).toEqual(
        expect.objectContaining([
          {
            id: 1,
            user_id: 'user1',
            username: 'User 1',
            avatar: '/avatar1.png',
            type: 'movie',
            media_id: 1,
            title: 'Movie 1',
            poster_path: '/poster1.jpg',
            updated_at: '2022-01-01T00:00:00Z',
            content: null,
            media_state: 'planned',
            current_episode: null,
            current_season: null,
            wcurrent_episode: null,
            wcurrent_season: null,
            rating: 5,
            status: 'completed',
            hide: false,
          },
        ])
      )
    })
  })

  it('should have total page', async () => {
    const { result } = renderHook(() => useFetchPosts())

    await result.current.fetchPosts(1)

    await waitFor(async () => {
      expect(result.current.loading).toBe(false)

      expect(result.current.totalPages).toEqual(7)
    })
  })

  it('should handle fetch error', async () => {
    server.use(
      http.get(
        /v1\/enriched_posts$/,
        () =>
          new HttpResponse('Fetch error', {
            status: 500,
            statusText: 'Fetch error',
          })
      )
    )

    const { result } = renderHook(() => useFetchPosts())

    await result.current.fetchPosts(1)

    await waitFor(async () => {
      expect(result.current.loading).toBe(false)

      expect(result.current.posts).toEqual([])
    })
  })
})
