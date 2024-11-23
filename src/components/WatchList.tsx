import { useSession } from '@/providers/session'
import { supabase } from '@/utils/supabase'
import { useEffect, useState } from 'preact/hooks'
import { Loader } from './Loader'
import { WatchListTvCard } from './WatchListTvCard'
import { InterObsProvider } from '@/providers/interObs'
import { WatchListMovieCard } from './WatchListMovieCard'
import { i18n } from '@/utils/i18n'

type WatchListProps = {
  type: 'movie' | 'tv'
}

export function WatchList({ type }: WatchListProps) {
  const session = useSession()

  const [watchList, setWatchList] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchWatchList = async () => {
    if (!session?.user?.id) return
    setLoading(true)

    const { data, error } = await supabase
      .from('watchlist')
      .select()
      .eq('type', type)
      .eq('user_id', session.user.id)
      .order('updated_at', { ascending: false })

    if (error) {
      console.error('Error fetching watchlist:', error.message)
      return
    }

    setWatchList(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchWatchList()
  }, [session?.user?.id, type])

  if (loading)
    return (
      <div class="flex justify-center m-4">
        <Loader />
      </div>
    )

  if (!watchList.length)
    return (
      <div class="text-center text-white">
        {i18n.t('noTypeOnWatchlist', { type })}
      </div>
    )

  return (
    <div class="overflow-y-auto p-2 flex flex-col gap-4">
      {watchList.map((item) => {
        if (item.type === 'tv')
          return (
            <InterObsProvider>
              <WatchListTvCard
                item={item}
                key={item.id}
                removeCb={fetchWatchList}
              />
            </InterObsProvider>
          )

        if (item.type === 'movie')
          return (
            <div>
              <WatchListMovieCard
                item={item}
                key={item.id}
                removeCb={fetchWatchList}
              />
            </div>
          )
        return null
      })}
    </div>
  )
}
