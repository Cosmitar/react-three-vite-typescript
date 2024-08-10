import { getUrlToJoin } from '../utils/helpers'
import { SERVICE_READY } from './events'
import { Service } from './types'

export class CentariusService implements Service {
  name = 'Centarius'
  isAvailable = false

  constructor() {
    this.isAvailable = true
    SERVICE_READY.emit()
  }

  public async getInviteLink(params: Record<string, any>): Promise<string> {
    return getUrlToJoin(params.roomCode)
  }
}
