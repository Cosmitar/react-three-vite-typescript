import { ECS } from './ECS'

// PLAYERS
export const RenderablePlayersQuery = ECS.world.with('isPlayer', 'render')
export const RenderedPlayersQuery = RenderablePlayersQuery.with('three')
export const MyPlayerQuery = RenderedPlayersQuery.with('id')

// CAMERAS
export const RenderableCamerasQuery = ECS.world.with('isCamera', 'render')
export const ActiveCameraQuery = ECS.world.with('isCamera', 'isActive')
export const RenderedCameraQuery = ECS.world.with('isCamera', 'render', 'isActive', 'CameraControlsAPI')
