import { render, screen } from '@testing-library/preact'
import { MediaResume } from '@/components/MediaResume'
import { describe, it, expect, vi } from 'vitest'
import { useRoute } from 'preact-iso'

vi.mock('preact-iso', () => ({
  useRoute: vi.fn(),
}))

vi.mock('@/components/MovieResume', () => ({
  MovieResume: () => <div>Movie Resume</div>,
}))

vi.mock('@/components/TvResume', () => ({
  TvResume: () => <div>TV Resume</div>,
}))

describe('MediaResume', () => {
  it('should render MovieResume if type is movie', () => {
    // @ts-ignore
    useRoute.mockReturnValue({ params: { type: 'movie' } })

    render(<MediaResume />)

    expect(screen.getByText('Movie Resume')).toBeInTheDocument()
  })

  it('should render TvResume if type is tv', () => {
    // @ts-ignore
    useRoute.mockReturnValue({ params: { type: 'tv' } })

    render(<MediaResume />)

    expect(screen.getByText('TV Resume')).toBeInTheDocument()
  })

  it('should render null if type is neither movie nor tv', () => {
    // @ts-ignore
    useRoute.mockReturnValue({ params: { type: 'other' } })

    const { container } = render(<MediaResume />)

    expect(container).toBeEmptyDOMElement()
  })
})
