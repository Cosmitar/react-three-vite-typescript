import { Instance, InstanceProps } from '@react-three/drei'
import { forwardRef } from 'react'
import { getEncodedSkin } from '../../materials/VoxelAtlasMaterial/VoxelAtlasMaterial'
import { Vector3, Vector4 } from 'three'
import { SHAPES } from '../../materials/UniversalMaterial/shapes'
import { GroupProps } from '@react-three/fiber'

export default forwardRef<any, GroupProps>((props, ref) => {
  const instanceNumber = 5000
  return (
    <group ref={ref} {...props}>
      {Array(instanceNumber)
        .fill(0)
        .map((_, idx) => (
          <GrassBlade
            key={`blade_${idx}`}
            position={[(Math.random() - 0.5) * 10, 0, (Math.random() - 0.5) * 10]}
            scale={[0.1, 0.15 + Math.random() * 0.5, 1]}
            rotation={[0, Math.random() * Math.PI, 0]}
          />
        ))}
    </group>
  )
})

const GrassBlade = (props: InstanceProps) => (
  <Instance
    // scale={[0.1, 1, 1]}
    // position={[0, 0, 0]}
    color={'#00aa00'}
    {...props}
    userData={{
      iUniforms: {
        iShape: {
          value: SHAPES.FLAT,
          defaultValue: SHAPES.CUBE,
        },
        iSensitivity: { value: new Vector4(1, 1, 0, 0), defaultValue: new Vector4(0, 0, 0, 0) },
        iSkinCode: {
          value: getEncodedSkin({
            topFace: { x: 0, y: 5 },
            frontFace: { x: 0, y: 0 },
            backFace: { x: 0, y: 0 },
            rightFace: { x: 0, y: 5 },
            leftFace: { x: 0, y: 5 },
            bottomFace: { x: 0, y: 5 },
          }),
          defaultValue: new Vector3(1000000, 1000000, 1000000),
        },
      },
    }}
  />
)
