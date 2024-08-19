import { InstanceProps } from '@react-three/drei'
import { forwardRef } from 'react'
import { getEncodedSkin } from '../../materials/VoxelAtlasMaterial/VoxelAtlasMaterial'
import { Vector3, Vector4 } from 'three'
import ReactiveInstance from '../VoxelProvider/ReactiveInstance'

export default forwardRef<any, InstanceProps>((props, ref) => {
  return (
    <ReactiveInstance
      ref={ref}
      {...props}
      userData={{
        iUniforms: {
          iSensitivity: { value: new Vector4(0, 0, 0, 2), defaultValue: new Vector4(0, 0, 0, 0) },
          iSkinCode: {
            value: getEncodedSkin({
              topFace: { x: 5, y: 5 },
              frontFace: { x: 6, y: 5 },
              backFace: { x: 6, y: 5 },
              rightFace: { x: 6, y: 5 },
              leftFace: { x: 6, y: 5 },
              bottomFace: { x: 5, y: 5 },
            }),
            defaultValue: new Vector3(100000000, 100000000, 100000000),
          },
        },
      }}
    />
  )
})
