import { InstanceProps } from '@react-three/drei'
import { forwardRef } from 'react'
import ReactiveInstance from '../VoxelProvider/ReactiveInstance'
import { Vector3, Vector4 } from 'three'
import { getEncodedSkin } from '../../materials/VoxelAtlasMaterial/VoxelAtlasMaterial'

const LOW_BLOCKS_COORDS = [
  `11-7`,
  `11-8`,
  `11-9`,
  `11-10`,
  `12-6`,
  `12-7`,
  `12-10`,
  `12-11`,
  `13-6`,
  `13-11`,
  `14-6`,
  `14-11`,
  `15-6`,
  `15-11`,
  `16-6`,
  `16-11`,
  `16-10`,
  `16-7`,
  `17-10`,
  `17-9`,
  `17-8`,
  `17-7`,
]
export default forwardRef<any, InstanceProps>((props, ref) => {
  return (
    <group position={[(-15 / 2) * 2, 0, -15 / 2]} {...props} ref={ref} scale={[2, 1, 2]}>
      {Array(15 * 2)
        .fill(Array(15).fill(0))
        .map((row, rdx) =>
          row.map((_: any, cdx: number) => {
            return (
              <FloorBox key={`floor_tile_${rdx}-${cdx}`} position={[rdx, LOW_BLOCKS_COORDS.includes(`${rdx}-${cdx}`) ? -0.5 : 0.5, cdx]} />
            )
          })
        )}
    </group>
  )
})

const FloorBox = forwardRef<any, InstanceProps>((props, ref) => {
  return (
    <ReactiveInstance
      ref={ref}
      {...props}
      userData={{
        iUniforms: {
          iSensitivity: { value: new Vector4(0, 0, 1, 0), defaultValue: new Vector4(0, 0, 0, 0) },
          iSkinCode: {
            value: getEncodedSkin({
              topFace: { x: 0, y: 0 },
              frontFace: { x: 2, y: 0 },
              backFace: { x: 0, y: 0 },
              rightFace: { x: 0, y: 0 },
              leftFace: { x: 0, y: 0 },
              bottomFace: { x: 0, y: 0 },
            }),
            defaultValue: new Vector3(100000000, 100000000, 100000000),
          },
        },
      }}
    />
  )
})
