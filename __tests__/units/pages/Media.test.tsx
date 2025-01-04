import { render, screen } from '@testing-library/preact'
import { Media } from '@/pages/Media'
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

vi.mock('@/components/Reviews', () => ({
  Reviews: () => <div>Reviews Component</div>,
}))

vi.mock('@/components/MediaDetails', () => ({
  MediaDetails: () => <div>MediaDetails Component</div>,
}))

vi.mock('@/components/PersistTabs', () => ({
  PersistTabs: ({ tabs }) => (
    <div>
      {tabs.map((tab: { id: string; title: string; content: string }) => (
        <div key={tab.id}>
          {tab.title} {tab.content}
        </div>
      ))}
    </div>
  ),
}))

vi.mock('@/components/MediaResume', () => ({
  MediaResume: () => <div>MediaResume Component</div>,
}))

vi.mock('@/providers/media', () => ({
  MediaProvider: ({ children }) => <div>{children}</div>,
}))

describe('Media', () => {
  it('should render the tabs with correct titles', () => {
    //@ts-ignore
    useRoute.mockReturnValue({
      params: { type: 'movie', id: '1' },
    })

    render(<Media />)

    expect(screen.getByText('reviews')).toBeInTheDocument()
    expect(screen.getByText('details')).toBeInTheDocument()
  })

  it('should render the correct components for each tab', () => {
    //@ts-ignore
    useRoute.mockReturnValue({
      params: { type: 'movie', id: '1' },
    })

    render(<Media />)

    expect(screen.getByText('Reviews Component')).toBeInTheDocument()
    expect(screen.getByText('MediaDetails Component')).toBeInTheDocument()
  })

  it('should render MediaResume component', () => {
    //@ts-ignore
    useRoute.mockReturnValue({
      params: { type: 'movie', id: '1' },
    })

    render(<Media />)

    expect(screen.getByText('MediaResume Component')).toBeInTheDocument()
  })

  it('should return null if type or id is invalid', () => {
    //@ts-ignore
    useRoute.mockReturnValue({
      params: { type: 'invalid', id: '1' },
    })

    const { container } = render(<Media />)
    expect(container).toBeEmptyDOMElement()
  })
})
