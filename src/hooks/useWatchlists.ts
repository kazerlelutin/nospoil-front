import { supabase } from '@/utils/supabase'
import { MEDIA_TYPE } from '@/types/media'
import { PER_PAGE } from '@/utils/constants'
import { useState } from 'preact/hooks'
import { Watchlist } from '@/types/Watchlist'

export function useWatchlists(userId: string, type: MEDIA_TYPE = 'movie') {
  const [watchLists, setWatchlists] = useState<Watchlist[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchWatchList = async (page: number) => {
    if (!userId) return
    setLoading(true)
    const { data, error } = await supabase
      .from('watchlist')
      .select()
      .eq('type', type)
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })
      .range((page - 1) * PER_PAGE, page * PER_PAGE - 1)

    setLoading(false)
    if (error) {
      setError(error.message)
      console.error('Error fetching watchlist:', error.message)
      return
    } else {
      setWatchlists(data)
    }
  }

  return {
    error,
    loading,
    watchLists,
    setWatchlists,
    fetchWatchList,
  }
}
