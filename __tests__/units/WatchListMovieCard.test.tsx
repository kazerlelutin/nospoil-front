import { render, screen, fireEvent } from '@testing-library/preact'
import { WatchListMovieCard } from '@/components/WatchListMovieCard'
import { describe, it, expect, vi } from 'vitest'
import { MediaStatus } from '@/utils/constants'

vi.mock('@/components/MovieState', () => ({
  MovieState: ({ movie }) => <div>{movie.title} State</div>,
}))

describe('WatchListMovieCard', () => {
  const item = {
    poster_path: '/test.jpg',
    title: 'Test Movie',
    release_date: '2022-01-01',
    id: 1,
    tmdb_id: 1,
    overview: 'Test Overview',
    status: 'watched' as MediaStatus,
  }

  it('should render the movie title', () => {
    render(<WatchListMovieCard item={item} />)
    expect(screen.getByText('Test Movie')).toBeInTheDocument()
  })

  it('should render the movie poster', () => {
    render(<WatchListMovieCard item={item} />)
    const img = screen.getByAltText('Test Movie')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w92/test.jpg'
    )
  })

  it('should render the default poster image on error', () => {
    render(<WatchListMovieCard item={item} />)
    const img = screen.getByAltText('Test Movie')
    fireEvent.error(img)
    expect(img).toHaveAttribute('src', '/poster.svg')
  })

  it('should render the movie state', () => {
    render(<WatchListMovieCard item={item} />)
    expect(screen.getByText('Test Movie State')).toBeInTheDocument()
  })
})
