export type Watchlist = {
  id: number
  title: string
  poster_path?: string
  type: WatchlistType
  updated_at: string
  user_id: string
  tmdb_id: number
  added_at: Date
  status: WatchlistStatus
  is_public: boolean
  current_episode: number
  current_season: number
}

export enum WatchlistStatus {
  planned = 'planned',
  watching = 'watching',
  completed = 'completed',
  dropped = 'dropped',
  on_hold = 'on_hold',
  not_interested = 'not_interested',
}

export enum WatchlistType {
  movie = 'movie',
  tv = 'tv',
}
