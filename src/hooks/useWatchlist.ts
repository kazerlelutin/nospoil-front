import { useEffect } from 'preact/hooks'
import { supabase } from '@/utils/supabase'
import { useAsyncState } from '@/hooks/useAsyncState'

export function useWatchlist(userId: string, tmdbId: number) {
  const {
    data: watchlist,
    setData: setWatchlist,
    loading,
    error,
    run,
  } = useAsyncState<any>()

  useEffect(() => {
    if (!userId || !tmdbId) return

    run(async () => {
      const { data, error } = await supabase
        .from('watchlist')
        .select('*')
        .eq('user_id', userId)
        .eq('tmdb_id', tmdbId)
        .maybeSingle()

      console.log(error)
      if (error) throw new Error(error.message)
      return data
    })
  }, [userId, tmdbId])

  return { watchlist, setWatchlist, loading, error }
}
