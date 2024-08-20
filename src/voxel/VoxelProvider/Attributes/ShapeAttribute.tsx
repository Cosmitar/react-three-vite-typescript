import { InstancedAttribute } from '../InstancedAttribute'
import { SHAPES } from '../shaderMaterial/UniversalMaterial/shapes'

export default function ({ value }: { value: number }) {
  return <InstancedAttribute name='iShape' value={value} defaultValue={SHAPES.CUBE} />
}

// export const vertexShaderDef = `
//   #ifdef USE_OPACITY
//     attribute float iOpacity;
//   #else
//     float iOpacity = 1.0;
//   #endif
//   varying float Opacity;
// `
// export const vertexShaderMain = `
//   Opacity = iOpacity;
// `
// export const fragmentShaderDef = `
//   varying float Opacity;
// `
// export const fragmentShaderMain = `
//   csm_DiffuseColor.w = csm_DiffuseColor.w * Opacity;
// `
