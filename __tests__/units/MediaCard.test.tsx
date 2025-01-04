import { fireEvent, render, screen } from '@testing-library/preact'
import { MediaCard } from '@/components/MediaCard'
import { describe, it, expect, vi } from 'vitest'
import { i18n } from '@/utils/i18n'

// Mock des dépendances
vi.mock('@/utils/i18n', () => ({
  i18n: {
    t: vi.fn((key) => key),
  },
}))

describe('MediaCard', () => {
  it('should render the media title', () => {
    render(<MediaCard id={1} title="Test Title" type="movie" />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('should render the media overview', () => {
    render(
      <MediaCard
        id={1}
        title="Test Title"
        overview="Test Overview"
        type="movie"
      />
    )
    expect(screen.getByText('Test Overview')).toBeInTheDocument()
  })

  it('should render the no overview message if overview is not available', () => {
    // @ts-ignore
    i18n.t.mockReturnValue('No overview available')
    render(<MediaCard id={1} title="Test Title" type="movie" />)
    expect(screen.getByText('No overview available')).toBeInTheDocument()
  })

  it('should render the poster image', () => {
    render(
      <MediaCard
        id={1}
        title="Test Title"
        poster_path="/test.jpg"
        type="movie"
      />
    )
    const img = screen.getByAltText('Test Title')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w92/test.jpg'
    )
  })

  it('should render the default poster image on error', () => {
    render(
      <MediaCard
        id={1}
        title="Test Title"
        poster_path="/test.jpg"
        type="movie"
      />
    )
    const img = screen.getByAltText('Test Title')
    fireEvent.error(img)
    expect(img).toHaveAttribute('src', '/poster.svg')
  })
})
