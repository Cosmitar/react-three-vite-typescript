import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { GroupProps } from '@react-three/fiber'
import { Instance, InstanceProps } from '@react-three/drei'
import { Mesh } from 'three'

export type HealthBarAPI = {
  setProgress: (value: number) => void
}
type BarProps = {
  width?: number
  progress?: number
}

export default forwardRef<HealthBarAPI, GroupProps & BarProps>(function HealthBar({ width = 5, progress = 1, ...props }, outterRef) {
  const paddingScale = 0.1
  const padding = width * paddingScale

  const progressBarRef = useRef<InstanceProps>()

  useImperativeHandle(
    outterRef,
    () => ({
      setProgress: (value: number) => {
        const length = width * value
        const pos = -(width - length) / 2

        ;(progressBarRef.current! as unknown as Mesh).scale.setX(Math.max(0, length))
        ;(progressBarRef.current! as unknown as Mesh).position.setX(pos)
      },
    }),
    []
  )

  return (
    <group {...props} >
      <Instance
        name='bar_container'
        color={'#000'}
        scale={[width + padding, 1 + padding, 0.001]}
        // position={[-(1 + padding) / 2, 0, 0]}
      />
      <Instance ref={progressBarRef} name='bar_container' color={'#0f0'} scale={[width * progress, 1, 0.1]} position={[0, 0, 0]} />
    </group>
  )
})
