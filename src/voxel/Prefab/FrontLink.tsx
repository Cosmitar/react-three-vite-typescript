import { InstanceProps } from '@react-three/drei'
import { forwardRef } from 'react'
import Color from '../Materials/Color'

export default forwardRef<any, InstanceProps>((props, ref) => {
  return (
    <group name='front_link' {...props} ref={ref}>
      <Color position={[-1.25, 0, 0]} scale={[0.75, 2, 0.5]} color={'#63584d'} name={'link_l'} rotation={[0, 0, 0]} />
      <Color position={[1.25, 0, 0]} scale={[0.75, 2, 0.5]} color={'#63584d'} name={'link_r'} rotation={[0, 0, 0]} />
      <Color position={[0, 1.35, 0]} scale={[3.25, 0.75, 0.5]} color={'#63584d'} name={'link_t'} rotation={[0, 0, 0]} />
      <Color position={[0, -1.35, 0]} scale={[3.25, 0.75, 0.5]} color={'#63584d'} name={'link_b'} rotation={[0, 0, 0]} />
    </group>
  )
})
