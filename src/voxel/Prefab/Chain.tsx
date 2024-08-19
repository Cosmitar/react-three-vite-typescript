import { InstanceProps } from '@react-three/drei'
import { forwardRef } from 'react'
import FrontLink from './FrontLink'
import JointLink from './JointLink'

export default forwardRef<any, InstanceProps>((props, ref) => {
  return (
    <group name='chain' {...props} ref={ref}>
      <JointLink position={[0, 0.35, 0]} />
      <FrontLink position={[0, 0, 0]} />
      <JointLink position={[0, -3.85, 0]} />
      <FrontLink position={[0, -4.25, 0]} />
      <JointLink position={[0, -8.15, 0]} />
      <FrontLink position={[0, -8.5, 0]} />
    </group>
  )
})
