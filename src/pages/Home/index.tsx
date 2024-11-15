import { Flux } from '@/components/Flux'
import { PersistTabs } from '@/components/PersistTabs'
import { SpoilZone } from '@/components/SpoilZone'
import { WatchList } from '@/components/WatchList'
import { lazy } from 'preact/compat'

const tabs = [
  {
    id: 'flux',
    title: 'Flux',
    content: <Flux />,
  },
  {
    id: 'watch-list',
    title: 'Ma watch list',
    content: <WatchList />,
  },
  {
    id: 'spoil-zone',
    title: 'Spoil zone',
    content: <SpoilZone />,
  },
]

export function Home() {
  return (
    <div class="max-w-lg m-auto h-full grid grid-rows-[auto_1fr] gap-3">
      <div class="border-b-solid pb-1 border-b-1 border-b-dark flex flex-col gap-6">
        <PersistTabs tabs={tabs} />
      </div>
    </div>
  )
}
