import { cleanup, render, screen } from '@testing-library/preact'
import { TvDetails } from '@/components/TvDetails'
import { describe, it, expect, vi, afterEach } from 'vitest'
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

describe('TvDetails', () => {
  it('should render the series overview', () => {
    //@ts-ignore
    useMedia.mockReturnValue({
      media: {
        overview: 'This is a test overview.',
        videos: { results: [] },
        credits: { cast: [] },
      },
    })
    //@ts-ignore
    i18n.t.mockReturnValue('cast')

    render(<TvDetails />)

    expect(screen.getByText('This is a test overview.')).toBeInTheDocument()
  })

  it('should render the video if available', () => {
    //@ts-ignore
    useMedia.mockReturnValue({
      media: {
        overview: 'This is a test overview.',
        videos: { results: [{ key: 'test_video_key' }] },
        credits: { cast: [] },
      },
    })
    //@ts-ignore
    i18n.t.mockReturnValue('cast')

    const { container } = render(<TvDetails />)

    const iframe = container.querySelector('iframe')
    expect(iframe.getAttribute('src')).toEqual(
      'https://www.youtube.com/embed/test_video_key'
    )
  })

  it('should render the cast if available', () => {
    //@ts-ignore
    useMedia.mockReturnValue({
      media: {
        overview: 'This is a test overview.',
        videos: { results: [] },
        credits: {
          cast: [
            {
              id: 1,
              name: 'Actor 1',
              profile_path: '/path1.jpg',
              known_for_department: 'Acting',
            },
            {
              id: 2,
              name: 'Actor 2',
              profile_path: '/path2.jpg',
              known_for_department: 'Acting',
            },
          ],
        },
      },
    })
    //@ts-ignore
    i18n.t.mockReturnValue('cast')

    render(<TvDetails />)

    expect(screen.getByText('Actor 1')).toBeInTheDocument()
    expect(screen.getByText('Actor 2')).toBeInTheDocument()
  })
})
