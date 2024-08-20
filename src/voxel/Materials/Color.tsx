import { InstanceProps } from '@react-three/drei'
import { forwardRef, useRef } from 'react'
import ReactiveInstance, { InstanceAPI } from '../VoxelProvider/ReactiveInstance'
import FacesAttribute from '../VoxelProvider/Attributes/FacesAttribute'

export default forwardRef<InstanceAPI, InstanceProps>((props, fRef) => {
  const ref = fRef ?? useRef<InstanceAPI>(null)
  return (
    <ReactiveInstance {...props} ref={ref}>
      <FacesAttribute all={[0, 12]} />
      {props.children}
    </ReactiveInstance>
  )
})
