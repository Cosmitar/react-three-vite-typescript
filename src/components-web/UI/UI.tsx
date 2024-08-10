import { ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import './ui.scss'
import { SimpleHtml } from '../../components-three/SimpleHtml/SimpleHtml'

const ROOT_SELECTOR = 'canvas'
const PORTAL_ID = 'ui'
const PORTAL_SELECTOR = `#${PORTAL_ID}`
const LAYER_KEY = 'layer'

// creates a div over the root node as a portal placeholder
export default function UI() {
  useEffect(() => {
    const root = document.querySelector(ROOT_SELECTOR)!

    let portal = document.querySelector(PORTAL_SELECTOR)

    if (!portal) {
      portal = document.createElement('div')

      portal.setAttribute('id', PORTAL_ID)

      portal.setAttribute('class', 'ui')

      root.parentNode?.prepend(portal)
    }
  }, [])

  return <></>
}

// creates and removes divs into the portal PORTAL_ID
UI.Layer = ({ children, id, zIndex = 0, fullscreen }: { children: ReactNode; id: string; zIndex?: number; fullscreen?: boolean }) => {
  const [container, setContainer] = useState<Element>()
  useEffect(() => {
    const portal = document.querySelector(`#${PORTAL_ID}`)!
    let layer = document.querySelector(`#${LAYER_KEY}_${id}`)

    if (!layer) {
      layer = document.createElement('div')

      layer.setAttribute('id', `${LAYER_KEY}_${id}`)

      layer.setAttribute('class', `ui_layer ${fullscreen ? 'fullscreen' : ''}`)
      layer.setAttribute('style', `z-index: ${zIndex}`)

      portal.prepend(layer)

      setContainer(layer)
    }

    return () => {
      layer.remove()
    }
  }, [children])

  return children ? (
    <SimpleHtml style={{ display: 'none' }} zIndexRange={[0, 0]} name={`html_layer_${id}`}>
      {container && createPortal(children, container)}
    </SimpleHtml>
  ) : (
    <></>
  )
}

export const LAYERS = {
  UI: 100,
  MODALS: 200,
  OVERLAY: 300,
  TRANSITIONS: 400,
}
