import { Box, CameraControls } from '@react-three/drei'
import VoxelProvider from '../../voxel/VoxelProvider/VoxelProvider'
import { NearestFilter, RepeatWrapping, TextureLoader, Vector3Tuple, Vector4 } from 'three'
import { MutableRefObject, ReactNode, useEffect, useRef } from 'react'
import useCappedFrame from '../../utils/useCappedFrames'

import ReactiveInstance, { InstanceAPI } from '../../voxel/VoxelProvider/ReactiveInstance'
import TestCube from '../../voxel/Prefab/TestCube'
import Shape from '../../voxel/VoxelProvider/Attributes/Shape'
import { SHAPES } from '../../voxel/VoxelProvider/shaderMaterial/UniversalMaterial/shapes'
import Faces from '../../voxel/VoxelProvider/Attributes/Faces'
import Flags from '../../voxel/VoxelProvider/Attributes/Flags'
import GrassField from '../../voxel/Prefab/GrassField'
const loader = new TextureLoader()
const texture = loader.load('images/texture_atlas_small_hd_16x16.png')
texture.wrapS = texture.wrapT = RepeatWrapping
texture.magFilter = texture.minFilter = NearestFilter

export default function VoxelDemoScreen() {
  const refVox = useRef<InstanceAPI>() as MutableRefObject<InstanceAPI>
  // const vec4Helper = new Vector4(0, 0, 0, 0)
  let opacityHelper = 0
  let dir = 1
  let factor = (dir = 1 ? 1 : -1)
  useCappedFrame(() => {
    if (!refVox.current) return
    dir = Math.min(1, opacityHelper) === 1 ? -1 : Math.max(0, opacityHelper) === 0 ? 1 : dir
    // dir = Math.min(3, vec4Helper.x) === 3 ? -1 : Math.max(2.1, vec4Helper.x) === 2.1 ? 1 : dir
    factor = dir === 1 ? 1 : -1

    opacityHelper += 0.01 * factor
    refVox.current.updateAttribute('iOpacity', opacityHelper)
  })

  useEffect(() => {
    if (!refVox.current) return
  }, [])

  return (
    <>
      <Box position={[0, 0, -2]}>
        <meshStandardMaterial color={'white'} map={texture} />
      </Box>
      <VoxelProvider limit={9000}>
        {Array(16) //15x12
          .fill(Array(13).fill(0))
          .map((row, rIdx) => {
            return row.map((_: unknown, cIdx: number) => {
              return (
                <Block
                  key={`block_${rIdx}-${cIdx}`}
                  position={[rIdx * 4, 0, cIdx * 4]}
                >
                  <Faces all={[rIdx, cIdx]} />
                </Block>
              )
            })
          })}

        <GrassField position={[5,0,5]}/>
        <TestCube
          position={[-2, 0, -2]}
        >
          <Shape value={SHAPES.PYRAMID} />
          {/* <Shape value={SHAPES.CUBE} /> */}
          <Faces
            all={[5, 11]}

            front={[1, 0]}
            back={[1, 0]}
            // config={[
            //   [0, 0], // top
            //   [1, 0], // bottom
            //   [2, 0], // right
            //   [3, 0], // left
            //   [4, 0], // front
            //   [5, 0], // back
            // ]}
          />
        </TestCube>
      </VoxelProvider>
      <ambientLight intensity={2} />
      <directionalLight />
      <CameraControls />
      <gridHelper />
      <axesHelper />
    </>
  )
}

const Block = ({ position, children }: { position: Vector3Tuple; children: ReactNode }) => {
  return (
    <group position={position}>
      <ReactiveInstance children={children} position={[0, 0, 0]} />
      <ReactiveInstance children={children} position={[1, 0, 0]} />
      <ReactiveInstance children={children} position={[2, 0, 0]} />
      <ReactiveInstance children={children} position={[0, 0, 1]} />
      <ReactiveInstance children={children} position={[0, 0, 2]} />
      <ReactiveInstance children={children} position={[2, 0, 1]} />
      <ReactiveInstance children={children} position={[2, 0, 2]} />
      <ReactiveInstance children={children} position={[1, 0, 2]} />
    </group>
  )
}
