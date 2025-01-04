import { render, screen, waitFor } from '@testing-library/preact'
import { Reviews } from '@/components/Reviews'
import { describe, it, expect, vi } from 'vitest'
import { http, HttpResponse } from 'msw'
import { useEffect } from 'preact/hooks'
import { server } from './setupTests'

vi.mock('@/utils/i18n', () => ({
  i18n: {
    t: vi.fn((key) => key),
  },
}))

vi.mock('@/providers/session', () => ({
  useSession: () => ({ user: { id: 'user1' } }),
}))

vi.mock('@/components/Pagination', () => ({
  Pagination: ({ onFetch }) => {
    useEffect(() => {
      onFetch()
    }, [])

    return <nav>Pagination</nav>
  },
}))

vi.mock('@/components/ReviewModal', () => ({
  ReviewModal: ({}) => <div>ReviewModal</div>,
}))

vi.mock('@/components/Review', () => ({
  Review: ({ review }) => <div>{review.content}</div>,
}))

vi.mock('@/hooks/useMedia', () => ({
  useMedia: vi.fn(() => ({
    watchlist: {
      status: 'watching',
      current_episode: 1,
      current_season: 1,
    },
  })),
}))

vi.mock('preact-iso', () => ({
  useRoute: vi.fn(() => ({
    params: { type: 'movie', id: '1' },
  })),
  lazy: vi.fn((fn) => fn),
}))

describe('Reviews', () => {
  it('should render loader initially', () => {
    render(<Reviews />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('should render no reviews message if no reviews found', async () => {
    server.use(
      http.get(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/posts`, () => {
        return HttpResponse.json([])
      })
    )

    render(<Reviews />)

    await waitFor(() => {
      expect(screen.getByText('noReviewYet')).toBeInTheDocument()
    })
  })

  it('should render reviews', async () => {
    server.use(
      http.get(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/posts`, () => {
        return HttpResponse.json([
          {
            id: 1,
            content: 'Great movie!',
            profiles: { username: 'user1', avatar: '', id: '1' },
          },
        ])
      })
    )

    render(<Reviews />)

    await waitFor(() => {
      expect(screen.getByText(`Great movie!`)).toBeInTheDocument()
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

    render(<Reviews />)
    await waitFor(() => {
      expect(screen.getByText(`errorOccured`)).toBeInTheDocument()
    })
  })
})
