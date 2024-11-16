import { JSX } from 'preact/jsx-runtime'

type ButtonProps = {
  children: JSX.Element | string
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

export function Button({ children, onClick, type, ...rest }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      {...rest}
      data-type={type}
      class="border-solid border-1 border-dark-text text-dark-text bg-dark-bg rounded-sm px-3 py-2 cursor-pointer hover:bg-dark-text hover:text-dark-bg data-[type=reset]:border-white/20 data-[type=reset]:bg-white/5"
    >
      {children}
    </button>
  )
}
