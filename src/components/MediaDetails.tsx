import { useRoute } from 'preact-iso'
import { MovieDetails } from './MovieDetails'
import { TvDetails } from './TvDetails'

export function MediaDetails() {
  const {
    params: { type, id },
  } = useRoute()

  if (type === 'movie') return <MovieDetails id={Number(id)} />

  if (type === 'tv') return <TvDetails id={Number(id)} />
  return null
}
