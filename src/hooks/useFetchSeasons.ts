import { useAsyncState } from '@/hooks/useAsyncState'
import { Serie } from '@/types/media'
import { i18n } from '@/utils/i18n'

export function useFetchSeasons(tmdb_id: number) {
  const {
    data: seasons,
    setData: setSeasons,
    loading,
    error,
    run,
  } = useAsyncState<Serie['seasons']>()

  const fetchSeason = async () => {
    await run(async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}tv/tv/${tmdb_id}?language=${
          i18n.language
        }`
      )

      if (!res.ok) throw new Error('Error fetching seasons')
      const { seasons: dataSeasons } = await res.json()

      return dataSeasons
    })
  }

  return { seasons, setSeasons, loading, error, fetchSeason }
}
