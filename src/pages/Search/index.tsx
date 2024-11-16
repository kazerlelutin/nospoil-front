import { PersistTabs } from '@/components/PersistTabs'
import { SearchMedia } from '@/components/SearchMedia'
import { i18n } from '@/utils/i18n'

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
    <div class="w-full m-auto h-full grid grid-rows-[auto_1fr] gap-3">
      <div class="border-b-solid pb-1 border-b-1 border-b-dark flex flex-col gap-6">
        <PersistTabs tabs={tabs} />
      </div>
    </div>
  )
}
