import { i18n } from '@/utils/i18n'
import { Button } from './Button'
import { Modal } from './Modal'
import { useEffect, useState } from 'preact/hooks'
import { useSession } from '@/providers/session'
import {
  MEDIA_RATINGS,
  MEDIA_STATUS,
  RATING_EMOJIS,
  RATING_LABELS,
} from '@/utils/constants'
import { useMedia } from '@/hooks/useMedia'
import { supabase } from '@/utils/supabase'
import { lazy, useRoute } from 'preact-iso'

const Editor = lazy(() =>
  import('./Editor').then((mod) => ({ default: mod.Editor }))
) as any

export function ReviewModal() {
  const {
    params: { type, id },
    query,
  } = useRoute()

  const { watchlist, media, fetchReviews } = useMedia()
  const session = useSession()
  const [loading, setLoading] = useState(false)
  const [review, setReview] = useState<any>(undefined)
  const [rating, setRating] = useState<string>(MEDIA_RATINGS.GOOD)
  const [initValue, setInitValue] = useState<any>(undefined)
  const [error, setError] = useState('')

  const handleOpen = async (openCb: () => void) => {
    setLoading(true)
    if (!watchlist?.id) {
      const payload: any = {
        tmdb_id: media.id,
        user_id: session.user.id,
        type,
        title: media.title || media.name,
        updated_at: new Date(),
      }

      if (type === 'tv') {
        payload.current_episode = 1
        payload.current_season = 1
      }

      if (type === 'movie') {
        payload.status = MEDIA_STATUS.NOT_SEEN
      }

      await supabase.from('watchlist').insert(payload)
    }
    setLoading(false)

    openCb()
  }

  const handleFetchReviewState = async () => {
    if (!watchlist?.tmdb_id) return
    if (type === 'tv') {
      const { data } = await supabase
        .from('posts')
        .select('content, rating')
        .eq('user_id', session.user.id)
        .eq('media_id', id)
        .eq('current_episode', watchlist.current_episode)
        .eq('current_season', watchlist.current_season)
        .maybeSingle()

      if (data?.rating) setRating(data.rating)
      setInitValue(data)
    }

    if (type === 'movie') {
      const { data } = await supabase
        .from('posts')
        .select('content, rating')
        .eq('user_id', session.user.id)
        .eq('media_id', id)
        .eq('media_state', watchlist.status)
        .maybeSingle()

      if (data?.rating) setRating(data.rating)
      setInitValue(data)
    }
  }

  const handleSave = async (closeCb: () => void) => {
    if (!session?.user?.id) return

    setLoading(true)
    try {
      await supabase
        .from('posts')
        .delete()
        .eq('media_id', id)
        .eq('user_id', session.user.id)

      const { error } = await supabase.from('posts').upsert({
        user_id: session.user.id,
        media_id: id,
        current_episode: watchlist?.current_episode,
        current_season: watchlist?.current_season,
        media_state: watchlist?.status || MEDIA_STATUS.NOT_SEEN,
        importance: 0,
        rating,
        content: review,
        updated_at: new Date(),
      })

      const page = parseInt(query.page as string) || 1
      fetchReviews(page)
      if (error) throw error
      setInitValue({ content: JSON.stringify(review) })
      setRating(rating)

      //TODO remettre à zero les UpPosts quand il seront implémentés
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
      closeCb()
    }
  }

  useEffect(() => {
    handleFetchReviewState()
  }, [watchlist])

  return (
    <Modal
      button={(openCb) => (
        <div class="flex flex-col items-end gap-2">
          <div>
            <Button onClick={() => handleOpen(openCb)}>
              {i18n.t('writeAReview')}
            </Button>
          </div>
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
                {type === 'tv' &&
                  `E${watchlist?.current_episode || 1}S${
                    watchlist?.current_season || 1
                  }`}
                {type === 'movie' &&
                  i18n.t(watchlist?.status || MEDIA_STATUS.NOT_SEEN)}
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
                initialValue={initValue?.content}
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
