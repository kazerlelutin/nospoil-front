import { i18n } from '@/utils/i18n'
import { useEffect, useState } from 'preact/hooks'
import { MediaCard } from './MediaCard'
import { supabase } from '@/utils/supabase'
import { useSession } from '@/providers/session'
import { InterObsProvider } from '@/providers/interObs'
import { WatchListTvCard } from './WatchListTvCard'
import { WatchListMovieCard } from './WatchListMovieCard'

type SearchProps = {
  type: 'movie' | 'tv'
  search: string
}

export function SearchMedia({ type, search }: SearchProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState([])
  const [noResult, setNoResult] = useState(false)
  const session = useSession()

  const handleSearch = async (search: string) => {
    setNoResult(false)
    if (!search) return
    setLoading(true)
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }tv/search/${type}?query=${search}&language=${i18n.language}&limit=100`
      )
      const { results } = await res.json()
      const { data: wl } = await supabase
        .from('watchlist')
        .select()
        .eq('user_id', session.user.id)
        .in(
          'tmdb_id',
          results.map((r: any) => r.id)
        )

      setData(
        results.map((r: any) => {
          const wlItem = wl.find((w: any) => w.tmdb_id == r.id)
          return {
            ...r,
            type,
            title: r.title || r.name,
            tmdb_id: r.id || wlItem.tmdb_id,
            ...wlItem,
          }
        })
      )
      if (!results.length) setNoResult(true)
    } catch (error) {
      setError(error.message)
      console.error('Error fetching search:', error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleSearch(search)
  }, [search])

  return (
    <div class="relative h-full">
      {loading && (
        <div class="flex flex-col gap-3">
          {Array.from({
            length: 12,
          }).map((_, index) => (
            <MediaCard key={`${index}`} type={type} />
          ))}
        </div>
      )}
      <div
        data-loading={loading}
        class="absolute inset-0 overflow-y-auto data-[loading=true]:overflow-hidden p-x-1"
      >
        {data.length > 0 && !loading && (
          <div class="flex flex-col gap-3">
            {data.map((item) => {
              if (item.type === 'tv')
                return (
                  <InterObsProvider>
                    <WatchListTvCard item={item} key={item.id} />
                  </InterObsProvider>
                )

              if (item.type === 'movie')
                return (
                  <div>
                    <WatchListMovieCard item={item} key={item.id} />
                  </div>
                )
              return null
            })}
          </div>
        )}

        {noResult && (
          <p class="text-center text-dark-error">{i18n.t('noResult')}</p>
        )}
      </div>
    </div>
  )
}
