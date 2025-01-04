import { render, screen } from '@testing-library/preact'
import { MovieResume } from '@/components/MovieResume'
import { describe, it, expect, vi } from 'vitest'
import { useMedia } from '@/hooks/useMedia'
import { i18n } from '@/utils/i18n'

// Mock des dépendances
vi.mock('@/hooks/useMedia', () => ({
  useMedia: vi.fn(),
}))

vi.mock('@/utils/i18n', () => ({
  i18n: {
    t: vi.fn((key) => key),
  },
}))

vi.mock('@/components/MovieState', () => ({
  MovieState: ({ movie }) => <div>{movie.title} State</div>,
}))

describe('MovieResume', () => {
  it('should render the movie title', () => {
    // @ts-ignore
    useMedia.mockReturnValue({
      media: {
        title: 'Test Movie',
        release_date: '2022-01-01',
        genres: [{ name: 'Action' }],
        runtime: 120,
        credits: { crew: [], cast: [] },
        budget: 1000000,
        revenue: 2000000,
        poster_path: '/test.jpg',
      },
      watchlist: {},
    })
    // @ts-ignore
    i18n.t.mockImplementation((key) => key)

    render(<MovieResume />)

    expect(screen.getByText('Test Movie')).toBeInTheDocument()
  })

  it('should render the movie state', () => {
    // @ts-ignore
    useMedia.mockReturnValue({
      media: {
        title: 'Test Movie',
        release_date: '2022-01-01',
        genres: [{ name: 'Action' }],
        runtime: 120,
        credits: { crew: [], cast: [] },
        budget: 1000000,
        revenue: 2000000,
        poster_path: '/test.jpg',
      },
      watchlist: {},
    })
    // @ts-ignore
    i18n.t.mockImplementation((key) => key)

    render(<MovieResume />)

    expect(screen.getByText('Test Movie State')).toBeInTheDocument()
  })

  it('should render the movie poster', () => {
    // @ts-ignore
    useMedia.mockReturnValue({
      media: {
        title: 'Test Movie',
        release_date: '2022-01-01',
        genres: [{ name: 'Action' }],
        runtime: 120,
        credits: { crew: [], cast: [] },
        budget: 1000000,
        revenue: 2000000,
        poster_path: '/test.jpg',
      },
      watchlist: {},
    })
    // @ts-ignore
    i18n.t.mockImplementation((key) => key)

    render(<MovieResume />)

    const img = screen.getByAltText('Test Movie')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w200/test.jpg'
    )
  })

  it('should render the movie fields', () => {
    // @ts-ignore
    useMedia.mockReturnValue({
      media: {
        title: 'Test Movie',
        release_date: '2022-01-01',
        genres: [{ name: 'Action' }],
        runtime: 120,
        credits: { crew: [], cast: [] },
        budget: 1000000,
        revenue: 2000000,
        poster_path: '/test.jpg',
      },
      watchlist: {},
    })
    // @ts-ignore
    i18n.t.mockImplementation((key) => key)

    render(<MovieResume />)

    expect(screen.getByText('releaseDate:')).toBeInTheDocument()
    expect(screen.getByText('genres:')).toBeInTheDocument()
    expect(screen.getByText('runtime:')).toBeInTheDocument()
    expect(screen.getByText('budget:')).toBeInTheDocument()
    expect(screen.getByText('revenue:')).toBeInTheDocument()
  })

  it('should render the directors', () => {
    // @ts-ignore
    useMedia.mockReturnValue({
      media: {
        title: 'Test Movie',
        release_date: '2022-01-01',
        genres: [{ name: 'Action' }],
        runtime: 120,
        credits: {
          crew: [{ id: 1, name: 'Director 1', department: 'Directing' }],
          cast: [],
        },
        budget: 1000000,
        revenue: 2000000,
        poster_path: '/test.jpg',
      },
      watchlist: {},
    })
    // @ts-ignore
    i18n.t.mockImplementation((key) => key)

    render(<MovieResume />)

    expect(screen.getByText('Director 1')).toBeInTheDocument()
  })

  it('should render the writers', () => {
    // @ts-ignore
    useMedia.mockReturnValue({
      media: {
        title: 'Test Movie',
        release_date: '2022-01-01',
        genres: [{ name: 'Action' }],
        runtime: 120,
        credits: {
          crew: [{ id: 1, name: 'Writer 1', department: 'Writing' }],
          cast: [],
        },
        budget: 1000000,
        revenue: 2000000,
        poster_path: '/test.jpg',
      },
      watchlist: {},
    })
    // @ts-ignore
    i18n.t.mockImplementation((key) => key)

    render(<MovieResume />)

    expect(screen.getByText('Writer 1')).toBeInTheDocument()
  })

  it('should render the cast', () => {
    // @ts-ignore
    useMedia.mockReturnValue({
      media: {
        title: 'Test Movie',
        release_date: '2022-01-01',
        genres: [{ name: 'Action' }],
        runtime: 120,
        credits: {
          crew: [],
          cast: [
            { id: 1, name: 'Actor 1', known_for_department: 'Acting' },
            { id: 2, name: 'Actor 2', known_for_department: 'Acting' },
            { id: 3, name: 'Actor 3', known_for_department: 'Acting' },
            { id: 4, name: 'Actor 4', known_for_department: 'Acting' },
            { id: 5, name: 'Actor 5', known_for_department: 'Acting' },
          ],
        },
        budget: 1000000,
        revenue: 2000000,
        poster_path: '/test.jpg',
      },
      watchlist: {},
    })
    // @ts-ignore
    i18n.t.mockImplementation((key) => key)

    render(<MovieResume />)

    expect(
      screen.getByText('Actor 1, Actor 2, Actor 3, Actor 4, Actor 5')
    ).toBeInTheDocument()
  })
})
