import { render, screen, waitFor } from '@testing-library/preact'
import { WatchList } from '@/components/WatchList'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useSession } from '@/providers/session'

import { useWatchlistsCount } from '@/hooks/useWatchlistsCount'
import { useWatchlists } from '@/hooks/useWatchlists'
import { useEffect } from 'preact/hooks'

vi.mock('@/utils/i18n', () => ({
  i18n: {
    t: vi.fn((key) => key),
  },
}))

vi.mock('@/providers/session', () => ({
  useSession: vi.fn(),
}))

vi.mock('@/hooks/useWatchlistsCount', () => ({
  useWatchlistsCount: vi.fn(),
}))

vi.mock('@/hooks/useWatchlists', () => ({
  useWatchlists: vi.fn(),
}))

vi.mock('@/components/Pagination', () => ({
  Pagination: ({ onFetch }) => {
    useEffect(() => {
      onFetch()
    }, [])

    return <nav>Pagination</nav>
  },
}))

describe('WatchList', () => {
  const session = { user: { id: 'user1' } }

  beforeEach(() => {
    //@ts-ignore
    useSession.mockReturnValue(session)
  })

  it('should render loader initially', () => {
    //@ts-ignore
    useWatchlistsCount.mockReturnValue({ loading: true, watchListsCount: 0 })
    //@ts-ignore
    useWatchlists.mockReturnValue({
      loading: true,
      watchLists: [],
      fetchWatchList: vi.fn(),
    })

    render(<WatchList type="movie" />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('should render empty message if no items in watchlist', async () => {
    //@ts-ignore
    useWatchlistsCount.mockReturnValue({ loading: false, watchListsCount: 0 })
    //@ts-ignore
    useWatchlists.mockReturnValue({
      loading: false,
      watchLists: [],
      fetchWatchList: vi.fn(),
    })

    render(<WatchList type="movie" />)

    await waitFor(() => {
      expect(screen.getByText('noTypeOnWatchlist')).toBeInTheDocument()
    })
  })

  it('should render watchlist items', async () => {
    //@ts-ignore
    useWatchlistsCount.mockReturnValue({ loading: false, watchListsCount: 1 })
    //@ts-ignore
    useWatchlists.mockReturnValue({
      loading: false,
      watchLists: [{ id: 1, type: 'movie', title: 'Test Movie' }],
      fetchWatchList: vi.fn(),
    })

    render(<WatchList type="movie" />)

    await waitFor(() => {
      expect(screen.getByText('Test Movie')).toBeInTheDocument()
    })
  })
})
