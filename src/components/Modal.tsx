import { useState } from 'preact/hooks'
import { JSX } from 'preact/jsx-runtime'

type ModalProps = {
  children: (close: (cb?: () => void) => void) => JSX.Element
  button: (open: () => void) => JSX.Element
  defaultOpen?: boolean
}

export function Modal({ defaultOpen = false, button, children }: ModalProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const openModal = () => setIsOpen(true)

  const closeModal = (cb?: () => void) => {
    cb?.()
    setIsOpen(false)
  }

  return (
    <>
      {button(openModal)}
      {isOpen && (
        <>
          <div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
          <div class="fixed inset-0 flex items-center justify-center z-50">
            <div
              role="alert"
              class="bg-dark-bg border-solid border-1 border-white/20 p-4 rounded-md "
            >
              {children(closeModal)}
            </div>
          </div>
        </>
      )}
    </>
  )
}
