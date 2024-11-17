import { Flux } from '@/components/Flux'
import { PersistTabs } from '@/components/PersistTabs'
import { SpoilZone } from '@/components/SpoilZone'
import { WatchList } from '@/components/WatchList'
import { useSession } from '@/providers/session'
import { i18n } from '@/utils/i18n'
import { supabase } from '@/utils/supabase'
import { useEffect, useState } from 'preact/hooks'

const tabs = [
  {
    id: 'flux',
    title: i18n.t('flux'),
    content: <Flux />,
  },
  {
    id: 'watch-list',
    title: i18n.t('myWatchlist'),
    content: <WatchList />,
  },
  {
    id: 'spoil-zone',
    title: i18n.t('spoilZone'),
    content: <SpoilZone />,
  },
]

export function Home() {
  const session = useSession()

  useEffect(() => {
    supabase
      .from('profiles')
      .select()
      .single()
      .then((data) => {
        console.log('===>', data)
      })
  }, [])

  const updateSession = async () => {
    const { user } = session

    const updates = {
      id: user.id,
      username: 'TTTTTT',
      avatar: 'avatarUrl',
      updated_at: new Date(),
    }

    const { error, data } = await supabase.from('profiles').upsert(updates)
    console.log(error, data)
  }

  return (
    <div class="w-full m-auto h-full grid grid-rows-[auto_1fr] gap-3">
      <div class="border-b-solid pb-1 border-b-1 border-b-dark flex flex-col gap-6">
        <PersistTabs tabs={tabs} />
      </div>
    </div>
  )
}
