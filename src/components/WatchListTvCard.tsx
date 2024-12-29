import { useInterObs } from '@/hooks/useInterObs'
import { TvState } from './TvState'

type WatchListTvCardProps = {
  item: {
    poster_path: string
    title: string
    release_date: string
    current_season: number
    current_episode: number
    id: number
    tmdb_id: number
    overview: string
  }
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
