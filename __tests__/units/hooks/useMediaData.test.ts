import { useMediaData } from '@/hooks/useMediaData'
import { renderHook, waitFor } from '@testing-library/preact'
import { describe, it, expect, vi } from 'vitest'

// Mock des dépendances
vi.mock('@/utils/i18n', () => ({
  i18n: {
    language: 'en',
  },
}))

describe('useMediaData', () => {
  it('should fetch media data successfully', async () => {
    const { result } = renderHook(() => useMediaData(30, 'movie'))

    await waitFor(() => {
      expect(result.current.media).toEqual(
        expect.objectContaining({ id: 30, title: 'Test Movie' })
      )
    })
  })

  it('should handle fetch error', async () => {
    const { result } = renderHook(() => useMediaData(404, 'movie'))

    await waitFor(() => {
      expect(result.current.media).toBe(null)
      expect(result.current.loading).toBe(false)
      expect(result.current.error).toEqual(
        'Unexpected token \'N\', "Not Found" is not valid JSON'
      )
    })
  })
})
