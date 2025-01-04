import { useEffect, useMemo } from 'preact/hooks'
import { i18n } from '@/utils/i18n'
import { useInterObs } from '@/hooks/useInterObs'
import { useFetchSeasons } from '@/hooks/useFetchSeasons'
import { Watchlist } from '@/types/Watchlist'

type WatchListTvCardProps = {
  item: Watchlist
}

export function WatchListTvCardRead({ item }: WatchListTvCardProps) {
  const interObs = useInterObs()
  const currentSeason = item.current_season || 1
  const currentEpisode = item.current_episode || 0

  const link = `/media/tv/${item.tmdb_id}`

  const { seasons, fetchSeason } = useFetchSeasons(item.tmdb_id)

  const episodeRemaining = useMemo(() => {
    return (
      seasons?.reduce((acc, s) => {
        if (s.season_number > currentSeason) {
          acc += s.episode_count
        }
        if (s.season_number === currentSeason) {
          acc += s.episode_count - currentEpisode
        }
        return acc
      }, 0) || 0
    )
  }, [currentEpisode, currentSeason, seasons])

  useEffect(() => {
    if (interObs && seasons?.length === 0) fetchSeason()
  }, [interObs])

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
      <div class="p-2 flex flex-col justify-between">
        <header class="flex gap-3 items-center justify-between">
          <h2 class="text-lg font-bold p-0 m-0 mb-2">
            <a
              href={link}
              data-placeholder={!item.id}
              class="text-white no-underline text-lg font-bold"
            >
              {item.title}
            </a>
          </h2>
        </header>
        <div class="flex gap-3">
          <div class="flex-1 relative h-4 rounded-md overflow-hidden border-solid border-1 border-white/15">
            <div
              class="absolute top-0 left-0 bottom-0 bg-green-800"
              role="progressbar"
              style={{
                width: `${
                  (currentEpisode /
                    seasons?.find((s) => s.season_number === currentSeason)
                      ?.episode_count) *
                  100
                }%`,
              }}
            />
            <div class="absolute inset-0 bg-white/10 border-solid border-3 border-black rounded-md" />
          </div>
        </div>
        <div class="flex justify-between items-center gap-2">
          <div class="font-bold">
            E{currentEpisode}S{currentSeason}
          </div>
          <div class="italic text-sm text-right">
            {i18n.t(
              episodeRemaining === 0
                ? 'episodeRemaining_0'
                : 'episodeRemaining',
              {
                count: episodeRemaining,
              }
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
