// // see https://github.com/mrdoob/three.js/blob/dev/src/renderers/shaders/ShaderChunk/tonemapping_pars_fragment.glsl.js

// #ifndef saturate
// // <common> may have defined saturate() already
// #define saturate( a ) clamp( a, 0.0, 1.0 )
// #endif

// // uniform float toneMappingExposure;

// // exposure only
// vec3 LinearToneMapping( vec3 color ) {

// 	return saturate( toneMappingExposure * color );

// }

// // source: https://www.cs.utah.edu/docs/techreports/2002/pdf/UUCS-02-001.pdf
// vec3 ReinhardToneMapping( vec3 color ) {

// 	color *= toneMappingExposure;
// 	return saturate( color / ( vec3( 1.0 ) + color ) );

// }

// // source: http://filmicworlds.com/blog/filmic-tonemapping-operators/
// vec3 OptimizedCineonToneMapping( vec3 color ) {

// 	// optimized filmic operator by Jim Hejl and Richard Burgess-Dawson
// 	color *= toneMappingExposure;
// 	color = max( vec3( 0.0 ), color - 0.004 );
// 	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );

// }

// // source: https://github.com/selfshadow/ltc_code/blob/master/webgl/shaders/ltc/ltc_blit.fs
// vec3 RRTAndODTFit( vec3 v ) {

// 	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
// 	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
// 	return a / b;

// }

// // this implementation of ACES is modified to accommodate a brighter viewing environment.
// // the scale factor of 1/0.6 is subjective. see discussion in #19621.

// vec3 ACESFilmicToneMapping( vec3 color ) {

// 	// sRGB => XYZ => D65_2_D60 => AP1 => RRT_SAT
// 	const mat3 ACESInputMat = mat3(
// 		vec3( 0.59719, 0.07600, 0.02840 ), // transposed from source
// 		vec3( 0.35458, 0.90834, 0.13383 ),
// 		vec3( 0.04823, 0.01566, 0.83777 )
// 	);

// 	// ODT_SAT => XYZ => D60_2_D65 => sRGB
// 	const mat3 ACESOutputMat = mat3(
// 		vec3(  1.60475, -0.10208, -0.00327 ), // transposed from source
// 		vec3( -0.53108,  1.10813, -0.07276 ),
// 		vec3( -0.07367, -0.00605,  1.07602 )
// 	);

// 	color *= toneMappingExposure / 0.6;

// 	color = ACESInputMat * color;

// 	// Apply RRT and ODT
// 	color = RRTAndODTFit( color );

// 	color = ACESOutputMat * color;

// 	// Clamp to [0, 1]
// 	return saturate( color );

// }

// // Matrices for rec 2020 <> rec 709 color space conversion
// // matrix provided in row-major order so it has been transposed
// // https://www.itu.int/pub/R-REP-BT.2407-2017
// const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
// 	vec3( 1.6605, - 0.1246, - 0.0182 ),
// 	vec3( - 0.5876, 1.1329, - 0.1006 ),
// 	vec3( - 0.0728, - 0.0083, 1.1187 )
// );

// const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
// 	vec3( 0.6274, 0.0691, 0.0164 ),
// 	vec3( 0.3293, 0.9195, 0.0880 ),
// 	vec3( 0.0433, 0.0113, 0.8956 )
// );

// // https://iolite-engine.com/blog_posts/minimal_agx_implementation
// // Mean error^2: 3.6705141e-06
// vec3 agxDefaultContrastApprox( vec3 x ) {

// 	vec3 x2 = x * x;
// 	vec3 x4 = x2 * x2;

// 	return + 15.5 * x4 * x2
// 		- 40.14 * x4 * x
// 		+ 31.96 * x4
// 		- 6.868 * x2 * x
// 		+ 0.4298 * x2
// 		+ 0.1191 * x
// 		- 0.00232;

// }

// // AgX Tone Mapping implementation based on Filament, which in turn is based
// // on Blender's implementation using rec 2020 primaries
// // https://github.com/google/filament/pull/7236
// // Inputs and outputs are encoded as Linear-sRGB.

// vec3 AgXToneMapping( vec3 color ) {

// 	// AgX constants
// 	const mat3 AgXInsetMatrix = mat3(
// 		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
// 		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
// 		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
// 	);

// 	// explicit AgXOutsetMatrix generated from Filaments AgXOutsetMatrixInv
// 	const mat3 AgXOutsetMatrix = mat3(
// 		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
// 		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
// 		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
// 	);

// 	// LOG2_MIN      = -10.0
// 	// LOG2_MAX      =  +6.5
// 	// MIDDLE_GRAY   =  0.18
// 	const float AgxMinEv = - 12.47393;  // log2( pow( 2, LOG2_MIN ) * MIDDLE_GRAY )
// 	const float AgxMaxEv = 4.026069;    // log2( pow( 2, LOG2_MAX ) * MIDDLE_GRAY )

// 	color *= toneMappingExposure;

// 	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;

// 	color = AgXInsetMatrix * color;

// 	// Log2 encoding
// 	color = max( color, 1e-10 ); // avoid 0 or negative numbers for log2
// 	color = log2( color );
// 	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );

// 	color = clamp( color, 0.0, 1.0 );

// 	// Apply sigmoid
// 	color = agxDefaultContrastApprox( color );

// 	// Apply AgX look
// 	// v = agxLook(v, look);

// 	color = AgXOutsetMatrix * color;

// 	// Linearize
// 	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );

// 	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;

