import { RefObject, useEffect, useState } from 'react'

export function useIsInView<T extends HTMLElement>(elToObserve: RefObject<T>) {
  const [isInView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        } else {
          setInView(false)
        }
      },
      {
        root: null, // browser viewport
        rootMargin: '50px' // margin around the root
      }
    )

    if (elToObserve?.current) {
      observer.observe(elToObserve.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [elToObserve])

  return { isInView }
}
