import { useEffect, useRef, useState } from 'react'

const lastWindowSize = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// @TODO replace approach with syncExternalStorage
export default function useWindowResize(callback: (size: { width: number; height: number }) => void = () => {}) {
  const resizeTimer = useRef<NodeJS.Timeout>()
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  const onResize = () => {
    clearTimeout(resizeTimer.current)
    resizeTimer.current = setTimeout(function () {
      handleResize()
    }, 250) // Adjust the debounce time as needed
  }

  useEffect(() => {
    window.addEventListener('resize', onResize)
    screen.orientation.addEventListener('change', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      screen.orientation.removeEventListener('change', onResize)
    }
  }, [])

  useEffect(() => {
    if (lastWindowSize.width !== window.innerWidth || lastWindowSize.height !== window.innerHeight) {
      callback(windowSize)
      lastWindowSize.width = windowSize.width
      lastWindowSize.height = windowSize.height
    }
  }, [windowSize])

  return windowSize
}
