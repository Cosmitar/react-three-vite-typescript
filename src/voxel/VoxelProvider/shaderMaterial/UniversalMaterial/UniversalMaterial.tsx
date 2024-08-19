import { MeshLambertMaterial, Vector2, Vector3 } from 'three'
import ThreeCustomShaderMaterial, { MaterialConstructor, iCSMParams } from 'three-custom-shader-material'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import vertexDisplacementFragment from './vertexDisplacementFragment.glsl'
import vertexDisplacementFragmentVertex from './vertexDisplacementVertex.glsl'
import atlasTextureDefinitions from '../VoxelAtlasMaterial/definitions.glsl'
import atlasTextureVertex from '../VoxelAtlasMaterial/vertex.glsl'
import atlasTextureFragment from '../VoxelAtlasMaterial/fragment.glsl'
import tonemappingFragment from './tonemapping_frag.glsl'
import { glslCockpit, glslShapeVertex } from './shapes'
import {
  vertexShaderDef as flagsVertexDef,
  vertexShaderMain as flagsVertexMain,
  fragmentShaderDef as flagsFragmentDef,
  fragmentShaderMain as flagsFragmentMain,
} from '../../Attributes/FlagsShaders'

export type UniversalMaterialPorps = iCSMParams<MaterialConstructor> & {
  uniforms?: {
    uTime?: { value: number }
    uVPositions?: { value: Vector3[] }
  }
}

export const unitCubeVPositions = [
  new Vector3(-0.5, -0.5, 0.5),
  new Vector3(-0.5, 0.5, 0.5),
  new Vector3(0.5, 0.5, 0.5),
  new Vector3(0.5, -0.5, 0.5),
  new Vector3(-0.5, -0.5, -0.5),
  new Vector3(-0.5, 0.5, -0.5),
  new Vector3(0.5, 0.5, -0.5),
  new Vector3(0.5, -0.5, -0.5),
]

const vertex = /*glsl*/ `
attribute vec4 iSensitivity;
varying vec4 Sensitivity;

${flagsVertexDef}
  
uniform float uTime;
// cockpit shape function
${glslCockpit}

// switch for shape based on iShape attribute
${glslShapeVertex}

// #define for atlas
${atlasTextureDefinitions}

// shape vertex and recalc uv into vertex_displacement_vUv
${vertexDisplacementFragmentVertex}

// decodes iSkinCode and sets varying textureCoords and faceIndex
${atlasTextureVertex}

varying vec4 vWorldPosition;
varying vec2 vUv;

void main() {
  vUv = uv;
  // vertex displacement
  vec3 pos = vertex_displacement_UV_correction();
  // atlas texture, local version since imported calcs bad the positions.
  calcFaceIndexAndTextureCoord();
  
  csm_PositionRaw = vec4(projectionMatrix * modelViewMatrix * instanceMatrix * vec4(pos, 1.0)).xyzw;

  vWorldPosition = modelMatrix  * instanceMatrix * vec4( pos, 1.0 );

  Sensitivity = iSensitivity;

  ${flagsVertexMain}
}
`

