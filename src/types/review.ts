export type Review = {
  id: string
  rating: number
  content: string
  updated_at: string
  media_state: string
  current_season: number
  current_episode: number
  profiles: {
    id: string
    username: string
    avatar: string
  }
}
