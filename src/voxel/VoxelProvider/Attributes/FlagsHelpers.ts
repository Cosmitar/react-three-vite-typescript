export const DEFAULT_FLAGS = {
  grayscale: false,
  wind: false,
  gradient: false,
}

const FLAGS_COUNT = Object.keys(DEFAULT_FLAGS).length

export const getEncodedFlags = ({ grayscale, wind, gradient }: typeof DEFAULT_FLAGS = DEFAULT_FLAGS) => {
  
  let vars = [grayscale, gradient, wind].map(Number).reverse()
  
  let part = 0
  for (let j = 0; j < vars.length; j++) {
    part = (part << 1) | vars[j]
  }
  
  console.log({ grayscale, wind }, part);
  return part
}

// just a helper to check encoding in javascript
export function decodeFlagsToBitmask(encoded: number): boolean[] {
  const values: boolean[] = []
  let part = encoded

  for (let j = 0; j < FLAGS_COUNT; j++) {
    const value = part & ((1 << 1) - 1)
    console.log({value});
    
    values.push(Boolean(value))
    part >>= 1
  }

  return values
}
