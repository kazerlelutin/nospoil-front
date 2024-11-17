import { PersistTabs } from '@/components/PersistTabs'

import { i18n } from '@/utils/i18n'
import { lazy } from 'preact-iso'

const SearchMedia = lazy(() =>
  import('@/components/SearchMedia').then((mod) => mod.SearchMedia)
)

const tabs = [
  {
    id: 'movie',
    title: i18n.t('movies'),
    content: <SearchMedia type="movie" />,
  },
  {
    id: 'series',
    title: i18n.t('series'),
    content: <SearchMedia type="tv" />,
  },
]

export function Search() {
  return (
    <div class="w-full m-auto h-full">
      <div class="grid grid-rows-[auto_1fr] gap-6 h-full ">
        <PersistTabs tabs={tabs} />
      </div>
    </div>
  )
}
