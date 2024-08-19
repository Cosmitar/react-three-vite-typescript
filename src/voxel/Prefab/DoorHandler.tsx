import { InstanceProps } from '@react-three/drei'
import { forwardRef } from 'react'
import Color from '../Materials/Color'
import BasicRing from './BasicRing'

export default forwardRef<any, InstanceProps>((props, ref) => {
  return (
    <group name='door_handler' {...props} ref={ref}>
      <Color position={[1.01, 0, 0]} color={'#737373'} scale={[1, 4, 2]} name='base' />
      <Color position={[-1.01, 0, 0]} color={'#737373'} scale={[1, 4, 2]} name='base' />
      <BasicRing position={[0, -4, 0]} />
    </group>
  )
})
