

import { Instance, InstanceProps } from '@react-three/drei'
import { forwardRef } from 'react'
import { getEncodedSkin } from '../../../materials/VoxelAtlasMaterial/VoxelAtlasMaterial'
import { Vector3 } from 'three'

export default forwardRef<any, InstanceProps>((props, ref) => {
  return (
    <Instance
      ref={ref}
      {...props}
      userData={{
        iUniforms: {
          iSkinCode: {
            value: getEncodedSkin({
              topFace: { x: 0, y: 0 },
              frontFace: { x: 0, y: 1 },
              backFace: { x: 0, y: 2 },
              rightFace: { x: 0, y: 3 },
              leftFace: { x: 0, y: 4 },
              bottomFace: { x: 0, y: 5 },
            }),
            defaultValue: new Vector3(100000000, 100000000, 100000000),
          },
        },
      }}
    />
  )
})
