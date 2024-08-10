import { useEffect } from 'react'

import DevRouterBar, { POSITIONS } from './DevRouterBar'
import { GAME_STATES, GameState, enterDevScreen1 } from '../../../state/gameStates'
import DemoScene from '../../DevelScreens/DemoScene'

export default function DevRouter() {
  useEffect(() => {
    enterDevScreen1()
  }, [])
  return (
    <>
      <GameState.Match state={[GAME_STATES.DEV_SCREEN_1]}>
        <DemoScene />
      </GameState.Match>

      <DevRouterBar
        position={POSITIONS.BOTTOM_RIGHT}
        buttons={[
          {
            label: 'Dev screen 1',
            onClick: enterDevScreen1,
            keyCode: 'Digit1',
          },
        ]}
      />
    </>
  )
}
