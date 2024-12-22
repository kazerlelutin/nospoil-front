import { useEffect, useMemo } from 'preact/hooks'
import { Button } from './Button'
import { useLocation, useRoute } from 'preact-iso'

type PaginationProps = {
  totalPages: number
  onFetch: (page: number) => void
}

const btnClass =
  'border-1 border-dark-text border-solid rounded-sm p-1 h-6 w-6 flex items-center justify-center'
const sectionMaxPages = 4

export function Pagination({ totalPages, onFetch }: PaginationProps) {
  const { query } = useRoute()
  const { route } = useLocation()

  const { pages, page } = useMemo(() => {
    const page_ = parseInt(query.page as string) || 1
    const page = Math.max(1, Math.min(totalPages, page_))

    //Prevent  overflows
    if (page !== page_) {
      const query = new URLSearchParams(window.location.search)
      query.set('page', page.toString())
      route('?' + query.toString())
    }

    const start = Math.max(1, page - sectionMaxPages / 2)

    const end = Math.min(page + sectionMaxPages / 2, totalPages)

    const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i)
    return { pages, page }
  }, [totalPages, query.page])

  const handleClick = (p: number) => {
    const query = new URLSearchParams(window.location.search)
    query.set('page', p.toString())
    route('?' + query.toString())
  }

  useEffect(() => {
    onFetch(page)
  }, [page])

  if (totalPages <= 1) return null
  return (
    <nav class="flex gap-2 w-full justify-between p-2">
      <Button onClick={() => handleClick(1)} disabled={page <= 1}>
        {'<<'}
      </Button>
      <Button onClick={() => handleClick(page - 1)} disabled={page <= 1}>
        {'<'}
      </Button>
      <div class="flex gap-2 w-full justify-center flex-wrap">
        {pages[0] > 1 && <span>...</span>}
        {pages.map((p) => (
          <button
            class={btnClass}
            key={p}
            onClick={() => handleClick(p)}
            disabled={p === page}
          >
            {p}
          </button>
        ))}
        {pages[pages.length - 1] < totalPages && <span>...</span>}
      </div>
      <Button
        onClick={() => handleClick(page + 1)}
        disabled={page >= totalPages}
      >
        {'>'}
      </Button>
      <Button
        onClick={() => handleClick(totalPages)}
        disabled={page >= totalPages}
      >
        {'>>'}
      </Button>
    </nav>
  )
}
