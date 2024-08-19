import { InstanceProps } from '@react-three/drei'
import { forwardRef } from 'react'
import ReactiveInstance from '../VoxelProvider/ReactiveInstance'
import { getEncodedSkin } from '../../materials/VoxelAtlasMaterial/VoxelAtlasMaterial'
import { Vector3, Vector4 } from 'three'

export default forwardRef<any, InstanceProps>((props, ref) => {
  return (
    <ReactiveInstance
      color='peru'
      scale={[1, 1, 0.5]}
      name='brick_a'
      {...props}
      ref={ref}
      userData={{
        iUniforms: {
          iSensitivity: { value: new Vector4(0, 0, 0, 0), defaultValue: new Vector4(0, 0, 0, 0) },
          iSkinCode: {
            value: getEncodedSkin({
              topFace: { x: 7, y: 2 },
              frontFace: { x: 6, y: 2 },
              backFace: { x: 7, y: 2 },
              rightFace: { x: 7, y: 2 },
              leftFace: { x: 7, y: 2 },
              bottomFace: { x: 7, y: 2 },
            }),
            defaultValue: new Vector3(100000000, 100000000, 100000000),
          },
        },
      }}
    />
  )
})
