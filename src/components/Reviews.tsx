import { useMedia } from '@/hooks/useMedia'
import { useRoute } from 'preact-iso'

import { ReviewModal } from './ReviewModal'
import { i18n } from '@/utils/i18n'
import { Pagination } from './Pagination'
import { PER_PAGE } from '@/utils/constants'
import { useEffect, useState } from 'preact/hooks'
import type { Review as ReviewT } from '@/types/review'
import { Review } from './Review'
import { supabase } from '@/utils/supabase'
import { useSession } from '@/providers/session'

export function Reviews() {
  const {
    params: { type, id },
  } = useRoute()

  const session = useSession()
  const [reviews, setReviews] = useState<ReviewT[]>([])
  const [totalReview, setTotalReview] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const totalPagesReview = Math.ceil(totalReview / PER_PAGE)

  const { watchlist } = useMedia()

  const fetchReviewCount = async () => {
    if (!session?.user?.id) return
    setLoading(true)

    const { count, error } = await supabase
      .from('posts')
      .select('id', { count: 'exact', head: true })
      .eq('media_id', id)

    if (error) setError(error.message)
    setTotalReview(count)
    setLoading(false)
  }

  const handleFetchReviews = async (page: number) => {
    if (!session?.user?.id) return

    const { data, error } = await supabase
      .from('posts')
      .select(
        `
          *,
          profiles ( username, avatar, id )
          `
      )
      .eq('media_id', id)
      .range((page - 1) * PER_PAGE, page * PER_PAGE - 1)

    if (error) setError(error.message)
    if (data) setReviews(data as any)
  }

  useEffect(() => {
    fetchReviewCount()
    handleFetchReviews(1)
  }, [])

  if (error) return <p class="text-center">{i18n.t('errorOccured')}</p>

  return (
    <section class="flex flex-col gap-4">
      <div class="flex justify-end pt-4">
        <ReviewModal />
      </div>
      {reviews.length === 0 && (
        <p class="text-center">{i18n.t('noReviewYet')}</p>
      )}
      {reviews.map((review) => (
        <Review
          review={review}
          key={`${review.id}-${watchlist?.status}-${watchlist?.current_episode}-${watchlist?.current_season}`}
          type={type}
        />
      ))}
      {!loading && (
        <Pagination
          totalPages={totalPagesReview}
          onFetch={handleFetchReviews}
        />
      )}
    </section>
  )
}
