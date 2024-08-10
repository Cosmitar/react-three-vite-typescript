// exposes nested types in hints
export type typescriptXR<T> = { [K in keyof T]: T[K] } & {}
