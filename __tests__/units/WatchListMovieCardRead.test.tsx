import { render, screen, fireEvent } from '@testing-library/preact'
import { WatchListMovieCardRead } from '@/components/WatchListMovieCardRead'
import { describe, it, expect, vi } from 'vitest'

// Mock des dépendances
vi.mock('@/utils/i18n', () => ({
  i18n: {
    t: vi.fn((key) => key),
  },
}))

describe('WatchListMovieCardRead', () => {
  const item = {
    poster_path: '/test.jpg',
    title: 'Test Movie',
    release_date: '2022-01-01',
    id: 1,
    tmdb_id: 1,
    overview: 'Test Overview',
    status: 'watched',
  }

  it('should render the movie title', () => {
    render(<WatchListMovieCardRead item={item} />)
    expect(screen.getByText('Test Movie')).toBeInTheDocument()
  })

  it('should render the movie poster', () => {
    render(<WatchListMovieCardRead item={item} />)
    const img = screen.getByAltText('Test Movie')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w200/test.jpg'
    )
  })

  it('should render the default poster image on error', () => {
    render(<WatchListMovieCardRead item={item} />)
    const img = screen.getByAltText('Test Movie')
    fireEvent.error(img)
    expect(img).toHaveAttribute('src', '/poster.svg')
  })

  it('should render the movie status', () => {
    render(<WatchListMovieCardRead item={item} />)
    expect(screen.getByText('watched')).toBeInTheDocument()
  })
})
