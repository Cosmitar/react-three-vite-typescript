import { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { CONFIG_TRANSITION, ENTER_TRANSITION, EXIT_TRANSITION, TRANSITIONS_CONFIG } from './Events'
import UI, { LAYERS } from '../UI/UI'

const defaultConfig: TRANSITIONS_CONFIG = {
  color: 'black',
  exitDelayMS: 1000,
  manualExit: true, //false,
}

export default function OverlayTransitions({ children }: { children: ReactNode }) {
  // const [enter, setEnter] = useState(false)
  // const [exit, setExit] = useState(false)
  const [enterExit, setEnterExit] = useState({ enter: false, exit: false })
  const [config, setConfig] = useState(defaultConfig)
  const callback = useRef<Function>()

  useEffect(
    () =>
      ENTER_TRANSITION.subscribe(cb => {
        setEnterExit({ enter: true, exit: false })
        callback.current = cb
      }),
    []
  )
  useEffect(
    () =>
      EXIT_TRANSITION.subscribe(cb => {
        setEnterExit({ enter: false, exit: true })
        callback.current = cb
      }),
    []
  )

  useEffect(
    () =>
      CONFIG_TRANSITION.subscribe(newConfig => {
        setConfig(v => ({ ...v, ...newConfig }))
        // newConfig.color && (config.color = config.color)
        // newConfig.exitDelayMS && (config.exitDelayMS = config.exitDelayMS)
        // console.log(newConfig)
      }),
    []
  )

  const Effect = useMemo(() => CircleEffect, [])

  useEffect(() => {
    if (enterExit.enter && !config.manualExit) {
      setTimeout(() => setEnterExit({ enter: false, exit: true }), config.exitDelayMS)
    }
  }, [enterExit, config])

  const MemoChildren = useMemo(() => children, [children])

  return (
    <Effect enter={enterExit.enter} exit={enterExit.exit} color={config.color} onFinish={callback.current}>
      {MemoChildren}
    </Effect>
  )
}

const CircleEffect = ({
  enter,
  exit,
  color = 'purple',
  onFinish,
  children,
}: {
  enter: boolean
  exit: boolean
  children: ReactNode
  color?: any
  onFinish?: Function
}) => {
  const [entered, setEntered] = useState(false)
  const MemoChildren = useMemo(() => children, [children])

  // const enteredClipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
  // const enterClipPath = 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)'
  const noPathClip = 'circle(100% at center)'
  const enterClipPath = 'circle(0% at center)'

  useEffect(() => {
    if (enter) {
      setTimeout(() => setEntered(true), 500 + 200)
    }
  }, [enter])
  useEffect(() => {
    if (exit) {
      setTimeout(() => setEntered(false), 500 + 200)
    }
  }, [exit])

  useEffect(() => {
    if (enter && entered) {
      onFinish && onFinish()
    }
    if (exit && !entered) {
      onFinish && onFinish
    }
  }, [enter, exit, entered, onFinish])

  return (
    <>
      <div
        id='transition_overlay'
        style={{
          width: '100vw',
          height: '100%',
          backgroundColor: color,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '100vw',
            height: '100%',
            transition: entered ? '0' : '0.5s ease-out',
            clipPath: enter && !entered ? enterClipPath : noPathClip,
          }}
          id='transition_layer'
        >
          {MemoChildren}
        </div>
        <div
          id='transition_layer_02'
          style={{
            position: 'absolute',
            zIndex: entered ? 10 : -1,
            width: exit ? '0' : '150vw',
            height: exit ? '0' : '150vw',
            transition: '0.5s ease-out',
            transitionDelay: '0',
            backgroundColor: color,
            borderRadius: '50%',
          }}
        />
      </div>
    </>
  )
}