const fragment = /*glsl*/ `

varying vec4 Sensitivity;
varying vec4 vWorldPosition;
${flagsFragmentDef}

uniform vec3 uMainLightSource;
uniform vec3 uTorchLightSource;
uniform vec2 uLevelDimension;
// tonemapping fn from three
${tonemappingFragment}

// #define for atlas
${atlasTextureDefinitions}

// functions to set color from atlas
${atlasTextureFragment}

// functions to debug displacement fragment (vertex_displacement_color)
${vertexDisplacementFragment}

vec3 greyscale(vec3 color, float str) {
  float gray = (color.r + color.g + color.b) / 3.0;
  // alt 1, more clear grayscale
  // float gray = dot(color, vec3(0.299, 0.587, 0.114));
  return mix(color, vec3(gray), str);
}

bool isEqualColor(vec3 color, vec3 target) {
  float epsilon = 0.001; // Small tolerance for floating-point comparison
  return all(lessThan(abs(color - target), vec3(epsilon)));
}

bool isEqualFloat(float a, float b) {
  float epsilon = 0.0001; // Small tolerance for floating-point comparison
  return abs(a - b) < epsilon;
}

void main() {
  ${flagsFragmentMain}

  // gets the texel
  vec4 text = calcVoxelAtlasDiffuse(vertex_displacement_vUv);
  
  // sets plain output
  csm_DiffuseColor = text;

  if (isEqualColor(vColor,vec3(1., 1., 1.))) {
    csm_DiffuseColor = text;
    // glow test
    // if(text.r <= 255./84.) {
    //   csm_DiffuseColor = vec4(vec3(csm_DiffuseColor.rgb * diffuse * 2.), csm_DiffuseColor.w);
    // }
  }else {
    csm_DiffuseColor = vec4(greyscale(text.rgb, 1.) * vColor, text.w);
  }

  if(useGrayscale) {
    csm_DiffuseColor.rgb = greyscale(text.rgb, 1.);
  }

  // bool isGradientSensitive = isEqualFloat(Sensitivity.y, 1.);
  if(useGradient) {
    float clarity = ( vertex_displacement_vUv.y * 0.5 ) + 0.5;
    csm_DiffuseColor = vec4( csm_DiffuseColor.rgb * clarity, csm_DiffuseColor.w );
  }

  // light/AO radius
  bool isAOSensitive = isEqualFloat(Sensitivity.z, 1.);
  vec3 originalColor = csm_DiffuseColor.rgb;
  if(isAOSensitive && false) {
    vec3 distanceVector = vWorldPosition.xyz - uMainLightSource;
    vec2 distanceVector2D = vWorldPosition.xz - uMainLightSource.xz;
    vec3 color2 = uncharted2(originalColor) * vec3(0.15, 0.15, 0.15);
    vec3 color1 = uncharted2(originalColor);
    // vec3 color1 = greyscale(csm_DiffuseColor.rgb, 1.);
    float decay = 4.75;
    float radius = 3.5;
    csm_DiffuseColor = vec4(mix(color1, color2, clamp(length(distanceVector)/decay-radius/decay,0., 1.)),csm_DiffuseColor.w);
  }
  bool isTorchLightSensitive = isEqualFloat(Sensitivity.z, 2.);
  if(isTorchLightSensitive && false) {
    // torch
    vec3 distanceVector = vWorldPosition.xyz - uTorchLightSource;
    vec2 distanceVector2D = vWorldPosition.xz - uTorchLightSource.xz;
    vec3 color4 = uncharted2(originalColor) * vec3(5.15, 5.15, 5.15);
    vec3 color5 = uncharted2(csm_DiffuseColor.rgb);
    // vec3 color1 = greyscale(csm_DiffuseColor.rgb, 1.);
    float decay = 1.75;
    float radius = 2.;
    csm_DiffuseColor = vec4(mix(color4, color5, clamp(length(distanceVector)/decay-radius/decay,0., 1.)),csm_DiffuseColor.w);

  }

  // // EDGE LIGHT/SHADOW (POTENTIAL AO)
  // // Lighten the edges
  // float edgeDist = 0.15; // Distance from the edge to start lightening
  // float lighteningFactor = 0.05; // Amount to lighten the edges by

  // // Calculate distances to the edges
  // vec2 uvEdgeDist = min(vertex_displacement_vUv, vec2(1.0) - vertex_displacement_vUv);

  // // Lighten based on distance to the nearest edge
  // float lighten = lighteningFactor-smoothstep(0.0, edgeDist, min(uvEdgeDist.x, uvEdgeDist.y)) * lighteningFactor;

  // // Apply the lightening effect to the color
  // csm_DiffuseColor.rgb += lighten;
  // // Apply the shadow effect to the color
  // csm_DiffuseColor.rgb -= lighten;

  // // test og glow/shadow edge vignette. original from https://shaderfrog.com/2/editor/clutq7de60002pas9tqzh484p
  // vec3 edgeMaskColor = vec3(1.,1.,1.);
  // float intensity = 0.1;
  // float spread = 500.;
  // float vignette = vertex_displacement_vUv.y * vertex_displacement_vUv.x * (1.-vertex_displacement_vUv.x) * (1.-vertex_displacement_vUv.y) * spread;
  // vec3 multiplier = 1.0 - ( vignette * edgeMaskColor * intensity );
  // vec3 edgeMask = clamp( edgeMaskColor * multiplier, 0.0, 1.0 );
  // // shadow
  // csm_DiffuseColor = vec4(mix(csm_DiffuseColor.rgb, vec3(0.), clamp(edgeMask.r, 0., 0.5)), csm_DiffuseColor.w);

  bool isWater = isEqualFloat(Sensitivity.w, 1.);
  bool isLevelContained = isEqualFloat(Sensitivity.w, 2.) || isWater;
  if(isLevelContained && (vWorldPosition.x > uLevelDimension.x /2. + 0.5 || vWorldPosition.z > uLevelDimension.y/2. + 0.5 ||
    vWorldPosition.x < -uLevelDimension.x /2. - 0.5 || vWorldPosition.z < -uLevelDimension.y/2. - 0.5)
  ) {
      csm_DiffuseColor.w = 0.;
  } else {
    if(isWater) {
      // translucent water
      csm_DiffuseColor.w = 0.5;
    }
  }

  // this is not working as expected
  // bool isOpacity = Sensitivity.x > 2. && Sensitivity.x < 3.;
  // if(isOpacity) {
  //   csm_DiffuseColor.w = csm_DiffuseColor.w * Sensitivity.x - 2.;
  // }
  
}
`

