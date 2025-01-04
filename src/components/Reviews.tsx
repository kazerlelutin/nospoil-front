import { useMedia } from '@/hooks/useMedia'
import { useRoute } from 'preact-iso'

import { Review } from './Review'
import { ReviewModal } from './ReviewModal'
import { useReviews } from '@/hooks/useReviews'
import { i18n } from '@/utils/i18n'
import { Pagination } from './Pagination'
import { PER_PAGE } from '@/utils/constants'
import { Loader } from './Loader'

export function Reviews() {
  const {
    params: { type, id },
  } = useRoute()

  const { error, fetchReviews, loading, reviews, totalReview } = useReviews(id)

  const totalPagesReview = Math.ceil(totalReview / PER_PAGE)

  const { watchlist } = useMedia()

  if (error) return <p class="text-center">{i18n.t('errorOccured')}</p>

  return (
    <section class="flex flex-col gap-4">
      <div class="flex justify-end pt-4">
        <ReviewModal callback={() => fetchReviews(1)} />
      </div>
      {reviews.length === 0 && (
        <p class="text-center">{i18n.t('noReviewYet')}</p>
      )}
      {loading && (
        <div class="text-center">
          <Loader />
        </div>
      )}
      {reviews.map((review) => (
        <Review
          review={review}
          key={`${review.id}-${watchlist?.status}-${watchlist?.current_episode}-${watchlist?.current_season}`}
          type={type}
        />
      ))}
      {!loading && (
        <Pagination totalPages={totalPagesReview} onFetch={fetchReviews} />
      )}
    </section>
  )
}
