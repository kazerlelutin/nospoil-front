import { Flux } from '@/components/Flux'
import { PersistTabs } from '@/components/PersistTabs'
import { MediaList } from '@/components/MediaList'
import { useSession } from '@/providers/session'
import { i18n } from '@/utils/i18n'

const tabs = [
  {
    id: 'flux',
    title: i18n.t('flux'),
    content: <Flux />,
  },
  {
    id: 'watch-list-movie',
    title: i18n.t('movies'),
    content: <MediaList type="movie" />,
  },
  {
    id: 'watch-list-serie',
    title: i18n.t('series'),
    content: <MediaList type="tv" />,
  },
]

export function Home() {
  const session = useSession()
  return (
    <div class="w-full m-auto h-full">
      <div class="grid grid-rows-[auto_1fr] gap-3 h-full">
        <PersistTabs tabs={tabs} key={session?.user?.id || '__'} />
      </div>
    </div>
  )
}
