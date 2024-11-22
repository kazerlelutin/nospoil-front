import { useInterObs } from '@/providers/interObs'
import { i18n } from '@/utils/i18n'
import { useEffect, useMemo, useState } from 'preact/hooks'
import { ToggleInWatchList } from './ToggleInWatchList'
import { supabase } from '@/utils/supabase'
import { useSession } from '@/providers/session'
import { MEDIA_STATUS, type MediaStatus } from '@/utils/constants'

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
  removeCb: () => Promise<void>
}

export function WatchListMovieCard({ item, removeCb }: WatchListTvCardProps) {
  const session = useSession()
  const link = `/media/movie/${item.tmdb_id}`
  const [currentStatus, setCurrentStatus] = useState<MediaStatus>(item.status)

  const handleChangeStatus = async (status: MediaStatus) => {
    const oldStatus = currentStatus
    setCurrentStatus(status)
    const { error } = await supabase
      .from('watchlist')

      .update({
        status,
        updated_at: new Date(),
      })
      .eq('id', item.id)
      .eq('user_id', session.user.id)

    if (error) setCurrentStatus(oldStatus)
  }

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
          {[
            MEDIA_STATUS.PLANNED,
            MEDIA_STATUS.NOT_INTERESTED,
            MEDIA_STATUS.COMPLETED,
          ].map((status) => (
            <button
              data-current={status === currentStatus}
              class="cursor-pointer p-2  h-8 flex items-center justify-center bg-transparent border-solid border-white/10 rounded-md data-[current=true]:border-green-700 data-[current=true]:text-green-700"
              onClick={() => handleChangeStatus(status)}
            >
              {i18n.t(status)}
            </button>
          ))}
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
    </article>
  )
}
