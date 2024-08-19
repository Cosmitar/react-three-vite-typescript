import { InstanceProps } from '@react-three/drei'
import { forwardRef } from 'react'
import Color from '../Materials/Color'

export default forwardRef<any, InstanceProps>((props, ref) => {
  return (
    <group name='brick' {...props}>
      <Color color={props.color ?? 'peru'} scale={[1.2, 0.5, 0.5]} />
      <Color color={props.color ?? 'peru'} scale={[1, 0.7, 0.5]} />
    </group>
  )
})
