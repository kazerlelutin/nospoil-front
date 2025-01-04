import { useEffect } from 'preact/hooks'
import { supabase } from '@/utils/supabase'
import { useAsyncState } from '@/hooks/useAsyncState'
import { MEDIA_TYPE } from '@/types/media'

export function useWatchlistsCount(userId: string, type: MEDIA_TYPE = 'movie') {
  const {
    data: watchListsCount,
    setData: setWatchlists,
    loading,
    error,
    run,
  } = useAsyncState<number>()

  useEffect(() => {
    run(async () => {
      if (!userId) return 0
      const { count, error } = await supabase
        .from('watchlist')
        .select('id', { count: 'exact', head: true })
        .eq('type', type)
        .eq('user_id', userId)

      if (error) throw new Error(error.message)

      return count
    })
  }, [userId, type])

  return { watchListsCount, setWatchlists, loading, error }
}
