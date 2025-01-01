import { render, screen, fireEvent, waitFor } from '@testing-library/preact'
import { MediaList } from '@/components/MediaList'
import { describe, it, expect, vi } from 'vitest'
import { useDebounce } from '@/hooks/useDebounce'

// Mock des dépendances
vi.mock('@/utils/i18n', () => ({
  i18n: {
    t: vi.fn((key) => key),
  },
}))

vi.mock('@/hooks/useDebounce', () => ({
  useDebounce: vi.fn((value) => value),
}))

vi.mock('@/components/SearchMedia', () => ({
  SearchMedia: () => <div>Mocked SearchMedia</div>,
}))

vi.mock('@/components/WatchList', () => ({
  WatchList: () => <div>Mocked WatchList</div>,
}))

describe('MediaList', () => {
  it('should render search input and watch list', () => {
    render(<MediaList type="movie" />)
    expect(screen.getByPlaceholderText('search : movie')).toBeInTheDocument()
    expect(screen.getByText('Mocked WatchList')).toBeInTheDocument()
  })

  it('should show search results when search is not empty', () => {
    //@ts-ignore
    useDebounce.mockReturnValue('test search')
    render(<MediaList type="movie" />)
    expect(screen.getByText('Mocked SearchMedia')).toBeInTheDocument()
  })

  it('should show cancel button when input is focused or has text', () => {
    render(<MediaList type="movie" />)
    const input = screen.getByPlaceholderText('search : movie')
    fireEvent.focus(input)
    expect(screen.getByText('cancel')).toBeInTheDocument()
    fireEvent.change(input, { target: { value: 'test' } })
    expect(screen.getByText('cancel')).toBeInTheDocument()
  })

  it('should clear search when cancel button is clicked', async () => {
    render(<MediaList type="movie" />)
    const input = screen.getByPlaceholderText('search : movie')

    fireEvent.change(input, { target: { value: 'test' } })

    await waitFor(() => {
      fireEvent.focus(input)
      expect(screen.getByText('cancel')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('cancel'))
    await waitFor(() => {
      expect(input).toHaveValue('')
    })
  })
})
