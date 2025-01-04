import { useState, useEffect } from 'preact/hooks'
import { supabase } from '@/utils/supabase'
import { useSession } from '@/providers/session'
import { PER_PAGE } from '@/utils/constants'
import type { REVIEW } from '@/types/review'

export function useReviews(mediaId: string) {
  const session = useSession()
  const [reviews, setReviews] = useState<REVIEW[]>([])
  const [totalReview, setTotalReview] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchReviewCount = async () => {
    if (!session?.user?.id) return
    setLoading(true)

    const { count, error } = await supabase
      .from('posts')
      .select('id', { count: 'exact', head: true })
      .eq('media_id', mediaId)

    if (error) setError(error.message)
    setTotalReview(count)
    setLoading(false)
  }

  const fetchReviews = async (page: number = 1) => {
    if (!session?.user?.id) return

    const { data, error } = await supabase
      .from('posts')
      .select(
        `
          *,
          profiles ( username, avatar, id )
        `
      )
      .eq('media_id', mediaId)
      .range((page - 1) * PER_PAGE, page * PER_PAGE - 1)

    if (error) setError(error.message)
    if (data) setReviews(data as any)
  }

  useEffect(() => {
    fetchReviewCount()
  }, [session])

  return { reviews, totalReview, loading, error, fetchReviews }
}
