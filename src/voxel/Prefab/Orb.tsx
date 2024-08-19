import { Instance, InstanceProps } from '@react-three/drei'
import { forwardRef } from 'react'
import { getEncodedSkin } from '../../materials/VoxelAtlasMaterial/VoxelAtlasMaterial'
import { Vector3, Vector4 } from 'three'

export default forwardRef<any, InstanceProps>((props, ref) => {
  return (
    <Instance
      {...props}
      userData={{
        iUniforms: {
          iSensitivity: { value: new Vector4(0, 1, 0, 0), defaultValue: new Vector4(0, 0, 0, 0) },
          iSkinCode: {
            value: getEncodedSkin({
              topFace: { x: 7, y: 5 },
              frontFace: { x: 7, y: 5 },
              backFace: { x: 7, y: 5 },
              rightFace: { x: 7, y: 5 },
              leftFace: { x: 7, y: 5 },
              bottomFace: { x: 7, y: 5 },
            }),
            defaultValue: new Vector3(100000000, 100000000, 100000000),
          },
        },
      }}
    />
  )
})