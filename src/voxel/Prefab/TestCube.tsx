import { InstanceProps } from '@react-three/drei'
import { forwardRef } from 'react'
import ReactiveInstance, { InstanceAPI } from '../VoxelProvider/ReactiveInstance'
import Opacity from '../VoxelProvider/Attributes/Opacity'

export default forwardRef<InstanceAPI, InstanceProps>((props, fref) => {
  return (
    <ReactiveInstance {...props} ref={fref}>
      <Opacity value={1} />
      {props.children}
    </ReactiveInstance>
  )
})
