import { render, screen } from '@testing-library/preact'
import { TvResume } from '@/components/TvResume'
import { describe, it, expect, vi } from 'vitest'
import { useMedia } from '@/hooks/useMedia'
import { i18n } from '@/utils/i18n'

vi.mock('@/hooks/useMedia', () => ({
  useMedia: vi.fn(),
}))

vi.mock('@/utils/i18n', () => ({
  i18n: {
    t: vi.fn((key) => key),
  },
}))

vi.mock('@/components/TvState', () => ({
  TvState: ({ item }) => <div>{item.title}-State</div>,
}))

describe('TvResume', () => {
  it('should render the TV show title', () => {
    // @ts-ignore
    useMedia.mockReturnValue({
      media: {
        name: 'Test TV Show',
        release_date: '2022-01-01',
        status: 'Returning Series',
        genres: [{ name: 'Drama' }],
        number_of_seasons: 3,
        number_of_episodes: 30,
        created_by: [{ name: 'Creator 1' }],
        credits: { cast: [] },
        poster_path: '/test.jpg',
      },
      watchlist: {},
    })
    // @ts-ignore
    i18n.t.mockImplementation((key) => key)

    render(<TvResume />)

    expect(screen.getByText('Test TV Show-State')).toBeInTheDocument()
  })

  it('should render the TV show state', () => {
    // @ts-ignore
    useMedia.mockReturnValue({
      media: {
        name: 'Test TV Show',
        release_date: '2022-01-01',
        status: 'Returning Series',
        genres: [{ name: 'Drama' }],
        number_of_seasons: 3,
        number_of_episodes: 30,
        created_by: [{ name: 'Creator 1' }],
        credits: { cast: [] },
        poster_path: '/test.jpg',
      },
      watchlist: {},
    })
    // @ts-ignore
    i18n.t.mockImplementation((key) => key)

    render(<TvResume />)

    expect(screen.getByText('Test TV Show-State')).toBeInTheDocument()
  })

  it('should render the TV show poster', () => {
    // @ts-ignore
    useMedia.mockReturnValue({
      media: {
        name: 'Test TV Show',
        release_date: '2022-01-01',
        status: 'Returning Series',
        genres: [{ name: 'Drama' }],
        number_of_seasons: 3,
        number_of_episodes: 30,
        created_by: [{ name: 'Creator 1' }],
        credits: { cast: [] },
        poster_path: '/test.jpg',
      },
      watchlist: {},
    })
    // @ts-ignore
    i18n.t.mockImplementation((key) => key)

    render(<TvResume />)

    const img = screen.getByAltText('Test TV Show')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w200/test.jpg'
    )
  })

  it('should render the TV show fields', () => {
    // @ts-ignore
    useMedia.mockReturnValue({
      media: {
        name: 'Test TV Show',
        release_date: '2022-01-01',
        status: 'Returning Series',
        genres: [{ name: 'Drama' }],
        number_of_seasons: 3,
        number_of_episodes: 30,
        created_by: [{ name: 'Creator 1' }],
        credits: { cast: [] },
        poster_path: '/test.jpg',
      },
      watchlist: {},
    })
    // @ts-ignore
    i18n.t.mockImplementation((key) => key)

    render(<TvResume />)

    expect(screen.getByText('releaseDate:')).toBeInTheDocument()
    expect(screen.getByText('status:')).toBeInTheDocument()
    expect(screen.getByText('genres:')).toBeInTheDocument()
    expect(screen.getByText('numberOfSeasons:')).toBeInTheDocument()
    expect(screen.getByText('createdBy:')).toBeInTheDocument()
  })

  it('should render the correct number of episodes', () => {
    // @ts-ignore
    useMedia.mockReturnValue({
      media: {
        name: 'Test TV Show',
        release_date: '2022-01-01',
        status: 'Returning Series',
        genres: [{ name: 'Drama' }],
        number_of_seasons: 3,
        number_of_episodes: 1,
        created_by: [{ name: 'Creator 1' }],
        credits: { cast: [] },
        poster_path: '/test.jpg',
      },
      watchlist: {},
    })
    // @ts-ignore
    i18n.t.mockImplementation((key) => key)

    render(<TvResume />)

    expect(screen.getByText('3 (1 episode)')).toBeInTheDocument()
  })

  it('should render the correct number of episodes (plural)', () => {
    // @ts-ignore
    useMedia.mockReturnValue({
      media: {
        name: 'Test TV Show',
        release_date: '2022-01-01',
        status: 'Returning Series',
        genres: [{ name: 'Drama' }],
        number_of_seasons: 3,
        number_of_episodes: 2,
        created_by: [{ name: 'Creator 1' }],
        credits: { cast: [] },
        poster_path: '/test.jpg',
      },
      watchlist: {},
    })
    // @ts-ignore
    i18n.t.mockImplementation((key) => key)

    render(<TvResume />)

    expect(screen.getByText('3 (2 episodes)')).toBeInTheDocument()
  })

  it('should render the cast correctly', () => {
    // @ts-ignore
    useMedia.mockReturnValue({
      media: {
        name: 'Test TV Show',
        release_date: '2022-01-01',
        status: 'Returning Series',
        genres: [{ name: 'Drama' }],
        number_of_seasons: 3,
        number_of_episodes: 30,
        created_by: [{ name: 'Creator 1' }],
        credits: {
          cast: [
            { id: 1, name: 'Actor 1', known_for_department: 'Acting' },
            { id: 2, name: 'Actor 2', known_for_department: 'Acting' },
            { id: 3, name: 'Actor 3', known_for_department: 'Acting' },
            { id: 4, name: 'Actor 4', known_for_department: 'Acting' },
            { id: 5, name: 'Actor 5', known_for_department: 'Acting' },
          ],
        },
        poster_path: '/test.jpg',
      },
      watchlist: {},
    })
    // @ts-ignore
    i18n.t.mockImplementation((key) => key)

    render(<TvResume />)

    expect(
      screen.getByText('Actor 1, Actor 2, Actor 3, Actor 4, Actor 5')
    ).toBeInTheDocument()
  })
})
