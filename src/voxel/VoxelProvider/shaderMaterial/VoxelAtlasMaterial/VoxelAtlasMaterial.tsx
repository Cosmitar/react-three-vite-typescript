import { MeshLambertMaterial, Vector2, Vector3 } from 'three'
import ThreeCustomShaderMaterial, { MaterialConstructor, iCSMParams } from 'three-custom-shader-material'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import vertex from './vertex.glsl'
import fragment from './fragment.glsl'
import definitions from './definitions.glsl'

export type VoxelAtlasMaterialPorps = iCSMParams<MaterialConstructor> & {
  uniforms?: {
    uTime?: { value: number }
    uMapSize?: { value: Vector2 } // columns of the texture map
  }
}

export function MeshVoxelAtlasMaterial(props?: VoxelAtlasMaterialPorps) {
  return (
    <ThreeCustomShaderMaterial {...{ ...defaultProps, ...props }} uniforms={mergeUniforms(defaultProps.uniforms, props?.uniforms ?? {})} />
  )
}

const defaultProps = {
  baseMaterial: MeshLambertMaterial,
  vertexShader: /* glsl */ `
    ${definitions}
    ${vertex}
    void main() {
      calcFaceIndexAndTextureCoord();
    }
  `,
  fragmentShader: /* glsl */ `
    ${definitions}
    ${fragment}
    void main() {
      csm_DiffuseColor = calcVoxelAtlasDiffuse(csm_vUv);
    }
  `,
  // {/*silent parameter to true disables the default warning if needed*/}
  silent: true,
  uniforms: {
    uTime: { value: 1 },
    uMapSize: { value: new Vector2(1, 6) },
    uColIdx: { value: 0 },
  },
}

export class VoxelAtlasMaterial extends CustomShaderMaterial {
  constructor(props?: VoxelAtlasMaterialPorps) {
    // @ts-ignore a mess with super CustomShaderMaterial and DeformVertexMaterialProps
    super({
      ...defaultProps,
      ...props,
      uniforms: mergeUniforms(defaultProps.uniforms, props?.uniforms ?? {}),
    })
  }
}

// local helpers
const mergeUniforms = (
  defaultUniforms: VoxelAtlasMaterialPorps['uniforms'],
  givenUniforms: Partial<VoxelAtlasMaterialPorps['uniforms']>
) => {
  const retVal = deepClone(defaultUniforms)
  for (const key of Object.keys(defaultUniforms!)) {
    const k = key as keyof VoxelAtlasMaterialPorps['uniforms']
    if (typeof givenUniforms![k] !== 'undefined') {
      // @ts-ignore
      retVal[k] = givenUniforms[k]
    }
  }

  return retVal
}

const deepClone = (val: any) => (structuredClone ? structuredClone(val) : JSON.parse(JSON.stringify(val)))

// exported helpers

// encodes explicit parameters into Vector3 that is decoded by decodeTextureCoords into vertex shader
type FaceCoords = { x: number; y: number }
const defaultFaceCoords = { x: 0, y: 0 } // coords from the altas
// const twoDigits = (num: number) => (num <= 9 ? `0${num}` : num)
// const firstTwo = (num: number) => (num <= 9 ? `-1${num}` : num)
export function getDefaultEncodedSkin() {
  return new Vector3(0, 0, 0)
}
const BITS_PER_VAR = 6 // greater than 6 can give issues with integer precision in GLSL, a value of 7 fails.
export function getEncodedSkin({
  atlasId = 1,
  topFace = defaultFaceCoords,
  bottomFace = defaultFaceCoords,
  rightFace = defaultFaceCoords,
  leftFace = defaultFaceCoords,
  frontFace = defaultFaceCoords,
  backFace = defaultFaceCoords,
}: {
  atlasId?: number
  topFace?: FaceCoords
  bottomFace?: FaceCoords
  rightFace?: FaceCoords
  leftFace?: FaceCoords
  frontFace?: FaceCoords
  backFace?: FaceCoords
} = {}) {
  // Vector3: Original, column index limited to 1 digit, do not support 2 digits due to precision issues when numbers are decoded.
  // return new Vector3(
  //   Number(`${atlasId}${topFace.x}${twoDigits(topFace.y)}${bottomFace.x}${twoDigits(bottomFace.y)}`),
  //   Number(`${atlasId}${frontFace.x}${twoDigits(frontFace.y)}${backFace.x}${twoDigits(backFace.y)}`),
  //   Number(`${atlasId}${leftFace.x}${twoDigits(leftFace.y)}${rightFace.x}${twoDigits(rightFace.y)}`)
  // )

  // Matrix4: Easy to handle, has a limit on the size of the buffer attribute, 1408 instances
  // const mat = new Matrix4()
  // mat.set(
  //   topFace.x, topFace.y, bottomFace.x, bottomFace.y,

  //   rightFace.x,
  //   rightFace.y,
  //   leftFace.x,
  //   leftFace.y,

  //   frontFace.x,
  //   frontFace.y,
  //   backFace.x,
  //   backFace.y,

  //   atlasId,
  //   atlasId,
  //   atlasId,
  //   atlasId
  // )
  // return mat

  // Vector4: Requires to encode 1.5 faces by number, then decoding is messy and unnatural.
  // return new Vector4(
  //   Number(`${firstTwo(topFace.x)}${twoDigits(topFace.y)}${twoDigits(bottomFace.x)}${twoDigits(bottomFace.y)}`),
  //   Number(`${firstTwo(rightFace.x)}${twoDigits(rightFace.y)}${twoDigits(leftFace.x)}${twoDigits(leftFace.y)}`),
  //   Number(`${firstTwo(frontFace.x)}${twoDigits(frontFace.y)}${twoDigits(backFace.x)}${twoDigits(backFace.y)}`),
  //   Number(`${atlasId}`),

  // Bitmask: less human readable but cleaner encode and decode.
  let vars = [
    topFace.x,
    topFace.y,
    bottomFace.x,
    bottomFace.y,

    frontFace.x,
    frontFace.y,
    backFace.x,
    backFace.y,

    leftFace.x,
    leftFace.y,
    rightFace.x,
    rightFace.y,
  ].map(v => Math.min(Math.max(v, 0), 63))

  const parts: number[] = []
  for (let i = 0; i < 3; i++) {
    let part = 0
    for (let j = 0; j < 4; j++) {
      part = (part << BITS_PER_VAR) | vars[i * 4 + j]
    }
    parts.push(part)
  }

  return new Vector3(parts[0], parts[1], parts[2])
}

// helper for test, not used in production
export function decodeValuesToBitmask(encoded: Vector3): number[] {
  const parts = [encoded.x, encoded.y, encoded.z]
  const values: number[] = []

  for (let i = 0; i < 3; i++) {
    let part = parts[i]
    for (let j = 0; j < 4; j++) {
      const value = part & ((1 << BITS_PER_VAR) - 1)
      values.push(value)
      part >>= BITS_PER_VAR
    }
  }

  return values
}
