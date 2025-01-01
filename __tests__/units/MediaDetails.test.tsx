import { render, screen } from '@testing-library/preact'
import { MediaDetails } from '@/components/MediaDetails'
import { describe, it, expect, vi } from 'vitest'
import { useRoute } from 'preact-iso'

vi.mock('preact-iso', () => ({
  useRoute: vi.fn(),
}))

vi.mock('@/components/MovieDetails', () => ({
  MovieDetails: () => <div>Movie Details</div>,
}))

vi.mock('@/components/TvDetails', () => ({
  TvDetails: () => <div>TV Details</div>,
}))

describe('MediaDetails', () => {
  it('should render MovieDetails if type is movie', () => {
    // @ts-ignore
    useRoute.mockReturnValue({ params: { type: 'movie' } })

    render(<MediaDetails />)

    expect(screen.getByText('Movie Details')).toBeInTheDocument()
  })

  it('should render TvDetails if type is tv', () => {
    // @ts-ignore
    useRoute.mockReturnValue({ params: { type: 'tv' } })

    render(<MediaDetails />)

    expect(screen.getByText('TV Details')).toBeInTheDocument()
  })

  it('should render null if type is neither movie nor tv', () => {
    // @ts-ignore
    useRoute.mockReturnValue({ params: { type: 'other' } })

    const { container } = render(<MediaDetails />)

    expect(container).toBeEmptyDOMElement()
  })
})
