import { InstanceProps } from '@react-three/drei'
import { forwardRef } from 'react'
import Color from '../Materials/Color'

export default forwardRef<any, InstanceProps>((props, ref) => {
  return (
    <group name='joint_link' {...props} ref={ref}>
      <Color position={[0, 1.75, 0]} scale={[0.5, 3, 1]} color={'#716458'} name={'link'} rotation={[0, 0, 0]} />
      {/* <Color position={[0, -1.75, 0]} scale={[0.5, 2, 1]} color={'#b13e3e'} name={'link'} rotation={[0, 0, 0]} /> */}
    </group>
  )
})
