import { Box } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh } from 'three'

const DemoScene = () => {
  const boxRef = useRef<Mesh>()

  useFrame((state, delta) => {
    boxRef.current!.rotation.y += 0.01
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

export default DemoScene
