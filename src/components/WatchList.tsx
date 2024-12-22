import { useSession } from '@/providers/session'
import { supabase } from '@/utils/supabase'
import { useEffect, useState } from 'preact/hooks'
import { Loader } from './Loader'
import { WatchListTvCard } from './WatchListTvCard'
import { InterObsProvider } from '@/providers/interObs'
import { WatchListMovieCard } from './WatchListMovieCard'
import { i18n } from '@/utils/i18n'
import { PER_PAGE } from '@/utils/constants'
import { Pagination } from './Pagination'

type WatchListProps = {
  type: 'movie' | 'tv'
}

export function WatchList({ type }: WatchListProps) {
  const session = useSession()

  const [watchList, setWatchList] = useState([])
  const [loadingCount, setLoadingCount] = useState(false)
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const totalPages = Math.ceil(total / PER_PAGE)

  const fetchWatchListCount = async () => {
    if (!session?.user?.id) return
    if (loadingCount) return
    setLoadingCount(true)
    const { count, error } = await supabase
      .from('watchlist')
      .select('id', { count: 'exact', head: true })
      .eq('type', type)
      .eq('user_id', session.user.id)

    if (error) {
      console.error('Error fetching watchlist:', error.message)
      return
    }
    setLoadingCount(false)
    setTotal(count)
  }

  const fetchWatchList = async (page: number) => {
    if (!session?.user?.id) return
    setLoading(true)

    const { data, error } = await supabase
      .from('watchlist')
      .select()
      .eq('type', type)
      .eq('user_id', session.user.id)
      .order('updated_at', { ascending: false })
      .range((page - 1) * PER_PAGE, page * PER_PAGE - 1)

    if (error) {
      console.error('Error fetching watchlist:', error.message)
      return
    }

    setWatchList(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchWatchListCount()
  }, [session?.user?.id, type])

  if (!watchList.length && !loadingCount && !loading)
    return (
      <div class="text-center text-white">
        {i18n.t('noTypeOnWatchlist', { type })}
      </div>
    )

  return (
    <div class="h-full grid grid-rows-[1fr_auto] gap-2">
      <div class="relative h-full">
        <div class="absolute inset-0 overflow-y-auto p-2 flex flex-col gap-4">
          {loading && (
            <div class="flex items-center justify-center p-3">
              <Loader />
            </div>
          )}

          {watchList.map((item) => {
            if (item.type === 'tv')
              return (
                <InterObsProvider>
                  <WatchListTvCard item={item} key={item.id} />
                </InterObsProvider>
              )

            if (item.type === 'movie')
              return (
                <div>
                  <WatchListMovieCard item={item} key={item.id} />
                </div>
              )
            return null
          })}
        </div>
      </div>
      <div>
        {!loadingCount && (
          <Pagination totalPages={totalPages} onFetch={fetchWatchList} />
        )}
      </div>
    </div>
  )
}
