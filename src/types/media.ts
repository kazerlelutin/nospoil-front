export type Movie = {
  id: number
  title: string
  overview: string
  poster_path: string
  backdrop_path: string
  genres: { id: number; name: string }[]
  vote_average: number
  vote_count: number
  release_date: string
  runtime: number
  status: string
  tagline: string
  original_language: string
  production_companies: { id: number; name: string }[]
  production_countries: { iso_3166_1: string; name: string }[]
}

export type Serie = {
  id: number
  name: string
  overview: string
  poster_path: string
  backdrop_path: string
  genres: { id: number; name: string }[]
  vote_average: number
  vote_count: number
  release_date: string
  runtime: number
  status: string
  tagline: string
  original_language: string
  production_companies: { id: number; name: string }[]
  production_countries: { iso_3166_1: string; name: string }[]
}
