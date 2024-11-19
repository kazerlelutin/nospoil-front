import { useInterObs } from '@/providers/interObs'
import { i18n } from '@/utils/i18n'
import { useEffect, useMemo, useState } from 'preact/hooks'
import { ToggleInWatchList } from './ToggleInWatchList'
import { supabase } from '@/utils/supabase'
import { useSession } from '@/providers/session'

type WatchListTvCardProps = {
  item: {
    poster_path: string
    name: string
    release_date: string
    current_season: number
    current_episode: number
    id: number
    tmdb_id: number
    overview: string
  }
}

export function WatchListTvCard({ item }: WatchListTvCardProps) {
  const session = useSession()
  const [currentSeason, setCurrentSeason] = useState(item.current_season || 1)
  const [currentEpisode, setCurrentEpisode] = useState(
    item.current_episode || 1
  )

  const interObs = useInterObs()
  const [seasons, setSeasons] = useState<
    {
      season: number
      episode_count: number
    }[]
  >([])

  const episodeRemaining = useMemo(() => {
    return seasons.reduce((acc, s) => {
      if (s.season > currentSeason) {
        acc += s.episode_count
      }
      if (s.season === currentSeason) {
        acc += s.episode_count - currentEpisode
      }
      return acc
    }, 0)
  }, [currentEpisode, currentSeason, seasons])

  const link = `/media/tv/${item.tmdb_id}`
  const fetchSeason = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}tv/tv/${item.tmdb_id}?language=${
          i18n.language
        }`
      )
      const { seasons: dataSeasons } = await res.json()
      setSeasons(
        dataSeasons.map(
          (s: { season_number: number; episode_count: number }) => ({
            season: s.season_number,
            episode_count: s.episode_count,
          })
        )
      )
    } catch (error) {
      console.error('Error fetching watchlist:', error.message)
    } finally {
    }
  }

  const handleEpisodeChange = async (episode: number) => {
    const oldEpisode = currentEpisode
    setCurrentEpisode(episode)

    const { error } = await supabase
      .from('watchlist')

      .update({
        current_episode: episode,
        current_season: currentSeason,
        updated_at: new Date(),
      })
      .eq('id', item.id)
      .eq('user_id', session.user.id)

    if (error) setCurrentEpisode(oldEpisode)
  }

  useEffect(() => {
    if (interObs) fetchSeason()
  }, [interObs])

  return (
    <article class="w-full flex flex-col gap-3 rounded-md border-solid border-1 border-white/10 p-2">
      <div class="flex gap-3">
        <div class="w-16 flex items-center justify-center ">
          {item.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.name}
              class="w-full h-auto"
            />
          ) : (
            <div class="w-16 h-24 bg-white/10 rounded-sm"></div>
          )}
        </div>

        <div class="flex-1">
          <a
            href={link}
            data-placeholder={!item.id}
            class="data-[placeholder=true]:bg-white/10 data-[placeholder=true]:rounded-sm data-[placeholder=true]:h-6 no-underline text-xl font-bold"
          >
            {item.name}
          </a>
          <p
            data-placeholder={!item.id}
            class="data-[placeholder=true]:bg-white/10 data-[placeholder=true]:rounded-sm data-[placeholder=true]:h-20"
          >
            {item.overview ? (
              item.overview
            ) : (
              <span class="italic">{item.id && i18n.t('noOverview')}</span>
            )}
          </p>
        </div>
      </div>
      <div class="flex justify-end gap-6 items-center">
        <a href={link}>{i18n.t('moreInfo')}</a>
        <ToggleInWatchList
          id={item.id}
          title={item.name}
          type="tv"
          poster_path={item.poster_path}
          isAdd={true}
        />
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex gap-2 items-center">
          <label for={`season-${item.id}`}>{i18n.t('season')}</label>

          <select
            name={`season-${item.id}`}
            id={`season-${item.id}`}
            value={currentSeason}
            onChange={(e) => {
              const newSeason = Number((e.target as HTMLSelectElement).value)
              setCurrentSeason(newSeason)
              if (newSeason < currentSeason)
                setCurrentEpisode(
                  seasons.find((s) => s.season === newSeason)?.episode_count ||
                    1
                )
              if (newSeason > currentSeason) setCurrentEpisode(1)
            }}
            class="p-2 bg-transparent border-none border-b-solid border-b-white/10 rounded-none flex-1 text-md cursor-pointer"
          >
            {seasons.map((s) => (
              <option
                value={s.season}
                selected={s.season === currentSeason}
                class="bg-dark-bg text-md"
              >
                {s.season === 0 ? i18n.t('specials') : s.season}
              </option>
            ))}
          </select>
        </div>
        <div class="flex flex-wrap gap-3">
          {Array.from(
            {
              length:
                seasons.find((s) => s.season === currentSeason)
                  ?.episode_count || 0,
            },
            (_, i) => i + 1
          ).map((episode) => (
            <button
              data-current={episode === currentEpisode}
              data-is-before={episode < currentEpisode}
              class="cursor-pointer p-2 w-8 h-8 flex items-center justify-center bg-transparent border-solid border-white/10 rounded-md data-[current=true]:border-green-600 data-[current=true]:text-green-600 data-[is-before=true]:opacity-50"
              onClick={() => handleEpisodeChange(episode)}
            >
              {episode + 10}
            </button>
          ))}
        </div>
        <div class="italic text-sm text-right">
          {i18n.t('episodeRemaining', {
            count: episodeRemaining,
          })}
        </div>
      </div>
    </article>
  )
}
