import { InstanceProps } from '@react-three/drei'
import { forwardRef } from 'react'
import { Vector3, Vector4 } from 'three'
import { getEncodedSkin } from '../../materials/VoxelAtlasMaterial/VoxelAtlasMaterial'
import Color from '../Materials/Color'

export default forwardRef<any, InstanceProps>((props, ref) => {
  return (
    <group name='key_model' {...props}>
      {/* BODY */}
      <Color color={COLORS.gold} scale={[0.5, 1, 3]} />
      <Color color={COLORS.gold_light} scale={[0.75, 0.75, 3]} />
      {/* HEAD */}
      <Color color={COLORS.gold} scale={[0.5, 0.75, 0.4]} position={[0, -0.5, -1.2]} />
      <Color color={COLORS.gold} scale={[0.5, 0.75, 0.4]} position={[0, -0.5, -0.6]} />
      <Color color={COLORS.gold} scale={[0.5, 0.5, 0.4]} position={[0, -0.4, -1]} />
      {/* EYE */}
      <group scale={0.7}>
        {/* | */}
        <group position={[0, 0, 2]} rotation={[Math.PI / 2, 0, 0]}>
          <Color color={COLORS.gold} scale={[0.5, 1, 2]} />
          <Color color={COLORS.gold_light} scale={[0.75, 0.75, 2]} />
        </group>
        {/* / */}
        <group position={[0 + 0.001, 1.35, 2.57]} rotation={[-Math.PI / 4, 0, 0]}>
          <Color color={COLORS.gold} scale={[0.5, 1, 2]} />
          <Color color={COLORS.gold_light} scale={[0.75, 0.75, 2]} />
        </group>
        {/* - */}
        <group position={[0, 1.91, 3.91]} rotation={[0, 0, 0]}>
          <Color color={COLORS.gold} scale={[0.5, 1, 2]} />
          <Color color={COLORS.gold_light} scale={[0.75, 0.75, 2]} />
        </group>
        {/* \ */}
        <group position={[0 + 0.001, 1.35, 5.25]} rotation={[Math.PI / 4, 0, 0]}>
          <Color color={COLORS.gold} scale={[0.5, 1, 2]} />
          <Color color={COLORS.gold_light} scale={[0.75, 0.75, 2]} />
        </group>

        {/* | */}
        <group position={[0, 0, 5.8]} rotation={[Math.PI / 2, 0, 0]}>
          <Color color={COLORS.gold} scale={[0.5, 1, 2]} />
          <Color color={COLORS.gold_light} scale={[0.75, 0.75, 2]} />
        </group>
        {/* \ */}
        <group position={[0 + 0.001, -1.35, 2.57]} rotation={[Math.PI / 4, 0, 0]}>
          <Color color={COLORS.gold} scale={[0.5, 1, 2]} />
          <Color color={COLORS.gold_light} scale={[0.75, 0.75, 2]} />
        </group>
        {/* _ */}
        <group position={[0, -1.91, 3.91]} rotation={[0, 0, 0]}>
          <Color color={COLORS.gold} scale={[0.5, 1, 2]} />
          <Color color={COLORS.gold_light} scale={[0.75, 0.75, 2]} />
        </group>
        {/* / */}
        <group position={[0 + 0.001, -1.35, 5.25]} rotation={[-Math.PI / 4, 0, 0]}>
          <Color color={COLORS.gold} scale={[0.5, 1, 2]} />
          <Color color={COLORS.gold_light} scale={[0.75, 0.75, 2]} />
        </group>
      </group>
    </group>
  )
})

const COLORS = {
  gold: '#F7C948',
  gold_light: '#F0B429',
  gold_shadow: '#8D2B0B',
  gold_shine: '#FFF3C4',
}
