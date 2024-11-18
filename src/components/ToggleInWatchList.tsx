import { useState } from 'preact/hooks'
import { Button } from './Button'
import { i18n } from '@/utils/i18n'
import { Modal } from './Modal'
import { supabase } from '@/utils/supabase'
import { useSession } from '@/providers/session'

type ToggleInWatchListProps = {
  id: number
  title?: string
  name?: string
  poster_path?: string
  isAdd: boolean
  type: 'movie' | 'tv'
}
export function ToggleInWatchList({
  id,
  title,
  name,
  poster_path,
  isAdd,
  type,
}: ToggleInWatchListProps) {
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

  if (!isInWatchlist)
    return (
      <Button onClick={handleAddToWatchlist}>
        <span>
          {'+'} {i18n.t('addToWatchlist')}
        </span>
      </Button>
    )

  return (
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
  )
}
