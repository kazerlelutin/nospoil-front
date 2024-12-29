import { useMedia } from '@/hooks/useMedia'
import { describe, it, expect } from 'vitest'
import { MediaCtx } from '@/providers/media'
import { renderHook } from '@testing-library/preact'

describe('useMedia', () => {
  it('should return the context value', () => {
    const mockContextValue = {
      media: 'test media',
      isInWatchlist: false,
      watchlist: undefined,
      loading: true,
      setWatchlist: () => {},
    } as any

    const wrapper = ({ children }: { children: any }) => (
      <MediaCtx.Provider value={mockContextValue}>{children}</MediaCtx.Provider>
    )

    const { result } = renderHook(() => useMedia(), { wrapper })

    expect(result.current).toBe(mockContextValue)
  })
})
