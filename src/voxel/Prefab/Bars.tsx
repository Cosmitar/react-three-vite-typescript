import { InstanceProps } from '@react-three/drei'
import { forwardRef } from 'react'
import { getEncodedSkin } from '../../materials/VoxelAtlasMaterial/VoxelAtlasMaterial'
import { Vector3, Vector4 } from 'three'
import { GroupProps } from '@react-three/fiber'
import ReactiveInstance from '../VoxelProvider/ReactiveInstance'

export default forwardRef<any, GroupProps>((props, ref) => {
  return (
    <group {...props}>
      <SingleBar scale={[0.125, 1, 0.125]} position={[0, 0, 0.25]} rotation={[0, Math.PI / 4, 0]} />
      <SingleBar scale={[0.125, 1, 0.125]} position={[0, 0, 0]} rotation={[0, Math.PI / 4, 0]} />
      <SingleBar scale={[0.125, 1, 0.125]} position={[0, 0, -0.25]} rotation={[0, Math.PI / 4, 0]} />

      <SingleBar scale={[0.125, 0.125, 1]} position={[0, 0, 0]} color={COLORS.metal_shie} />
    </group>
  )
})

const SingleBar = (props: InstanceProps) => (
  <ReactiveInstance
    color={COLORS.metal_light}
    {...props}
    userData={{
      iUniforms: {
        iSensitivity: { value: new Vector4(0, 0, 0, 0), defaultValue: new Vector4(0, 0, 0, 0) },
        iSkinCode: {
          value: getEncodedSkin({
            topFace: { x: 6, y: 4 },
            frontFace: { x: 6, y: 4 },
            backFace: { x: 6, y: 4 },
            rightFace: { x: 6, y: 4 },
            leftFace: { x: 6, y: 4 },
            bottomFace: { x: 6, y: 4 },
          }),
          defaultValue: new Vector3(100000000, 100000000, 100000000),
        },
      },
    }}
  />
)

const COLORS = {
  metal: '#595951',
  metal_dark: '#46473e',
  metal_light: '#6b6c65',
  metal_shie: '#a3a49c',
}
