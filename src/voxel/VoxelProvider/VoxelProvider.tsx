import { Instances } from '@react-three/drei'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { InstancedMesh, MeshStandardMaterial, NearestFilter, RepeatWrapping, ShaderMaterial, TextureLoader, Vector2 } from 'three'
import { injectAttribute } from '../utils'
import { useFrame } from '@react-three/fiber'
import { Event } from 'eventery'
import { MeshUniversalMaterial } from './shaderMaterial/UniversalMaterial/UniversalMaterial'

const loader = new TextureLoader()
// const texture = loader.load('images/texture_atlas_small_hd.png')
const texture = loader.load('images/texture_atlas_small_hd_16x16.png')
texture.wrapS = texture.wrapT = RepeatWrapping
texture.magFilter = texture.minFilter = NearestFilter

// handlers to manually trigger the parser (userData to attributes)
const FORCE_REFRESH = new Event()
export const forceRefresh = () => FORCE_REFRESH.emit()
// -------
const UPDATE_UNIFORM = new Event<[key: string, value: any]>()
export const setUniform = (key: string, value: any) => UPDATE_UNIFORM.emit(key, value)
// -------
const UPDATE_ATTRIBUTE = new Event<[key: string, value: any, index: number]>()
export const setAttribute = (key: string, value: any, index: number) => UPDATE_ATTRIBUTE.emit(key, value, index)

export default function VoxelProvider({ children, limit = 100 }: { children?: ReactNode; limit?: number }) {
  const instancesRef = useRef<InstancedMesh>()
  const providerUniforms = useRef<Record<string, { value: any }>>({
    uMapSize: { value: new Vector2(16, 13) },
    // uMapSize: { value: new Vector2(8, 6) },
    uTime: { value: 0 },
  })
  const [refresh, setRefresh] = useState(0)
  // const tId = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (instancesRef.current) {
      parseInstanceAttributes(instancesRef.current!, limit)
    }
  }, [limit, refresh])

  useEffect(() => FORCE_REFRESH.subscribe(() => setRefresh(Math.random())), [])
  useEffect(() => UPDATE_UNIFORM.subscribe(updateUniform), [])
  useEffect(() => UPDATE_ATTRIBUTE.subscribe(updateAttribute), [])

  useFrame(({ clock }) => {
    if (instancesRef.current) {
      ;(instancesRef.current.material as ShaderMaterial).uniforms.uTime.value = clock.elapsedTime
    }
  })
  const updateUniform = (key: string, value: any) => {
    if (instancesRef.current && providerUniforms.current) {
      providerUniforms.current[key] = { value }
      ;(instancesRef.current.material as ShaderMaterial).uniforms[key].value = providerUniforms.current[key].value
    } else {
      console.warn('failed to update uniform:', key, value)
    }
  }
  const updateAttribute = (key: string, value: any, index: number) => {
    injectAttribute(key, value, null, limit, index, instancesRef.current!.geometry)
  }
  return (
    <>
      {/* @ts-ignore ref current values are incompatibles */}
      <Instances limit={limit} ref={instancesRef} receiveShadow castShadow frustumCulled={false}>
        <boxGeometry />

        <MeshUniversalMaterial
          baseMaterial={MeshStandardMaterial}
          map={texture}
          transparent
          flatShading
          alphaTest={0.1}
          color={[10, 1, 1]}
          defines={{
            NEUTRAL_TONE_MAPPING: true,
          }}
          // Memoize uniforms, otherwise if uniforms are set after render (via updateUniform) and then
          // the provider refreshes, the uniform changes are lost
          uniforms={providerUniforms.current}
        />
        {children}
      </Instances>
    </>
  )
}

const parseInstanceAttributes = (instance: InstancedMesh, limit: number) => {
  instance.geometry.computeVertexNormals()

  // here we inject instance buffer attributes with pseudo uniforms from userData
  // @see https://github.com/protectwise/troika/blob/main/packages/three-instanced-uniforms-mesh/src/InstancedUniformsMesh.js
  const instancedMeshes: InstancedMesh[] = []
  instance.traverse((o: any) => {
    if (o.instance) {
      instancedMeshes.push(o)
    }
  })

  instancedMeshes.forEach((inst: InstancedMesh, index) => {
    // sets the instance id for future attributes update
    inst.userData['id'] = index

    // if an instance has userData with uniforms value, extracts values and injects them as buffer attributes.
    if (inst.userData?.iUniforms) {
      Object.keys(inst.userData?.iUniforms).forEach(uName => {
        injectAttribute(
          uName,
          inst.userData.iUniforms[uName].value,
          inst.userData.iUniforms[uName].defaultValue,
          limit,
          index,
          inst.geometry
        )
      })
    }
  })
}
