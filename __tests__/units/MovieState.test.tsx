import { render, screen, fireEvent, waitFor } from '@testing-library/preact'
import { MovieState } from '@/components/MovieState'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { server } from './setupTests'
import { useSession } from '@/providers/session'
import { useMedia } from '@/hooks/useMedia'
import { MEDIA_STATUS } from '@/utils/constants'
import { http, HttpResponse } from 'msw'

// Mock des dépendances
vi.mock('@/providers/session', () => ({
  useSession: vi.fn(),
}))

vi.mock('@/hooks/useMedia', () => ({
  useMedia: vi.fn(),
}))

vi.mock('@/utils/i18n', () => ({
  i18n: {
    t: vi.fn((key) => key),
  },
}))

describe('MovieState', () => {
  const movie = {
    title: 'Test Movie',
    poster_path: '/test.jpg',
    status: MEDIA_STATUS.NOT_SEEN,
    tmdb_id: 1,
  }
  const session = { user: { id: 'user1' } }
  const mediaCtx = { media: movie, watchlist: {}, setWatchlist: vi.fn() }

  beforeEach(() => {
    //@ts-ignore
    useSession.mockReturnValue(session)
    //@ts-ignore
    useMedia.mockReturnValue(mediaCtx)
  })

  it('should render status buttons', () => {
    render(<MovieState movie={movie} id={1} />)
    expect(screen.getByText(MEDIA_STATUS.NOT_SEEN)).toBeInTheDocument()
    expect(screen.getByText(MEDIA_STATUS.PLANNED)).toBeInTheDocument()
    expect(screen.getByText(MEDIA_STATUS.NOT_INTERESTED)).toBeInTheDocument()
    expect(screen.getByText(MEDIA_STATUS.COMPLETED)).toBeInTheDocument()
  })

  it('should initialize currentStatus with movie status', () => {
    render(<MovieState movie={movie} id={1} />)
    expect(screen.getByText(MEDIA_STATUS.NOT_SEEN)).toHaveAttribute(
      'data-current',
      'true'
    )
  })

  it('should update status on button click', async () => {
    render(<MovieState movie={movie} id={1} />)
    fireEvent.click(screen.getByText(MEDIA_STATUS.PLANNED))

    await waitFor(() => {
      expect(screen.getByText(MEDIA_STATUS.PLANNED)).toHaveAttribute(
        'data-current',
        'true'
      )
      expect(mediaCtx.setWatchlist).toHaveBeenCalledWith({
        ...mediaCtx.watchlist,
        status: MEDIA_STATUS.PLANNED,
      })
    })
  })

  it('should handle update error', async () => {
    server.use(
      http.put(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/watchlist`, () => {
        return new HttpResponse('Update error', {
          statusText: 'Update error',
          status: 500,
        })
      })
    )

    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    render(<MovieState movie={movie} id={1} />)

    fireEvent.click(screen.getByText(MEDIA_STATUS.COMPLETED))

    await waitFor(() => {
      expect(consoleErrorMock).toHaveBeenCalledWith(
        "Erreur lors de l'upsert :",
        'ERROR'
      )
    })

    consoleErrorMock.mockRestore()
  })
})
