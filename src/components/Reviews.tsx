import { useMedia } from '@/hooks/useMedia'
import { useRoute } from 'preact-iso'

import { Review } from './Review'
import { ReviewModal } from './ReviewModal'
import { i18n } from '@/utils/i18n'

export function Reviews() {
  const {
    params: { type },
  } = useRoute()
  const { reviews } = useMedia()

  return (
    <section class="flex flex-col gap-4">
      <div class="flex justify-end pt-4">
        <ReviewModal />
      </div>
      {reviews.length === 0 && (
        <p class="text-center">{i18n.t('noReviewYet')}</p>
      )}
      {reviews.map((review) => (
        <Review review={review} key={review.id} type={type} />
      ))}
    </section>
  )
}
