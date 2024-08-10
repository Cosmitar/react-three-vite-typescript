import { getHashValue, getUrlToJoin } from '../utils/helpers'
import { DebugService } from './DebugService'
import { SERVICE_READY } from './events'
import { Service } from './types'

export class StandAloneService extends DebugService implements Service {
  name = 'standalone'
  isAvailable = false

  constructor() {
    super()
    this.isAvailable = true
    SERVICE_READY.emit()
  }

  public async getInviteLink(params: Record<string, any>): Promise<string> {
    return getUrlToJoin(params.roomCode)
  }
  public getInviteParam(paramName: string) {
    return getHashValue(paramName)
  }
  public clear() {
    window.localStorage.clear()
  }
  public getItem(key: string) {
    return window.localStorage.getItem(key)
  }
  public removeItem(key: string) {
    window.localStorage.removeItem(key)
  }
  public setItem(key: string, value: string) {
    window.localStorage.setItem(key, value)
  }
}
