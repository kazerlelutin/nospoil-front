import { i18n } from '@/utils/i18n'
import { Watchlist } from '@/types/Watchlist'

type WatchListTvCardProps = {
  item: Watchlist
}

export function WatchListMovieCardRead({ item }: WatchListTvCardProps) {
  const link = `/media/movie/${item.tmdb_id}`

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

        <div class="flex gap-3 flex-wrap">
          <div class="p-2  h-8 flex movies-center justify-center bg-transparent rounded-md  text-green-700 font-bold">
            {i18n.t(item.status)}
          </div>
        </div>
      </div>
    </article>
  )
}
