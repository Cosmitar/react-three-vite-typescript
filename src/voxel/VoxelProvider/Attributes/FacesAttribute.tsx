import { Vector2Tuple } from 'three'
import { InstancedAttribute } from '../InstancedAttribute'
import { getDefaultEncodedSkin, getEncodedSkin } from '../shaderMaterial/VoxelAtlasMaterial/VoxelAtlasMaterial'

const DEFAULT_FACE_COORDS = [0, 0]
export default function ({
  all,
  config,
  top,
  bottom,
  right,
  left,
  front,
  back,
}: {
  all?: Vector2Tuple
  config?: [
    Vector2Tuple, // top
    Vector2Tuple, // bottom
    Vector2Tuple, // right
    Vector2Tuple, // left
    Vector2Tuple, // front
    Vector2Tuple // back
  ]
  top?: Vector2Tuple
  bottom?: Vector2Tuple
  right?: Vector2Tuple
  left?: Vector2Tuple
  front?: Vector2Tuple
  back?: Vector2Tuple
}) {
  // priority: specific face -> config -> all -> default
  const topFace = top ?? (config ? config[0] : all) ?? DEFAULT_FACE_COORDS
  const bottomFace = bottom ?? (config ? config[1] : all) ?? DEFAULT_FACE_COORDS
  const rightFace = right ?? (config ? config[2] : all) ?? DEFAULT_FACE_COORDS
  const leftFace = left ?? (config ? config[3] : all) ?? DEFAULT_FACE_COORDS
  const frontFace = front ?? (config ? config[4] : all) ?? DEFAULT_FACE_COORDS
  const backFace = back ?? (config ? config[5] : all) ?? DEFAULT_FACE_COORDS

  return (
    <InstancedAttribute
      name='iSkinCode'
      value={getEncodedSkin({
        topFace: { x: topFace[0], y: topFace[1] },
        bottomFace: { x: bottomFace[0], y: bottomFace[1] },
        rightFace: { x: rightFace[0], y: rightFace[1] },
        leftFace: { x: leftFace[0], y: leftFace[1] },
        frontFace: { x: frontFace[0], y: frontFace[1] },
        backFace: { x: backFace[0], y: backFace[1] },
      })}
      defaultValue={getDefaultEncodedSkin()}
    />
  )
}