const defaultProps = {
  baseMaterial: MeshLambertMaterial,
  vertexShader: vertex,
  fragmentShader: fragment,
  // {/*silent parameter to true disables the default warning if needed*/}
  silent: true,
  uniforms: {
    uTime: { value: 0 },
    uMapSize: { value: new Vector2(1, 6) },
    uColIdx: { value: 0 },
    uMainLightSource: { value: new Vector3(0, 0, 0) },
    uTorchLightSource: { value: new Vector3(0, 0, 0) },
    uMainLightRadius: { value: 1 },
    uLevelDimension: { value: new Vector2(1, 1) },
  },
}

export function MeshUniversalMaterial(props?: UniversalMaterialPorps) {
  return (
    <ThreeCustomShaderMaterial {...{ ...defaultProps, ...props }} uniforms={mergeUniforms(defaultProps.uniforms, props?.uniforms ?? {})} />
  )
}

export class UniversalMaterial extends CustomShaderMaterial {
  constructor(props?: UniversalMaterialPorps) {
    // @ts-ignore a mess with super CustomShaderMaterial and DeformVertexMaterialProps
    super({
      ...defaultProps,
      ...props,
      uniforms: mergeUniforms(defaultProps.uniforms, props?.uniforms ?? {}),
    })
  }
}

// local helpers
const mergeUniforms = (defaultUniforms: UniversalMaterialPorps['uniforms'], givenUniforms: Partial<UniversalMaterialPorps['uniforms']>) => {
  const retVal = deepClone(defaultUniforms)
  for (const key of Object.keys(defaultUniforms!)) {
    const k = key as keyof UniversalMaterialPorps['uniforms']
    if (typeof givenUniforms![k] !== 'undefined') {
      // @ts-ignore
      retVal[k] = givenUniforms[k]
    }
  }

  return retVal
}

const deepClone = (val: any) => (structuredClone ? structuredClone(val) : JSON.parse(JSON.stringify(val)))
