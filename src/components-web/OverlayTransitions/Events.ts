import { Event } from 'eventery'

export type TRANSITIONS = 'circle'
export type TRANSITIONS_CONFIG = {
  color?: string
  exitDelayMS?: number
  manualExit?: boolean
}

export const ENTER_TRANSITION = new Event<[onFinish?: () => void]>()
export const EXIT_TRANSITION = new Event<[onFinish?: () => void]>()
export const CONFIG_TRANSITION = new Event<[transitionName: TRANSITIONS_CONFIG]>()
