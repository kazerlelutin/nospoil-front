import {
  MEDIA_STATUS,
  PER_PAGE,
  RATING_EMOJIS,
  RATING_LABELS,
} from '@/utils/constants'
import { supabase } from '@/utils/supabase'
import { useEffect, useState } from 'preact/hooks'
import { Avatar } from './Avatar'
import { i18n } from '@/utils/i18n'
import { Spoiler } from './Spoiler'
import { lazy } from 'preact-iso'
import { Pagination } from './Pagination'

const EditorReadOnly = lazy(() =>
  import('./EditorReadOnly').then((mod) => ({ default: mod.EditorReadOnly }))
) as any

// Wathlist stats, wcurrent_epidose, wcurrent_season
export function Flux() {
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [posts, setPosts] = useState([])
  const totalPages = Math.ceil(total / PER_PAGE)

  const fetchcount = async () => {
    const { count, error } = await supabase
      .from('enriched_posts')
      .select('id', { count: 'exact', head: true })

    setLoading(false)
    if (error) {
      console.error('Error fetching posts:', error.message)
      return
    }

    setTotal(count)
  }

  const handleFetchPosts = async (page: number) => {
    const { data, error } = await supabase
      .from('enriched_posts') // Appelle la vue
      .select('*')
      .order('created_at', { ascending: false })
      .range((page - 1) * PER_PAGE, page * PER_PAGE - 1)

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
            post.media_state === MEDIA_STATUS.NOT_SEEN ||
            //Status is watchlist
            post?.status?.match(/completed|not_interested/)
          ) {
            post.hide = false
          }
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
    fetchcount()
  }, [])

  return (
    <div class="h-full relative overflow-hidden">
      <section
        data-section="true"
        class="absolute inset-0 flex flex-col gap-4 overflow-y-auto"
      >
        {posts.map((review) => (
          <article
            key={review.id}
            class="flex flex-col gap-3 border-b-solid border-b-1 border-b-white/10 p-2"
          >
            <header class="flex justify-between">
              <a
                class="flex gap-2 items-center no-underline"
                href={`/watchlist/${review.user_id}`}
              >
                <Avatar alt={review.username} src={review.avatar} size="sm" />
                <div class="flex flex-col">
                  <span>{review.username}</span>
                  {review.type === 'movie' && (
                    <span class="text-xs italic">
                      {i18n.t(review.media_state)}
                    </span>
                  )}
                </div>
              </a>

              <a
                href={`/media/${review.type}/${review.media_id}`}
                className="flex gap-2 no-underline"
              >
                <div class="flex items-center h-full">
                  {review.title}
                  {review.type === 'tv' && (
                    <span class="font-bold px-2">{`E${review.current_episode}S${review.current_season}`}</span>
                  )}
                </div>
                <img
                  src={`https://image.tmdb.org/t/p/w92${review.poster_path}`}
                  alt={`poster ${review.title}`}
                  class="object-contain"
                  width={40}
                  height={56}
                  onError={(e) => {
                    e.currentTarget.src = '/poster.svg'
                  }}
                />
              </a>
            </header>
            <div class="flex flex-col gap-3">
              <time class="text-xs italic opacity-70">
                {new Date(review.updated_at).toLocaleString()}
              </time>
              <Spoiler
                defaultShow={!review.hide}
                fake={
                  <div class="flex flex-col gap-3">
                    <div class="flex items-center gap-2 ">
                      <span class="text-xl">❓</span>
                      "it's hide for real"
                    </div>
                    <EditorReadOnly blocks={review.content} id={review.id} />
                  </div>
                }
              >
                <div class="flex flex-col gap-3">
                  <div class="flex items-center gap-2 ">
                    <span class="text-xl">{RATING_EMOJIS[review.rating]}</span>
                    {i18n.t(RATING_LABELS[review.rating])}
                  </div>
                  <EditorReadOnly blocks={review.content} id={review.id} />
                </div>
              </Spoiler>
            </div>
          </article>
        ))}
        {!loading && (
          <Pagination totalPages={totalPages} onFetch={handleFetchPosts} />
        )}
      </section>
    </div>
  )
}
