import { useState } from 'preact/hooks'
import { JSX } from 'preact/jsx-runtime'

type SpoilerProps = {
  children: JSX.Element
}

export function Spoiler({ children }: SpoilerProps) {
  const [show, setShow] = useState(false)

  const toggleShow = () => {
    setShow((prev) => !prev)
  }

  return (
    <div class="relative cursor-pointer" data-show={true} onClick={toggleShow}>
      {show && (
        <div class="absolute inset-0 backdrop-blur-sm backdrop-filter"></div>
      )}
      {children}
    </div>
  )
}
