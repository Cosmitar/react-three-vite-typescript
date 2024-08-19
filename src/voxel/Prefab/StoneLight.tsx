import { InstanceProps } from '@react-three/drei'
import { forwardRef } from 'react'
import { Vector4 } from 'three'
import { getDefaultEncodedSkin, getEncodedSkin } from '../VoxelProvider/shaderMaterial/VoxelAtlasMaterial/VoxelAtlasMaterial'
import ReactiveInstance, { InstanceAPI } from '../VoxelProvider/ReactiveInstance'
import Opacity from '../VoxelProvider/Attributes/Opacity'
import Flags from '../VoxelProvider/Attributes/Flags'

export default forwardRef<InstanceAPI, InstanceProps>((props, fref) => {
  return (
    <ReactiveInstance
      {...props}
      ref={fref}
      userData={{
        iUniforms: {
          iSensitivity: { value: new Vector4(0, 1, 0, 0), defaultValue: new Vector4(0, 0, 0, 0) },
          iSkinCode: {
            value: getEncodedSkin({
              topFace: { x: 0, y: 12 },
              bottomFace: { x: 0, y: 12 },
              frontFace: { x: 0, y: 12 },
              backFace: { x: 0, y: 12 },
              leftFace: { x: 0, y: 12 },
              rightFace: { x: 0, y: 12 },
            }),
            defaultValue: getDefaultEncodedSkin(),
          },
        },
      }}
    >
      <Opacity value={0.75} />
      <Flags wind gradient />
    </ReactiveInstance>
  )
})
