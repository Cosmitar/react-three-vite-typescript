import { InstanceProps } from '@react-three/drei'
import { forwardRef } from 'react'
import ReactiveInstance from '../VoxelProvider/ReactiveInstance'
/**
 * this material is a helper to draw a "inner voxel", so you can only see inner walls of the cube. Maybe for rooms seen from inside or tranparency simulation by rendering backside, I'm thinking on a flame.
 * This effects is obtained by applying a scaleY = -1.
 * You have to provide children for attributes.
 */

export default forwardRef<any, InstanceProps>((props, ref) => {
  return <ReactiveInstance {...props} ref={ref} scale={[1, -1, 1]} />
})
