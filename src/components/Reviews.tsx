import { useMedia } from '@/hooks/useMedia'
import { Avatar } from './Avatar'
import { RATING_EMOJIS, RATING_LABELS } from '@/utils/constants'
import { i18n } from '@/utils/i18n'
import { useRoute } from 'preact-iso'
import { EditorRead } from './EditorRead'
import { SpoilZone } from './SpoilZone'
import { Spoiler } from './Spoiler'

export function Reviews() {
  const {
    params: { type },
  } = useRoute()
  const { reviews, watchlist, isInWatchlist } = useMedia()

  return (
    <div class="h-full relative overflow-hidden">
      <section class="absolute inset-0 flex flex-col gap-4 overflow-y-auto">
        {reviews.map((review) => (
          <article class="flex flex-col gap-3 border-b-solid border-b-1 border-b-white/10 p-2">
            <header class="flex justify-between">
              <div>
                <div class="flex gap-2 items-center">
                  <Avatar
                    alt={review.profiles.username}
                    src={review.profiles.avatar}
                    size="sm"
                  />
                  <div class="flex flex-col">
                    <span>{review.profiles.username}</span>
                    {type === 'movie' && (
                      <span class="text-xs italic">
                        {i18n.t(review.media_state)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <Spoiler
                defaultShow={false}
                fake={
                  <div class="flex items-center gap-2 ">
                    <span class="text-xl">❓</span>
                    "it's hide for real"
                  </div>
                }
              >
                <div class="flex items-center gap-2 ">
                  <span class="text-xl">{RATING_EMOJIS[review.rating]}</span>
                  {i18n.t(RATING_LABELS[review.rating])}
                </div>
              </Spoiler>
            </header>
            <div class="flex flex-col gap-3">
              <span class="text-xs italic opacity-50">{review.updated_at}</span>
              <Spoiler defaultShow={false}>
                <EditorRead blocks={review.content} id={review.id} />
              </Spoiler>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
