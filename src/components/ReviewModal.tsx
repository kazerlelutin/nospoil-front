import { i18n } from '@/utils/i18n'
import { Button } from './Button'
import { Modal } from './Modal'
import { EditIcon } from './editIcon'
import { useEffect, useState } from 'preact/hooks'
import { useSession } from '@/providers/session'
import { MEDIA_RATINGS, RATING_EMOJIS, RATING_LABELS } from '@/utils/constants'
import { useMedia } from '@/hooks/useMedia'
import { supabase } from '@/utils/supabase'
import { lazy } from 'preact-iso'

type ReviewModalProps = {
  size?: 'small' | 'medium' | 'large'
  cb?: (id: number) => void
  currentEpisode?: number
  currentSeason?: number
  status?: string
}

const Editor = lazy(() =>
  import('./Editor').then((mod) => ({ default: mod.Editor }))
) as any

export function ReviewModal({
  size,
  currentEpisode,
  currentSeason,
  status,
  cb,
}: ReviewModalProps) {
  const { watchlist } = useMedia()
  const session = useSession()
  const [loading, setLoading] = useState(false)
  const [alreadyReviewed, setAlreadyReviewed] = useState(false)
  const [review, setReview] = useState<any>(undefined)
  const [rating, setRating] = useState<string>(MEDIA_RATINGS.GOOD)
  const [error, setError] = useState('')

  const handleOpen = (openCb: () => void) => {
    openCb()
  }

  const handleFetchReviewState = async () => {
    const { data } = await supabase
      .from('posts')
      .select('id')
      .eq('user_id', session.user.id)
      .eq('media_id', watchlist.tmdb_id)
      .eq('media_state', watchlist.status)
      .maybeSingle()
    if (data) setAlreadyReviewed(true)
    console.log(data)
  }

  const handleSave = async (closeCb: () => void) => {
    if (!session?.user?.id) return

    setLoading(true)
    try {
      const { data, error } = await supabase.from('posts').upsert({
        user_id: session.user.id,
        media_id: watchlist.tmdb_id,
        current_episode: currentEpisode,
        current_season: currentSeason,
        media_state: watchlist.status,
        importance: 0,
        rating,
        content: review,
        updated_at: new Date(),
      })
      if (error) throw error
      console.log(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
      closeCb()
    }
  }

  useEffect(() => {
    handleFetchReviewState()
  }, [])

  return (
    <Modal
      button={(openCb) => (
        <div class="flex flex-col gap-2">
          <div>
            <Button
              onClick={() => !alreadyReviewed && handleOpen(openCb)}
              disabled={alreadyReviewed}
            >
              {i18n.t('review')}
            </Button>
          </div>

          <span class="text-xs italic">
            {alreadyReviewed && i18n.t('alreadyReview')}
          </span>
        </div>
      )}
    >
      {(closeCb) => (
        <div class="grid gap-4 grid-rows-[auto_auto_1fr_auto] h-[80dvh] w-[90dvw] md:w-[40dvw]">
          <h3 class="text-md text-center">{watchlist?.title}</h3>

          <div class="flex flex-col gap-3">
            <div class="flex items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                {RATING_EMOJIS[rating]}
                {i18n.t(RATING_LABELS[rating])}
              </div>

              <span class="italic bold">
                {watchlist.type === 'tv' &&
                  `E${currentEpisode}S${currentSeason}`}
                {watchlist.type === 'movie' && i18n.t(status)}
              </span>
            </div>
            <div class="flex flex-wrap gap-4">
              {Object.values(MEDIA_RATINGS).map((ra) => (
                <button
                  data-current={rating === ra}
                  class={
                    'flex items-center gap-2 data-[current=true]:opacity-30'
                  }
                  onClick={() => setRating(ra)}
                >
                  <span class="text-xl"> {RATING_EMOJIS[ra]}</span>
                </button>
              ))}
            </div>
          </div>
          <div class="relative">
            <div class="absolute inset-0 overflow-y-auto p-2">
              <Editor
                id="review"
                onChange={setReview}
                placeholder={i18n.t('writeYourReviewHere')}
              />
            </div>
          </div>
          <div class="flex justify-between gap-4">
            <Button onClick={() => closeCb()} type="reset">
              {i18n.t('close')}
            </Button>
            <Button onClick={() => handleSave(closeCb)}>
              {i18n.t(loading ? 'loading' : 'save')}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  )
}
