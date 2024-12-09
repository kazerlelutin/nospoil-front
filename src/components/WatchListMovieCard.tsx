import type { MediaStatus } from '@/utils/constants'
import { MovieState } from './MovieState'

type WatchListTvCardProps = {
  item: {
    poster_path: string
    title: string
    release_date: string
    id: number
    tmdb_id: number
    overview: string
    status: MediaStatus
  }
}

export function WatchListMovieCard({ item }: WatchListTvCardProps) {
  const link = `/media/movie/${item.tmdb_id}`

  return (
    <article class="w-full rounded-md border-solid border-1 border-white/10 overflow-hidden relative grid grid-cols-[auto_1fr]">
      <a href={link} class=" flex items-center justify-center">
        <img
          src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
          alt={item.title}
          width={112}
          height={160}
          class="object-contain"
          onError={(e) => {
            e.currentTarget.src = '/poster.svg'
          }}
        />
      </a>

      <div class="p-2 flex flex-col gap-4">
        <header class="flex gap-3 items-center justify-between">
          <h2 class="text-lg font-bold p-0 m-0 ">
            <a
              href={link}
              data-placeholder={!item.id}
              class="text-white no-underline text-lg font-bold"
            >
              {item.title}
            </a>
          </h2>
        </header>
        <MovieState movie={item} id={item.tmdb_id} />
      </div>
    </article>
  )
}
