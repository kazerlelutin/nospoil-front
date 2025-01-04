import { i18n } from '@/utils/i18n'
import { Button } from './Button'
import { Modal } from './Modal'
import {
  MEDIA_RATINGS,
  MEDIA_STATUS,
  RATING_EMOJIS,
  RATING_LABELS,
} from '@/utils/constants'

import { lazy, useRoute } from 'preact-iso'
import { useReviewModal } from '@/hooks/useReviewModal'
import { MEDIA_TYPE } from '@/types/media'

const Editor = lazy(() =>
  import('./Editor').then((mod) => ({ default: mod.Editor }))
) as any

type ReviewModalProps = {
  callback: (page: number) => void | Promise<void>
}
export function ReviewModal({ callback }: ReviewModalProps) {
  const {
    params: { type, id },
    query,
  } = useRoute()

  const {
    initValue,
    loading,
    rating,
    watchlist,
    openModal,
    save,
    setRating,
    setReview,
  } = useReviewModal({
    id,
    type: type as MEDIA_TYPE,
    page: parseInt(query.page as string),
    callback,
  })

  return (
    <Modal
      button={(openCb) => (
        <div class="flex flex-col items-end gap-2">
          <div>
            <Button onClick={() => openModal(openCb)}>
              {i18n.t('writeAReview')}
            </Button>
          </div>
        </div>
      )}
    >
      {(closeCb) => (
        <div class="grid gap-4 grid-rows-[auto_auto_1fr_auto] h-[80dvh] w-[90dvw] md:w-[40dvw]">
          <h3 class="text-md text-center">{watchlist?.title}</h3>

          <div class="flex flex-col gap-3">
            <div class="flex items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                {RATING_EMOJIS[rating]}
                {i18n.t(RATING_LABELS[rating])}
              </div>

              <span class="italic bold">
                {type === 'tv' &&
                  `E${watchlist?.current_episode || 1}S${
                    watchlist?.current_season || 1
                  }`}
                {type === 'movie' &&
                  i18n.t(watchlist?.status || MEDIA_STATUS.NOT_SEEN)}
              </span>
            </div>
            <div class="flex flex-wrap gap-4">
              {Object.values(MEDIA_RATINGS).map((ra) => (
                <button
                  data-current={rating === ra}
                  class={
                    'flex items-center gap-2 data-[current=true]:opacity-30'
                  }
                  onClick={() => setRating(ra)}
                >
                  <span class="text-xl"> {RATING_EMOJIS[ra]}</span>
                </button>
              ))}
            </div>
          </div>
          <div class="relative">
            <div class="absolute inset-0 overflow-y-auto p-2">
              <Editor
                id="review"
                initialValue={initValue?.content}
                onChange={setReview}
                placeholder={i18n.t('writeYourReviewHere')}
              />
            </div>
          </div>
          <div class="flex justify-between gap-4">
            <Button onClick={() => closeCb()} type="reset">
              {i18n.t('close')}
            </Button>
            <Button onClick={() => save(closeCb)}>
              {i18n.t(loading ? 'loading' : 'save')}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  )
}
