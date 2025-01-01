import { useFetchSeasons } from '@/hooks/useFetchSeasons'
import { describe, it, expect, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/preact'

// Mock des dépendances
vi.mock('@/utils/i18n', () => ({
  i18n: {
    language: 'en',
  },
}))

describe('useFetchSeasons', () => {
  it('should fetch and set seasons', async () => {
    const { result } = renderHook(() => useFetchSeasons(1))

    await waitFor(async () => {
      await result.current.fetchSeason()
    })

    await waitFor(() => {
      expect(result.current.seasons).toEqual(
        expect.objectContaining([
          { season_number: 1, episode_count: 10 },
          { season_number: 2, episode_count: 10 },
        ])
      )
    })
  })

  it('should handle fetch error', async () => {
    const { result } = renderHook(() => useFetchSeasons(666))

    await waitFor(async () => {
      await result.current.fetchSeason()
    })

    await waitFor(() => {
      expect(result.current.seasons).toEqual(null)
      expect(result.current.error).toEqual('Error fetching seasons')
    })
  })
})
