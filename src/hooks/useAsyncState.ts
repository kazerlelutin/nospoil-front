import { useState } from 'preact/hooks'

export function useAsyncState<T>() {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const run = async (callback: () => Promise<T>) => {
    setLoading(true)
    setError(null)
    try {
      const result = await callback()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return { data, setData, loading, error, run }
}
