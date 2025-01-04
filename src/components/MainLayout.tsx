import { useLocation } from 'preact-iso'
import { Header } from './Header'
import { Menu } from './Menu'
import { JSX } from 'preact/jsx-runtime'
import { SessionProvider } from '@/providers/session'

type MainLayoutProps = {
  children: JSX.Element
}
export function MainLayout({ children }: MainLayoutProps) {
  const { path } = useLocation()

  if (path.startsWith('/login')) {
    return children
  }

  return (
    <SessionProvider>
      <div className="grid grid-rows-[auto_1fr] text-light-text dark:text-dark-text dark:bg-dark-bg bg-light-bg h-dvh p-2 md:p-0">
        <Header />
        <div className="text-light-text dark:text-dark-text dark:bg-dark-bg bg-light-bg h-full relative">
          <main className="relative h-full">
            <div className="absolute inset-0 md:w-lg m-auto">{children}</div>
          </main>
          <div className="absolute left-0 bottom-0 top-0 z-50">
            <Menu />
          </div>
        </div>
      </div>
    </SessionProvider>
  )
}
