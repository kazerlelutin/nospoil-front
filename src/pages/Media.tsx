import { MediaDetails } from '@/components/MediaDetails'
import { PersistTabs } from '@/components/PersistTabs'
import { i18n } from '@/utils/i18n'

const tabs = [
  {
    id: 'details',
    title: i18n.t('details'),
    content: <MediaDetails />,
  },
  {
    id: 'reviews',
    title: i18n.t('reviews'),
    content: <MediaDetails />,
  },
]

export function Media() {
  return (
    <div class="w-full m-auto h-full grid grid-rows-[auto_1fr] gap-3">
      <div class="border-b-solid pb-1 border-b-1 border-b-dark flex flex-col gap-6">
        <PersistTabs tabs={tabs} />
      </div>
    </div>
  )
}
