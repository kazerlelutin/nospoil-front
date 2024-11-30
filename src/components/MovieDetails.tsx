import { useMedia } from '@/hooks/useMedia'
import { ReviewModal } from './ReviewModal'

export function MovieDetails() {
  const { media: movie, watchlist, isInWatchlist } = useMedia()

  return (
    <div class="flex flex-col gap-2">
      <div class="flex gap-3">
        <div class="w-38">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            class="h-auto w-full"
          />
        </div>
        <div class="flex-1">
          <h1 class="text-xl font-bold m-0 uppercase p-0">{movie.title}</h1>

          <p class="text-lg">{movie.tagline}</p>
          <div>{movie.release_date}</div>
          {isInWatchlist && <ReviewModal status={watchlist.status} />}
        </div>
      </div>
    </div>
  )
}
