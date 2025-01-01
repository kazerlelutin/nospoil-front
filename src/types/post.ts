import { MEDIA_TYPE } from './media'
import { WatchlistStatus } from './Watchlist'

export type POST = {
  avatar: string
  content: string
  created_at: Date
  current_episode: number | null
  current_season: number | null
  id: string
  importance: string
  media_id: number
  media_state: WatchlistStatus
  poster_path: string
  rating: string
  status: WatchlistStatus
  title: string
  type: MEDIA_TYPE
  updated_at: Date
  user_id: string
  username: string
  wcurrent_episode: number | null
  wcurrent_season: number | null
  hide: boolean
}
