import { InstanceProps } from '@react-three/drei'
import { forwardRef } from 'react'
import { getEncodedSkin } from '../../materials/VoxelAtlasMaterial/VoxelAtlasMaterial'
import { Vector3 } from 'three'
import ReactiveInstance from '../VoxelProvider/ReactiveInstance'

export default forwardRef<any, InstanceProps>((props, ref) => {
  return (
    <ReactiveInstance
      {...props}
      color={'#475569'}
      // color={'#9e612a'}
      userData={{
        iUniforms: {
          iSkinCode: {
            value: getEncodedSkin({
              topFace: { x: 3, y: 0 },
              frontFace: { x: 3, y: 0 },
              backFace: { x: 3, y: 0 },
              rightFace: { x: 3, y: 0 },
              leftFace: { x: 3, y: 0 },
              bottomFace: { x: 3, y: 0 },
            }),
            defaultValue: new Vector3(100000000, 100000000, 100000000),
          },
        },
      }}
    />
  )
})
