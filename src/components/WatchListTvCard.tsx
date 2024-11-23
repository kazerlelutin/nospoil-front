import { useInterObs } from '@/providers/interObs'
import { i18n } from '@/utils/i18n'
import { useEffect, useMemo, useState } from 'preact/hooks'
import { ToggleInWatchList } from './ToggleInWatchList'
import { supabase } from '@/utils/supabase'
import { useSession } from '@/providers/session'
import { EditIcon } from './editIcon'
import { Button } from './Button'

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
  removeCb: () => Promise<void>
}

export function WatchListTvCard({ item, removeCb }: WatchListTvCardProps) {
  const session = useSession()
  const [editMode, setEditMode] = useState(false)
  const [currentSeason, setCurrentSeason] = useState(item.current_season || 1)
  const [currentEpisode, setCurrentEpisode] = useState(
    item.current_episode || 0
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

  const handleEditMode = () => {
    setEditMode(!editMode)
  }

  useEffect(() => {
    if (interObs && seasons.length === 0) fetchSeason()
  }, [interObs, editMode])

  return (
    <article class="w-full rounded-md border-solid border-1 border-white/10 overflow-hidden relative grid grid-cols-[auto_1fr]">
      <a href={link} class=" flex items-center justify-center">
        <img
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          alt={item.title}
          class="w-28 h-40 object-cover"
          onError={(e) => {
            e.currentTarget.src = '/poster.svg'
          }}
        />
      </a>

      {!editMode ? (
        <div class="p-2 flex flex-col justify-between">
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
          <div class="flex gap-3">
            <div class="flex-1 relative h-4 rounded-md overflow-hidden border-solid border-1 border-white/15">
              <div
                class="absolute top-0 left-0 bottom-0 bg-green-800"
                style={{
                  width: `${
                    (currentEpisode /
                      seasons.find((s) => s.season === currentSeason)
                        ?.episode_count) *
                    100
                  }%`,
                }}
              />
              <div class="absolute inset-0 bg-white/10 border-solid border-3 border-black rounded-md" />
            </div>

            <button class="fill-dark-text w-4 h-auto" onClick={handleEditMode}>
              <EditIcon />
            </button>
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

          <footer class="flex justify-between gap-2 ">
            <ToggleInWatchList
              removeCb={removeCb}
              id={item.tmdb_id}
              title={item.title}
              type="tv"
              poster_path={item.poster_path}
              isAdd={true}
            />
          </footer>
        </div>
      ) : (
        <div class="gap-2 p-2 flex flex-col justify-between text-sm">
          <div class="flex flex-col gap-2 w-full">
            <div class="flex gap-2 justify-between items-center">
              <div class="flex gap-2 items-center">
                <label for={`season-${item.id}`}>{i18n.t('season')}</label>

                <select
                  name={`season-${item.id}`}
                  id={`season-${item.id}`}
                  value={currentSeason}
                  onChange={(e) => {
                    const newSeason = Number(
                      (e.target as HTMLSelectElement).value
                    )
                    setCurrentSeason(newSeason)
                    if (newSeason < currentSeason)
                      setCurrentEpisode(
                        seasons.find((s) => s.season === newSeason)
                          ?.episode_count || 1
                      )
                    if (newSeason > currentSeason) setCurrentEpisode(1)
                  }}
                  class="p-2 bg-transparent border-none rounded-none w-14 cursor-pointer font-bold"
                >
                  {seasons.map((s) => (
                    <option
                      value={s.season}
                      selected={s.season === currentSeason}
                      class="bg-dark-bg"
                    >
                      {s.season === 0 ? i18n.t('specials') : s.season}
                    </option>
                  ))}
                </select>
                <div class="ml-1 font-bold opacity-50">
                  <span>{' / '}</span>
                  {seasons?.[seasons.length - 1]?.season || 0}
                </div>
              </div>
              <Button onClick={handleEditMode}>{'X'}</Button>
            </div>
            <div class="flex flex-wrap gap-3 max-h-24 overflow-y-auto">
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
                  class="cursor-pointer p-2 w-7 h-7 flex items-center justify-center bg-transparent border-solid border-white/10 rounded-md data-[current=true]:border-green-600 data-[current=true]:text-green-600 data-[is-before=true]:opacity-50"
                  onClick={() => handleEpisodeChange(episode)}
                >
                  {episode}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  )
}
