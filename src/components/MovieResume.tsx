import { useMedia } from '@/hooks/useMedia'
import { i18n } from '@/utils/i18n'
import dayjs from 'dayjs'
import { MovieState } from './MovieState'

export function MovieResume() {
  const { media: movie, watchlist } = useMedia()

  const fields = [
    {
      name: 'releaseDate',
      value: dayjs(movie?.release_date).format('LL'),
    },
    {
      name: 'genres',
      value: movie?.genres?.map((genre) => genre.name).join(', '),
    },
    {
      name: 'runtime',
      value: dayjs().startOf('day').add(movie?.runtime, 'minutes').format('LT'),
      hide: movie?.runtime === 0,
    },
    {
      name: 'directedBy',
      value: movie?.credits?.crew
        ?.filter((person) => person.department === 'Directing')
        .map((person) => person.name)
        .join(', '),
    },
    {
      name: 'writedBy',
      value: movie?.credits?.crew
        ?.filter((person) => person.department === 'Writing')
        .map((person) => person.name)
        .join(', '),
    },
    {
      name: 'with',
      value: movie?.credits?.cast
        ?.filter((person) => person.known_for_department === 'Acting')
        .slice(0, 5)
        .map((person) => person.name)
        .join(', '),
    },
    {
      name: 'budget',
      value: `$${movie?.budget.toLocaleString()}`,
      hide: movie?.budget === 0,
    },
    {
      name: 'revenue',
      value: `$${movie?.revenue.toLocaleString()}`,
      hide: movie?.revenue === 0,
    },
  ]

  return (
    <div class="">
      <h1 class="text-xl font-bold m-0 uppercase p-0 mb-4 text-center">
        {movie?.title}
      </h1>
      <div class="flex justify-center">
        <MovieState
          movie={{
            title: movie?.title,
            tmdb_id: movie?.id,
            poster_path: movie?.poster_path,
            ...watchlist,
          }}
          id={movie?.id}
        />
      </div>
      <div class="text-sm text-left">
        <img
          src={`https://image.tmdb.org/t/p/w200${movie?.poster_path}`}
          alt={movie?.title}
          width={152}
          height={228}
          class="h-auto w-full xs:w-38 w-full xs:float-left mr-4 mb-2"
        />
        {fields
          .filter((field) => !field.hide)
          .filter((field) => field.value)
          .map((field) => (
            <p class="">
              <span class="font-bold  whitespace-nowrap">
                {i18n.t(field.name)}: {''}
              </span>
              {field.value}
            </p>
          ))}
      </div>
    </div>
  )
}
