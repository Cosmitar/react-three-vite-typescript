import { GAME_STATES, GameState } from '../../state/gameStates'
import HomeScreen from '../HomeScreen/HomeScreen'

export default function RouterScreen() {
  return (
    <>
      <GameState.Match state={[GAME_STATES.HOME]}>
        <HomeScreen />
      </GameState.Match>
    </>
  )
}
