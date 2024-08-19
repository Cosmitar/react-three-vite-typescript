import { InstanceProps } from '@react-three/drei'
import { forwardRef } from 'react'
import Color from '../Materials/Color'
import { Vector3, Vector4 } from 'three'
import { getEncodedSkin } from '../../materials/VoxelAtlasMaterial/VoxelAtlasMaterial'

export default forwardRef<any, InstanceProps>((props, ref) => {
  return (
    <group name='wall_torch' {...props} ref={ref}>
      <Color position={[0, 0, 0]} color={'#737373'} scale={[4, 1, 3]} name='base' />
      <Color position={[0, 0, 1]} color={'#737373'} scale={[2, 1, 4]} name='base_front' />
      <Color position={[0, 0, -1]} color={'#737373'} scale={[6, 3, 1]} name='wall_plate' />
      <Color position={[0, 1, 0]} color={'peru'} scale={[2, 8, 1]} name='wood' />
      <Color position={[0, 4.5, 0.5]} color={'peru'} scale={[2, 1, 2]} name='wood' />
      <Color position={[0, 5.5, 0.5]} color={'#737373'} scale={[2, 1, 2]} name='wood' />
      <Color position={[0, 6.5, 0.5]} color={'#D32F2F'} scale={[2, 1, 2]} name='flame' userData={defaultFlameInstanceAttributes} />
    </group>
  )
})


const defaultFlameInstanceAttributes = {
  iUniforms: {
    iSensitivity: { value: new Vector4(1, 1, 0, 0), defaultValue: new Vector4(0, 0, 0, 0) },
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
}