import { InstanceProps } from '@react-three/drei'
import { forwardRef } from 'react'
import ReactiveInstance from '../../VoxelProvider/ReactiveInstance'
import FacesAttribute from '../../VoxelProvider/Attributes/FacesAttribute'

export default forwardRef<any, InstanceProps>((props, ref) => {
  return (
    <ReactiveInstance {...props} ref={ref}>
      <FacesAttribute
        config={[
          [10, 12], // top
          [11, 12], // bottom
          [15, 12], // right
          [14, 12], // left
          [12, 12], // front
          [13, 12], // back
        ]}
      />
    </ReactiveInstance>
  )
})
