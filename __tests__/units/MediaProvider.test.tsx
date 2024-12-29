import { render, screen } from '@testing-library/preact'
import { MediaProvider, MediaCtx } from '@/providers/media'
import { describe, it, expect, vi } from 'vitest'
import { useSession } from '@/providers/session'
import { useWatchlist } from '@/hooks/useWatchlist'
import { useMediaData } from '@/hooks/useMediaData'

// Mock hooks
vi.mock('@/providers/session', () => ({
  useSession: vi.fn(),
}))
vi.mock('@/hooks/useWatchlist', () => ({
  useWatchlist: vi.fn(),
}))
vi.mock('@/hooks/useMediaData', () => ({
  useMediaData: vi.fn(),
}))

describe('MediaProvider', () => {
  it('should provide the correct context values', () => {
    const mockSession = { user: { id: '1' } }
    const mockWatchlist = { id: '1', items: [] }
    const mockMedia = { id: '1', title: 'Test Movie' }
    const mockLoading = false

    //@ts-ignore
    useSession.mockReturnValue(mockSession)
    //@ts-ignore
    useWatchlist.mockReturnValue({
      watchlist: mockWatchlist,
      setWatchlist: vi.fn(),
    })
    //@ts-ignore
    useMediaData.mockReturnValue({ media: mockMedia, loading: mockLoading })

    render(
      <MediaProvider type="movie" id={1}>
        <MediaCtx.Consumer>
          {(value) => (
            <div>
              <span>{value.media?.title}</span>
              <span>
                {value.isInWatchlist ? 'In Watchlist' : 'Not In Watchlist'}
              </span>
              <span>{value.loading ? 'Loading' : 'Loaded'}</span>
            </div>
          )}
        </MediaCtx.Consumer>
      </MediaProvider>
    )

    expect(screen.getByText('Test Movie')).toBeInTheDocument()
    expect(screen.getByText('In Watchlist')).toBeInTheDocument()
    expect(screen.getByText('Loaded')).toBeInTheDocument()
  })
})
