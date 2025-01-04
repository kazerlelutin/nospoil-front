import { render, screen, waitFor } from '@testing-library/preact'
import { SearchMedia } from '@/components/SearchMedia'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { useSearchMedia } from '@/hooks/useSearchMedia'

// Mock des dépendances
vi.mock('@/utils/i18n', () => ({
  i18n: {
    t: vi.fn((key) => key),
  },
}))

vi.mock('@/hooks/useSearchMedia', () => ({
  useSearchMedia: vi.fn(),
}))

describe('SearchMedia', () => {
  it('should render loader initially', () => {
    //@ts-ignore
    useSearchMedia.mockReturnValue({
      loading: true,
      data: [],
      noResult: false,
      searchFn: vi.fn(),
    })

    render(<SearchMedia type="movie" search="test" />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('should render no result message if no items found', async () => {
    //@ts-ignore
    useSearchMedia.mockReturnValue({
      loading: false,
      data: [],
      noResult: true,
      searchFn: vi.fn(),
    })

    render(<SearchMedia type="movie" search="test" />)

    await waitFor(() => {
      expect(screen.getByText('noResult')).toBeInTheDocument()
    })
  })

  it('should render search results', async () => {
    //@ts-ignore
    useSearchMedia.mockReturnValue({
      loading: false,
      data: [{ id: 1, type: 'movie', title: 'Test Movie' }],
      noResult: false,
      searchFn: vi.fn(),
    })

    render(<SearchMedia type="movie" search="test" />)

    await waitFor(() => {
      expect(screen.getByText('Test Movie')).toBeInTheDocument()
    })
  })

  it.todo('should handle search error', async () => {
    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    //@ts-ignore
    useSearchMedia.mockReturnValue({
      loading: false,
      data: [],
      noResult: false,
      searchFn: vi.fn(),
    })

    render(<SearchMedia type="movie" search="test error" />)

    await waitFor(() => {
      expect(consoleErrorMock).toHaveBeenCalledWith(
        'Error fetching search results:',
        'Search error'
      )
    })

    consoleErrorMock.mockRestore()
  })
})
