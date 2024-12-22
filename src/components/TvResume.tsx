import { i18n } from '@/utils/i18n'

import { useMedia } from '@/hooks/useMedia'
import dayjs from 'dayjs'
import { TvState } from './TvState'

export function TvResume() {
  const { media: tv, watchlist } = useMedia()

  const fields = [
    {
      name: 'releaseDate',
      value: dayjs(tv?.release_date).format('LL'),
    },
    {
      name: 'status',
      value: i18n.t(tv?.status),
    },
    {
      name: 'genres',
      value: tv?.genres?.map((genre) => genre.name).join(', '),
    },
    {
      name: 'numberOfSeasons',
      value: `${tv?.number_of_seasons} (${tv?.number_of_episodes} episode${
        tv.number_of_episodes > 1 ? 's' : ''
      })`,
    },
    {
      name: 'createdBy',
      value: tv?.created_by.map((person) => person.name).join(', '),
    },
    {
      name: 'with',
      value: tv?.credits?.cast
        ?.filter((person) => person.known_for_department === 'Acting')
        .slice(0, 5)
        .map((person) => person.name)
        .join(', '),
    },
  ]

  return (
    <div class="">
      <TvState
        item={{
          poster_path: tv?.poster_path,
          title: tv?.name,
          tmdb_id: tv?.id,
          ...watchlist,
        }}
        canFetch={false}
        defaultSeasons={tv.seasons}
      />

      <div class="text-sm text-left">
        <img
          src={`https://image.tmdb.org/t/p/w200${tv?.poster_path || ''}`}
          alt={tv.name}
          class="h-auto w-full xs:w-38 w-full xs:float-left mr-4 mb-2"
        />
        {fields.map((field) => (
          <p class="first-letter:uppercase">
            <span class="font-bold  whitespace-nowrap ">
              {i18n.t(field.name)}: {''}
            </span>
            {field.value}
          </p>
        ))}
      </div>
    </div>
  )
}
