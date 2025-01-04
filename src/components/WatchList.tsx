import { useSession } from '@/providers/session'
import { Loader } from './Loader'
import { WatchListTvCard } from './WatchListTvCard'
import { InterObsProvider } from '@/providers/interObs'
import { WatchListMovieCard } from './WatchListMovieCard'
import { i18n } from '@/utils/i18n'
import { PER_PAGE } from '@/utils/constants'
import { Pagination } from './Pagination'
import { useWatchlistsCount } from '@/hooks/useWatchlistsCount'
import { useWatchlists } from '@/hooks/useWatchlists'

type WatchListProps = {
  type: 'movie' | 'tv'
}

export function WatchList({ type }: WatchListProps) {
  const session = useSession()

  const user_id = session?.user?.id

  const { loading: loadingCount, watchListsCount } = useWatchlistsCount(
    user_id,
    type
  )
  const { loading, watchLists, fetchWatchList } = useWatchlists(user_id, type)
  const totalPages = Math.ceil(watchListsCount / PER_PAGE)

  return (
    <div class="h-full grid grid-rows-[1fr_auto] gap-2">
      <div class="relative h-full">
        <div class="absolute inset-0 overflow-y-auto p-2 flex flex-col gap-4">
          {(loading || loadingCount) && (
            <div class="flex items-center justify-center p-3">
              <Loader />
            </div>
          )}

          {!watchLists?.length && !loadingCount && !loading ? (
            <div class="text-center text-white">
              {i18n.t('noTypeOnWatchlist', { type })}
            </div>
          ) : (
            watchLists?.map((item) => {
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
            })
          )}
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
