import { Canvas, useFrame } from '@react-three/fiber'
import { Box, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import { Mesh } from 'three'

const Scene = () => {
  const boxRef = useRef<Mesh>()
  useFrame((state, delta) => {
    boxRef.current!.rotation.y += 0.02
  })

  return (
    <>
      <Box ref={boxRef} args={[1, 1, 1]} rotation={[0.5, 0, 0]}>
        <meshNormalMaterial />
      </Box>
      <ambientLight />
    </>
  )
}

const App = () => {
  return (
    <Canvas camera={{ fov: 70, position: [0, 0, 3] }}>
      <OrbitControls />
      <Scene />
    </Canvas>
  )
}

export default App
