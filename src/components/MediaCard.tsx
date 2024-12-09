import { i18n } from '@/utils/i18n'

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
  poster_path,
  overview,
  type,
}: MediaCardProps) {
  const link = `/media/${type}/${id}`

  return (
    <article class="w-full rounded-md border-solid border-1 border-white/10 overflow-hidden relative grid grid-cols-[auto_1fr]">
      <a href={link} class=" flex items-center justify-center">
        <img
          src={`https://image.tmdb.org/t/p/w92${poster_path}`}
          alt={title}
          width={40}
          height={56}
          class="object-contain"
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
      </div>
    </article>
  )
}
