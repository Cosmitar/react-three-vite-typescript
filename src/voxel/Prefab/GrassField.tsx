import { InstanceProps } from '@react-three/drei'
import { forwardRef } from 'react'
import { GroupProps } from '@react-three/fiber'
import { SHAPES } from '../VoxelProvider/shaderMaterial/UniversalMaterial/shapes'
import ShapeAttribute from '../VoxelProvider/Attributes/ShapeAttribute'
import Color from '../Materials/Color'
import FlagsAttribute from '../VoxelProvider/Attributes/FlagsAttribute'

export default forwardRef<any, GroupProps>((props, fRef) => {
  const instanceNumber = 5000
  return (
    <group ref={fRef} {...props}>
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
  <Color {...props} color={'#00aa00'} ref={null}>
    <ShapeAttribute value={SHAPES.FLAT} />
    <FlagsAttribute wind gradient color/>
  </Color>
)
