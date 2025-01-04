import { useSearchMedia } from '@/hooks/useSearchMedia'
import { renderHook, waitFor } from '@testing-library/preact'
import { describe, it, expect, vi } from 'vitest'

// Mock des dépendances
vi.mock('@/utils/i18n', () => ({
  i18n: {
    language: 'en',
  },
}))

vi.mock('@/providers/session', () => ({
  useSession: () => ({ user: { id: '1' } }),
}))

describe('useSearchMedia', () => {
  it('should fetch media data successfully', async () => {
    const { result } = renderHook(() => useSearchMedia('movie'))

    await result.current.searchFn('test')

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.data).toEqual(
        expect.objectContaining([
          { id: 100, type: 'movie', title: 'Test Movie', tmdb_id: 100 },
        ])
      )
    })
  })

  it('should handle fetch error', async () => {
    const { result } = renderHook(() => useSearchMedia('movie'))

    await waitFor(async () => {
      await result.current.searchFn('test error')
    })

    await waitFor(() => {
      expect(result.current.data).toBe(null)
      expect(result.current.loading).toBe(false)
      expect(result.current.error).toEqual('Error fetching data for search')
    })
  })
})
