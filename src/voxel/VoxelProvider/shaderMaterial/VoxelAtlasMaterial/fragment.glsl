varying vec2 csm_vUv;
varying vec3 myNormal;
varying float faceIndex;
// varying float iColIdx;
uniform vec2 uMapSize;
uniform float uColIdx;
varying float textureIdx;
varying vec2 textureCoords;

    // @devel
vec3 getColorByFaceIndex(float idx) {
    vec3 col = faceIndex == FACE_TOP ? vec3(0., 0., 1.) : faceIndex == FACE_BOTTOM ? vec3(1., 0., 1.) : faceIndex == FACE_RIGHT ? vec3(1., 0., 0.) : faceIndex == FACE_LEFT ? vec3(0., 1., 0.) : faceIndex == FACE_FRONT ? vec3(1., 1., 0.) : faceIndex == FACE_BACK ? vec3(0., 1., 1.) : vec3(1., 1., 1.);
    return col;
}

    // @deprecated
    // float getRowByFaceIndex(float idx) {
    //   float row =
    //     faceIndex == FACE_TOP ? 0. :
    //     faceIndex == FACE_BOTTOM ? 5. :
    //     faceIndex == FACE_RIGHT ? 3. :
    //     faceIndex == FACE_LEFT ? 4. :
    //     faceIndex == FACE_FRONT ? 1. :
    //     faceIndex == FACE_BACK ? 2. :
    //     0.;
    //   return row;
    // }

vec4 calcVoxelAtlasDiffuse(vec2 uv) {
      // diffuse is the color parameter from the instance.
      // the first decimal number of Red channel is column index
      // the first decimal number of Green channel is row index
      // float colorEncodedColIdx = floor(diffuse.r * 10.);
      // float colorEncodedRowIdx = floor(diffuse.g * 10.);

    // ORIGINAL APPROACH
    // float colUnit = 1. / uMapSize.x;
    // float rowUnit = 1. / uMapSize.y;

    // float padding = 0.1 / uMapSize.x;
    // float colIndex = uMapSize.x - textureCoords.x;
    // float rowIndex = rowUnit * textureCoords.y;
    // float topRowOffset = -rowUnit * (uMapSize.y - 1.);

    // vec2 coordUv = (uv * vec2(colUnit - padding * 2., rowUnit - padding * 2.)) - vec2(colUnit * colIndex - padding, topRowOffset + rowIndex - padding);
    // vec4 mapTexel2 = texture2D(map, coordUv);

    // ALTERNATIVE APPROACH CHAT-GPT ASSISTED
    // Define the size of each sub-texture
    vec2 atlasSize = vec2(float(textureSize(map, 0).x), float(textureSize(map, 0).y));
    vec2 subTextureSize = atlasSize / uMapSize;

    // Calculate the bottom-left corner of the sub-texture in normalized coordinates
    vec2 atlasMin = vec2(textureCoords.x * subTextureSize.x / atlasSize.x, 1.0 - (textureCoords.y + 1.0) * subTextureSize.y / atlasSize.y);

    // Calculate the size of the sub-texture in normalized coordinates
    vec2 subTextureSizeNormalized = subTextureSize / atlasSize;

    // Map the UV coordinates to the atlas region
    vec2 atlasUv = atlasMin + uv * subTextureSizeNormalized;

     // Optional: Add a small epsilon to the coordinates to avoid edge bleeding
    vec2 epsilon = vec2(0.001);//
    // vec2 epsilon = vec2(1.0 / atlasSize.x, 1.0 / atlasSize.y);
    atlasUv = clamp(atlasUv, atlasMin + epsilon, atlasMin + subTextureSizeNormalized - epsilon);

    vec4 mapTexel2 = texture2D(map, atlasUv);

    return mapTexel2;

}