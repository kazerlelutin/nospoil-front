import { useEffect } from 'preact/hooks'
import { useAsyncState } from './useAsyncState'
import { i18n } from '@/utils/i18n'

export function useMediaData(tmdbId: number, type: 'movie' | 'tv') {
  const {
    data: media,
    setData: setMedia,
    loading,
    error,
    run,
  } = useAsyncState<any>()

  useEffect(() => {
    run(async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}tv/${type}/${tmdbId}?language=${
          i18n.language
        }&append_to_response=videos,images,credits`
      )
      const data = await res.json()

      if (!res.ok) throw new Error(res.statusText)
      return data
    })
  }, [tmdbId, type])

  return { media, setMedia, loading, error }
}
