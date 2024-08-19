precision highp float;
precision highp int;
precision highp sampler2D;

varying vec2 csm_vUv;
varying vec3 myNormal;
varying float faceIndex;
varying float iColIdx;
attribute vec3 iSkinCode;
varying float textureIdx;
varying vec2 textureCoords;

// bitmask decode
vec2 decodeTextureCoords(vec3 packedData, float faceIdx) {
  int part = int(faceIdx == FACE_TOP || faceIdx == FACE_BOTTOM ? packedData.x : faceIdx == FACE_FRONT || faceIdx == FACE_BACK ? packedData.y : packedData.z);
  // Decode 4 variables from part
  int face1Col = (part >> 18) & ((1 << 6) - 1);
  int face1Row = (part >> 12) & ((1 << 6) - 1);
  int face2Col = (part >> 6) & ((1 << 6) - 1);
  int face2Row = (part) & ((1 << 6) - 1);

  vec2 code = faceIdx == FACE_TOP || faceIdx == FACE_RIGHT || faceIdx == FACE_FRONT ? vec2(face1Col, face1Row) : vec2(face2Col, face2Row);
  return code;
}

// mat4 encoding approach
// vec2 mat4_decodeTextureCoords(mat4 facesCode, float faceIdx) {
//   float colIdx = faceIdx == FACE_TOP ? facesCode[0][0] : faceIdx == FACE_BOTTOM ? facesCode[2][0] : faceIdx == FACE_RIGHT ? facesCode[0][1] : faceIdx == FACE_LEFT ? facesCode[2][1] : faceIdx == FACE_FRONT ? facesCode[0][2] : faceIdx == FACE_BACK ? facesCode[2][2] : 0.;
//   float rowIdx = faceIdx == FACE_TOP ? facesCode[1][0] : faceIdx == FACE_BOTTOM ? facesCode[3][0] : faceIdx == FACE_RIGHT ? facesCode[1][1] : faceIdx == FACE_LEFT ? facesCode[3][1] : faceIdx == FACE_FRONT ? facesCode[1][2] : faceIdx == FACE_BACK ? facesCode[3][2] : 0.;
//   return vec2(colIdx, rowIdx);
// }
// Vector3 encoding approach
// vec2 vec3_decodeTextureCoords(vec3 facesCode, float faceIdx) {
//   float pairCode = faceIdx == FACE_TOP || faceIdx == FACE_BOTTOM ? facesCode.x : faceIdx == FACE_RIGHT || faceIdx == FACE_LEFT ? facesCode.y : facesCode.z;
//       // this encoding method supports an atlas of 10x100 (1k squares)
//       // pairCode = 1 001 001 a cc rr c2c2
//       //               ↑   ↑
//       //            face1 face2
//       //   1    0   01   0    01
//       // atlas col row  col  row
//   float face1Code = floor(pairCode / 1000.) - 1000.;
//   float face2Code = pairCode - (face1Code * 1000. + 1000000.);
//   float code = faceIdx == FACE_TOP || faceIdx == FACE_RIGHT || faceIdx == FACE_FRONT ? face1Code : face2Code;
//       // code = 999
//   float colIdx = floor(code / 100.);
//   float rowIdx = code - colIdx * 100.;
//   return vec2(floor(colIdx), floor(rowIdx));
// }

void calcFaceIndexAndTextureCoord() {
  csm_vUv = uv;
  myNormal = normal;
  faceIndex = 0.;
  textureIdx = 0.0;
  textureCoords = vec2(0.0);

  bool IS_FACE_FRONT = normal.z == 1.;
  bool IS_FACE_BACK = normal.z == -1.;
  bool IS_FACE_TOP = normal.y == 1.;
  bool IS_FACE_BOTTOM = normal.y == -1.;
  bool IS_FACE_RIGHT = normal.x == 1.;
  bool IS_FACE_LEFT = normal.x == -1.;

  if(IS_FACE_FRONT) {
    faceIndex = FACE_FRONT;
    textureCoords = decodeTextureCoords(iSkinCode, faceIndex);
  }
  if(IS_FACE_BACK) {
    faceIndex = FACE_BACK;
    textureCoords = decodeTextureCoords(iSkinCode, faceIndex);
  }
  if(IS_FACE_TOP) {
    faceIndex = FACE_TOP;
    textureCoords = decodeTextureCoords(iSkinCode, faceIndex);
  }
  if(IS_FACE_BOTTOM) {
    faceIndex = FACE_BOTTOM;
    textureCoords = decodeTextureCoords(iSkinCode, faceIndex);
  }
  if(IS_FACE_RIGHT) {
    faceIndex = FACE_RIGHT;
    textureCoords = decodeTextureCoords(iSkinCode, faceIndex);

  }
  if(IS_FACE_LEFT) {
    faceIndex = FACE_LEFT;
    textureCoords = decodeTextureCoords(iSkinCode, faceIndex);
  }
}
