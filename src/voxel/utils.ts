import {
  BufferAttribute,
  BufferGeometry,
  Color,
  DynamicDrawUsage,
  InstancedBufferAttribute,
  Matrix,
  Matrix3,
  Matrix4,
  Quaternion,
  Vector2,
  Vector3,
  Vector4,
} from 'three'

export const injectAttribute = (
  name: string,
  value: null | Vector2 | Vector3 | Vector4 | Color | Quaternion | Matrix3 | Matrix4,
  defaultValue: null | Vector2 | Vector3 | Vector4 | Color | Quaternion | Matrix3 | Matrix4,
  count: number,
  index: number,
  geometry: BufferGeometry
) => {
  const itemSize = getItemSizeForValue(value)

  const attrName = `${name}`
  const attrs = geometry.attributes
  let attr = attrs[attrName] as BufferAttribute
  
  // disabling this untils I confirm its need.
  if (!attr || index === 0) {
    // attribute initialization
    attr = attrs[attrName] = new InstancedBufferAttribute(new Float32Array(itemSize * count), itemSize)
    // Fill with default value:
    if (defaultValue !== null) {
      for (let i = 0; i < count; i++) {
        setAttributeValue(attr, i, defaultValue)
      }
    }
  }
  
  attr.name = name
  
  setAttributeValue(attr, index, value!)
  attr.usage = DynamicDrawUsage
  attr.needsUpdate = true  
}

function getItemSizeForValue(value?: null | Vector2 | Vector3 | Vector4 | Color | Quaternion | Matrix3 | Matrix4) {
  return value == null
    ? 1
    : typeof value === 'number'
    ? 1
    : (value as Vector2).isVector2
    ? 2
    : (value as Vector3).isVector3 || (value as Color).isColor
    ? 3
    : (value as Vector4).isVector4 || (value as Quaternion).isQuaternion
    ? 4
    : (value as Matrix4).elements
    ? (value as Matrix4).elements.length
    : Array.isArray(value)
    ? value.length
    : 1
}
function setAttributeValue(
  attr: BufferAttribute,
  index: number,
  value: Vector2 | Vector3 | Vector4 | Color | Quaternion | Matrix3 | Matrix4
) {
  const size = attr.itemSize
  
  if (size === 1) {
    attr.setX(index, value as unknown as number)
  } else if (size === 2 && value !== null) {
    attr.setXY(index, (value as Vector2).x, (value as Vector2).y)
  } else if (size === 3 && value !== null) {
    if ((value as Color).isColor) {
      attr.setXYZ(index, (value as Color).r, (value as Color).g, (value as Color).b)
    } else {
      attr.setXYZ(index, (value as Vector3).x, (value as Vector3).y, (value as Vector3).z)
    }
  } else if (size === 4 && value !== null) {
      attr.setXYZW(index, (value as Vector4).x, (value as Vector4).y, (value as Vector4).z, (value as Vector4).w)
  } else if (value.toArray) {
    value.toArray(attr.array, index * size)
  } else {
    attr.set((value as unknown as Matrix).elements as ArrayLike<number>, index * size)
  }
}


// Type guard functions to check for specific Three.js types
function isVector4(obj: any): obj is THREE.Vector4 {
    return obj instanceof Vector4;
}

function isVector3(obj: any): obj is THREE.Vector3 {
    return obj instanceof Vector3;
}

function isVector2(obj: any): obj is Vector2 {
    return obj instanceof Vector2;
}

function isQuaternion(obj: any): obj is Quaternion {
    return obj instanceof Quaternion;
}

function isColor(obj: any): obj is Color {
    return obj instanceof Color;
}

// Deep clone function
export function deepClone<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') return obj;

    // Handles three js objects specifically
    if (isVector4(obj)) {
        return new Vector4(obj.x, obj.y, obj.z, obj.w) as T;
    }
    if (isVector3(obj)) {
        return new Vector3(obj.x, obj.y, obj.z) as T;
    }
    if (isVector2(obj)) {
        return new Vector2(obj.x, obj.y) as T;
    }
    if (isQuaternion(obj)) {
        return new Quaternion(obj.x, obj.y, obj.z, obj.w) as T;
    }
    if (isColor(obj)) {
        return new Color(obj.r, obj.g, obj.b) as T;
    }

    // Handle Arrays
    if (Array.isArray(obj)) {
        return (obj as any[]).map(item => deepClone(item)) as T;
    }

    // Handle Objects
    if (obj instanceof Object) {
        const clone = {} as T;
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                (clone as any)[key] = deepClone((obj as any)[key]);
            }
        }
        return clone;
    }

    throw new Error("Unable to clone object! Its type isn't supported.");
}