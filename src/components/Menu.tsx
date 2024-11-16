import { i18n } from '@/utils/i18n'
import { Button } from './Button'

const links = [
  { href: '/', label: 'home' },
  { href: '/search', label: 'search' },
  { href: '/notif', label: 'notification' },
  { href: '/params', label: 'params' },
  { href: '/profil', label: 'profil' },
]

export function Menu() {
  return (
    <nav className="max-w-[240px] p-4 flex flex-col gap-6">
      <ul className="list-none p-0 flex flex-col gap-2">
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
