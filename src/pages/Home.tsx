import { Flux } from '@/components/Flux'
import { PersistTabs } from '@/components/PersistTabs'
import { WatchList } from '@/components/WatchList'
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
    title: i18n.t('myMovies'),
    content: <WatchList type="movie" />,
  },
  {
    id: 'watch-list-serie',
    title: i18n.t('mySeries'),
    content: <WatchList type="tv" />,
  },
]

export function Home() {
  const session = useSession()
  return (
    <div class="w-full m-auto h-full">
      <div class="grid grid-rows-[auto_1fr] gap-6 h-full">
        <PersistTabs tabs={tabs} key={session?.user?.id || '__'} />
      </div>
    </div>
  )
}
