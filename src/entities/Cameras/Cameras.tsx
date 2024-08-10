import { ECS } from '../../state/ECS'
import { CameraEntity } from '../../state/types'
import { RenderableCamerasQuery } from '../../state/queries'
import CustomCamera from '../../components-three/cameras/CustomCamera/CustomCamera'

export default function Cameras() {
  return <ECS.Entities in={RenderableCamerasQuery} children={renderCamera} />
}

const renderCamera = (entity: CameraEntity) => <ECS.Component name='CameraControlsAPI'>{entity.render}</ECS.Component>

export const createCamera = ({ isActive, isFollowing }: CameraEntity) =>
  ECS.world.add({
    isCamera: true,
    isActive,
    isFollowing,
    render: <CustomCamera />,
  })
