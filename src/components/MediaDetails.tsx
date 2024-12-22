import { useRoute } from 'preact-iso'
import { MovieDetails } from './MovieDetails'
import { TvDetails } from './TvDetails'

export function MediaDetails() {
  const {
    params: { type },
  } = useRoute()

  if (type === 'movie') return <MovieDetails />

  if (type === 'tv') return <TvDetails />

  return null
}
