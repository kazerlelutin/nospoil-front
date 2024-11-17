import { useDebounce } from '@/hooks/useDebounce'
import { i18n } from '@/utils/i18n'
import { useEffect, useState } from 'preact/hooks'

type SearchProps = {
  type: 'movie' | 'tv'
}

export function SearchMedia({ type }: SearchProps) {
  const [search, setSearch] = useState('')
  const [focus, setFocus] = useState(false)
  const initialRecentSearch =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem(`recent_search_${type}`) || '[]')
      : '[]'
  const [recentSearch, setRecentSearch] =
    useState<string[]>(initialRecentSearch)
  const [data, setData] = useState([])
  const lsKey = `recent_search_${type}`

  const debouncedSearch = useDebounce(search, 500)

  const saveRecentSearch = (str: string) => {
    const recentSearch = JSON.parse(localStorage.getItem(lsKey) || '[]')
    if (recentSearch.includes(str)) return

    recentSearch.unshift(str)
    localStorage.setItem(lsKey, JSON.stringify(recentSearch))
    setRecentSearch(recentSearch)
  }

  const deleteRecentSearch = (str: string) => {
    const recentSearch = JSON.parse(localStorage.getItem(lsKey) || '[]')
    const newRecentSearch = recentSearch.filter((s: string) => s !== str)

    localStorage.setItem(lsKey, JSON.stringify(newRecentSearch))
    setRecentSearch(newRecentSearch)
  }

  useEffect(() => {
    if (!debouncedSearch) return
    saveRecentSearch(debouncedSearch)
  }, [debouncedSearch])

  return (
    <div class="h-full grid grid-rows-[auto_1fr] gap-2">
      <div class="flex gap-3 items-center">
        <input
          type="text"
          value={search}
          onInput={(e) => setSearch(e.currentTarget.value)}
          placeholder={`${i18n.t('search')} : ${i18n.t(type)}`}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          class="flex-1 border-none bg-white/20 p-3 outline-none rounded-sm border-solid border-2 border-transparent focus:border-white/50"
        />
        {(focus || search) && (
          <button
            class="bg-transparent rounded-none border-none p-0 cursor-pointer"
            onClick={() => setSearch('')}
          >
            {i18n.t('cancel')}
          </button>
        )}
      </div>
      {!search && !data.length && (
        <div>
          <h2>{i18n.t('recentSearches')}</h2>
          <ul class="flex flex-col gap-2 p-0">
            {recentSearch.map((str: string) => (
              <li class="flex gap-2 justify-between hover:bg-white/10 p-1">
                <span>{str}</span>

                <button
                  class="bg-transparent rounded-none p-0 outline-none border-none cursor-pointer"
                  onClick={() => deleteRecentSearch(str)}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {data.length > 0 && <div>RESULTS</div>}
    </div>
  )
}
