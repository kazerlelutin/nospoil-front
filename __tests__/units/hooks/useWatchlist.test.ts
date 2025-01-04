import { describe, it, expect, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/preact'
import { useWatchlist } from '@/hooks/useWatchlist'

// Mock des dépendances
vi.mock('@/utils/i18n', () => ({
  i18n: {
    language: 'en',
  },
}))

describe('useWatchlist', () => {
  const user_id = '123'

  it('should fetch and set watchlists', async () => {
    const { result } = renderHook(() => useWatchlist(user_id, 1))

    await waitFor(() => {
      expect(result.current.watchlist).toEqual(
        expect.objectContaining({ id: 1, type: 'movie', title: 'Test Movie' })
      )
    })
  })

  it('should handle fetch error', async () => {
    //@ts-ignore
    const { result } = renderHook(() => useWatchlist(user_id, 'error'))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.error).toEqual('ERROR')
    })
  })
})
