import { render, screen, fireEvent } from '@testing-library/preact'
import { WatchListTvCard } from '@/components/WatchListTvCard'
import { describe, it, expect, vi } from 'vitest'
import { useInterObs } from '@/hooks/useInterObs'

// Mock des dépendances
vi.mock('@/hooks/useInterObs', () => ({
  useInterObs: vi.fn(),
}))

vi.mock('@/components/TvState', () => ({
  TvState: ({ item }) => <div>{item.title} State</div>,
}))

describe('WatchListTvCard', () => {
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
    // @ts-ignore
    useInterObs.mockReturnValue(true)

    render(<WatchListTvCard item={item} />)
    expect(screen.getByText('Test TV Show State')).toBeInTheDocument()
  })

  it('should render the TV show poster', () => {
    // @ts-ignore
    useInterObs.mockReturnValue(true)

    render(<WatchListTvCard item={item} />)
    const img = screen.getByAltText('Test TV Show')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w200/test.jpg'
    )
  })

  it('should render the default poster image on error', () => {
    // @ts-ignore
    useInterObs.mockReturnValue(true)

    render(<WatchListTvCard item={item} />)
    const img = screen.getByAltText('Test TV Show')
    fireEvent.error(img)
    expect(img).toHaveAttribute('src', '/poster.svg')
  })

  it('should render the TV show state', () => {
    // @ts-ignore
    useInterObs.mockReturnValue(true)

    render(<WatchListTvCard item={item} />)
    expect(screen.getByText('Test TV Show State')).toBeInTheDocument()
  })
})
