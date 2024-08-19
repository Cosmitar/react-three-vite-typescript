import { InstanceProps } from '@react-three/drei'
import { forwardRef } from 'react'
import Color from '../Materials/Color'

export default forwardRef<any, InstanceProps>((props, ref) => {
  return (
    <group name='square_fetter' {...props} ref={ref}>
      <Color position={[0, 0, 0]} scale={[9, 2, 9]} color={'#A3A3A3'} name={'base'} rotation={[0, 0, 0]} />
      <Color position={[0, 0, 3]} scale={[11, 1, 1]} color={'#737373'} name={'pin_f'} rotation={[0, 0, 0]} />
      <Color position={[0, 0, -3]} scale={[11, 1, 1]} color={'#737373'} name={'pin_b'} rotation={[0, 0, 0]} />
    </group>
  )
})
