export const SHAPES = {
  CUBE: 0,
  COCKPIT: 1,
  PINE_LEAVES: 2,
  FLAT: 3,
  JEWEL_SIDE: 4,
  JEWEL_CORNER: 5,
}

const cockpitShapePositions = [
  [-0.5, 0.15, 0.05], // bottom left front
  [-0.5, 0.35, 0.05], // top left front
  [0.5, 0.5, 0.5], // top right front
  [0.5, -0.5, 0.5], // bottom right front
  [-0.5, 0.15, -0.05], // bottom left back
  [-0.5, 0.35, -0.05], // top left back
  [0.5, 0.5, -0.5], // top right back
  [0.5, -0.5, -0.5], // bottom right back
]
const pineLeavesShapePositions = [
  [-0.5, -0.5, 0.5], // bottom left front
  [-0.05, 0.5, 0.05], // top left front
  [0.05, 0.5, 0.05], // top right front
  [0.5, -0.5, 0.5], // bottom right front
  [-0.5, -0.5, -0.5], // bottom left back
  [-0.05, 0.5, -0.05], // top left back
  [0.05, 0.5, -0.05], // top right back
  [0.5, -0.5, -0.5], // bottom right back
]
const flatShapePositions = [
  [-0.5, -0.5, 0], // bottom left front
  [-0.5, 0.5, 0], // top left front
  [0.5, 0.5, 0], // top right front
  [0.5, -0.5, 0], // bottom right front
  [-0.5, -0.5, 0], // bottom left back
  [-0.5, 0.5, 0], // top left back
  [0.5, 0.5, 0], // top right back
  [0.5, -0.5, 0], // bottom right back
]
const jewelSideShapePositions = [
  [-0.5, -0.5, 0.5], // bottom left front
  [-0.5, 0, 0.5], // top left front
  [0.5, 0, 0.5], // top right front
  [0.5, -0.5, 0.5], // bottom right front
  [-0.5, -0.5, -0.5], // bottom left back
  [-0.5, 0.5, -0.5], // top left back
  [0.5, 0.5, -0.5], // top right back
  [0.5, -0.5, -0.5], // bottom right back
]
const jewelCornerShapePositions = [
  [0.5, -0.5, 0.5], // bottom left front
  [0.5, 0, 0.5], // top left front
  [0.5, 0, 0.5], // top right front
  [0.5, -0.5, 0.5], // bottom right front
  [-0.5, -0.5, -0.5], // bottom left back
  [-0.5, 0., -0.5], // top left back
  [0.5, 0.5, -0.5], // top right back
  [0.5, -0.5, -0.5], // bottom right back
]

const toFixed = (pos: number) => (v: number) => v.toFixed(3)

const conditionalShapes = Object.keys(SHAPES)
  .map(
    key => `if(iShape == ${SHAPES[key as keyof typeof SHAPES]}.) return shape_${SHAPES[key as keyof typeof SHAPES]}(position); // ${key}`
  )
  .join('\n')

