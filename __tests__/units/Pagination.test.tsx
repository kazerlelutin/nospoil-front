import { render, screen, fireEvent, cleanup } from '@testing-library/preact'
import { Pagination } from '@/components/Pagination'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useLocation, useRoute } from 'preact-iso'

// Mock des dépendances
vi.mock('preact-iso', () => ({
  useLocation: vi.fn(),
  useRoute: vi.fn(),
}))

describe('Pagination', () => {
  const onFetch = vi.fn()
  const routeMock = vi.fn()
  const queryMock = { page: '1' }

  beforeEach(() => {
    cleanup()
    //@ts-ignore
    useLocation.mockReturnValue({ route: routeMock })
    //@ts-ignore
    useRoute.mockReturnValue({ query: queryMock })
  })

  it('No render if 1 os less page', () => {
    const { container } = render(
      <Pagination totalPages={1} onFetch={onFetch} />
    )

    const div = container.querySelector('div[aria-description="no pagination"]')
    expect(div).toBeInTheDocument()
    expect(screen.queryByText('<<')).not.toBeInTheDocument()
  })

  it('should render pagination buttons', () => {
    render(<Pagination totalPages={5} onFetch={onFetch} />)
    expect(screen.getByText('<<')).toBeInTheDocument()
    expect(screen.getByText('<')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('...')).toBeInTheDocument()
    expect(screen.getByText('>')).toBeInTheDocument()
    expect(screen.getByText('>>')).toBeInTheDocument()
  })

  it('should call onFetch with the correct page number', () => {
    render(<Pagination totalPages={5} onFetch={onFetch} />)
    expect(onFetch).toHaveBeenCalledWith(1)
  })

  it('should update page number on button click', () => {
    render(<Pagination totalPages={5} onFetch={onFetch} />)
    fireEvent.click(screen.getByText('2'))
    expect(routeMock).toHaveBeenCalledWith('?page=2')
  })

  it('should disable previous buttons on first page', () => {
    render(<Pagination totalPages={5} onFetch={onFetch} />)
    expect(screen.getByText('<<')).toBeDisabled()
    expect(screen.getByText('<')).toBeDisabled()
  })

  it('should disable next buttons on last page', () => {
    queryMock.page = '5'
    render(<Pagination totalPages={5} onFetch={onFetch} />)
    expect(screen.getByText('>>')).toBeDisabled()
    expect(screen.getByText('>')).toBeDisabled()
  })

  it('should show ellipses when pages are not contiguous', () => {
    render(<Pagination totalPages={6} onFetch={onFetch} />)
    expect(screen.queryByText('...')).toBeInTheDocument()
  })

  it('should navigate to the first page on "<<" button click', () => {
    queryMock.page = '3'
    render(<Pagination totalPages={5} onFetch={onFetch} />)
    fireEvent.click(screen.getByText('<<'))
    expect(routeMock).toHaveBeenCalledWith('?page=1')
    expect(onFetch).toHaveBeenCalledWith(3)
  })

  it('should navigate to the previous page on "<" button click', () => {
    queryMock.page = '3'
    render(<Pagination totalPages={5} onFetch={onFetch} />)
    fireEvent.click(screen.getByText('<'))
    expect(routeMock).toHaveBeenCalledWith('?page=2')
    expect(onFetch).toHaveBeenCalledWith(3)
  })

  it('should navigate to the next page on ">" button click', () => {
    queryMock.page = '3'
    render(<Pagination totalPages={5} onFetch={onFetch} />)
    fireEvent.click(screen.getByText('>'))
    expect(routeMock).toHaveBeenCalledWith('?page=4')
    expect(onFetch).toHaveBeenCalledWith(3)
  })

  it('should navigate to the last page on ">>" button click', () => {
    queryMock.page = '3'
    render(<Pagination totalPages={5} onFetch={onFetch} />)
    fireEvent.click(screen.getByText('>>'))
    expect(routeMock).toHaveBeenCalledWith('?page=5')
    expect(onFetch).toHaveBeenCalledWith(3)
  })
})
