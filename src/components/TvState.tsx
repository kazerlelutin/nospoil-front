import { useSession } from '@/providers/session'
import { i18n } from '@/utils/i18n'
import { supabase } from '@/utils/supabase'
import { useEffect, useMemo, useState } from 'preact/hooks'
import { EditIcon } from './EditIcon'
import { Button } from './Button'
import { Serie } from '@/types/media'
import { useMedia } from '@/hooks/useMedia'

type TvStateProps = {
  item: any
  canFetch?: boolean
  defaultSeasons?: Serie['seasons']
}

export function TvState({ item, canFetch, defaultSeasons = [] }: TvStateProps) {
  const session = useSession()
  const mediaCtx = useMedia()
  const [editMode, setEditMode] = useState(false)
  const [currentSeason, setCurrentSeason] = useState(item?.current_season || 1)
  const [currentEpisode, setCurrentEpisode] = useState(
    item?.current_episode || 0
  )

  const [seasons, setSeasons] = useState<Serie['seasons']>(defaultSeasons)

  const myProgression = useMemo(() => {
    return seasons.reduce((acc, s) => {
      if (s.season_number < currentSeason) {
        acc += s.episode_count
      }
      if (s.season_number === currentSeason) {
        acc += currentEpisode
      }
      return acc
    }, 0)
  }, [currentEpisode, currentSeason, seasons])

  const episodeRemaining = useMemo(() => {
    return seasons.reduce((acc, s) => {
      if (s.season_number > currentSeason) {
        acc += s.episode_count
      }
      if (s.season_number === currentSeason) {
        acc += s.episode_count - currentEpisode
      }
      return acc
    }, 0)
  }, [currentEpisode, currentSeason, seasons])

  const handleEpisodeChange = async (episode: number) => {
    const oldEpisode = currentEpisode
    setCurrentEpisode(episode)

    const { data: exist } = await supabase
      .from('watchlist')
      .select('id')
      .eq('tmdb_id', item.tmdb_id)
      .eq('user_id', session.user.id)
      .maybeSingle()

    if (!exist) {
      const { error } = await supabase.from('watchlist').insert({
        tmdb_id: item.tmdb_id,
        user_id: session.user.id,
        current_episode: episode,
        current_season: currentSeason,
        type: 'tv',
        status: null,
        title: item.title,
        poster_path: item.poster_path,
        updated_at: new Date(),
      })

      if (error) setCurrentEpisode(oldEpisode)

      return
    }

    const { error } = await supabase
      .from('watchlist')
      .update({
        current_episode: episode,
        current_season: currentSeason,
        poster_path: item.poster_path || mediaCtx?.media?.poster_path,
        updated_at: new Date(),
      })
      .eq('tmdb_id', item.tmdb_id)
      .eq('user_id', session.user.id)

    mediaCtx?.setWatchlist({
      ...mediaCtx.watchlist,
      current_episode: episode,
      current_season: currentSeason,
    })

    if (error) setCurrentEpisode(oldEpisode)
  }

  const handleEditMode = () => {
    setEditMode(!editMode)
  }

  const fetchSeason = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}tv/tv/${item.tmdb_id}?language=${
          i18n.language
        }`
      )
      const { seasons: dataSeasons } = await res.json()

      setSeasons(dataSeasons)
    } catch (error) {
      console.error('Error fetching watchlist:', error.message)
    } finally {
    }
  }

  const link = `/media/tv/${item.tmdb_id}`

  useEffect(() => {
    if (canFetch && seasons.length === 0) fetchSeason()
  }, [canFetch])

  return !editMode ? (
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
            style={{
              width: `${
                (myProgression /
                  seasons.reduce((acc, s) => acc + s.episode_count, 0)) *
                100
              }%`,
            }}
            role="progressbar"
          />
          <div class="absolute inset-0 bg-white/10 border-solid border-3 border-black rounded-md" />
        </div>

        <button
          class="fill-dark-text w-4 h-auto"
          onClick={handleEditMode}
          name="edit"
          role="button"
          aria-label="edit"
        >
          <EditIcon />
        </button>
      </div>
      <div class="flex justify-between items-center gap-2">
        <div class="font-bold">
          E{currentEpisode}S{currentSeason}
        </div>
        <div
          class="italic text-sm text-right"
          aria-label="episodeRemaining"
          data-episode-remaining={episodeRemaining}
        >
          {i18n.t(
            episodeRemaining === 0 ? 'episodeRemaining_0' : 'episodeRemaining',
            {
              count: episodeRemaining,
            }
          )}
        </div>
      </div>
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
                const newSeason = Number((e.target as HTMLSelectElement).value)
                setCurrentSeason(newSeason)
                if (newSeason < currentSeason)
                  setCurrentEpisode(
                    seasons.find((s) => s.season_number === newSeason)
                      ?.episode_count || 1
                  )
                if (newSeason > currentSeason) setCurrentEpisode(1)
              }}
              class="p-2 bg-transparent border-none rounded-none w-14 cursor-pointer font-bold"
            >
              {seasons.map((s) => (
                <option
                  value={s.season_number}
                  selected={s.season_number === currentSeason}
                  class="bg-dark-bg"
                >
                  {s.season_number === 0 ? i18n.t('specials') : s.season_number}
                </option>
              ))}
            </select>
            <div class="ml-1 font-bold opacity-50">
              <span>{' / '}</span>
              {seasons?.[seasons.length - 1]?.season_number || 0}
            </div>
          </div>
          <Button onClick={handleEditMode}>{'X'}</Button>
        </div>
        <div class="flex flex-wrap gap-3 max-h-24 overflow-y-auto">
          {Array.from(
            {
              length:
                seasons.find((s) => s.season_number === currentSeason)
                  ?.episode_count || 0,
            },
            (_, i) => i + 1
          ).map((episode) => (
            <button
              data-current={episode === currentEpisode}
              data-is-before={episode < currentEpisode}
              class="cursor-pointer p-2 w-7 h-7 flex items-center justify-center bg-transparent border-solid border-white/10 rounded-md data-[current=true]:border-green-600 data-[current=true]:text-green-600 data-[is-before=true]:opacity-50"
              onClick={() => handleEpisodeChange(episode)}
              name={`episode-${episode}`}
              role="button"
              aria-label={`episode-${episode}`}
            >
              {episode}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
