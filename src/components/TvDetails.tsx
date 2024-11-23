import { ToggleInWatchList } from './ToggleInWatchList'
import { ReviewModal } from './ReviewModal'
import { useMedia } from '@/hooks/useMedia'

type Serie = {
  id: number
  name: string
  overview: string
  poster_path: string
  backdrop_path: string
  genres: { id: number; name: string }[]
  vote_average: number
  vote_count: number
  release_date: string
  runtime: number
  status: string
  tagline: string
  original_language: string
  production_companies: { id: number; name: string }[]
  production_countries: { iso_3166_1: string; name: string }[]
}

type TvDetailsProps = {
  id: number
}
export function TvDetails({ id }: TvDetailsProps) {
  const { media, isInWatchlist } = useMedia()
  const serie = media as Serie

  return (
    <div class="flex flex-col gap-2">
      <div class="flex gap-3">
        <div class="w-38">
          <img
            src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
            alt={serie.name}
            class="h-auto w-full"
          />
          <div class="flex justify-center mt-2">
            <ToggleInWatchList
              id={serie.id}
              title={serie?.name}
              type={'tv'}
              poster_path={serie.poster_path}
              isAdd={isInWatchlist}
            />
          </div>
        </div>
        <div class="flex-1">
          <h1 class="text-xl font-bold m-0 uppercase p-0">{serie.name}</h1>
          <p class="text-lg">{serie.tagline}</p>
          <div>{serie.release_date}</div>
          <ReviewModal />
        </div>
      </div>
    </div>
  )
}
