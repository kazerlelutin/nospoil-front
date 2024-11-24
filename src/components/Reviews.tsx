import { useMedia } from '@/hooks/useMedia'
import { useRoute } from 'preact-iso'

import { Review } from './Review'

export function Reviews() {
  const {
    params: { type },
  } = useRoute()
  const { reviews } = useMedia()

  return (
    <div class="h-full relative overflow-hidden">
      <section class="absolute inset-0 flex flex-col gap-4 overflow-y-auto">
        {reviews.map((review) => (
          <Review review={review} key={review.id} type={type} />
        ))}
      </section>
    </div>
  )
}
