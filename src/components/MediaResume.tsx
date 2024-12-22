import { useRoute } from 'preact-iso'
import { MovieResume } from './MovieResume'
import { TvResume } from './TvResume'

export function MediaResume() {
  const {
    params: { type },
  } = useRoute()

  if (type === 'movie') return <MovieResume />

  if (type === 'tv') return <TvResume />

  return null
}
