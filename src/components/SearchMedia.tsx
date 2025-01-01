import { i18n } from '@/utils/i18n'
import { useEffect } from 'preact/hooks'
import { MediaCard } from './MediaCard'
import { InterObsProvider } from '@/providers/interObs'
import { WatchListTvCard } from './WatchListTvCard'
import { WatchListMovieCard } from './WatchListMovieCard'
import { useSearchMedia } from '@/hooks/useSearchMedia'

type SearchProps = {
  type: 'movie' | 'tv'
  search: string
}

export function SearchMedia({ type, search }: SearchProps) {
  const { loading, data, noResult, searchFn } = useSearchMedia(type)

  useEffect(() => {
    searchFn(search)
  }, [search])

  return (
    <div class="relative h-full">
      {loading && (
        <div class="flex flex-col gap-3" role="status">
          {Array.from({
            length: 12,
          }).map((_, index) => (
            <MediaCard key={`${index}`} type={type} />
          ))}
        </div>
      )}
      <div
        data-loading={loading}
        class="absolute inset-0 overflow-y-auto data-[loading=true]:overflow-hidden p-x-1"
      >
        {data?.length > 0 && !loading && (
          <div class="flex flex-col gap-3">
            {data.map((item) => {
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
        )}

        {noResult && (
          <p class="text-center text-dark-error">{i18n.t('noResult')}</p>
        )}
      </div>
    </div>
  )
}
