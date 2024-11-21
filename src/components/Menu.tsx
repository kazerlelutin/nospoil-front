import { i18n } from '@/utils/i18n'
import { Button } from './Button'

const links = [
  { href: '/', label: 'home' },
  { href: '/search', label: 'search' },
  { href: '/notif', label: 'notifications' },
  { href: '/settings', label: 'settings' },
  { href: '/profile', label: 'profile' },
]

export function Menu() {
  return (
    <nav
      data-menu="false"
      className="md:w-[200px] md:data-[menu=true]:w-[200px] md:data-[menu=false]:w-[200px] h-full p-4 md:flex hidden flex-col gap-6 md:data-[menu=true]:flex data-[menu=true]:flex md:data-[menu=false]:flex data-[menu=false]:hidden data-[menu=true]:bg-dark-bg data-[menu=true]:w-[100dvw] data-[menu=true]:max-w-inherit"
    >
      <ul className="list-none p-0 flex flex-col gap-5 md:gap-3">
        {links.map(({ href, label }) => (
          <li key={href} className="">
            <a
              href={href}
              className="text-light-text dark:text-dark-text dark:hover:text-dark-text hover:text-light-text no-underline"
            >
              {i18n.t(label)}
            </a>
          </li>
        ))}
      </ul>
      <div className="flex w-full">
        <Button>{i18n.t('newPost')}</Button>
      </div>
    </nav>
  )
}