export const glslShapeVertex = /* glsl */ `

vec3 shapeVertex(vec3 position, float iShape) {
  ${conditionalShapes}
  // if(iShape == ${SHAPES.COCKPIT}.) return shape_${SHAPES.COCKPIT}(position);
  // if(iShape == ${SHAPES.PINE_LEAVES}.) return shape_${SHAPES.PINE_LEAVES}(position);
  return position;
}
`
export const glslCockpit = /* glsl */ `
  vec3 shape_${SHAPES.CUBE}(vec3 pos) {
    return pos;
  }
  vec3 shape_${SHAPES.COCKPIT}(vec3 pos) {
    // Moves vertices for cockpit positions
    if(pos.z > .0 && pos.y < 0. && pos.x < 0.) {
      // bottom left front
      pos = vec3(${cockpitShapePositions[0].map(toFixed(2)).join(',')});
    } else if(pos.z > .0 && pos.y > 0. && pos.x < 0.) {
      // top left front
      pos = vec3(${cockpitShapePositions[1].map(toFixed(2)).join(',')});
    } else if(pos.z > .0 && pos.y > 0. && pos.x > 0.) {
      // top right front
      pos = vec3(${cockpitShapePositions[2].map(toFixed(2)).join(',')});
    } else if(pos.z > .0 && pos.y < 0. && pos.x > 0.) {
      // bottom right front
      pos = vec3(${cockpitShapePositions[3].map(toFixed(2)).join(',')});
    } else if(pos.z < .0 && pos.y < 0. && pos.x < 0.) {
      // bottom left back
      pos = vec3(${cockpitShapePositions[4].map(toFixed(2)).join(',')});
    } else if(pos.z < .0 && pos.y > 0. && pos.x < 0.) {
      // top left back
      pos = vec3(${cockpitShapePositions[5].map(toFixed(2)).join(',')});
    } else if(pos.z < .0 && pos.y > 0. && pos.x > 0.) {
      // top right back
      pos = vec3(${cockpitShapePositions[6].map(toFixed(2)).join(',')});
    } else if(pos.z < .0 && pos.y < 0. && pos.x > 0.) {
      // bottom right back
      pos = vec3(${cockpitShapePositions[7].map(toFixed(2)).join(',')});
    }
    return pos;
  }
  vec3 shape_${SHAPES.PINE_LEAVES}(vec3 pos) {
    // Moves vertices for cockpit positions
    if(pos.z > .0 && pos.y < 0. && pos.x < 0.) {
      // bottom left front
      pos = vec3(${pineLeavesShapePositions[0].map(toFixed(2)).join(',')});
    } else if(pos.z > .0 && pos.y > 0. && pos.x < 0.) {
      // top left front
      pos = vec3(${pineLeavesShapePositions[1].map(toFixed(2)).join(',')});
    } else if(pos.z > .0 && pos.y > 0. && pos.x > 0.) {
      // top right front
      pos = vec3(${pineLeavesShapePositions[2].map(toFixed(2)).join(',')});
    } else if(pos.z > .0 && pos.y < 0. && pos.x > 0.) {
      // bottom right front
      pos = vec3(${pineLeavesShapePositions[3].map(toFixed(2)).join(',')});
    } else if(pos.z < .0 && pos.y < 0. && pos.x < 0.) {
      // bottom left back
      pos = vec3(${pineLeavesShapePositions[4].map(toFixed(2)).join(',')});
    } else if(pos.z < .0 && pos.y > 0. && pos.x < 0.) {
      // top left back
      pos = vec3(${pineLeavesShapePositions[5].map(toFixed(2)).join(',')});
    } else if(pos.z < .0 && pos.y > 0. && pos.x > 0.) {
      // top right back
      pos = vec3(${pineLeavesShapePositions[6].map(toFixed(2)).join(',')});
    } else if(pos.z < .0 && pos.y < 0. && pos.x > 0.) {
      // bottom right back
      pos = vec3(${pineLeavesShapePositions[7].map(toFixed(2)).join(',')});
    }
    return pos;
  }
  vec3 shape_${SHAPES.FLAT}(vec3 pos) {
    // Moves vertices for cockpit positions
    if(pos.z > .0 && pos.y < 0. && pos.x < 0.) {
      // bottom left front
      pos = vec3(${flatShapePositions[0].map(toFixed(2)).join(',')});
    } else if(pos.z > .0 && pos.y > 0. && pos.x < 0.) {
      // top left front
      pos = vec3(${flatShapePositions[1].map(toFixed(2)).join(',')});
    } else if(pos.z > .0 && pos.y > 0. && pos.x > 0.) {
      // top right front
      pos = vec3(${flatShapePositions[2].map(toFixed(2)).join(',')});
    } else if(pos.z > .0 && pos.y < 0. && pos.x > 0.) {
      // bottom right front
      pos = vec3(${flatShapePositions[3].map(toFixed(2)).join(',')});
    } else if(pos.z < .0 && pos.y < 0. && pos.x < 0.) {
      // bottom left back
      pos = vec3(${flatShapePositions[4].map(toFixed(2)).join(',')});
    } else if(pos.z < .0 && pos.y > 0. && pos.x < 0.) {
      // top left back
      pos = vec3(${flatShapePositions[5].map(toFixed(2)).join(',')});
    } else if(pos.z < .0 && pos.y > 0. && pos.x > 0.) {
      // top right back
      pos = vec3(${flatShapePositions[6].map(toFixed(2)).join(',')});
    } else if(pos.z < .0 && pos.y < 0. && pos.x > 0.) {
      // bottom right back
      pos = vec3(${flatShapePositions[7].map(toFixed(2)).join(',')});
    }
    return pos;
  }
  vec3 shape_${SHAPES.JEWEL_SIDE}(vec3 pos) {
    // Moves vertices for cockpit positions
    if(pos.z > .0 && pos.y < 0. && pos.x < 0.) {
      // bottom left front
      pos = vec3(${jewelSideShapePositions[0].map(toFixed(2)).join(',')});
    } else if(pos.z > .0 && pos.y > 0. && pos.x < 0.) {
      // top left front
      pos = vec3(${jewelSideShapePositions[1].map(toFixed(2)).join(',')});
    } else if(pos.z > .0 && pos.y > 0. && pos.x > 0.) {
      // top right front
      pos = vec3(${jewelSideShapePositions[2].map(toFixed(2)).join(',')});
    } else if(pos.z > .0 && pos.y < 0. && pos.x > 0.) {
      // bottom right front
      pos = vec3(${jewelSideShapePositions[3].map(toFixed(2)).join(',')});
    } else if(pos.z < .0 && pos.y < 0. && pos.x < 0.) {
      // bottom left back
      pos = vec3(${jewelSideShapePositions[4].map(toFixed(2)).join(',')});
    } else if(pos.z < .0 && pos.y > 0. && pos.x < 0.) {
      // top left back
      pos = vec3(${jewelSideShapePositions[5].map(toFixed(2)).join(',')});
    } else if(pos.z < .0 && pos.y > 0. && pos.x > 0.) {
      // top right back
      pos = vec3(${jewelSideShapePositions[6].map(toFixed(2)).join(',')});
    } else if(pos.z < .0 && pos.y < 0. && pos.x > 0.) {
      // bottom right back
      pos = vec3(${jewelSideShapePositions[7].map(toFixed(2)).join(',')});
    }
    return pos;
  }
  vec3 shape_${SHAPES.JEWEL_CORNER}(vec3 pos) {
    // Moves vertices for cockpit positions
    if(pos.z > .0 && pos.y < 0. && pos.x < 0.) {
      // bottom left front
      pos = vec3(${jewelCornerShapePositions[0].map(toFixed(2)).join(',')});
    } else if(pos.z > .0 && pos.y > 0. && pos.x < 0.) {
      // top left front
      pos = vec3(${jewelCornerShapePositions[1].map(toFixed(2)).join(',')});
    } else if(pos.z > .0 && pos.y > 0. && pos.x > 0.) {
      // top right front
      pos = vec3(${jewelCornerShapePositions[2].map(toFixed(2)).join(',')});
    } else if(pos.z > .0 && pos.y < 0. && pos.x > 0.) {
      // bottom right front
      pos = vec3(${jewelCornerShapePositions[3].map(toFixed(2)).join(',')});
    } else if(pos.z < .0 && pos.y < 0. && pos.x < 0.) {
      // bottom left back
      pos = vec3(${jewelCornerShapePositions[4].map(toFixed(2)).join(',')});
    } else if(pos.z < .0 && pos.y > 0. && pos.x < 0.) {
      // top left back
      pos = vec3(${jewelCornerShapePositions[5].map(toFixed(2)).join(',')});
    } else if(pos.z < .0 && pos.y > 0. && pos.x > 0.) {
      // top right back
      pos = vec3(${jewelCornerShapePositions[6].map(toFixed(2)).join(',')});
    } else if(pos.z < .0 && pos.y < 0. && pos.x > 0.) {
      // bottom right back
      pos = vec3(${jewelCornerShapePositions[7].map(toFixed(2)).join(',')});
    }
    return pos;
  }
`
