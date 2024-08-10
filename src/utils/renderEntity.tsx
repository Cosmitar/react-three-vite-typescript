import { ECS } from '../state/ECS'
import { RenderableEntity } from '../state/types'

export default function renderEntity(entity: RenderableEntity) {
  return <ECS.Component name='three'>{entity.render}</ECS.Component>
}
