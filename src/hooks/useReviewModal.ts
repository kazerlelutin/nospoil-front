import { useEffect, useState } from 'preact/hooks'
import { useMedia } from './useMedia'
import { useSession } from '@/providers/session'
import { MEDIA_RATINGS, MEDIA_STATUS } from '@/utils/constants'
import { MEDIA_TYPE } from '@/types/media'
import { supabase } from '@/utils/supabase'

export function useReviewModal({
  id,
  type,
  page = 1,
  callback,
}: {
  id: string
  type: MEDIA_TYPE
  page: number
  callback: (page: number) => void | Promise<void>
}) {
  const { watchlist, media } = useMedia()
  const session = useSession()
  const [loading, setLoading] = useState(false)
  const [review, setReview] = useState<any>(undefined)
  const [rating, setRating] = useState<string>(MEDIA_RATINGS.GOOD)
  const [initValue, setInitValue] = useState<any>(undefined)
  const [error, setError] = useState('')

  const openModal = async (openCb: () => void) => {
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

  const fetchReviewState = async () => {
    if (!watchlist?.tmdb_id) return
    if (type === 'tv') {
      const { data, error } = await supabase
        .from('posts')
        .select('content, rating')
        .eq('user_id', session.user.id)
        .eq('media_id', id)
        .eq('current_episode', watchlist.current_episode)
        .eq('current_season', watchlist.current_season)
        .maybeSingle()

      if (data?.rating) setRating(data.rating)
      if (error) setError(error.message)
      setInitValue(data)
    }

    if (type === 'movie') {
      const { data, error } = await supabase
        .from('posts')
        .select('content, rating')
        .eq('user_id', session.user.id)
        .eq('media_id', id)
        .eq('media_state', watchlist.status)
        .maybeSingle()

      if (data?.rating) setRating(data.rating)
      if (error) setError(error.message)
      setInitValue(data)
    }
  }

  const save = async (closeCb: () => void) => {
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
      callback(page)
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
    fetchReviewState()
  }, [watchlist])

  return {
    loading,
    error,
    review,
    rating,
    initValue,
    watchlist,
    save,
    openModal,
    setReview,
    setRating,
  }
}
