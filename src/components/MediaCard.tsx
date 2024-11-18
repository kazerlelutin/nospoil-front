import { i18n } from '@/utils/i18n'
import { Button } from './Button'
import { supabase } from '@/utils/supabase'
import { useSession } from '@/providers/session'
import { useState } from 'preact/hooks'
import { Modal } from './Modal'

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
  const [isInWatchlist, setIsInWatchlist] = useState(isAdd)
  const session = useSession()

  const handleAddToWatchlist = async () => {
    const oldstate = isInWatchlist
    setIsInWatchlist(true)
    const { error } = await supabase.from('watchlist').insert([
      {
        user_id: session.user.id,
        tmdb_id: id,
        title: title || name,
        type,
        poster_path,
        //TODO  params in profil, for now is_public is false
        is_public: false,
      },
    ])
    if (error) setIsInWatchlist(oldstate)
  }

  const handleRemoveToWatchlist = async () => {
    const oldstate = isInWatchlist
    setIsInWatchlist(false)
    const { error } = await supabase
      .from('watchlist')
      .delete()
      .eq('user_id', session.user.id)
      .eq('tmdb_id', id)
    if (error) setIsInWatchlist(oldstate)
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
        {isInWatchlist ? (
          <Modal
            button={(open) => (
              <Button
                onClick={() => {
                  open()
                  handleAddToWatchlist()
                }}
              >
                <span>
                  {'-'} {i18n.t('removeToWatchlist')}
                </span>
              </Button>
            )}
          >
            {(close) => (
              <div class="flex flex-col gap-5">
                <div class="flex flex-col justify-center gap-1">
                  <div class="font-bold">{title || name}</div>
                  {i18n.t('areYouSureRemoveToWatchlist')}
                </div>
                <div class="flex justify-between gap-4">
                  <Button onClick={() => close(handleRemoveToWatchlist)}>
                    <span>{i18n.t('removeToWatchlist')}</span>
                  </Button>
                  <Button onClick={() => close()} type="reset">
                    {i18n.t('cancel')}
                  </Button>
                </div>
              </div>
            )}
          </Modal>
        ) : (
          <Button onClick={handleAddToWatchlist}>
            <span>
              {'+'} {i18n.t('addToWatchlist')}
            </span>
          </Button>
        )}
      </div>
    </article>
  )
}
