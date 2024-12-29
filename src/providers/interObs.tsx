import { createContext } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

export const InterObsContext = createContext(false)

export function InterObsProvider({ children }) {
  const observerRef = useRef(null)
  const [interObs, setInterObs] = useState(false)

  useEffect(() => {
    // if (typeof window === 'undefined') return
    const observer = new IntersectionObserver(
      ([entry]) => setInterObs(entry.isIntersecting),
      { rootMargin: '0px 0px 0px 0px', threshold: 0.2 }
    )

    observer.observe(observerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <InterObsContext.Provider value={interObs}>
      <div class="w-full" ref={observerRef}>
        {children}
      </div>
    </InterObsContext.Provider>
  )
}
