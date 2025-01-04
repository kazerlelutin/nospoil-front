import { render, screen } from '@testing-library/preact'
import { Watchlist } from '@/pages/Watchlist'
import { describe, it, expect, vi } from 'vitest'
import { useRoute } from 'preact-iso'

// Mock des dépendances
vi.mock('preact-iso', () => ({
  useRoute: vi.fn(),
}))

vi.mock('@/utils/i18n', () => ({
  i18n: {
    t: vi.fn((key) => key),
  },
}))

vi.mock('@/utils/supabase', () => ({
  supabase: {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({
      data: { username: 'testuser', avatar: 'avatar.png' },
    }),
  },
}))

vi.mock('@/components/Avatar', () => ({
  Avatar: ({ alt, src }) => <img alt={alt} src={src} />,
}))

vi.mock('@/components/PersistTabs', () => ({
  PersistTabs: ({ tabs }) => (
    <div>
      {tabs.map((tab) => (
        <div key={tab.id}>
          {tab.title} {tab.content}
        </div>
      ))}
    </div>
  ),
}))

vi.mock('@/components/WatchListRead', () => ({
  WatchListRead: ({ type }) => (
    <div>{type === 'movie' ? 'Movies List' : 'Series List'}</div>
  ),
}))

describe('Watchlist', () => {
  it('should render the user information and tabs', async () => {
    //@ts-ignore
    useRoute.mockReturnValue({
      params: { user_id: '1' },
    })

    render(<Watchlist />)

    expect(await screen.findByAltText('testuser')).toBeInTheDocument()
    expect(screen.getByText('testuser')).toBeInTheDocument()
    expect(screen.getByText('movies')).toBeInTheDocument()
    expect(screen.getByText('series')).toBeInTheDocument()
  })

  it('should render the correct components for each tab', () => {
    //@ts-ignore
    useRoute.mockReturnValue({
      params: { user_id: '1' },
    })

    render(<Watchlist />)

    expect(screen.getByText('Movies List')).toBeInTheDocument()
    expect(screen.getByText('Series List')).toBeInTheDocument()
  })
})
