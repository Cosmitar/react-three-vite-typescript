import { useEffect, useState } from 'react'
import Platform from '../Platform'

export default function Banner({ id, width, height }: { id: string; width?: number; height?: number }) {
  const [serviceReady, setServiceReady] = useState(false)
  const awaitForService = async () => {
    await Platform.awaitAvailable()
    setServiceReady(true)
  }

  useEffect(() => {
    awaitForService()
  }, [])

  useEffect(() => {
    serviceReady && Platform.ads.displayBanner(id, width, height)
    return () => {
      serviceReady && Platform.ads.clearBanner(id)
    }
  }, [serviceReady])

  return Platform.isAvailable() ? (
    <div id={id} style={{ width: width ?? '100%', height: height ?? '100%' }} />
  ) : import.meta.env.DEV ? (
    <div id={id} style={{ width: width ?? '100%', height: height ?? '100%', background: `url("https://placehold.co/${width}x${height}")` }} />
  ) : (
    <></>
  )
}
