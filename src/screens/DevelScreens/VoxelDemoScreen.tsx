import { Box, CameraControls, InstanceProps } from '@react-three/drei'
import Color from '../../voxel/Materials/Color'
import VoxelProvider, { setAttribute } from '../../voxel/VoxelProvider/VoxelProvider'
import { Group, Mesh, NearestFilter, RepeatWrapping, TextureLoader, Vector3, Vector3Tuple, Vector4 } from 'three'
import { useEffect, useRef } from 'react'
import useCappedFrame from '../../utils/useCappedFrames'
import StoneLight from '../../voxel/Prefab/StoneLight'
import ReactiveInstance from '../../voxel/VoxelProvider/ReactiveInstance'
import { getDefaultEncodedSkin, getEncodedSkin } from '../../voxel/VoxelProvider/shaderMaterial/VoxelAtlasMaterial/VoxelAtlasMaterial'
const loader = new TextureLoader()
const texture = loader.load('images/texture_atlas_small_hd.png')
texture.wrapS = texture.wrapT = RepeatWrapping
texture.magFilter = texture.minFilter = NearestFilter

export default function VoxelDemoScreen() {
  const refVox = useRef<InstanceProps>()
  const vec4Helper = new Vector4(0, 0, 0, 0)
  let dir = 1
  let factor = (dir = 1 ? 1 : -1)
  useCappedFrame(() => {
    if (!refVox.current) return
    dir = Math.min(3, vec4Helper.x) === 3 ? -1 : Math.max(2.1, vec4Helper.x) === 2.1 ? 1 : dir
    factor = dir === 1 ? 1 : -1
    // console.log(Math.min(3, vec4Helper.x));

    // setAttribute('iSensitivity', vec4Helper.setX(Math.min(3, Math.max(2.1, vec4Helper.x + 0.01 * factor))), refVox.current.userData!.id)
  })
  useEffect(() => {
    if (!refVox.current) return
    console.log(refVox.current)
    refVox.current.updateAttribute()

    // vec4Helper.copy(refVox.current.userData!.iUniforms.iSensitivity.value)
    // vec4Helper.setX(2)
    // if (refVox.current) {
    //   setAttribute('iSensitivity', vec4Helper.setX(2.75), refVox.current.userData!.id)
    //   setTimeout(() => {
    //     setAttribute('iSensitivity', vec4Helper.setX(2.5), refVox.current!.userData!.id)
    //     setTimeout(() => {
    //       setAttribute('iSensitivity', vec4Helper.setX(2.25), refVox.current!.userData!.id)
    //     }, 1000)
    //   }, 1000)
    // }
  }, [])
  return (
    <>
      <Box position={[0, 0, -2]}>
        <meshStandardMaterial color={'white'} map={texture} />
      </Box>
      <VoxelProvider limit={3000}>
        {/* <Color />
        <group>
          <Color position={[0, 0, 1]} />
          <Color position={[0, 0, -1]} />
          <StoneLight ref={refVox} position={[2, -2, 0]}  />
          <Color position={[0, 0, 2]} />
        </group> */}
        {/* {Array(16) //15x12
          .fill(Array(13).fill(0))
          .map((row, rIdx) => {
            return row.map((_: unknown, cIdx: number) => {
              console.log(`block_${rIdx}-${cIdx}`);
              
              return (
                <Block
                  key={`block_${rIdx}-${cIdx}`}
                  position={[rIdx * 4, 0, cIdx * 4]}
                  userData={{
                    iUniforms: {
                      iSensitivity: { value: new Vector4(0, 1, 0, 0), defaultValue: new Vector4(0, 0, 0, 0) },
                      iSkinCode: {
                        value: getEncodedSkin({
                          topFace: { x: rIdx, y: cIdx },
                          frontFace: { x: rIdx, y: cIdx },
                          backFace: { x: rIdx, y: cIdx },
                          rightFace: { x: rIdx, y: cIdx },
                          leftFace: { x: rIdx, y: cIdx },
                          bottomFace: { x: rIdx, y: cIdx },
                        }),
                        defaultValue: getDefaultEncodedSkin(),
                      },
                    },
                  }}
                />
              )
            })
          })} */}
        <StoneLight position={[-2, 0, -2]} ref={refVox}/>
        {/* <StoneLight position={[1, 0, 0]} />
        <StoneLight position={[2, 0, 0]} />
        <StoneLight position={[0, 0, 1]} />
        <StoneLight position={[1, 0, 1]} />
        <StoneLight position={[2, 0, 1]} /> */}
      </VoxelProvider>
      <ambientLight intensity={2} />
      <directionalLight />
      <CameraControls />
      <gridHelper />
    </>
  )
}

const Block = ({ position, userData }: { position: Vector3Tuple; userData: any }) => {
  return (
    <group position={position}>
      <ReactiveInstance userData={userData} position={[0, 0, 0]} />
      <ReactiveInstance userData={userData} position={[1, 0, 0]} />
      <ReactiveInstance userData={userData} position={[2, 0, 0]} />
      <ReactiveInstance userData={userData} position={[0, 0, 1]} />
      <ReactiveInstance userData={userData} position={[0, 0, 2]} />
      <ReactiveInstance userData={userData} position={[2, 0, 1]} />
      <ReactiveInstance userData={userData} position={[2, 0, 2]} />
      <ReactiveInstance userData={userData} position={[1, 0, 2]} />
    </group>
  )
}
