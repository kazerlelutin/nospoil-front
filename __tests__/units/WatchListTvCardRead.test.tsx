import { render, screen, fireEvent } from '@testing-library/preact'
import { WatchListTvCardRead } from '@/components/WatchListTvCardRead'
import { describe, it, expect, vi } from 'vitest'
import { useInterObs } from '@/hooks/useInterObs'
import { useFetchSeasons } from '@/hooks/useFetchSeasons'

// Mock des dépendances
vi.mock('@/hooks/useInterObs', () => ({
  useInterObs: vi.fn(),
}))

vi.mock('@/hooks/useFetchSeasons', () => ({
  useFetchSeasons: vi.fn(),
}))

vi.mock('@/utils/i18n', () => ({
  i18n: {
    t: vi.fn((key, { count }) => `${key} ${count}`),
    language: 'en',
  },
}))

describe('WatchListTvCardRead', () => {
  const item = {
    poster_path: '/test.jpg',
    title: 'Test TV Show',
    release_date: '2022-01-01',
    current_season: 1,
    current_episode: 1,
    id: 1,
    tmdb_id: 1,
    overview: 'Test Overview',
  }

  it('should render the TV show title', () => {
    //@ts-ignore
    useInterObs.mockReturnValue(true)
    //@ts-ignore
    useFetchSeasons.mockReturnValue({
      seasons: [],
      fetchSeason: vi.fn(),
    })

    render(<WatchListTvCardRead item={item} />)
    expect(screen.getByText('Test TV Show')).toBeInTheDocument()
  })

  it('should render the TV show poster', () => {
    //@ts-ignore
    useInterObs.mockReturnValue(true)
    //@ts-ignore
    useFetchSeasons.mockReturnValue({
      seasons: [],
      fetchSeason: vi.fn(),
    })

    render(<WatchListTvCardRead item={item} />)
    const img = screen.getByAltText('Test TV Show')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w200/test.jpg'
    )
  })

  it('should render the default poster image on error', () => {
    //@ts-ignore
    useInterObs.mockReturnValue(true)
    //@ts-ignore
    useFetchSeasons.mockReturnValue({
      seasons: [],
      fetchSeason: vi.fn(),
    })

    render(<WatchListTvCardRead item={item} />)
    const img = screen.getByAltText('Test TV Show')
    fireEvent.error(img)
    expect(img).toHaveAttribute('src', '/poster.svg')
  })

  it('should render the episode progress bar', () => {
    //@ts-ignore
    useInterObs.mockReturnValue(true)
    //@ts-ignore
    useFetchSeasons.mockReturnValue({
      seasons: [
        { season_number: 1, episode_count: 10 },
        { season_number: 2, episode_count: 10 },
      ],
      fetchSeason: vi.fn(),
    })

    render(<WatchListTvCardRead item={item} />)
    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toBeInTheDocument()
  })

  it('should render the episode remaining count', () => {
    //@ts-ignore
    useInterObs.mockReturnValue(true)
    //@ts-ignore
    useFetchSeasons.mockReturnValue({
      seasons: [
        { season_number: 1, episode_count: 10 },
        { season_number: 2, episode_count: 10 },
      ],
      fetchSeason: vi.fn(),
    })

    render(<WatchListTvCardRead item={item} />)
    expect(screen.getByText('episodeRemaining 19')).toBeInTheDocument()
  })
})
