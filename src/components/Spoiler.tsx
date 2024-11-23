import { useState } from 'preact/hooks'
import { JSX } from 'preact/jsx-runtime'

type SpoilerProps = {
  children: JSX.Element
  defaultShow?: boolean
  fake?: JSX.Element
}

export function Spoiler({ children, fake, defaultShow }: SpoilerProps) {
  const [show, setShow] = useState(defaultShow || false)

  const toggleShow = () => {
    setShow((prev) => !prev)
  }

  return (
    <div class="relative cursor-pointer" data-show={true} onClick={toggleShow}>
      {!show && (
        <div class="absolute inset-0 backdrop-blur-sm backdrop-filter z-10"></div>
      )}
      {show ? children : fake || children}
    </div>
  )
}
