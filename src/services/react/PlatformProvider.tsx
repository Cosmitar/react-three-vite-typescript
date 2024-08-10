import { ReactNode, useEffect, useState } from 'react'
import Platform from '../Platform'

export default function PlatformProvider({ children }: { children: ReactNode }) {
  const [platformReady, setPlatformReady] = useState(false)

  const awaitforPlatform = async () => {
    await Platform.awaitAvailable()
    
    Platform.game.loadingStart()
    
    setPlatformReady(true)
  }

  useEffect(() => {
    awaitforPlatform()
  }, [])

  return platformReady ? <>{children}</> : <></>
}
