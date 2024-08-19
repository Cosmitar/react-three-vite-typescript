/**
 * By now, this drei-inspired component injects userData into the parent. Letting the voxel provider works as it was.
 * In the future, I can change the voxel provider logic and use thos class to insert buffer attributes into geometry.
 */
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { DynamicDrawUsage } from 'three'

export type InstancedAttributeProps = JSX.IntrinsicElements['instancedBufferAttribute'] & {
  name: string
  value: any
  defaultValue: any
  define: string
}
export const InstancedAttribute = forwardRef(({ name, value, defaultValue, define }: InstancedAttributeProps, fref) => {
  const ref = useRef<THREE.InstancedBufferAttribute>(null!)
  useImperativeHandle(fref, () => ref.current, [])
  useEffect(() => {
    //@ts-ignore
    console.log(ref.current.__r3f.parent.instance.current.geometry.attributes)

    const parentUserData = (ref.current as any).__r3f.parent.userData ?? { iUniforms: {} }
    const shaderMaterial = (ref.current as any).__r3f.parent.instance.current.material
    shaderMaterial.defines[define] = ''
    !parentUserData['iUniforms'] && (parentUserData['iUniforms'] = {})
    parentUserData.iUniforms[name] = { value, defaultValue }
    // parentUserData.iUniforms[name] = { value: { ...parentUserData.iUniforms[name]?.value ?? 0, ...value }, defaultValue }
    console.log(parentUserData.iUniforms[name]);
    

    // parent.geometry.attributes[name] = ref.current

    // const value = Array.isArray(defaultValue) ? defaultValue : [defaultValue]
    // const array = Array.from({ length: parent.userData.limit }, () => value).flat()
    // ref.current.array = new Float32Array(array)
    // ref.current.itemSize = value.length
    // ref.current.count = array.length / ref.current.itemSize

    return () => {
      delete parentUserData.iUniforms[name]
    }
  }, [name])
  // let iterations = 0
  // useFrame(() => {
  //   const parent = (ref.current as any).__r3f.parent
  //   if (parent.userData.frames === Infinity || iterations < parent.userData.frames) {
  //     for (let i = 0; i < parent.userData.instances.length; i++) {
  //       const instance = parent.userData.instances[i].current
  //       const value = instance[name]
  //       if (value !== undefined) {
  //         ref.current.set(
  //           Array.isArray(value) ? value : typeof value.toArray === 'function' ? value.toArray() : [value],
  //           i * ref.current.itemSize
  //         )
  //         ref.current.needsUpdate = true
  //       }
  //     }
  //     iterations++
  //   }
  // })
  return <instancedBufferAttribute ref={ref} usage={DynamicDrawUsage} />
  // return <></>
})
