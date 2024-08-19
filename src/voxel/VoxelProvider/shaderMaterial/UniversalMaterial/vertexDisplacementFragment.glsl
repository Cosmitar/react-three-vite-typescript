varying vec2 vertex_displacement_vUv;

float chessboard(vec2 uv) {
  float xOffset = step(fract(uv.y), 0.5) * 0.5;
  return step(fract(uv.x + xOffset), 0.5);
}

vec3 vertex_displacement_color() {
  vec2 uv = vertex_displacement_vUv.xy / vec2(1., 1.) * 3.;
  vec3 color = vec3(chessboard(uv));
  return color; 
}