import { lazy } from 'preact-iso'
import { Avatar } from './Avatar'
import { Spoiler } from './Spoiler'
import { i18n } from '@/utils/i18n'
import { useMedia } from '@/hooks/useMedia'
import { MEDIA_STATUS, RATING_EMOJIS, RATING_LABELS } from '@/utils/constants'
import { useMemo } from 'preact/hooks'

const EditorRead = lazy(() =>
  import('./EditorRead').then((mod) => ({ default: mod.EditorRead }))
) as any

type ReviewProps = {
  review: {
    id: string
    rating: number
    content: string
    updated_at: string
    media_state: string
    current_season: number
    current_episode: number
    profiles: {
      id: string
      username: string
      avatar: string
    }
  }
  type: string
}

export function Review({ review, type }: ReviewProps) {
  const { watchlist } = useMedia()

  const defaultShow = useMemo(() => {
    if (!watchlist) return false

    if (type === 'movie') {
      if (review.media_state === MEDIA_STATUS.NOT_SEEN) return true
      if (watchlist.status.match(/completed|not_seen|not_interested/))
        return true
      if (review.media_state === MEDIA_STATUS.PLANNED) return true
      return false
    }

    if (type === 'tv') {
      if (watchlist.current_season > review.current_season) return true
      if (
        watchlist.current_season === review.current_season &&
        watchlist.current_episode > review.current_episode
      )
        return true
      return false
    }

    return false
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
        defaultShow={defaultShow}
        fake={
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <span class="text-xl">❓</span>
              "it's hide for real"
            </div>
            <EditorRead blocks={review.content} id={review.id} />
          </div>
        }
      >
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2 ">
            <span class="text-xl">{RATING_EMOJIS[review.rating]}</span>
            {i18n.t(RATING_LABELS[review.rating])}
          </div>
          <EditorRead blocks={review.content} id={review.id} />
        </div>
      </Spoiler>
    </article>
  )
}
