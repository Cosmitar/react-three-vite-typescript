import { InstanceProps } from '@react-three/drei'
import { forwardRef } from 'react'
import ReactiveInstance from '../VoxelProvider/ReactiveInstance'
import { Vector4, Vector3 } from 'three'
import { getEncodedSkin } from '../VoxelProvider/shaderMaterial/VoxelAtlasMaterial/VoxelAtlasMaterial'

export default forwardRef<any, InstanceProps>((props, ref) => (
  <ReactiveInstance ref={ref} scale={1} userData={defaultInstanceAttributes} position={[0, 0, 0]} {...props} />
))

const defaultInstanceAttributes = {
  iUniforms: {
    iSensitivity: { value: new Vector4(0, 0, 0, 0), defaultValue: new Vector4(0, 0, 0, 0) },
    iSkinCode: {
      value: getEncodedSkin({
        topFace: { x: 4, y: 2 },
        frontFace: { x: 6, y: 4 },
        backFace: { x: 6, y: 4 },
        rightFace: { x: 6, y: 4 },
        leftFace: { x: 6, y: 4 },
        bottomFace: { x: 6, y: 4 },
      }),
      defaultValue: new Vector3(100000000, 100000000, 100000000),
    },
  },
}
