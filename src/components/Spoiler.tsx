import { useState } from 'preact/hooks'

type SpoilerProps = {
  children: preact.ComponentChildren
  initialHidden?: boolean
  fake?: preact.ComponentChildren
}

export function Spoiler({ children, fake, initialHidden }: SpoilerProps) {
  const [hidden, setHidden] = useState(initialHidden || false)

  const toggleShow = () => {
    setHidden((prev) => !prev)
  }

  return (
    <div class="relative cursor-pointer" data-show={true} onClick={toggleShow}>
      {hidden && (
        <div class="absolute inset-0 backdrop-blur-sm backdrop-filter z-10"></div>
      )}
      {!hidden ? children : fake || children}
    </div>
  )
}
