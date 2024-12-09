import { useState } from 'preact/hooks'
import { JSX } from 'preact/jsx-runtime'

type PersistTabsProps = {
  tabs: {
    id: string
    title: string
    content: JSX.Element
  }[]
  defaultTab?: string
}

export function PersistTabs({ tabs, defaultTab }: PersistTabsProps) {
  const hash = typeof window !== 'undefined' ? window.location.hash : ''
  const [currentTab, setCurrentTab] = useState(
    hash.slice(1) || defaultTab || tabs[0].id
  )

  if (!currentTab) return null
  return (
    <>
      <nav className="flex gap-4 border-b-solid border-white/15 border-b-1 py-2">
        <ul className="flex flex gap-3 list-none m-0 p-0">
          {tabs.map((tab) => (
            <li key={tab.id} className="relative px-1">
              <a
                href={`#${tab.id}`}
                onClick={() => {
                  setCurrentTab(tab.id)
                }}
                data-current={currentTab === tab.id}
                className="text-light-text dark:text-dark-text dark:hover:text-dark-text hover:text-light-text no-underline data-[current=true]:text-white hover:text-white"
              >
                {tab.title}
              </a>
              {currentTab === tab.id && (
                <div className="absolute -bottom-3 left-0 right-0 h-1 dark:bg-dark-text"></div>
              )}
            </li>
          ))}
        </ul>
      </nav>
      {tabs.find((tab) => tab.id === currentTab)?.content}
    </>
  )
}
