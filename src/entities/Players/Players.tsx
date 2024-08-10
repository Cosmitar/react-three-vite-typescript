import Player from '../../components-three/Player/Player'
import { ECS } from '../../state/ECS'
import { RenderablePlayersQuery } from '../../state/queries'
import renderEntity from '../../utils/renderEntity'

export default function Players() {
  return <ECS.Entities in={RenderablePlayersQuery} children={renderEntity} />
}

export const createPlayer = ({ id }: { id: string }) => {
  const player = ECS.world.add({
    id,
    isPlayer: true,
    render: <Player />,
  })

  return player
}
