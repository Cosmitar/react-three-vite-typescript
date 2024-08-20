import { InstanceProps } from '@react-three/drei'
import { forwardRef } from 'react'
import ReactiveInstance, { InstanceAPI } from '../VoxelProvider/ReactiveInstance'
import OpacityAttribute from '../VoxelProvider/Attributes/OpacityAttribute'

export default forwardRef<InstanceAPI, InstanceProps>((props, fref) => {
  return (
    <ReactiveInstance {...props} ref={fref}>
      <OpacityAttribute value={1} />
      {props.children}
    </ReactiveInstance>
  )
})
