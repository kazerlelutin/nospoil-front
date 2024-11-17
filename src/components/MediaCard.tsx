import { i18n } from '@/utils/i18n'
import { Button } from './Button'

type MediaCardProps = {
  id?: number
  title?: string
  name?: string
  poster_path?: string
  overview?: string
}
export function MediaCard({
  id,
  title,
  name,
  poster_path,
  overview,
}: MediaCardProps) {
  return (
    <article class="flex flex-col gap-3 rounded-md border-solid border-1 border-white/10 p-2">
      <div class="flex gap-3">
        <div class="w-16 flex items-center justify-center ">
          {poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={title}
              class="w-full h-auto"
            />
          ) : (
            <div class="w-16 h-24 bg-white/10 rounded-sm"></div>
          )}
        </div>

        <div class="flex-1">
          <a
            href={`/media/${id}`}
            data-placeholder={!id}
            class="data-[placeholder=true]:bg-white/10 data-[placeholder=true]:rounded-sm data-[placeholder=true]:h-6 no-underline text-xl font-bold"
          >
            {title || name}
          </a>
          <p
            data-placeholder={!id}
            class="data-[placeholder=true]:bg-white/10 data-[placeholder=true]:rounded-sm data-[placeholder=true]:h-20"
          >
            {overview ? (
              overview
            ) : (
              <span class="italic">{id && i18n.t('noOverview')}</span>
            )}
          </p>
        </div>
      </div>
      <div class="flex justify-end gap-6 items-center">
        <a href={`/media/${id}`}>{i18n.t('moreInfo')}</a>
        <Button onClick={() => console.log('d')}>
          {i18n.t('addToWatchlist')}
        </Button>
      </div>
    </article>
  )
}
