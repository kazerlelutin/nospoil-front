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
    <article class="w-full flex flex-col gap-6 rounded-md border-solid border-1 border-white/10 p-2">
      <div class="flex gap-3">
        <div class="w-16 flex items-center justify-center ">
          {item.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title}
              class="w-full h-auto"
            />
          ) : (
            <div class="w-16 h-24 bg-white/10 rounded-sm"></div>
          )}
        </div>
        <div class="flex flex-col gap-6">
          <a
            href={link}
            data-placeholder={!item.id}
            class="data-[placeholder=true]:bg-white/10 data-[placeholder=true]:rounded-sm data-[placeholder=true]:h-6 no-underline text-xl font-bold"
          >
            {item.title}
          </a>

          <div class="flex flex-wrap gap-3">
            {[
              MEDIA_STATUS.PLANNED,
              MEDIA_STATUS.NOT_INTERESTED,
              MEDIA_STATUS.COMPLETED,
            ].map((status) => (
              <button
                data-current={status === currentStatus}
                class="cursor-pointer p-2  h-8 flex items-center justify-center bg-transparent border-solid border-white/10 rounded-md data-[current=true]:border-green-600 data-[current=true]:text-green-600"
                onClick={() => handleChangeStatus(status)}
              >
                {i18n.t(status)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div class="flex  gap-6 items-center justify-between border-t-solid border-t-1 border-t-white/10 pt-4">
        <ToggleInWatchList
          removeCb={removeCb}
          id={item.tmdb_id}
          title={item.title}
          type="tv"
          poster_path={item.poster_path}
          isAdd={true}
        />
        <a href={link} class="self-end">
          {i18n.t('moreInfo')}
        </a>
      </div>
    </article>
  )
}
