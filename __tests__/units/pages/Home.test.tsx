import { cleanup, render, screen, waitFor } from '@testing-library/preact'
import { Home } from '@/pages/Home'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { useSession } from '@/providers/session'

// Mock des dépendances
vi.mock('@/providers/session', () => ({
  useSession: () => ({
    user: { id: '1' },
  }),
}))

vi.mock('@/utils/i18n', () => ({
  i18n: {
    t: vi.fn((key) => key),
  },
}))

vi.mock('@/components/Flux', () => ({
  Flux: () => <div>Flux Component</div>,
}))

vi.mock('@/components/MediaList', () => ({
  MediaList: ({ type }) => (
    <div>{type === 'movie' ? 'Movies List' : 'Series List'}</div>
  ),
}))

vi.mock('@/components/PersistTabs', () => ({
  PersistTabs: ({ tabs }) =>
    tabs.map((tab: { id: string; title: string; content: string }) => (
      <div key={tab.id}>
        {tab.title}
        {tab.content}
      </div>
    )),
}))

describe('Home', () => {
  afterEach(cleanup)

  it('should render the tabs with correct titles', () => {
    render(<Home />)

    expect(screen.getByText('flux')).toBeInTheDocument()
    expect(screen.getByText('movies')).toBeInTheDocument()
    expect(screen.getByText('series')).toBeInTheDocument()
  })

  it('should render the correct components for each tab', async () => {
    render(<Home />)

    expect(screen.getByText('Flux Component')).toBeInTheDocument()
    expect(screen.getByText('Movies List')).toBeInTheDocument()
    expect(screen.getByText('Series List')).toBeInTheDocument()
  })
})
