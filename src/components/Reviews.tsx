import { useMedia } from '@/hooks/useMedia'
import { useRoute } from 'preact-iso'

import { Review } from './Review'
import { ReviewModal } from './ReviewModal'
import { i18n } from '@/utils/i18n'
import { Pagination } from './Pagination'

export function Reviews() {
  const {
    params: { type },
  } = useRoute()
  const { reviews, loading, totalPagesReview, fetchReviews, watchlist } =
    useMedia()

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
        <Pagination totalPages={totalPagesReview} onFetch={fetchReviews} />
      )}
    </section>
  )
}
