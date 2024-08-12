import { CSSProperties, useEffect, useRef, useState } from 'react'
import { Html, Hud, PerspectiveCamera } from '@react-three/drei'

type ButtonConfig = {
  label: string
  onClick: () => void
  keyCode: KeyboardEvent['code']
}

type Buttons = ButtonConfig[]

const isModKey = (key: KeyboardEvent['key']) => ['Shift', 'Meta', 'Alt', 'Control'].includes(key)
export enum POSITIONS {
  TOP_LEFT = 'top_left',
  TOP_CENTER = 'top_center',
  TOP_RIGHT = 'top_right',
  CENTER_LEFT = 'center_left',
  CENTER_CENTER = 'center_center',
  CENTER_RIGHT = 'center_right',
  BOTTOM_LEFT = 'bottom_left',
  BOTTOM_CENTER = 'bottom_center',
  BOTTOM_RIGHT = 'bottom_right',
}

const StylesByPosition: Record<POSITIONS, CSSProperties> = {
  [POSITIONS.TOP_LEFT]: { top: '-50vh', transform: 'translate(-50%)', justifyContent: 'flex-start' },
  [POSITIONS.TOP_CENTER]: { top: '-50vh', transform: 'translate(-50%)', justifyContent: 'center' },
  [POSITIONS.TOP_RIGHT]: { top: '-50vh', transform: 'translate(-50%)', justifyContent: 'flex-end' },
  [POSITIONS.CENTER_LEFT]: { transform: 'translate(-50%)', justifyContent: 'flex-start' },
  [POSITIONS.CENTER_CENTER]: { transform: 'translate(-50%)', justifyContent: 'center' },
  [POSITIONS.CENTER_RIGHT]: { transform: 'translate(-50%)', justifyContent: 'flex-end' },
  [POSITIONS.BOTTOM_LEFT]: { transform: 'translate(-50%, 47vh)', justifyContent: 'flex-start' },
  [POSITIONS.BOTTOM_CENTER]: { transform: 'translate(-50%, 47vh)', justifyContent: 'center' },
  [POSITIONS.BOTTOM_RIGHT]: { transform: 'translate(-50%, 47vh)', justifyContent: 'flex-end' },
}

export default function DevRouterBar({
  buttons,
  toggleVisibilityCode = 'KeyV',
  position = POSITIONS.BOTTOM_CENTER,
}: {
  buttons: Buttons
  toggleVisibilityCode?: KeyboardEvent['code']
  position?: POSITIONS
}) {
  const modKeys = useRef<Record<KeyboardEvent['key'], boolean>>({ Shift: false, Meta: false, Alt: false, Control: false }).current
  const [visible, setVisible] = useState(true)
  const onKeyDown = (e: KeyboardEvent) => {
    // console.info(e) // keep it for quick reference in browser console

    if (isModKey(e.key)) modKeys[e.key] = true

    e.code === toggleVisibilityCode && setVisible(v => !v)

    buttons.forEach(btn => {
      btn.keyCode === e.code && btn.onClick()
    })
  }
  const onKeyUp = (e: KeyboardEvent) => {
    if (isModKey(e.key)) modKeys[e.key] = false
  }
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [buttons])
  return (
    <>
      <Hud renderPriority={1}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        {visible && (
          <Html
            style={{
              width: '100vw',
              height: 'auto',
              display: 'flex',
              ...StylesByPosition[position],
              backgroundColor: '#000a',
            }}
            zIndexRange={[110, 0]}
          >
            <div style={{ position: 'absolute' }}>
              {buttons.map((button, idx) => (
                <button key={`${button.label}-${idx}`} onClick={button.onClick} style={{ backgroundColor: 'white', border: '2px dashed gray', color: 'black'}}>
                  [{button.keyCode.replace(/Key|Digit/, '')}] {button.label}
                </button>
              ))}
            </div>
          </Html>
        )}
      </Hud>
    </>
  )
}
