import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import DemoScene from './scenes/DemoScene/DemoScene'

const App = () => {
  return (
    <Canvas camera={{ fov: 70, position: [0, 0, 3] }}>
      <OrbitControls />
      <DemoScene />
    </Canvas>
  )
}

export default App
