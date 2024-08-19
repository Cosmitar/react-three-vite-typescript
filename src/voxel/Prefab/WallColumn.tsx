import { InstanceProps } from '@react-three/drei'
import { forwardRef } from 'react'
import ReactiveInstance from '../VoxelProvider/ReactiveInstance'
import { Vector3, Vector4 } from 'three'
import { getEncodedSkin } from '../../materials/VoxelAtlasMaterial/VoxelAtlasMaterial'
import Brick from './Brick'

export default forwardRef<any, InstanceProps>((props, ref) => {
  return (
    <group name='wall_column' {...props}>
      <ReactiveInstance
        color={props.color ?? 'peru'}
        scale={[2.5, 7.5, 0.75]}
        position={[0, 0, 1]}
        name='big_brick'
        ref={ref}
        userData={{
          iUniforms: {
            iSensitivity: { value: new Vector4(0, 0, 0, 0), defaultValue: new Vector4(0, 0, 0, 0) },
            iSkinCode: {
              value: getEncodedSkin({
                topFace: { x: 4, y: 3 },
                frontFace: { x: 4, y: 3 },
                backFace: { x: 4, y: 3 },
                rightFace: { x: 4, y: 3 },
                leftFace: { x: 4, y: 3 },
                bottomFace: { x: 4, y: 3 },
              }),
              defaultValue: new Vector3(100000000, 100000000, 100000000),
            },
          },
        }}
      />
      <ReactiveInstance
        color={props.color ?? 'peru'}
        scale={[3, 8, 1]}
        position={[0, 0, 0.55]}
        name='big_brick'
        ref={ref}
        userData={{
          iUniforms: {
            iSensitivity: { value: new Vector4(0, 0, 0, 0), defaultValue: new Vector4(0, 0, 0, 0) },
            iSkinCode: {
              value: getEncodedSkin({
                topFace: { x: 4, y: 3 },
                frontFace: { x: 4, y: 3 },
                backFace: { x: 4, y: 3 },
                rightFace: { x: 4, y: 3 },
                leftFace: { x: 4, y: 3 },
                bottomFace: { x: 4, y: 3 },
              }),
              defaultValue: new Vector3(100000000, 100000000, 100000000),
            },
          },
        }}
      />

      <ReactiveInstance
        color={props.color ?? 'peru'}
        scale={[4, 1, 1]}
        position={[0, 4.48, 0.88]}
        name='big_brick'
        ref={ref}
        userData={{
          iUniforms: {
            iSensitivity: { value: new Vector4(0, 0, 0, 0), defaultValue: new Vector4(0, 0, 0, 0) },
            iSkinCode: {
              value: getEncodedSkin({
                topFace: { x: 4, y: 5 },
                frontFace: { x: 4, y: 5 },
                backFace: { x: 4, y: 5 },
                rightFace: { x: 4, y: 5 },
                leftFace: { x: 4, y: 5 },
                bottomFace: { x: 4, y: 5 },
              }),
              defaultValue: new Vector3(100000000, 100000000, 100000000),
            },
          },
        }}
      />
      <ReactiveInstance
        color={props.color ?? 'peru'}
        scale={[4, 0.5, 1]}
        position={[0, 4.75, 1.25]}
        name='big_brick'
        ref={ref}
        userData={{
          iUniforms: {
            iSensitivity: { value: new Vector4(0, 0, 0, 0), defaultValue: new Vector4(0, 0, 0, 0) },
            iSkinCode: {
              value: getEncodedSkin({
                topFace: { x: 4, y: 5 },
                frontFace: { x: 4, y: 5 },
                backFace: { x: 4, y: 5 },
                rightFace: { x: 4, y: 5 },
                leftFace: { x: 4, y: 5 },
                bottomFace: { x: 4, y: 5 },
              }),
              defaultValue: new Vector3(100000000, 100000000, 100000000),
            },
          },
        }}
      />


      <ReactiveInstance
        color={props.color ?? 'peru'}
        scale={[4, 1, 1]}
        position={[0, -4.48, 0.88]}
        name='big_brick'
        ref={ref}
        userData={{
          iUniforms: {
            iSensitivity: { value: new Vector4(0, 0, 0, 0), defaultValue: new Vector4(0, 0, 0, 0) },
            iSkinCode: {
              value: getEncodedSkin({
                topFace: { x: 4, y: 5 },
                frontFace: { x: 4, y: 5 },
                backFace: { x: 4, y: 5 },
                rightFace: { x: 4, y: 5 },
                leftFace: { x: 4, y: 5 },
                bottomFace: { x: 4, y: 5 },
              }),
              defaultValue: new Vector3(100000000, 100000000, 100000000),
            },
          },
        }}
      />
      <ReactiveInstance
        color={props.color ?? 'peru'}
        scale={[4, 0.5, 1]}
        position={[0, -4.75, 1.25]}
        name='big_brick'
        ref={ref}
        userData={{
          iUniforms: {
            iSensitivity: { value: new Vector4(0, 0, 0, 0), defaultValue: new Vector4(0, 0, 0, 0) },
            iSkinCode: {
              value: getEncodedSkin({
                topFace: { x: 4, y: 5 },
                frontFace: { x: 4, y: 5 },
                backFace: { x: 4, y: 5 },
                rightFace: { x: 4, y: 5 },
                leftFace: { x: 4, y: 5 },
                bottomFace: { x: 4, y: 5 },
              }),
              defaultValue: new Vector3(100000000, 100000000, 100000000),
            },
          },
        }}
      />

      {/* <Brick color={props.color ?? 'peru'} position={[-2.6, 3.3, 2.4/4]} /> */}
      {/* <Brick color={props.color ?? 'peru'} position={[3.1, -3.3, 2.4/4]} /> */}
    </group>
  )
})
