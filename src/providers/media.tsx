import { createContext } from 'preact'
import { useSession } from './session'
import type { Watchlist } from '@/types/Watchlist'
import { Movie, Serie } from '@/types/media'
import { useWatchlist } from '@/hooks/useWatchlist'
import { useMediaData } from '@/hooks/useMediaData'

export const MediaCtx = createContext<{
  media: (Movie & Serie) | null
  loading?: boolean
  isInWatchlist: boolean
  watchlist: Watchlist | undefined
  setWatchlist: (watchlist: Watchlist) => void
}>({
  media: null,
  isInWatchlist: false,
  watchlist: undefined,
  loading: true,
  setWatchlist: () => {},
})

type MediaProviderProps = {
  children: any
  type: 'movie' | 'tv'
  id: number
}

export function MediaProvider({ children, type, id }: MediaProviderProps) {
  const session = useSession()
  const { watchlist, setWatchlist } = useWatchlist(session?.user?.id, id)
  const { media, loading } = useMediaData(id, type)

  return (
    <MediaCtx.Provider
      value={{
        media,
        isInWatchlist: !!watchlist,
        watchlist,
        loading,
        setWatchlist,
      }}
    >
      {children}
    </MediaCtx.Provider>
  )
}
