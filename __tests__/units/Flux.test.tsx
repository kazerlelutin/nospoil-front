import { render, waitFor } from '@testing-library/preact'
import { Flux } from '@/components/Flux'
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { useFetchPosts } from '@/hooks/useFetchPosts'

vi.mock('@/components/Pagination', () => ({
  Pagination: () => {
    return <nav>Pagination</nav>
  },
}))

vi.mock('@/components/EditorReadOnly', () => ({
  default: () => <div>--</div>,
  EditorReadOnly: () => <div>Mocked EditorReadOnly</div>,
}))

vi.mock('@/components/Avatar', () => ({
  Avatar: () => {
    return <div>Avatar</div>
  },
}))
// Mock des dépendances
vi.mock('@/utils/i18n', () => ({
  i18n: {
    t: vi.fn((key) => key),
  },
}))

vi.mock('@/hooks/useFetchPosts', () => ({
  useFetchPosts: vi.fn(),
}))

describe('Flux', () => {
  beforeAll(() => {
    import('@/components/EditorReadOnly')
  })
  it('should render posts', async () => {
    //@ts-ignore
    useFetchPosts.mockReturnValue({
      loading: false,
      totalPages: 1,
      posts: [
        {
          id: 1,
          user_id: 'user1',
          username: 'User 1',
          avatar: '/avatar1.png',
          type: 'movie',
          media_id: 1,
          title: 'Movie 1',
          poster_path: '/poster1.jpg',
          updated_at: '2022-01-01T00:00:00Z',
          content: null,
          media_state: 'planned',
          current_episode: null,
          current_season: null,
          rating: 5,
          status: 'completed',
          hide: false,
        },
      ],
      fetchPosts: vi.fn(),
    })
    const { queryByText } = render(<Flux />)

    await waitFor(() => {
      expect(queryByText('User 1')).toBeInTheDocument()
      expect(queryByText('Movie 1')).toBeInTheDocument()
    })
  })
})
