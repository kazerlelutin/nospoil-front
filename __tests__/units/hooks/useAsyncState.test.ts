import { useAsyncState } from '@/hooks/useAsyncState'
import { renderHook, waitFor } from '@testing-library/preact'
import { describe, it, expect, vi } from 'vitest'

describe('useAsyncState', () => {
  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useAsyncState<string>())

    expect(result.current.data).toBeNull()
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('should set loading to true while running', async () => {
    const { result } = renderHook(() => useAsyncState<string>())

    await waitFor(async () => {
      result.current.run(
        () => new Promise((resolve) => setTimeout(() => resolve('data'), 100))
      )
    })

    expect(result.current.loading).toBe(true)
  })

  it('should set data and loading to false after successful run', async () => {
    const { result } = renderHook(() => useAsyncState<string>())

    await waitFor(async () => {
      await result.current.run(() => Promise.resolve('data'))
    })

    await waitFor(() => {
      expect(result.current.data).toBe('data')
      expect(result.current.loading).toBe(false)
      expect(result.current.error).toBeNull()
    })
  })

  it('should set error and loading to false after failed run', async () => {
    const { result } = renderHook(() => useAsyncState<string>())

    await waitFor(async () => {
      await result.current.run(() => Promise.reject(new Error('error')))
    })

    await waitFor(() => {
      expect(result.current.data).toBeNull()
      expect(result.current.loading).toBe(false)
      expect(result.current.error).toBe('error')
    })
  })
})
