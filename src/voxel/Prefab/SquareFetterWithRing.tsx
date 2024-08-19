import { InstanceProps } from '@react-three/drei'
import { forwardRef } from 'react'
import Color from '../Materials/Color'
import SquareFetter from './SquareFetter'
import BasicRing from './BasicRing'

export default forwardRef<any, InstanceProps>((props, ref) => {
  return (
    <group name='square_fetter_with_ring' {...props} ref={ref}>
      <SquareFetter />
      <Color position={[0, 0, 6]} color={'#737373'} scale={[1, 2, 3]} />
      <BasicRing position={[0, -4, 6]} />
    </group>
  )
})
