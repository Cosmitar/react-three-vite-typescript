import { InstanceProps } from '@react-three/drei'
import { forwardRef, useRef } from 'react'
import ReactiveInstance, { InstanceAPI } from '../VoxelProvider/ReactiveInstance'
import Faces from '../VoxelProvider/Attributes/Faces'

export default forwardRef<InstanceAPI, InstanceProps>((props, fRef) => {
  const ref = fRef ?? useRef<InstanceAPI>(null)
  return (
    <ReactiveInstance {...props} ref={ref}>
      <Faces all={[0, 12]} />
      {props.children}
    </ReactiveInstance>
  )
})
