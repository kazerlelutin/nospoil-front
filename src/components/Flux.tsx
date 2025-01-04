import { Avatar } from './Avatar'
import { i18n } from '@/utils/i18n'
import { Spoiler } from './Spoiler'
import { lazy } from 'preact-iso'
import { Pagination } from './Pagination'
import { useFetchPosts } from '@/hooks/useFetchPosts'
import { RATING_EMOJIS, RATING_LABELS } from '@/utils/constants'

const EditorReadOnly = lazy(() =>
  import('./EditorReadOnly').then((mod) => ({ default: mod.EditorReadOnly }))
) as any

export function Flux() {
  const { totalPages, posts, fetchPosts } = useFetchPosts()

  return (
    <div class="h-full relative overflow-hidden">
      <section class="absolute inset-0 flex flex-col gap-4 overflow-y-auto">
        {posts?.map((post) => (
          <article
            key={post.id}
            class="flex flex-col gap-3 border-b-solid border-b-1 border-b-white/10 p-2"
          >
            <header class="flex justify-between">
              <a
                class="flex gap-2 items-center no-underline"
                href={`/watchlist/${post.user_id}`}
              >
                <Avatar alt={post.username} src={post.avatar} size="sm" />
                <div class="flex flex-col">
                  <span>{post.username}</span>
                  {post.type === 'movie' && (
                    <span class="text-xs italic">
                      {i18n.t(post.media_state)}
                    </span>
                  )}
                </div>
              </a>

              <a
                href={`/media/${post.type}/${post.media_id}`}
                className="flex gap-2 no-underline"
              >
                <div class="flex items-center h-full">
                  {post.title}
                  {post.type === 'tv' && (
                    <span class="font-bold px-2">{`E${post.current_episode}S${post.current_season}`}</span>
                  )}
                </div>
                <img
                  src={`https://image.tmdb.org/t/p/w92${post.poster_path}`}
                  alt={`poster ${post.title}`}
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
                {new Date(post.updated_at).toLocaleString()}
              </time>
              <Spoiler
                initialHidden={post.hide}
                fake={
                  <div class="flex flex-col gap-3">
                    <div class="flex items-center gap-2 ">
                      <span class="text-xl">❓</span>
                      "it's hide for real"
                    </div>
                  </div>
                }
              >
                <div class="flex flex-col gap-3">
                  <div class="flex items-center gap-2 ">
                    <span class="text-xl">{RATING_EMOJIS[post.rating]}</span>
                    {i18n.t(RATING_LABELS[post.rating])}
                  </div>
                  <EditorReadOnly blocks={post.content} id={post.id} />
                </div>
              </Spoiler>
            </div>
          </article>
        ))}

        <Pagination totalPages={totalPages} onFetch={fetchPosts} />
      </section>
    </div>
  )
}
