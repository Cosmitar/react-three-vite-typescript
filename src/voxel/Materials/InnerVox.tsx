import { Instance, InstanceProps } from '@react-three/drei'
import { forwardRef } from 'react'
/**
 * this material is a helper to draw a "inner voxel", so you can only see inner walls of the cube. Maybe for rooms seen from inside or tranparency simulation by rendering backside, I'm thinking on a flame.
 * This effects is obtained by applying a scaleY = -1.
 * You have to provide the userData corresponding to the iSkinCode.
 *
 * examples:
 * <InnerVox
 *  faceXY={{ x: 4, y: 1 }}
 *  userData={{
 *    iUniforms: {
 *      iSkinCode: {
 *        value: [you atlas coords here],
 *        defaultValue: new Vector3(1000000, 1000000, 1000000),
 *      },
 *    },
 *  }}
 * />
 */

export default forwardRef<any, InstanceProps>((props, ref) => {
  return (
    <Instance
      ref={ref}
      {...props}
      scale={[1, -1, 1]}
      // userData={{
      //   iUniforms: {
      //     iSkinCode: {
      //       value: [you atlas coords here],
      //       defaultValue: new Vector3(1000000, 1000000, 1000000),
      //     },
      //   },
      // }}
    />
  )
})
