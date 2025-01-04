import { MediaDetails } from '@/components/MediaDetails'
import { MediaResume } from '@/components/MediaResume'
import { PersistTabs } from '@/components/PersistTabs'
import { Reviews } from '@/components/Reviews'
import { MediaProvider } from '@/providers/media'
import { i18n } from '@/utils/i18n'
import { useRoute } from 'preact-iso'

const tabs = [
  {
    id: 'reviews',
    title: i18n.t('reviews'),
    content: <Reviews />,
  },
  {
    id: 'details',
    title: i18n.t('details'),
    content: <MediaDetails />,
  },
]

export function Media() {
  const {
    params: { type, id },
  } = useRoute()

  if (!type || !id || !type.match(/tv|movie/)) return null

  return (
    <MediaProvider type={type as 'movie' | 'tv'} id={Number(id)}>
      <div class="w-full m-auto h-full relative gap-3">
        <div class="absolute inset-0 overflow-y-auto py-1 px-4">
          <MediaResume />
          <div class="w-full flex flex-col">
            <PersistTabs tabs={tabs} />
          </div>
        </div>
      </div>
    </MediaProvider>
  )
}
