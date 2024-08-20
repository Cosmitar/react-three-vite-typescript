import { InstanceProps } from '@react-three/drei'
import { forwardRef } from 'react'
import ReactiveInstance from '../../VoxelProvider/ReactiveInstance'
import FlagsAttribute from '../../VoxelProvider/Attributes/FlagsAttribute'

export default forwardRef<any, InstanceProps>((props, ref) => {
  return (
    <ReactiveInstance {...props} ref={ref}>
      <FlagsAttribute grayscale />
    </ReactiveInstance>
  )
})
