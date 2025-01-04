import { render, screen, fireEvent, waitFor } from '@testing-library/preact'
import { ReviewModal } from '@/components/ReviewModal'
import { describe, it, expect, vi } from 'vitest'

import { useReviewModal } from '@/hooks/useReviewModal'

// Mock des dépendances
vi.mock('@/utils/i18n', () => ({
  i18n: {
    t: vi.fn((key) => key),
  },
}))

vi.mock('@/hooks/useReviewModal', () => ({
  useReviewModal: vi.fn(),
}))

vi.mock('preact-iso', () => ({
  useRoute: vi.fn(() => ({
    params: { type: 'movie', id: '1' },
    query: { page: '1' },
  })),
  lazy: (loader) => {
    const Component = loader
    return () => <Component />
  },
}))

describe('ReviewModal', () => {
  it('should render the modal button', () => {
    //@ts-ignore
    useReviewModal.mockReturnValue({
      initValue: null,
      loading: false,
      rating: 0,
      watchlist: { title: 'Test Movie' },
      openModal: vi.fn(),
      save: vi.fn(),
      setRating: vi.fn(),
      setReview: vi.fn(),
    })

    render(<ReviewModal callback={vi.fn()} />)
    expect(screen.getByText('writeAReview')).toBeInTheDocument()
  })

  it('should open the modal when button is clicked', async () => {
    const openMock = vi.fn((cb) => {
      cb()
    })
    //@ts-ignore
    useReviewModal.mockReturnValue({
      initValue: null,
      loading: false,
      rating: 0,
      watchlist: { title: 'Test Movie' },
      openModal: openMock,
      save: vi.fn(),
      setRating: vi.fn(),
      setReview: vi.fn(),
    })

    render(<ReviewModal callback={vi.fn()} />)
    fireEvent.click(screen.getByText('writeAReview'))

    expect(openMock).toHaveBeenCalled()

    await waitFor(() => {
      expect(screen.getByText('Test Movie')).toBeInTheDocument()
    })
  })

  it('should save the review when save button is clicked', async () => {
    const openMock = vi.fn((cb) => {
      cb()
    })

    const saveMock = vi.fn()
    //@ts-ignore
    useReviewModal.mockReturnValue({
      initValue: null,
      loading: false,
      rating: 0,
      watchlist: { title: 'Test Movie' },
      openModal: openMock,
      save: saveMock,
      setRating: vi.fn(),
      setReview: vi.fn(),
    })

    render(<ReviewModal callback={vi.fn()} />)
    fireEvent.click(screen.getByText('writeAReview'))

    expect(openMock).toHaveBeenCalled()

    await waitFor(() => {
      expect(screen.getByText('Test Movie')).toBeInTheDocument()
    })
    fireEvent.click(screen.getByText('save'))

    await waitFor(() => {
      expect(saveMock).toHaveBeenCalled()
    })
  })

  it('should close the modal when close button is clicked', async () => {
    const openMock = vi.fn((cb) => {
      cb()
    })

    const saveMock = vi.fn()
    //@ts-ignore
    useReviewModal.mockReturnValue({
      initValue: null,
      loading: false,
      rating: 0,
      watchlist: { title: 'Test Movie' },
      openModal: openMock,
      save: saveMock,
      setRating: vi.fn(),
      setReview: vi.fn(),
    })

    render(<ReviewModal callback={vi.fn()} />)
    fireEvent.click(screen.getByText('writeAReview'))

    expect(openMock).toHaveBeenCalled()

    await waitFor(() => {
      expect(screen.getByText('Test Movie')).toBeInTheDocument()
    })
    fireEvent.click(screen.getByText('close'))

    await waitFor(() => {
      expect(screen.getByText('writeAReview')).toBeInTheDocument()
    })
  })
})
