import { forwardRef } from 'react'
import { GroupProps } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'

type PlayerAPI = {}

export default forwardRef<PlayerAPI, GroupProps>(function Player(props, outterRef) {
  return (
    <group {...props}>
      <Sphere>
        <meshLambertMaterial color={'pink'} />
      </Sphere>
    </group>
  )
})
