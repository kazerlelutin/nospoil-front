import { JSX } from 'preact/jsx-runtime'

type ButtonProps = {
  children: JSX.Element | string
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  disabled?: boolean
}

//SOLID
export function Button({
  children,
  onClick,
  disabled,
  type,
  ...rest
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      data-type={type}
      class={`
        disabled:opacity-50 border-solid border-1 border-dark-text text-dark-text bg-dark-bg 
        rounded-sm px-2 py-1 cursor-pointer hover:bg-dark-text hover:text-dark-bg 
        data-[type=reset]:border-white/20 data-[type=reset]:bg-white/5
        `}
      {...rest}
    >
      {children}
    </button>
  )
}