// 	// Gamut mapping. Simple clamp for now.
// 	color = clamp( color, 0.0, 1.0 );

// 	return color;

// }

// // https://modelviewer.dev/examples/tone-mapping

// vec3 NeutralToneMapping( vec3 color ) {

// 	const float StartCompression = 0.8 - 0.04;
// 	const float Desaturation = 0.15;

// 	color *= toneMappingExposure;

// 	float x = min( color.r, min( color.g, color.b ) );

// 	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;

// 	color -= offset;

// 	float peak = max( color.r, max( color.g, color.b ) );

// 	if ( peak < StartCompression ) return color;

// 	float d = 1. - StartCompression;

// 	float newPeak = 1. - d * d / ( peak + d - StartCompression );

// 	color *= newPeak / peak;

// 	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );

// 	return mix( color, vec3( newPeak ), g );

// }

// vec3 CustomToneMapping( vec3 color ) { return color; }

// see https://github.com/dmnsgn/glsl-tone-map

// Unreal 3, Documentation: "Color Grading"
// Adapted to be close to Tonemap_ACES, with similar range
// Gamma 2.2 correction is baked in, don't use with sRGB conversion!
vec3 unreal(vec3 x) {
  return x / (x + 0.155) * 1.019;
}

float unreal(float x) {
  return x / (x + 0.155) * 1.019;
}

// Uchimura 2017, "HDR theory and practice"
// Math: https://www.desmos.com/calculator/gslcdxvipg
// Source: https://www.slideshare.net/nikuque/hdr-theory-and-practicce-jp
vec3 uchimura(vec3 x, float P, float a, float m, float l, float c, float b) {
  float l0 = ((P - m) * l) / a;
  float L0 = m - m / a;
  float L1 = m + (1.0 - m) / a;
  float S0 = m + l0;
  float S1 = m + a * l0;
  float C2 = (a * P) / (P - S1);
  float CP = -C2 / P;

  vec3 w0 = vec3(1.0 - smoothstep(0.0, m, x));
  vec3 w2 = vec3(step(m + l0, x));
  vec3 w1 = vec3(1.0 - w0 - w2);

  vec3 T = vec3(m * pow(x / m, vec3(c)) + b);
  vec3 S = vec3(P - (P - S1) * exp(CP * (x - S0)));
  vec3 L = vec3(m + a * (x - m));

  return T * w0 + L * w1 + S * w2;
}

vec3 uchimura(vec3 x) {
  const float P = 1.0;  // max display brightness
  const float a = 1.0;  // contrast
  const float m = 0.22; // linear section start
  const float l = 0.4;  // linear section length
  const float c = 1.33; // black
  const float b = 0.0;  // pedestal

  return uchimura(x, P, a, m, l, c, b);
}


vec3 uncharted2Tonemap(vec3 x) {
  float A = 0.15;
  float B = 0.50;
  float C = 0.10;
  float D = 0.20;
  float E = 0.02;
  float F = 0.30;
  float W = 11.2;
  return ((x * (A * x + C * B) + D * E) / (x * (A * x + B) + D * F)) - E / F;
}

vec3 uncharted2(vec3 color) {
  const float W = 11.2;
  float exposureBias = 2.0;
  vec3 curr = uncharted2Tonemap(exposureBias * color);
  vec3 whiteScale = 1.0 / uncharted2Tonemap(vec3(W));
  return curr * whiteScale;
}

float uncharted2Tonemap(float x) {
  float A = 0.15;
  float B = 0.50;
  float C = 0.10;
  float D = 0.20;
  float E = 0.02;
  float F = 0.30;
  float W = 11.2;
  return ((x * (A * x + C * B) + D * E) / (x * (A * x + B) + D * F)) - E / F;
}

float uncharted2(float color) {
  const float W = 11.2;
  const float exposureBias = 2.0;
  float curr = uncharted2Tonemap(exposureBias * color);
  float whiteScale = 1.0 / uncharted2Tonemap(W);
  return curr * whiteScale;
}

// Lottes 2016, "Advanced Techniques and Optimization of HDR Color Pipelines"
vec3 lottes(vec3 x) {
  const vec3 a = vec3(1.6);
  const vec3 d = vec3(0.977);
  const vec3 hdrMax = vec3(8.0);
  const vec3 midIn = vec3(0.18);
  const vec3 midOut = vec3(0.267);

  const vec3 b =
      (-pow(midIn, a) + pow(hdrMax, a) * midOut) /
      ((pow(hdrMax, a * d) - pow(midIn, a * d)) * midOut);
  const vec3 c =
      (pow(hdrMax, a * d) * pow(midIn, a) - pow(hdrMax, a) * pow(midIn, a * d) * midOut) /
      ((pow(hdrMax, a * d) - pow(midIn, a * d)) * midOut);

  return pow(x, a) / (pow(x, a * d) * b + c);
}

float lottes(float x) {
  const float a = 1.6;
  const float d = 0.977;
  const float hdrMax = 8.0;
  const float midIn = 0.18;
  const float midOut = 0.267;

  const float b =
      (-pow(midIn, a) + pow(hdrMax, a) * midOut) /
      ((pow(hdrMax, a * d) - pow(midIn, a * d)) * midOut);
  const float c =
      (pow(hdrMax, a * d) * pow(midIn, a) - pow(hdrMax, a) * pow(midIn, a * d) * midOut) /
      ((pow(hdrMax, a * d) - pow(midIn, a * d)) * midOut);

  return pow(x, a) / (pow(x, a * d) * b + c);
}