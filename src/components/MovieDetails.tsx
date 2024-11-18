import { useEffect, useState } from 'preact/hooks'
import { Loader } from './Loader'
import { i18n } from '@/utils/i18n'
import { ToggleInWatchList } from './ToggleInWatchList'
import { supabase } from '@/utils/supabase'
import { useSession } from '@/providers/session'

type MovieDetailsProps = {
  id: string
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
  const session = useSession()
  const [loading, setLoading] = useState(true)
  const [movie, setMovie] = useState<Movie | null>(null)
  const [isInWatchlist, setIsInWatchlist] = useState(false)
  const [error, setError] = useState('')

  const fetchMovie = async () => {
    setLoading(true)
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}tv/movie/${id}?language=${
          i18n.language
        }`
      )
      const data = await res.json()

      const { data: wl } = await supabase
        .from('watchlist')
        .select('tmdb_id')
        .eq('user_id', session.user.id)
        .eq('tmdb_id', data.id as number)
        .single()

      setIsInWatchlist(!!wl)
      setMovie(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMovie()
  }, [id])

  if (loading) return <Loader />
  if (error)
    return <div class="text-center text-dark-error font-bold">{error}</div>

  if (movie?.id)
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
          </div>
        </div>
      </div>
    )
}
