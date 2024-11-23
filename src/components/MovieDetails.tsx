import { useEffect, useState } from 'preact/hooks'
import { Loader } from './Loader'
import { i18n } from '@/utils/i18n'
import { ToggleInWatchList } from './ToggleInWatchList'
import { supabase } from '@/utils/supabase'
import { useSession } from '@/providers/session'
import { useMedia } from '@/hooks/useMedia'
import { ReviewModal } from './ReviewModal'

type MovieDetailsProps = {
  id: number
}

type Movie = {
  id: number
  title: string
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

export function MovieDetails({ id }: MovieDetailsProps) {
  const { media: movie,watchlist, isInWatchlist } = useMedia()

  return (
    <div class="flex flex-col gap-2">
      <div class="flex gap-3">
        <div class="w-38">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            class="h-auto w-full"
          />
          <div class="flex justify-center mt-2">
            <ToggleInWatchList
              id={movie.id}
              title={movie?.title}
              type={'movie'}
              poster_path={movie.poster_path}
              isAdd={isInWatchlist}
            />
          </div>
        </div>
        <div class="flex-1">
          <h1 class="text-xl font-bold m-0 uppercase p-0">{movie.title}</h1>

          <p class="text-lg">{movie.tagline}</p>
          <div>{movie.release_date}</div>
          {isInWatchlist && <ReviewModal status={watchlist.status} />}
        </div>
      </div>
    </div>
  )
}
