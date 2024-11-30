import { Loader } from '@/components/Loader'
import { createContext } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { useSession } from './session'
import { supabase } from '@/utils/supabase'
import { i18n } from '@/utils/i18n'
import type { Watchlist } from '@/types/Watchlist'
import { Movie, Serie } from '@/types/media'

export const MediaCtx = createContext<{
  media: (Movie & Serie) | null
  isInWatchlist: boolean
  watchlist: Watchlist | undefined
  fetchReviews: () => void
  setWatchlist: (watchlist: Watchlist) => void
  reviews: any[]
}>({
  media: null,
  isInWatchlist: false,
  watchlist: undefined,
  fetchReviews: () => {},
  setWatchlist: () => {},
  reviews: [],
})

type MediaProviderProps = {
  children: any
  type: string
  id: number
}

export function MediaProvider({ children, type, id }: MediaProviderProps) {
  const session = useSession()
  const [loading, setLoading] = useState(true)
  const [media, setMedia] = useState<any>(null)
  const [watchlist, setWatchlist] = useState<any>(null)
  const [reviews, setReviews] = useState<any[]>([])
  const [error, setError] = useState('')

  const fetchMedia = async () => {
    if (!id || !session?.user?.id) return
    setLoading(true)

    const { data: wl } = await supabase
      .from('watchlist')
      .select('*')
      .eq('user_id', session.user.id)
      .eq('tmdb_id', id)
      .maybeSingle()

    setWatchlist(wl)

    handleFetchReviews()

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}tv/${type}/${id}?language=${
          i18n.language
        }&append_to_response=videos,images,credits`
      )
      const data = await res.json()
      setMedia(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleFetchReviews = async () => {
    if (!session?.user?.id) return

    const { data, error } = await supabase
      .from('posts')
      .select(
        `
        *,
        profiles ( username, avatar )
        `
      )
      .eq('media_id', id)

    if (error) setError(error.message)
    if (data) setReviews(data as any)
  }

  useEffect(() => {
    if (!media?.id) fetchMedia()
  }, [id, session])

  if (loading) return <Loader />
  if (error)
    return <div class="text-center text-dark-error font-bold">{error}</div>

  return (
    <MediaCtx.Provider
      value={{
        media,
        isInWatchlist: !!watchlist,
        watchlist,
        fetchReviews: handleFetchReviews,
        setWatchlist,
        reviews,
      }}
    >
      {children}
    </MediaCtx.Provider>
  )
}
