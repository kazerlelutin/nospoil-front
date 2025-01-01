import { Avatar } from '@/components/Avatar'
import { PersistTabs } from '@/components/PersistTabs'
import { WatchListRead } from '@/components/WatchListRead'
import { useUser } from '@/hooks/useUser'
import { i18n } from '@/utils/i18n'
import { useRoute } from 'preact-iso'

const tabs = [
  {
    id: 'watch-list-movie',
    title: i18n.t('movies'),
    content: <WatchListRead type="movie" />,
  },
  {
    id: 'watch-list-serie',
    title: i18n.t('series'),
    content: <WatchListRead type="tv" />,
  },
]

export function Watchlist() {
  const {
    params: { user_id },
  } = useRoute()

  const user = useUser(user_id)

  return (
    <div class="w-full m-auto h-full">
      <div class="grid grid-rows-[auto_auto_1fr] gap-3 h-full">
        <header class="flex gap-2 items-center mt-3 justify-center">
          {user && (
            <>
              <Avatar alt={user?.username} src={user?.avatar} size="sm" />
              <div class="flex flex-col">
                <span>{user?.username}</span>
              </div>
            </>
          )}
        </header>
        <PersistTabs tabs={tabs} key={user_id} />
      </div>
    </div>
  )
}
