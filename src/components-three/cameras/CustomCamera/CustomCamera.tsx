import { CameraControls, CameraControlsProps } from '@react-three/drei'
import { MutableRefObject, forwardRef, useEffect, useRef } from 'react'
import { useEntities } from 'miniplex-react'
import * as THREE from 'three'
import { CameraEntity, PlayerEntity } from '../../../state/types'
import { ECS } from '../../../state/ECS'
import { MyPlayerQuery } from '../../../state/queries'

// Behavior of a fixed 3rd person camera that follows the object with an offset.
export default forwardRef<CameraControlsProps, {}>(function CustomCamera(props, outterRef) {
  const cam = ECS.useCurrentEntity() as CameraEntity
  const cameraCoords = useRef(new THREE.Vector3(0, 10, 0)).current

  const refCam = useRef<CameraControlsProps>() as MutableRefObject<CameraControlsProps>

  const me = useEntities(MyPlayerQuery).first as PlayerEntity

  // follows the local player
  useEffect(() => {
    // required
    if (!refCam.current) return

    // reset
    refCam.current.mouseButtons!.left = 0
    refCam.current.mouseButtons!.right = 0
    refCam.current.mouseButtons!.wheel = 0
    refCam.current.mouseButtons!.middle = 0
    refCam.current.touches!.one = 0
    refCam.current.touches!.two = 0
    refCam.current.touches!.three = 0

    if (refCam.current && cam && !cam.CameraControlsAPI) {
      ECS.world.update(cam, 'CameraControlsAPI', refCam.current)
    }
  }, [me, cam])

  // @ts-ignore
  return <CameraControls ref={refCam} makeDefault position={cameraCoords} fov={60} />
})
