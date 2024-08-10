import { ReactNode } from 'react'
import { Object3D } from 'three'
import { CameraControlsProps } from '@react-three/drei'
import { typescriptXR } from '../utils/typescriptXR'

export type RenderableEntity = {
  three?: Object3D
  render?: ReactNode
}

export type PlayerEntity = RenderableEntity & {
  isPlayer?: boolean
  id?: string
  color?: string
}

export type CameraEntity = typescriptXR<
  RenderableEntity & {
    isCamera?: boolean
    isActive?: boolean
    isFollowing?: boolean
    CameraControlsAPI?: CameraControlsProps
  }
>

export type Entity = PlayerEntity & CameraEntity
