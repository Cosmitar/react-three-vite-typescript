import { InstanceProps } from '@react-three/drei'
import { forwardRef } from 'react'
import { Vector3, Vector4 } from 'three'
import { getEncodedSkin } from '../../materials/VoxelAtlasMaterial/VoxelAtlasMaterial'
import Color from '../Materials/Color'
import Hat from './Hat'

export default forwardRef<any, InstanceProps>((props, ref) => {
  return (
    <group name='duck_model' {...props} ref={ref}>
      <Hat name='hat' scale={4} position={[0, 2, 0]} />
      <group name='head' position={[0, 0, 0]}>
        <Color scale={4} color={COLORS.plumage_yellow} position={[0, 0, 0]} />
        <group name='beak' position={[0, -0.25, 2.5]}>
          <group name='upper_beak'>
            <Color scale={[1.5, 0.75, 1]} color={COLORS.beak} />
          </group>
          <group name='lower_beak' rotation={[0, 0, 0]} position={[0, -0.5, -0.25]}>
            <Color scale={[1.25, 0.25, 1]} color={COLORS.beak} />
          </group>
        </group>
        <group name='eyes' position={[0, 0, 0]}>
          <Color name='eyeball' scale={[5, 2, 2]} color={COLORS.eyeball} />
          <Color
            name='pupil'
            scale={[5 + 0.05, 1, 1]}
            color={COLORS.eye}

            // position={[0, 0.5 + 0.01, -0.5 - 0.01]} NW
            // position={[0, 0.5 + 0.01, 0]} N
            // position={[0, 0.5 + 0.01, 0.5 + 0.01]} NE
            // position={[0, 0, 0]} NONE
            // position={[0, -0.5 - 0.01, 0.5 + 0.01]} SE
            // position={[0, -0.5 - 0.01, 0]} S
            // position={[0, -0.5 - 0.01, -0.5 - 0.01]} SW
            // position={[0, 0, -0.5 - 0.01]} W
            // position={[0, 0, +0.5 + 0.01]} E
          />
        </group>
      </group>
      <group name='neck' position={[0, -2.5, 0]}>
        <Color scale={[4, 1, 2]} color={COLORS.plumage_yellow} />
      </group>
      <group name='body' position={[0, -4, -0.5]}>
        <Color scale={[4, 2, 3]} color={COLORS.plumage_yellow} />
      </group>
      {/* <group name='tail' position={[0, -3.5 + 0.13, -2]} rotation={[Math.PI / 8, Math.PI * 0.0, 0]}> */}
      <group name='tail' position={[0, -3.5 + 0.13, -2]} rotation={[0, 0, 0]}>
        <group name='tail_pivot' position={[0, 0, -0.25]}>
          <Color scale={[1.5, 0.75, 1.5]} color={COLORS.plumage_yellow} />
        </group>
      </group>
      <group name='legs' position={[0, -5.75, -0.5]}>
        <group name='left_leg' position={[-1.25, 0.75, 0]} rotation={[0, 0, 0]}>
          <group name='left_leg_pivot' position={[0, -0.5, 0]}>
            <Color scale={[1, 1.5, 1]} color={COLORS.beak} />
            <Color scale={[1.5, 0.75, 1.5]} color={COLORS.beak} position={[-0.25, -1, 0.25]} />
          </group>
        </group>
        <group name='right_leg' position={[1.25, 0.75, 0]}>
          <group name='right_leg_pivot' position={[0, -0.5, 0]}>
            <Color scale={[1, 1.5, 1]} color={COLORS.beak} />
            <Color scale={[1.5, 0.75, 1.5]} color={COLORS.beak} position={[0.25, -1, 0.25]} />
          </group>
        </group>
      </group>
    </group>
  )
})

const COLORS = {
  plumage_yellow: '#e4bd1d',
  beak: '#dc8e3e',
  eyeball: '#fff',
  eye: '#000',
}
