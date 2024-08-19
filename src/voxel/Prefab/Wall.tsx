import { InstanceProps } from '@react-three/drei'
import { forwardRef } from 'react'
import ReactiveInstance from '../VoxelProvider/ReactiveInstance'
import { Vector3, Vector4 } from 'three'
import { getEncodedSkin } from '../../materials/VoxelAtlasMaterial/VoxelAtlasMaterial'
import Brick from './Brick'

export default forwardRef<any, InstanceProps>((props, ref) => {
  return (
    <group name='wall' {...props}>
      <ReactiveInstance
        color={props.color ?? 'peru'}
        scale={[10, 10, 1.25]}
        name='big_brick'
        ref={ref}
        userData={{
          iUniforms: {
            iSensitivity: { value: new Vector4(0, 0, 2, 0), defaultValue: new Vector4(0, 0, 0, 0) },
            iSkinCode: {
              value: getEncodedSkin({
                topFace: { x: 7, y: 2 },
                frontFace: { x: 3, y: 0 },
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

      <Brick color={props.color ?? 'peru'} position={[-2.6, 3.3, 0.6]} />
      <Brick color={props.color ?? 'peru'} position={[3.1, -3.3, 0.6]} />
    </group>
  )
})
