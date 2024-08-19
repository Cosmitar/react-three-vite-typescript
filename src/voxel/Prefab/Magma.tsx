import { InstanceProps } from '@react-three/drei'
import { forwardRef } from 'react'
import { getEncodedSkin } from '../../materials/VoxelAtlasMaterial/VoxelAtlasMaterial'
import { Vector3 } from 'three'
import ReactiveInstance from '../VoxelProvider/ReactiveInstance'

export default forwardRef<any, InstanceProps>((props, ref) => {
  return (
    <ReactiveInstance
      {...props}
      userData={{
        iUniforms: {
          // iSensitivity: { value: new Vector4(0, 1, 0, 0), defaultValue: new Vector4(0, 0, 0, 0) },
          iSkinCode: {
            value: getEncodedSkin({
              topFace: { x: 5, y: 2 },
              frontFace: { x: 5, y: 3 },
              backFace: { x: 5, y: 3 },
              rightFace: { x: 5, y: 3 },
              leftFace: { x: 5, y: 3 },
              bottomFace: { x: 5, y: 3 },
            }),
            defaultValue: new Vector3(100000000, 100000000, 100000000),
          },
        },
      }}
    />
  )
})
