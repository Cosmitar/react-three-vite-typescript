import { InstanceProps } from '@react-three/drei'
import { forwardRef, useRef } from 'react'
import ReactiveInstance, { InstanceAPI } from '../VoxelProvider/ReactiveInstance'
import FacesAttribute from '../VoxelProvider/Attributes/FacesAttribute'
import FlagsAttribute from '../VoxelProvider/Attributes/FlagsAttribute'

export default forwardRef<InstanceAPI | any, InstanceProps>((props, fRef) => {
  const ref = fRef ?? useRef<InstanceAPI>(null)
  return (
    <ReactiveInstance {...props} ref={ref}>
      {/* transparent faces */}
      <FacesAttribute all={[6, 12]} />

      {/* colored surface */}
      <FlagsAttribute color />

      {props.children}
    </ReactiveInstance>
  )
})
