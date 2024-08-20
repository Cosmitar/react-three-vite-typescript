export type Flags = { wind?: boolean; gradient?: boolean; grayscale?: boolean; color?: boolean; tint?: boolean }

export const DEFAULT_FLAGS: Flags = {
  grayscale: false,
  wind: false,
  gradient: false,
  color: false,
  tint: false,
}

const FLAGS_COUNT = Object.keys(DEFAULT_FLAGS).length

export const getEncodedFlags = ({ grayscale, wind, gradient, color, tint }: Flags = DEFAULT_FLAGS) => {
  let vars = [grayscale, gradient, wind, color, tint].map(Number).reverse()

  let part = 0
  for (let j = 0; j < vars.length; j++) {
    part = (part << 1) | vars[j]
  }

  return part
}

// just a helper to check encoding in javascript
export function decodeFlagsToBitmask(encoded: number): boolean[] {
  const values: boolean[] = []
  let part = encoded

  for (let j = 0; j < FLAGS_COUNT; j++) {
    const value = part & ((1 << 1) - 1)
    console.log({ value })

    values.push(Boolean(value))
    part >>= 1
  }

  return values
}
