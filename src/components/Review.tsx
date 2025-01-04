import { lazy } from 'preact-iso'
import { Avatar } from './Avatar'
import { Spoiler } from './Spoiler'
import { i18n } from '@/utils/i18n'
import { useMedia } from '@/hooks/useMedia'
import { MEDIA_STATUS, RATING_EMOJIS, RATING_LABELS } from '@/utils/constants'
import { useMemo } from 'preact/hooks'
import type { REVIEW } from '@/types/review'

const EditorReadOnly = lazy(() =>
  import('./EditorReadOnly').then((mod) => ({ default: mod.EditorReadOnly }))
) as any

type ReviewProps = {
  review: REVIEW
  type: string
}

export function Review({ review, type }: ReviewProps) {
  const { watchlist } = useMedia()

  const initialHidden = useMemo(() => {
    if (!watchlist) return true
    if (type === 'movie') {
      if (watchlist.status.match(/completed|not_interested/)) return false
      if (review.media_state === MEDIA_STATUS.NOT_SEEN) return false
      if (review.media_state === MEDIA_STATUS.PLANNED) return false

      return true
    }

    if (type === 'tv') {
      if (watchlist.current_season > review.current_season) return false
      if (
        watchlist.current_season === review.current_season &&
        watchlist.current_episode > review.current_episode
      )
        return false
      return true
    }

    return true
  }, [watchlist, review])

  return (
    <article class="flex flex-col gap-3 border-b-solid border-b-1 border-b-white/10 p-2">
      <header class="flex justify-between">
        <div>
          <a
            class="flex gap-2 items-center no-underline"
            href={`/watchlist/${review.profiles.id}`}
          >
            <Avatar
              alt={review.profiles.username}
              src={review.profiles.avatar}
              size="sm"
            />
            <div class="flex flex-col">
              <span>{review.profiles.username}</span>
              {type === 'movie' && (
                <span class="text-xs italic">{i18n.t(review.media_state)}</span>
              )}
              {type === 'tv' && (
                <span class="text-xs italic">
                  S{review.current_season}E{review.current_episode}
                </span>
              )}
            </div>
          </a>
        </div>
      </header>

      <Spoiler
        initialHidden={initialHidden}
        fake={
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <span class="text-xl">❓</span>
              "it's hide for real"
            </div>
            <EditorReadOnly blocks={review.content} id={review.id} />
          </div>
        }
      >
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2 ">
            <span class="text-xl">{RATING_EMOJIS[review.rating]}</span>
            {i18n.t(RATING_LABELS[review.rating])}
          </div>
          <EditorReadOnly blocks={review.content} id={review.id} />
        </div>
      </Spoiler>
    </article>
  )
}
