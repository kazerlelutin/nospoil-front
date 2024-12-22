import { Loader } from '@/components/Loader'
import { createContext } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { useSession } from './session'
import { supabase } from '@/utils/supabase'
import { i18n } from '@/utils/i18n'
import type { Watchlist } from '@/types/Watchlist'
import { Movie, Serie } from '@/types/media'
import { PER_PAGE } from '@/utils/constants'

export const MediaCtx = createContext<{
  media: (Movie & Serie) | null
  reviews: any[]
  loading?: boolean
  isInWatchlist: boolean
  watchlist: Watchlist | undefined
  totalPagesReview: number
  fetchReviews: (page: number) => void
  setWatchlist: (watchlist: Watchlist) => void
}>({
  media: null,
  isInWatchlist: false,
  watchlist: undefined,
  reviews: [],
  loading: true,
  totalPagesReview: 0,
  fetchReviews: () => {},
  setWatchlist: () => {},
})

type MediaProviderProps = {
  children: any
  type: string
  id: number
}

export function MediaProvider({ children, type, id }: MediaProviderProps) {
  const session = useSession()
  const [loading, setLoading] = useState(true)
  const [loadingCount, setLoadingCount] = useState(true)
  const [media, setMedia] = useState<any>(null)
  const [watchlist, setWatchlist] = useState<any>(null)
  const [totalReview, setTotalReview] = useState(0)
  const [reviews, setReviews] = useState<any[]>([])
  const [error, setError] = useState('')
  const totalPagesReview = Math.ceil(totalReview / PER_PAGE)

  const fetchMedia = async () => {
    if (!id || !session?.user?.id) return
    setLoadingCount(true)

    const { data: wl } = await supabase
      .from('watchlist')
      .select('*')
      .eq('user_id', session.user.id)
      .eq('tmdb_id', id)
      .maybeSingle()

    setWatchlist(wl)

    fetchReviewCount()

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
      setLoadingCount(false)
    }
  }

  const fetchReviewCount = async () => {
    if (!session?.user?.id) return
    setLoading(true)

    const { count, error } = await supabase
      .from('posts')
      .select('id', { count: 'exact', head: true })
      .eq('media_id', id)

    if (error) setError(error.message)
    setTotalReview(count)
    setLoading(false)
  }

  const handleFetchReviews = async (page: number) => {
    if (!session?.user?.id) return

    const { data, error } = await supabase
      .from('posts')
      .select(
        `
        *,
        profiles ( username, avatar, id )
        `
      )
      .eq('media_id', id)
      .range((page - 1) * PER_PAGE, page * PER_PAGE - 1)

    if (error) setError(error.message)
    if (data) setReviews(data as any)
  }

  useEffect(() => {
    if (!media?.id) fetchMedia()
  }, [id, session])

  if (loading || loadingCount)
    return (
      <div class="flex items-center justify-center p-3">
        <Loader />
      </div>
    )
  if (error)
    return <div class="text-center text-dark-error font-bold">{error}</div>

  return (
    <MediaCtx.Provider
      value={{
        media,
        isInWatchlist: !!watchlist,
        watchlist,
        reviews,
        loading,
        totalPagesReview,
        fetchReviews: handleFetchReviews,
        setWatchlist,
      }}
    >
      {children}
    </MediaCtx.Provider>
  )
}
