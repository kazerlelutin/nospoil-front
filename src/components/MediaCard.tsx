import { i18n } from '@/utils/i18n'
import { ToggleInWatchList } from './ToggleInWatchList'

type MediaCardProps = {
  id?: number
  title?: string
  name?: string
  poster_path?: string
  overview?: string
  isAdd?: boolean
  type: 'movie' | 'tv'
}
export function MediaCard({
  id,
  title,
  name,
  poster_path,
  overview,
  isAdd,
  type,
}: MediaCardProps) {
  const link = `/media/${type}/${id}`

  return (
    <article class="w-full rounded-md border-solid border-1 border-white/10 overflow-hidden relative grid grid-cols-[auto_1fr]">
      <a href={link} class=" flex items-center justify-center">
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          class="w-28 h-40 object-cover"
          onError={(e) => {
            e.currentTarget.src = '/poster.svg'
          }}
        />
      </a>

      <div class="p-2 flex flex-col justify-between">
        <header class="flex gap-3 items-center justify-between">
          <h2 class="text-lg font-bold p-0 m-0 ">
            <a
              href={link}
              data-placeholder={!id}
              class="text-white no-underline text-lg font-bold"
            >
              {title}
            </a>
          </h2>
        </header>
        <div class="flex gap-3 text-xs items-start h-20 overflow-hidden relative">
          {overview ? (
            <>
              <a href={link} data-placeholder={!id} class="no-underline">
                {overview}
              </a>

              <div
                class="absolute inset-x-0 bottom-0 h-8"
                style={{
                  background:
                    'linear-gradient(0deg, rgba(0,0,0,1) 42%, rgba(0,0,0,0) 100%)',
                }}
              />
            </>
          ) : (
            <span class="italic">{id && i18n.t('noOverview')}</span>
          )}
        </div>

        <footer class="flex justify-between gap-2 ">
          <ToggleInWatchList
            id={id}
            title={title || name}
            type={type}
            poster_path={poster_path}
            isAdd={isAdd}
          />
        </footer>
      </div>
    </article>
  )
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
            href={link}
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
        <a href={link}>{i18n.t('moreInfo')}</a>
        <ToggleInWatchList
          id={id}
          title={title || name}
          type={type}
          poster_path={poster_path}
          isAdd={isAdd}
        />
      </div>
    </article>
  )
}
