/**
 * Extracted from Drei's <Html>, this is a (in-progress) adaptation to render from r3f into the DOM without all the extra costs of the original Html component.
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { Group } from 'three'
import { Assign } from 'utility-types'
import { ReactThreeFiber, useThree } from '@react-three/fiber'
import { ForwardRefComponent } from '@react-three/drei/helpers/ts-utils'

type PointerEventsProperties =
  | 'auto'
  | 'none'
  | 'visiblePainted'
  | 'visibleFill'
  | 'visibleStroke'
  | 'visible'
  | 'painted'
  | 'fill'
  | 'stroke'
  | 'all'
  | 'inherit'

export interface HtmlProps
  extends Omit<Assign<React.HTMLAttributes<HTMLDivElement>, ReactThreeFiber.Object3DNode<Group, typeof Group>>, 'ref'> {
  prepend?: boolean
  center?: boolean
  fullscreen?: boolean
  portal?: React.MutableRefObject<HTMLElement>
  zIndexRange?: Array<number>
  as?: string
  wrapperClass?: string
  pointerEvents?: PointerEventsProperties
}

export const SimpleHtml: ForwardRefComponent<HtmlProps, HTMLDivElement> = /* @__PURE__ */ React.forwardRef(
  (
    {
      children,
      style,
      className,
      prepend,
      center,
      fullscreen,
      portal,
      zIndexRange = [16777271, 0],
      as = 'div',
      wrapperClass,
      pointerEvents = 'auto',
      ...props
    }: HtmlProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const { gl, events } = useThree()

    const [el] = React.useState(() => document.createElement(as))
    const root = React.useRef<ReactDOM.Root>()
    const group = React.useRef<Group>(null!)
    // Append to the connected element, which makes HTML work with views
    const target = (portal?.current || events.connected || gl.domElement.parentNode) as HTMLElement

    React.useLayoutEffect(() => {
      if (group.current) {
        const currentRoot = (root.current = ReactDOM.createRoot(el))

        return () => {
          currentRoot.unmount()
        }
      }
      return () => {}
    }, [target])

    React.useLayoutEffect(() => {
      root.current?.render(<div ref={ref} className={className} children={children} />)
    })

    return <group {...props} ref={group}></group>
  }
)
