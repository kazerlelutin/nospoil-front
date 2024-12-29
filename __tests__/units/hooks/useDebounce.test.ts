import { useDebounce } from '@/hooks/useDebounce'
import { renderHook, waitFor } from '@testing-library/preact'
import { describe, it, expect, vi } from 'vitest'

describe('useDebounce', () => {
  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500))
    expect(result.current).toBe('initial')
  })

  it('should update the debounced value after the delay', async () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      }
    )

    rerender({ value: 'updated', delay: 500 })

    vi.advanceTimersByTime(500)

    waitFor(() => {
      expect(result.current).toBe('updated')
    })
    vi.useRealTimers()
  })

  it('should reset the timer if the value changes before the delay', async () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      }
    )

    rerender({ value: 'updated', delay: 500 })

    vi.advanceTimersByTime(300)

    // Change the value again before the delay is reached

    rerender({ value: 'final', delay: 500 })

    vi.advanceTimersByTime(200)

    // The debounced value should still be 'initial' because the timer was reset
    expect(result.current).toBe('initial')

    waitFor(() => {
      expect(result.current).toBe('final')
    })
    vi.useRealTimers()
  })
})
