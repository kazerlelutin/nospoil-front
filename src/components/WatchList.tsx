import { useSession } from '@/providers/session'
import { supabase } from '@/utils/supabase'
import { useEffect, useState } from 'preact/hooks'
import { Loader } from './Loader'
import { WatchListTvCard } from './WatchListTvCard'
import { InterObsProvider } from '@/providers/interObs'

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

  return (
    <div class="overflow-y-auto p-2 flex flex-col gap-4">
      {watchList.map((item) => {
        if (item.type === 'tv')
          return (
            <InterObsProvider>
              <WatchListTvCard item={item} key={item.id} />
            </InterObsProvider>
          )

        return (
          <div class="flex gap-3">
            <img
              class="w-10 h-auto"
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title}
            />
            <div class="flex flex-col gap-1">
              <span class="text-sm">{item.title}</span>
              <span class="text-xs">{item.release_date}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
