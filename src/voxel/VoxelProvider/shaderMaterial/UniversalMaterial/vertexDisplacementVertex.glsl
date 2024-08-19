// precision highp float;
varying vec2 vertex_displacement_vUv;
attribute float iShape;

vec3 vertex_displacement_UV_correction() {
  vec3 pos = shapeVertex(position, iShape);

  // adjust uv by cube face to not take vertex deformation
  vertex_displacement_vUv = uv;
  bool IS_FACE_FRONT = normal.z == 1.;
  bool IS_FACE_BACK = normal.z == -1.;
  bool IS_FACE_TOP = normal.y == 1.;
  bool IS_FACE_BOTTOM = normal.y == -1.;
  bool IS_FACE_RIGHT = normal.x == 1.;
  bool IS_FACE_LEFT = normal.x == -1.;

  if(IS_FACE_FRONT) {
    vertex_displacement_vUv.x = pos.x + 0.5;
    vertex_displacement_vUv.y = pos.y + 0.5;
  }
  if(IS_FACE_BACK) {
    vertex_displacement_vUv.x = -pos.x + 0.5;
    vertex_displacement_vUv.y = pos.y + 0.5;
  }
  if(IS_FACE_TOP) {
    vertex_displacement_vUv.x = pos.x + 0.5;
    vertex_displacement_vUv.y = -pos.z + 0.5;
  }
  if(IS_FACE_BOTTOM) {
    vertex_displacement_vUv.x = pos.x + 0.5;
    vertex_displacement_vUv.y = pos.z + 0.5;
  }
  if(IS_FACE_RIGHT) {
    vertex_displacement_vUv.x = -pos.z + 0.5;
    vertex_displacement_vUv.y = pos.y + 0.5;
  }
  if(IS_FACE_LEFT) {
    vertex_displacement_vUv.x = pos.z + 0.5;
    vertex_displacement_vUv.y = pos.y + 0.5;
  }
  

  return pos;
}