import { useMedia } from '@/hooks/useMedia'
import { i18n } from '@/utils/i18n'

export function TvDetails() {
  const { media: serie } = useMedia()

  return (
    <div class="flex flex-col gap-3 mt-6">
      <div class="text-sm py-2">{serie.overview}</div>
      {serie?.videos?.results.length > 0 && (
        <div class="w-full flex justify-center">
          <iframe
            class="aspect-w-16 aspect-h-9"
            src={`https://www.youtube.com/embed/${serie.videos.results[0].key}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      )}
      <h2>{i18n.t('cast')}</h2>
      <div class="flex gap-3 flex-wrap">
        {serie?.credits?.cast
          ?.filter((person) => person.known_for_department === 'Acting')
          .slice(0, 5)
          .map((person) => (
            <div key={person.id} class="w-20">
              <img
                src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                alt={person.name}
                class="h-auto w-full"
              />
              <div class="text-xs text-center">{person.name}</div>
            </div>
          ))}
      </div>
    </div>
  )
}
