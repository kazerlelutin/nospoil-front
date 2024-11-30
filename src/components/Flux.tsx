import { useSession } from '@/providers/session'
import { MEDIA_STATUS, RATING_EMOJIS, RATING_LABELS } from '@/utils/constants'
import { supabase } from '@/utils/supabase'
import { useEffect, useState } from 'preact/hooks'
import { Avatar } from './Avatar'
import { i18n } from '@/utils/i18n'
import { Spoiler } from './Spoiler'
import { lazy } from 'preact-iso'

const EditorRead = lazy(() =>
  import('./EditorRead').then((mod) => ({ default: mod.EditorRead }))
) as any

// Wathlist stats, wcurrent_epidose, wcurrent_season
export function Flux() {
  const session = useSession()

  const [posts, setPosts] = useState([])

  const handleFetchPosts = async () => {
    const { data, error } = await supabase
      .from('enriched_posts') // Appelle la vue
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200)

    if (error) {
      console.error('Error fetching posts:', error.message)
      return
    }

    setPosts(
      data.map((post_) => {
        const post = { ...post_, hide: true }

        //movie
        if (!post.current_episode || !post.current_season) {
          if (
            post.media_state === MEDIA_STATUS.PLANNED ||
            //Status is watchlist
            post?.status?.match(/completed|not_interested/)
          )
            post.hide = false
        }

        //TV
        if (
          typeof post.current_episode === 'number' ||
          typeof post.current_season === 'number'
        ) {
          if (post.wcurrent_season > post.current_season) post.hide = false

          if (
            post.wcurrent_season === post.current_season &&
            post.wcurrent_episode > post.current_episode
          )
            post.hide = false
        }

        return post
      })
    )
  }

  useEffect(() => {
    handleFetchPosts()
  }, [])

  return (
    <div class="h-full relative overflow-hidden">
      <section class="absolute inset-0 flex flex-col gap-4 overflow-y-auto">
        {posts.map((review) => (
          <article
            key={review.id}
            class="flex flex-col gap-3 border-b-solid border-b-1 border-b-white/10 p-2"
          >
            <header class="flex justify-between">
              <div>
                <div class="flex gap-2 items-center">
                  <Avatar alt={review.username} src={review.avatar} size="sm" />
                  <div class="flex flex-col">
                    <span>{review.username}</span>
                    {review.type === 'movie' && (
                      <span class="text-xs italic">
                        {i18n.t(review.media_state)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <Spoiler
                defaultShow={!review.hide}
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
              <Spoiler defaultShow={!review.hide}>
                <EditorRead blocks={review.content} id={review.id} />
              </Spoiler>
            </div>

            <a
              href={`/media/${review.type}/${review.media_id}`}
              className="flex gap-2 no-underline"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${review.poster_path}`}
                alt={review.title}
                class="w-10 h-14 object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/poster.svg'
                }}
              />
              <div class="flex items-center h-full">
                {review.title}
                {review.type === 'tv' && (
                  <span class="font-bold">{`E${review.current_episode}S${review.current_season}`}</span>
                )}
              </div>
            </a>
          </article>
        ))}
      </section>
    </div>
  )
}
