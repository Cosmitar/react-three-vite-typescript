import { InstanceProps } from '@react-three/drei'
import { forwardRef } from 'react'
import Color from '../Materials/Color'

export default forwardRef<any, InstanceProps>((props, ref) => {
  return (
    <group name='basic_ring' {...props} ref={ref}>
      <Color position={[0, 4, 0]} scale={[3, 1, 1]} color={'#A3A3A3'} name={'top'} rotation={[0, 0, 0]} />
      <Color position={[2, 3, 0]} scale={[1, 1, 1]} color={'#A3A3A3'} name={'top_rt'} rotation={[0, 0, 0]} />
      <Color position={[3, 2, 0]} scale={[1, 1, 1]} color={'#A3A3A3'} name={'top_rb'} rotation={[0, 0, 0]} />
      <Color position={[4, 0, 0]} scale={[1, 3, 1]} color={'#A3A3A3'} name={'right'} rotation={[0, 0, 0]} />
      <Color position={[3, -2, 0]} scale={[1, 1, 1]} color={'#A3A3A3'} name={'bottom_rt'} rotation={[0, 0, 0]} />
      <Color position={[2, -3, 0]} scale={[1, 1, 1]} color={'#A3A3A3'} name={'bottom_rb'} rotation={[0, 0, 0]} />
      <Color position={[0, -4, 0]} scale={[3, 1, 1]} color={'#A3A3A3'} name={'bottom'} rotation={[0, 0, 0]} />
      <Color position={[-2, -3, 0]} scale={[1, 1, 1]} color={'#A3A3A3'} name={'bottom_lb'} rotation={[0, 0, 0]} />
      <Color position={[-3, -2, 0]} scale={[1, 1, 1]} color={'#A3A3A3'} name={'bottom_lt'} rotation={[0, 0, 0]} />
      <Color position={[-4, 0, 0]} scale={[1, 3, 1]} color={'#A3A3A3'} name={'left'} rotation={[0, 0, 0]} />
      <Color position={[-2, 3, 0]} scale={[1, 1, 1]} color={'#A3A3A3'} name={'top_lt'} rotation={[0, 0, 0]} />
      <Color position={[-3, 2, 0]} scale={[1, 1, 1]} color={'#A3A3A3'} name={'top_lb'} rotation={[0, 0, 0]} />
    </group>
  )
})
