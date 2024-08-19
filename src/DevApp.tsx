import { Canvas } from '@react-three/fiber'
import RouterScreen from './screens/RouterScreen/RouterScreen'
import { StrictMode } from 'react'
import PlatformProvider from './services/react/PlatformProvider'
import OverlayTransitions from './components-web/OverlayTransitions/OverlayTransitions'
import UI from './components-web/UI/UI'
import DevRouter from './screens/RouterScreen/DevRouter/DevRouter'

const App = () => {
  return (
    <StrictMode>
      <PlatformProvider>
        <OverlayTransitions>
          <UI />
          <Canvas shadows camera={{ fov: 20, position: [0, 20, 20] }} dpr={1.5}>
            <RouterScreen />
            <DevRouter />
          </Canvas>
        </OverlayTransitions>
      </PlatformProvider>
    </StrictMode>
  )
}

export default App
