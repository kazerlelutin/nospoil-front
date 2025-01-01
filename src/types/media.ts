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
  budget: number
  revenue: number
  credits: {
    crew: Cast[]
    cast: Cast[]
  }

  videos: {
    results: {
      id: string
      key: string
      name: string
      site: string
      type: string
    }[]
  } | null
}

type Cast = {
  id: number
  name: string
  original_name: string
  job: string
  profile_path: string
  department:
    | 'Directing'
    | 'Production'
    | 'Writing'
    | 'Sound'
    | 'Camera'
    | 'Art'
    | 'Costume & Make-Up'
    | 'Visual Effects'
    | 'Crew'
    | 'Lighting'
    | 'Editing'
    | 'Actors'
    | 'Creator'
    | 'Production Management'
    | 'Costume & Make-Up'
    | 'Directing'
    | 'Writing'
    | 'Production'
    | 'Sound'
    | 'Camera'
    | 'Art'
    | 'Visual Effects'
    | 'Crew'
    | 'Lighting'
    | 'Editing'
    | 'Actors'
    | 'Creator'
    | 'Production Management'
  known_for_department: string
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
  created_by: Cast[]
  first_air_date: string
  number_of_seasons: number
  number_of_episodes: number
  seasons: {
    air_date: string
    poster_path: string
    season_number: number
    episode_count: number
    overview: string
  }[]
}

export type MEDIA_TYPE = 'movie' | 'tv'
