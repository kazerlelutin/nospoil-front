import { render, screen, fireEvent, waitFor } from '@testing-library/preact'
import { TvState } from '@/components/TvState'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useSession } from '@/providers/session'
import { useMedia } from '@/hooks/useMedia'
import { server } from './setupTests'
import { http, HttpResponse } from 'msw'

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

describe('TvState', () => {
  const item = {
    tmdb_id: 1,
    title: 'Test Series',
    poster_path: '/test.jpg',
    current_season: 1,
    current_episode: 1,
    air_date: '2021-01-01',
    overview: 'Test overview',
  }
  const session = { user: { id: 'user1' } }
  const mediaCtx = { media: item, watchlist: {}, setWatchlist: vi.fn() }
  const defaultSeasons = [
    { season_number: 1, episode_count: 10 },
    { season_number: 2, episode_count: 10 },
  ] as any

  beforeEach(() => {
    //@ts-ignore
    useSession.mockReturnValue(session)
    //@ts-ignore
    useMedia.mockReturnValue(mediaCtx)
  })

  it('should render series information', () => {
    render(<TvState item={item} defaultSeasons={defaultSeasons} />)
    expect(screen.getByText('Test Series')).toBeInTheDocument()
    expect(screen.getByText('E1S1')).toBeInTheDocument()
  })

  it('should toggle edit mode', () => {
    render(<TvState item={item} defaultSeasons={defaultSeasons} />)
    fireEvent.click(screen.getByRole('button', { name: /edit/i }))
    expect(screen.getByText('season')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /x/i }))
    expect(screen.queryByText('season')).not.toBeInTheDocument()
  })

  it('should update episode on button click', async () => {
    render(<TvState item={item} defaultSeasons={defaultSeasons} />)
    fireEvent.click(screen.getByRole('button', { name: /edit/i }))
    fireEvent.click(screen.getByRole('button', { name: 'episode-2' }))

    await waitFor(() => {
      expect(mediaCtx.setWatchlist).toHaveBeenCalledWith({
        ...mediaCtx.watchlist,
        current_episode: 2,
        current_season: 1,
      })
    })
  })

  it('should handle update error', async () => {
    server.use(
      http.patch(
        `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/watchlist`,
        () => {
          return new HttpResponse('Update error', {
            statusText: 'Update error',
            status: 500,
          })
        }
      )
    )

    render(<TvState item={item} defaultSeasons={defaultSeasons} />)
    fireEvent.click(screen.getByRole('button', { name: /edit/i }))
    fireEvent.click(screen.getByRole('button', { name: 'episode-2' }))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'episode-1' })).toHaveAttribute(
        'data-current',
        'true'
      )
    })
  })

  it('should insert new entry if it does not exist', async () => {
    server.use(
      http.get(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/watchlist`, () => {
        return HttpResponse.json(null)
      }),
      http.post(
        `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/watchlist`,
        () => {
          return new HttpResponse('ok', {
            status: 201,
            statusText: 'ok',
          })
        }
      )
    )

    render(
      <TvState
        item={{
          ...item,
          tmdb_id: 2,
        }}
        defaultSeasons={defaultSeasons}
      />
    )
    fireEvent.click(screen.getByRole('button', { name: /edit/i }))
    fireEvent.click(screen.getByRole('button', { name: 'episode-2' }))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'episode-2' })).toHaveAttribute(
        'data-current',
        'true'
      )
    })
  })

  it('should fetch and set seasons', async () => {
    const { container } = render(<TvState item={item} canFetch={true} />)
    await waitFor(() => {
      expect(
        container.querySelector('[data-episode-remaining="19"]')
      ).toBeInTheDocument()
    })
  })
})
