import { Loader } from './Loader'
import { InterObsProvider } from '@/providers/interObs'
import { i18n } from '@/utils/i18n'
import { useRoute } from 'preact-iso'
import { WatchListMovieCardRead } from './WatchListMovieCardRead'
import { WatchListTvCardRead } from './WatchListTvCardRead'
import { MEDIA_TYPE } from '@/types/media'
import { useWatchlists } from '@/hooks/useWatchlists'
import { useWatchlistsCount } from '@/hooks/useWatchlistsCount'
import { PER_PAGE } from '@/utils/constants'
import { Pagination } from './Pagination'

type WatchListProps = {
  type: MEDIA_TYPE
}

export function WatchListRead({ type }: WatchListProps) {
  const {
    params: { user_id },
  } = useRoute()

  const { loading: loadingCount, watchListsCount } = useWatchlistsCount(
    user_id,
    type
  )
  const { loading, watchLists, fetchWatchList } = useWatchlists(user_id, type)
  const totalPages = Math.ceil(watchListsCount / PER_PAGE)

  return (
    <div class="overflow-y-auto p-2 flex flex-col gap-4">
      {loading && (
        <div class="flex justify-center items-center m-4">
          <Loader />
        </div>
      )}
      {!watchLists?.length ? (
        <div class="text-center text-white">
          {i18n.t('noTypeOnWatchlist', { type })}
        </div>
      ) : (
        watchLists?.map((watchList) => {
          if (watchList.type === 'tv')
            return (
              <InterObsProvider>
                <WatchListTvCardRead item={watchList} key={watchList.id} />
              </InterObsProvider>
            )

          if (watchList.type === 'movie')
            return (
              <div>
                <WatchListMovieCardRead item={watchList} key={watchList.id} />
              </div>
            )
          return null
        })
      )}

      {!loadingCount && (
        <Pagination totalPages={totalPages} onFetch={fetchWatchList} />
      )}
    </div>
  )
}
