import { render, screen } from '@testing-library/preact'
import { Review } from '@/components/Review'
import { describe, it, expect, vi } from 'vitest'
import { useMedia } from '@/hooks/useMedia'
import { MEDIA_STATUS } from '@/utils/constants'

vi.mock('@/hooks/useMedia', () => ({
  useMedia: vi.fn(),
}))

vi.mock('@/utils/i18n', () => ({
  i18n: {
    t: vi.fn((key) => key),
  },
}))

vi.mock('@/components/EditorReadOnly', () => ({
  EditorReadOnly: () => <div>Mocked EditorReadOnly</div>,
}))

describe('Review', () => {
  const review = {
    id: '1',
    profiles: {
      id: 'user1',
      username: 'User 1',
      avatar: '/avatar1.png',
    },
    media_state: MEDIA_STATUS.NOT_SEEN,
    current_season: 1,
    current_episode: 1,
    rating: 5,
    content: '[]',
    updated_at: new Date('2022-01-01T00:00:00Z').toISOString(),
  }

  it('should hide review if watchlist is not available', () => {
    //@ts-ignore
    useMedia.mockReturnValue({ watchlist: null })
    render(<Review review={review} type="movie" />)
    expect(screen.queryByText('❓')).toBeInTheDocument()
  })

  it('should not hide review if movie status is completed or not_interested', () => {
    //@ts-ignore
    useMedia.mockReturnValue({ watchlist: { status: 'completed' } })
    render(<Review review={review} type="movie" />)
    expect(screen.queryByText('❓')).not.toBeInTheDocument()
    //@ts-ignore
    useMedia.mockReturnValue({ watchlist: { status: 'not_interested' } })
    render(<Review review={review} type="movie" />)
    expect(screen.queryByText('❓')).not.toBeInTheDocument()
  })

  it('should not hide review if review media_state is NOT_SEEN or PLANNED', () => {
    //@ts-ignore
    useMedia.mockReturnValue({ watchlist: { status: 'watching' } })
    render(<Review review={review} type="movie" />)
    expect(screen.queryByText('❓')).not.toBeInTheDocument()

    const plannedReview = { ...review, media_state: MEDIA_STATUS.PLANNED }
    render(<Review review={plannedReview} type="movie" />)
    expect(screen.queryByText('❓')).not.toBeInTheDocument()
  })

  it('should hide review if none of the conditions are met for movie', () => {
    //@ts-ignore
    useMedia.mockReturnValue({ watchlist: { status: 'watching' } })
    const hiddenReview = { ...review, media_state: MEDIA_STATUS.WATCHING }
    render(<Review review={hiddenReview} type="movie" />)
    expect(screen.queryByText('❓')).toBeInTheDocument()
  })

  it('should not hide review if current season and episode are greater for tv', () => {
    //@ts-ignore
    useMedia.mockReturnValue({
      watchlist: { current_season: 2, current_episode: 1 },
    })
    render(<Review review={review} type="tv" />)
    expect(screen.queryByText('❓')).not.toBeInTheDocument()
    //@ts-ignore
    useMedia.mockReturnValue({
      watchlist: { current_season: 1, current_episode: 2 },
    })
    //@ts-ignore
    render(<Review review={review} type="tv" />)
    expect(screen.queryByText('❓')).not.toBeInTheDocument()
  })

  it('should hide review if none of the conditions are met for tv', () => {
    //@ts-ignore
    useMedia.mockReturnValue({
      watchlist: { current_season: 1, current_episode: 1 },
    })
    render(<Review review={review} type="tv" />)
    expect(screen.queryByText('❓')).toBeInTheDocument()
  })
})
