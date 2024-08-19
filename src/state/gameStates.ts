import { Event } from 'eventery'
import { createStateMachine } from 'state-composer'

/* Define a type of possible states */
export const GAME_STATES = {
  // PROD
  HOME: 'home',
  // DEV
  DEV_SCREEN_1: 'dev_screen_1',
  DEV_SCREEN_2: 'dev_screen_2',
}

export const POPUP_STATES = {
  NIL: 'nil',
  TUTORIAL: 'tutorial',
}

export type GAME_STATE_TYPE = (typeof GAME_STATES)[keyof typeof GAME_STATES]
export type POPUP_STATE_TYPE = (typeof POPUP_STATES)[keyof typeof POPUP_STATES]

/* Create and export the State Machine */
export const GameState = createStateMachine<GAME_STATE_TYPE>(GAME_STATES.HOME)
export const PopupState = createStateMachine<POPUP_STATE_TYPE>(POPUP_STATES.NIL)

/* create and export an event for state transition */
export const ON_ROUTE_CHANGE = new Event<[nextRoute: GAME_STATE_TYPE]>()

const enterTo = (nextState: GAME_STATE_TYPE) => () => {
  ON_ROUTE_CHANGE.emit(nextState)

  GameState.enter(nextState)
}

const enterPopupTo = (nextState: POPUP_STATE_TYPE) => () => {
  PopupState.enter(nextState)
}

// PROD
export const enterHome = enterTo(GAME_STATES.HOME)

// POP-UPS
export const popupClose = enterPopupTo(POPUP_STATES.NIL)
export const popupTutorial = enterPopupTo(POPUP_STATES.TUTORIAL)

// DEV
export const enterDevScreen1 = enterTo(GAME_STATES.DEV_SCREEN_1)
export const enterDevScreen2 = enterTo(GAME_STATES.DEV_SCREEN_2)
