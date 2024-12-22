import { useState } from 'preact/hooks'
import { i18n } from '@/utils/i18n'
import { useDebounce } from '@/hooks/useDebounce'
import { SearchMedia } from './SearchMedia'
import { WatchList } from './WatchList'

type MediaListProps = {
  type: 'movie' | 'tv'
}

export function MediaList({ type }: MediaListProps) {
  const [search, setSearch] = useState('')
  const [focus, setFocus] = useState(false)

  const debouncedSearch = useDebounce(search, 500)

  const handleCancel = () => {
    setSearch('')
  }

  return (
    <div class="h-full grid grid-rows-[auto_1fr] gap-2">
      <div class="flex gap-3 items-center mx-2">
        <input
          type="text"
          value={search}
          onInput={(e) => setSearch(e.currentTarget.value)}
          placeholder={`${i18n.t('search')} : ${i18n.t(type)}`}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          class={`
          flex-1 border-white/20 bg-white/5 p-3 outline-none rounded-sm
          border-solid border-1 border-transparent focus:border-white/50 
          w-full
        `}
        />
        {(focus || search) && (
          <button
            class="bg-transparent rounded-none border-none p-0 cursor-pointer"
            onClick={handleCancel}
          >
            {i18n.t('cancel')}
          </button>
        )}
      </div>

      <div class="relative h-full">
        <div class="absolute inset-0 overflow-y-auto p-2 flex flex-col gap-4">
          {debouncedSearch ? (
            <SearchMedia type={type} search={debouncedSearch} />
          ) : (
            <WatchList type={type} />
          )}
        </div>
      </div>
    </div>
  )
}
