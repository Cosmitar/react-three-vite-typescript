import { vertexShaderMain as windVertexMain } from './Wind'
import { DEFAULT_FLAGS } from "./FlagsHelpers"

const FLAGS_COUNT = Object.keys(DEFAULT_FLAGS).length

export const vertexShaderDef = `
  #ifdef USE_FLAGS
    attribute float iFlags;
  #else
    float iFlags = 0.0;
  #endif

  varying float flagLightSensitive;
  varying float flagGradientSensitive;
  varying float flagGrayscaleSensitive;

  void intToBits(int n, out int bits[${FLAGS_COUNT}]) {
    for (int i = ${FLAGS_COUNT - 1}; i >= 0; i--) {
      // the "n & (1 << i)" expression returns a decimal int based on the binary position of the bit:
      // 10 returns 2, 100 returns 4, then if we divide it by the same number we get values in the range [0, 1]
      bits[i] = ((n & (1 << i)) / (i + 1));
      // original with boolean return => bits[i] = (n & (1 << i)) != 0;
    }
  }
`

export const vertexShaderMain = `
// Decode variables from flags
int bits[${FLAGS_COUNT}];
intToBits(int(iFlags), bits);

int flagGrayscale = bits[0];
int flagGradient  = bits[1];
int flagWind      = bits[2];

// flags for fragment shader
flagGrayscaleSensitive = float(flagGrayscale);
flagGradientSensitive = float(flagGradient);

bool isWindSensitive = flagWind == 1;
${windVertexMain}
`

export const fragmentShaderDef = `
  varying float flagLightSensitive;
  varying float flagGradientSensitive;
  varying float flagGrayscaleSensitive;
`

export const fragmentShaderMain = `
  bool useGrayscale = isEqualFloat(flagGrayscaleSensitive, 1.0);
  bool useGradient = isEqualFloat(flagGradientSensitive, 1.0);
  bool useLightSource = isEqualFloat(flagLightSensitive, 1.0);
`
