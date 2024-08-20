import { InstanceProps } from '@react-three/drei'
import { forwardRef } from 'react'
import { GroupProps } from '@react-three/fiber'
import { SHAPES } from '../VoxelProvider/shaderMaterial/UniversalMaterial/shapes'
import Shape from '../VoxelProvider/Attributes/Shape'
import Color from '../Materials/Color'
import Flags from '../VoxelProvider/Attributes/Flags'

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
    <Shape value={SHAPES.FLAT} />
    <Flags wind gradient />
  </Color>
)
