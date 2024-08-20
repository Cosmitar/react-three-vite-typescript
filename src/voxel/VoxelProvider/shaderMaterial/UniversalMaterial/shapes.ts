export const SHAPES = {
  CUBE: 0,
  FLAT: 1,
  PYRAMID: 2,
}
const VERTEX_POSITIONS = {
  CUBE: [
    // x ,  y  ,  z
    [-0.5, -0.5, 0.5], // left bottom front
    [-0.5, 0.5, 0.5], // left top front
    [0.5, 0.5, 0.5], // right top front
    [0.5, -0.5, 0.5], // right bottom front
    [-0.5, -0.5, -0.5], // left bottom back
    [-0.5, 0.5, -0.5], // left top back
    [0.5, 0.5, -0.5], // right top back
    [0.5, -0.5, -0.5], // right bottom back
  ],
  FLAT: [
    [-0.5, -0.5, 0], // left bottom front
    [-0.5, 0.5, 0], // left top front
    [0.5, 0.5, 0], // right top front
    [0.5, -0.5, 0], // right bottom front
    [-0.5, -0.5, 0], // left bottom back
    [-0.5, 0.5, 0], // left top back
    [0.5, 0.5, 0], // right top back
    [0.5, -0.5, 0], // right bottom back
  ],
  PYRAMID: [
    // x ,  y  ,  z
    [-0.5, -0.5, 0.5], // left bottom front
    [0, 0.5, 0], // left top front
    [0, 0.5, 0], // right top front
    [0.5, -0.5, 0.5], // right bottom front
    [-0.5, -0.5, -0.5], // left bottom back
    [0, 0.5, 0], // left top back
    [0, 0.5, 0], // right top back
    [0.5, -0.5, -0.5], // right bottom back
  ],
}

const toFixed = (pos: number) => (v: number) => v.toFixed(3)

const conditionalShapes = Object.keys(SHAPES)
  .map(
    key => `if(iShape == ${SHAPES[key as keyof typeof SHAPES]}.) return shape_${key}(position); // ${key}`
    // key => `if(iShape == ${SHAPES[key as keyof typeof SHAPES]}.) return shape_${SHAPES[key as keyof typeof SHAPES]}(position); // ${key}`
  )
  .join('\n')
const displacementFunctions = Object.keys(VERTEX_POSITIONS)
  .map(
    key => `
  vec3 shape_${key}(vec3 pos) {
    // Moves vertices for nose positions
    if(pos.z > 0. && pos.y < 0. && pos.x < 0.) {
      // bottom left front
      pos = vec3(${VERTEX_POSITIONS[key as keyof typeof VERTEX_POSITIONS][0].map(toFixed(2)).join(',')});
    } else if(pos.x < 0. && pos.y > 0. && pos.z > 0.) {
      // top left front
      pos = vec3(${VERTEX_POSITIONS[key as keyof typeof VERTEX_POSITIONS][1].map(toFixed(2)).join(',')});
    } else if(pos.x > 0. && pos.y > 0. && pos.z > 0.) {
      // top right front
      pos = vec3(${VERTEX_POSITIONS[key as keyof typeof VERTEX_POSITIONS][2].map(toFixed(2)).join(',')});
    } else if(pos.x > 0. && pos.y < 0. && pos.z > 0.) {
      // bottom right front
      pos = vec3(${VERTEX_POSITIONS[key as keyof typeof VERTEX_POSITIONS][3].map(toFixed(2)).join(',')});
    } else if(pos.x < 0. && pos.y < 0. && pos.z < 0.) {
      // bottom left back
      pos = vec3(${VERTEX_POSITIONS[key as keyof typeof VERTEX_POSITIONS][4].map(toFixed(2)).join(',')});
    } else if(pos.x < 0. && pos.y > 0. && pos.z < 0.) {
      // top left back
      pos = vec3(${VERTEX_POSITIONS[key as keyof typeof VERTEX_POSITIONS][5].map(toFixed(2)).join(',')});
    } else if(pos.x > 0. && pos.y > 0. && pos.z < 0.) {
      // top right back
      pos = vec3(${VERTEX_POSITIONS[key as keyof typeof VERTEX_POSITIONS][6].map(toFixed(2)).join(',')});
    } else if(pos.x > 0. && pos.y < 0. && pos.z < 0.) {
      // bottom right back
      pos = vec3(${VERTEX_POSITIONS[key as keyof typeof VERTEX_POSITIONS][7].map(toFixed(2)).join(',')});
    }
    return pos;
  }`
  )
  .join('\n')
export const glslShapeVertex = /* glsl */ `

vec3 shapeVertex(vec3 position, float iShape) {
  ${conditionalShapes}
  return position;
}
`
export const glslCockpit = displacementFunctions
