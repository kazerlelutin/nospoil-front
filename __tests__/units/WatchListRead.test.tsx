import { render, screen } from '@testing-library/preact'
import { WatchListRead } from '@/components/WatchListRead'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useRoute } from 'preact-iso'
import { useWatchlists } from '@/hooks/useWatchlists'
import { useEffect } from 'preact/hooks'

// Mock des dépendances
vi.mock('preact-iso', () => ({
  useRoute: vi.fn(),
}))

vi.mock('@/components/Pagination', () => ({
  Pagination: ({ onFetch }) => {
    useEffect(() => {
      onFetch()
    }, [])

    return <nav>Pagination</nav>
  },
}))

vi.mock('@/providers/interObs', () => ({
  InterObsProvider: ({ children }) => <div>{children}</div>,
}))

vi.mock('@/hooks/useWatchlists', () => ({
  useWatchlists: vi.fn(),
}))

vi.mock('@/utils/i18n', () => ({
  i18n: {
    t: vi.fn((key) => key),
  },
}))

vi.mock('@/components/WatchListMovieCardRead', () => ({
  WatchListMovieCardRead: ({ item }) => <div>{item.title} Movie Card</div>,
}))

vi.mock('@/components/WatchListTvCardRead', () => ({
  WatchListTvCardRead: ({ item }) => <div>{item.title} TV Card</div>,
}))

describe('WatchListRead', () => {
  const user_id = '123'
  const type = 'movie'

  beforeEach(() => {
    //@ts-ignore
    useRoute.mockReturnValue({ params: { user_id } })
  })

  it('should render loader when loading', () => {
    //@ts-ignore
    useWatchlists.mockReturnValue({
      loading: true,
      watchLists: [],
      fetchWatchList: vi.fn(),
    })

    render(<WatchListRead type={type} />)
    expect(screen.getByText('loading')).toBeInTheDocument()
  })

  it('should render message when watchlist is empty', () => {
    //@ts-ignore
    useWatchlists.mockReturnValue({
      loading: false,
      watchLists: [],
      fetchWatchList: vi.fn(),
    })

    render(<WatchListRead type={type} />)
    expect(screen.getByText('noTypeOnWatchlist')).toBeInTheDocument()
  })

  it('should render movie cards when watchlist has movies', () => {
    //@ts-ignore
    useWatchlists.mockReturnValue({
      loading: false,
      watchLists: [{ id: 1, type: 'movie', title: 'Test Movie' }],
      fetchWatchList: vi.fn(),
    })

    render(<WatchListRead type={type} />)
    expect(screen.getByText('Test Movie Movie Card')).toBeInTheDocument()
  })

  it('should render TV cards when watchlist has TV shows', () => {
    //@ts-ignore
    useWatchlists.mockReturnValue({
      loading: false,
      watchLists: [{ id: 1, type: 'tv', title: 'Test TV Show' }],
      fetchWatchList: vi.fn(),
    })

    render(<WatchListRead type={type} />)
    expect(screen.getByText('Test TV Show TV Card')).toBeInTheDocument()
  })

  it('should render null cards when watchlist has no tv or movie', () => {
    //@ts-ignore
    useWatchlists.mockReturnValue({
      loading: false,
      watchLists: [{ id: 1, type: 'book', title: 'Test book' }],
      fetchWatchList: vi.fn(),
    })

    render(<WatchListRead type={type} />)
    expect(screen.queryByText('Test book Card')).not.toBeInTheDocument()
  })
})
