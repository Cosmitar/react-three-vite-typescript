import { Canvas } from '@react-three/fiber'
import RouterScreen from './screens/RouterScreen/RouterScreen'
import PlatformProvider from './services/react/PlatformProvider'
import OverlayTransitions from './components-web/OverlayTransitions/OverlayTransitions'
import UI from './components-web/UI/UI'

const App = () => {
  return (
    <PlatformProvider>
      <OverlayTransitions>
        <UI />
        <Canvas camera={{ fov: 70, position: [0, 5, 8] }} shadows>
          <RouterScreen />
        </Canvas>
      </OverlayTransitions>
    </PlatformProvider>
  )
}

export default App
