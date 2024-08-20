import { InstanceProps } from '@react-three/drei'
import { forwardRef } from 'react'
import { FrontSide, Material } from 'three'
import ReactiveInstance from '../VoxelProvider/ReactiveInstance'
import ShapeAttribute from '../VoxelProvider/Attributes/ShapeAttribute'
import { SHAPES } from '../VoxelProvider/shaderMaterial/UniversalMaterial/shapes'
import FacesAttribute from '../VoxelProvider/Attributes/FacesAttribute'

/**
 * this material is a helper to draw a "flat voxel", it's a cube with (almost) 0 depth, so the top, bottom, left and right faces are invisible.
 * faceXY is mandatory and represents the x,y coords in the atlas.
 * providing only faceXY you have a one side plane, invisible when viewed from back.
 * If you provide the side as DoubleSide, then the same faceXY is used in the back face, then you get a plane with the same
 * texture from both sides, considering the back texture seems mirrored from the front. This is by the nature of the back texture.
 * If you want both sides to show the same images with same orientation, you need to provide the backXY prop and mirroring the image in the atlas source. Sorry.
 * examples:
 * <Flat position={[-1, 0, 0]} faceXY={{ x: 4, y: 1 }} />
 * <Flat position={[-1, 0, 0]} faceXY={{ x: 4, y: 1 }} side={DoubleSide} />
 * <Flat position={[-1, 0, 0]} faceXY={{ x: 4, y: 1 }} side={DoubleSide} backXY={{x: 4, y: 2}} />
 */

export default forwardRef<
  any,
  InstanceProps & { faceXY: { x: number; y: number }; backXY?: { x: number; y: number }; side?: Material['side'] }
>((props, ref) => {
  const { faceXY, backXY = faceXY, side = FrontSide, ...restProps } = props
  return (
    <group ref={ref} {...restProps}>
      <ReactiveInstance scale={[1, 1, 0.01]}>
        <ShapeAttribute value={SHAPES.FLAT} />
        <FacesAttribute all={[6, 12]} front={[faceXY.x, faceXY.y]} back={backXY ? [backXY.x, backXY.y] : [faceXY.x, faceXY.y]} />
      </ReactiveInstance>
    </group>
  )
})
