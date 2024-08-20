import { InstancedAttribute } from '../InstancedAttribute'

export default function ({ value }: { value: number }) {
  return <InstancedAttribute name='iOpacity' value={value} defaultValue={1} define={'USE_OPACITY'} />
}

export const vertexShaderDef = `
  #ifdef USE_OPACITY
    attribute float iOpacity;
  #else
    float iOpacity = 1.0;
  #endif
  varying float Opacity;
`
export const vertexShaderMain = `
  Opacity = iOpacity;
`
export const fragmentShaderDef = `
  varying float Opacity;
`
export const fragmentShaderMain = `
  csm_DiffuseColor.w = csm_DiffuseColor.w * Opacity;
`
