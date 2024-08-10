import { Service } from './types'
import { SERVICE_READY } from './events'

export class DebugService implements Service {
  name = 'debug'
  isAvailable = false
  enableLog = true

  constructor() {
    this.isAvailable = true
    SERVICE_READY.emit()
  }

  log(...args: any) {
    this.enableLog && console.log(...args)
  }

  banner(placeholderId: string, width?: number, height?: number) {
    this.log('banner', { placeholderId, width, height })
    return Promise.resolve()
  }
  clearBanner(placeholderId?: string) {
    this.log('clearBanner', { placeholderId })
  }
  commercialBreak() {
    this.log('commercialBreak')
    return Promise.resolve(true)
  }
  canReward() {
    this.log('canReward')
    return true
  }
  rewardedBreak(sideEffect?: () => void) {
    this.log('rewardedBreak', { sideEffect })
    sideEffect && sideEffect()
    return Promise.resolve(true)
  }
  cellebrate() {
    this.log('cellebrate')
  }
  gameplayStart() {
    this.log('gameplayStart')
  }
  gameplayStop() {
    this.log('gameplayStop')
  }
  loadingStart() {
    this.log('loadingStart')
  }
  loadingStop() {
    this.log('loadingStop')
  }
  async getInviteLink(params: Record<string, any>): Promise<string> {
    this.log('getInviteLink', { params })
    return ''
  }
  triggerInviteActions(params: Record<string, any>) {
    this.log('triggerInviteActions', { params })
  }
  triggerCloseInviteActions() {
    this.log('triggerCloseInviteActions')
  }
  getInviteParam(paramName: string) {
    this.log('getInviteParam', { paramName })
  }
  // data
  clearData() {
    this.log('clearData')
  }
  getItem(key: string): string | null {
    this.log('getItem', { key })
    return ''
  }
  removeItem(key: string) {
    this.log('removeItem', { key })
  }
  setItem(key: string, value: string) {
    this.log('removeItem', { key, value })
  }
  // ----
}
