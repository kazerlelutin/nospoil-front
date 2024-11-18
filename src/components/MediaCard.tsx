import { i18n } from '@/utils/i18n'
import { Button } from './Button'
import { supabase } from '@/utils/supabase'
import { useSession } from '@/providers/session'

type MediaCardProps = {
  id?: number
  title?: string
  name?: string
  poster_path?: string
  overview?: string
  isAdd?: boolean
  type: 'movie' | 'tv'
}
export function MediaCard({
  id,
  title,
  name,
  poster_path,
  overview,
  isAdd,
  type,
}: MediaCardProps) {
  const session = useSession()

  const handleAddToWatchlist = async () => {
    if (isAdd) {
    } else {
      const { data, error } = await supabase.from('watchlist').insert([
        {
          user_id: session.user.id, // Associe l'élément à l'utilisateur actuel
          tmdb_id: id,
          title: title || name,
          type,
          poster_path,
          //TODO  params in profil, for now is_public is false
          is_public: false,
        },
      ])
      console.log('Add to watchlist', data)
    }

    console.log('Add to watchlist')
  }

  return (
    <article class="flex flex-col gap-3 rounded-md border-solid border-1 border-white/10 p-2">
      <div class="flex gap-3">
        <div class="w-16 flex items-center justify-center ">
          {poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={title}
              class="w-full h-auto"
            />
          ) : (
            <div class="w-16 h-24 bg-white/10 rounded-sm"></div>
          )}
        </div>

        <div class="flex-1">
          <a
            href={`/media/${id}`}
            data-placeholder={!id}
            class="data-[placeholder=true]:bg-white/10 data-[placeholder=true]:rounded-sm data-[placeholder=true]:h-6 no-underline text-xl font-bold"
          >
            {title || name}
          </a>
          <p
            data-placeholder={!id}
            class="data-[placeholder=true]:bg-white/10 data-[placeholder=true]:rounded-sm data-[placeholder=true]:h-20"
          >
            {overview ? (
              overview
            ) : (
              <span class="italic">{id && i18n.t('noOverview')}</span>
            )}
          </p>
        </div>
      </div>
      <div class="flex justify-end gap-6 items-center">
        <a href={`/media/${id}`}>{i18n.t('moreInfo')}</a>
        <Button onClick={handleAddToWatchlist}>
          {i18n.t(isAdd ? 'removeToWatchlist' : 'addToWatchlist')}
        </Button>
      </div>
    </article>
  )
}
