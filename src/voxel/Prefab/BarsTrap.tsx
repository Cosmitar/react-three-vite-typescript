import { forwardRef } from 'react'
import { GroupProps } from '@react-three/fiber'
import Bars from './Bars'
import { InstanceProps } from '@react-three/drei'
import { Vector3, Vector4 } from 'three'
import { getEncodedSkin } from '../../materials/VoxelAtlasMaterial/VoxelAtlasMaterial'
import ReactiveInstance from '../VoxelProvider/ReactiveInstance'

export default forwardRef<any, GroupProps>((props, ref) => {
  return (
    <group {...props} ref={ref}>
      <Bars name='top-bars' position={[0.45, 0, 0]} />
      <Bars name='bottom-bars' position={[-0.45, 0, 0]} />

      <ArrowPaint name='arrows-paint' scale={[0.75, 1, 0.75]} position={[0, -0.99, 0]} rotation={[0, Math.PI / 2, 0]} />
    </group>
  )
})

const ArrowPaint = (props: InstanceProps) => (
  <ReactiveInstance
    {...props}
    color='#637798'
    userData={{
      iUniforms: {
        iSensitivity: { value: new Vector4(0, 0, 0, 0), defaultValue: new Vector4(0, 0, 0, 0) },
        iSkinCode: {
          value: getEncodedSkin({
            topFace: { x: 4, y: 2 },
            frontFace: { x: 4, y: 2 },
            backFace: { x: 4, y: 2 },
            rightFace: { x: 4, y: 2 },
            leftFace: { x: 4, y: 2 },
            bottomFace: { x: 4, y: 2 },
          }),
          defaultValue: new Vector3(100000000, 100000000, 100000000),
        },
      },
    }}
  />
)
