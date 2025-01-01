import { useInterObs } from '@/hooks/useInterObs'
import { TvState } from './TvState'
import { Watchlist } from '@/types/Watchlist'

type WatchListTvCardProps = {
  item: Watchlist
}

export function WatchListTvCard({ item }: WatchListTvCardProps) {
  const interObs = useInterObs()

  const link = `/media/tv/${item.tmdb_id}`

  return (
    <article class="w-full rounded-md border-solid border-1 border-white/10 overflow-hidden relative grid grid-cols-[auto_1fr]">
      <a href={link} class=" flex items-center justify-center">
        <img
          src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
          alt={item.title}
          class="w-28 h-40 object-cover"
          onError={(e) => {
            e.currentTarget.src = '/poster.svg'
          }}
        />
      </a>
      <TvState item={item} canFetch={interObs} />
    </article>
  )
}
