import { useMedia } from '@/hooks/useMedia'
import { useSession } from '@/providers/session'
import { MEDIA_STATUS, MediaStatus } from '@/utils/constants'
import { i18n } from '@/utils/i18n'
import { supabase } from '@/utils/supabase'
import { useState } from 'preact/hooks'

type MovieStateProps = {
  movie: any
  id: string | number
}
export function MovieState({ movie, id }: MovieStateProps) {
  const session = useSession()
  const mediaCtx = useMedia()

  const [currentStatus, setCurrentStatus] = useState<MediaStatus>(
    movie?.status || MEDIA_STATUS.NOT_SEEN
  )

  const handleChangeStatus = async (status: MediaStatus) => {
    const oldStatus = currentStatus
    setCurrentStatus(status)

    const { data: exist } = await supabase
      .from('watchlist')
      .select('id')
      .eq('tmdb_id', id)
      .eq('user_id', session.user.id)
      .maybeSingle()

    if (!exist) {
      await supabase.from('watchlist').insert({
        tmdb_id: id,
        user_id: session.user.id,
        status,
        type: 'movie',
        title: movie.title,
        poster_path: movie.poster_path,
        updated_at: new Date(),
      })
    } else {
      const { error } = await supabase
        .from('watchlist')
        .update({
          status,
          title: movie.title || mediaCtx?.media?.title,
          poster_path: movie.poster_path || mediaCtx?.media?.poster_path,
          updated_at: new Date(),
        })
        .eq('tmdb_id', movie.tmdb_id)
        .eq('user_id', session.user.id)

      if (error) {
        console.error("Erreur lors de l'upsert :", error.message)
        setCurrentStatus(oldStatus)

        return
      }
    }

    mediaCtx?.setWatchlist({
      ...mediaCtx.watchlist,
      // @ts-ignore
      status,
    })
  }

  return (
    <div class="flex gap-3 flex-wrap">
      {[
        MEDIA_STATUS.NOT_SEEN,
        MEDIA_STATUS.PLANNED,
        MEDIA_STATUS.NOT_INTERESTED,
        MEDIA_STATUS.COMPLETED,
      ].map((status) => (
        <button
          data-current={status === currentStatus}
          class="cursor-pointer p-2  h-8 flex movies-center justify-center bg-transparent border-solid border-white/10 rounded-md data-[current=true]:border-green-700 data-[current=true]:text-green-700"
          onClick={() => handleChangeStatus(status)}
        >
          {i18n.t(status)}
        </button>
      ))}
    </div>
  )
}
