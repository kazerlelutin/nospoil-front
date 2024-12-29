import { Hamburger } from './Hamburger'
import { JSX } from 'preact/jsx-runtime'
import { Logo } from '@/components/Logo'
import { Profile } from './Profile'

export function Header(): JSX.Element {
  return (
    <header class="flex gap-2 items-center px-2 justify-between">
      <div class="flex">
        <div class="md:hidden md:m-0 mr-2">
          <Hamburger />
        </div>
        <Logo />
      </div>
      <div class="flex items-center py-1">
        <Profile />
      </div>
    </header>
  )
}
