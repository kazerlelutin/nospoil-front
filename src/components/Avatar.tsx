import { forwardRef } from 'preact/compat'

type AvatarProps = {
  src: string
  alt: string
  size?: 'sm' | 'md' | 'lg'
}

export const Avatar = forwardRef(
  ({ src, alt, size = 'md' }: AvatarProps, ref) => {
    return (
      <img
        src={`${
          import.meta.env.VITE_SUPABASE_URL
        }/storage/v1/object/public/avatars/${src}`}
        //@ts-ignore
        ref={ref}
        alt={alt || 'avatar'}
        data-size={size}
        class="w-16 h-16  data-[size=sm]:w-8 data-[size=sm]:h-8 rounded-full border-solid border-3 border-white/50 "
        onError={(e) => {
          e.currentTarget.src = '/avatar.svg'
        }}
      />
    )
  }
)
