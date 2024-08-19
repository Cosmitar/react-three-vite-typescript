import { useEffect, useRef } from 'react'

const useCappedFrame = (callback: (deltaTime: number, time?: number) => void, fps = 60) => {
  const fpsCap = useRef<Record<'loop', (time: number) => void>>()

  useEffect(() => {
    fpsCap.current = createFpsCap(callback, fps)
    function onAnimationFrame(time: number) {
      fpsCap.current?.loop(time)
      requestAnimationFrame(onAnimationFrame)
    }
    requestAnimationFrame(onAnimationFrame)

    return () => {
      fpsCap.current = undefined
    }
  }, [callback])
  return null
}

export default useCappedFrame

/**
 * Wraps an animation loop function so it can be executed at a specific frame-rate
 * loop {Function}  = The function you want to execute each frames
 * fps {Number}     = The desired frame rate
 */
function createFpsCap(loop: (deltaTime: number, time?: number) => void, fps = 60) {
  let targetFps = 0,
    fpsInterval = 0
  let lastTime = 0,
    lastOverTime = 0,
    prevOverTime = 0,
    deltaTime = 0

  function updateFps(value: number) {
    targetFps = value
    fpsInterval = 1000 / targetFps
  }

  updateFps(fps)

  return {
    // the targeted frame rate
    get fps() {
      return targetFps
    },
    set fps(value) {
      updateFps(value)
    },

    // the frame-capped loop function
    loop: function (time: number) {
      deltaTime = time - lastTime

      if (deltaTime < fpsInterval) {
        return
      }

      prevOverTime = lastOverTime
      lastOverTime = deltaTime % fpsInterval
      lastTime = time - lastOverTime

      deltaTime -= prevOverTime

      return loop(deltaTime, time)
    },
  }
}
