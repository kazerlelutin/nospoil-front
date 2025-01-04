import { useState } from 'preact/hooks'
import { useAsyncState } from './useAsyncState'
import { i18n } from '@/utils/i18n'
import { supabase } from '@/utils/supabase'
import { useSession } from '@/providers/session'
import { Watchlist } from '@/types/Watchlist'

export function useSearchMedia(type: 'movie' | 'tv') {
  const session = useSession()
  const {
    data,
    setData: setMedia,
    loading,
    error,
    run,
  } = useAsyncState<Watchlist[]>()

  const [noResult, setNoResult] = useState(false)

  const searchFn = (search: string) =>
    run(async () => {
      setNoResult(false)

      if (!search) return
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }tv/search/${type}?query=${search}&language=${
            i18n.language
          }&limit=100`
        )

        if (!res.ok) throw new Error('Error fetching data for search')

        const { results } = await res.json()

        const { data: wl } = await supabase
          .from('watchlist')
          .select()
          .eq('user_id', session.user.id)
          .in(
            'tmdb_id',
            results.map((r: any) => r.id)
          )

        if (!results.length) setNoResult(true)

        return results.map((r: any) => {
          const wlItem = wl.find((w: any) => w.tmdb_id == r.id)
          return {
            ...r,
            type,
            title: r.title || r.name,
            tmdb_id: r.id || wlItem.tmdb_id,
            ...wlItem,
          }
        })
      } catch (error) {
        console.log('SEARCH ERR', error)
        throw new Error(error.message)
      }
    })

  return { data, loading, error, noResult, setMedia, searchFn }
}
