import { useRoute } from 'preact-iso'
import { MovieDetails } from './MovieDetails'

export function MediaDetails() {
  const {
    params: { type },
  } = useRoute()

  if (type === 'movie') return <MovieDetails />

  if (type === 'tv') return null

  return null
}
