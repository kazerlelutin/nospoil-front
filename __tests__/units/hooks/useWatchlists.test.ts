import { useWatchlists } from '@/hooks/useWatchlists'
import { describe, it, expect, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/preact'

// Mock des dépendances
vi.mock('@/utils/i18n', () => ({
  i18n: {
    language: 'en',
  },
}))

describe('useWatchlists', () => {
  const user_id = '123'
  const type = 'movie'

  it('should fetch and set watchlists', async () => {
    const { result } = renderHook(() => useWatchlists(user_id, type))

    await waitFor(() => {
      result.current.fetchWatchList(1)
    })

    await waitFor(() => {
      expect(result.current.watchLists).toEqual(
        expect.objectContaining([
          { id: 1, type: 'movie', title: 'Test Movie' },
          { id: 2, type: 'tv', title: 'Test TV Show' },
        ])
      )
    })
  })

  it('should handle fetch error', async () => {
    //@ts-ignore
    const { result } = renderHook(() => useWatchlists(user_id, 'error'))
    await waitFor(() => {
      result.current.fetchWatchList(1)
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.error).toEqual('ERROR')
    })
  })
})
