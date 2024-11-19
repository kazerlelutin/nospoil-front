import { useSession } from '@/providers/session'
import { i18n } from '@/utils/i18n'
import { supabase } from '@/utils/supabase'
import { useEffect, useState } from 'preact/hooks'
import { Loader } from './Loader'
import { ToggleInWatchList } from './ToggleInWatchList'

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
  const session = useSession()
  const [loading, setLoading] = useState(true)
  const [serie, setSerie] = useState<Serie | null>(null)
  const [isInWatchlist, setIsInWatchlist] = useState(false)
  const [error, setError] = useState('')

  const fetchSerie = async () => {
    if (!session?.user?.id) return

    setLoading(true)

    const { data: wl, error } = await supabase
      .from('watchlist')
      .select('tmdb_id')
      .eq('user_id', session.user.id)
      .eq('tmdb_id', id)
      .maybeSingle()

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}tv/tv/${id}?language=${i18n.language}`
      )
      const data = await res.json()
      setSerie(data)

      setIsInWatchlist(!!wl)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSerie()
  }, [id, session])

  if (loading) return <Loader />
  if (error)
    return <div class="text-center text-dark-error font-bold">{error}</div>

  if (serie?.id)
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
          </div>
        </div>
      </div>
    )
}
