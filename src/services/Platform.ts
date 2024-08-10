import { CentariusService } from './CentariusService'
import { CrazyGamesService } from './CrazyGamesService'
import { PokiService } from './PokiService'
import { StandAloneService } from './StandAloneService'
import { SERVICE_READY } from './events'
import { Service } from './types'

export class PlatformServices {
  private service: Service
  public ads: ADSService
  public tracking: TrackingService
  public game: GameService
  public users: UsersService
  public data: DataService

  constructor(serviceName: string) {
    switch (serviceName) {
      case 'CrazyGames':
        this.service = new CrazyGamesService()
        break
      case 'Centarius':
        this.service = new CentariusService()
        break
      case 'Poki':
        this.service = new PokiService()
        break
      default:
        this.service = new StandAloneService()
    }

    if (this.service) {
      this.ads = new ADSService(this.service)
      this.tracking = new TrackingService(this.service)
      this.game = new GameService(this.service)
      this.users = new UsersService(this.service)
      this.data = new DataService(this.service)
    }
  }

  awaitAvailable() {
    return new Promise((res, rej) => {
      if (this.isAvailable()) {
        res(true)
      } else {
        const unsub = SERVICE_READY.subscribe(() => {
          res(true)
          unsub()
        })
      }
    })
  }
  isAvailable() {
    return this.service && this.service.isAvailable
  }
}

class ServiceModule {
  service: Service
  constructor(service: Service) {
    this.service = service
  }
}

class ADSService extends ServiceModule {
  displayBanner(placeholderId: string, width?: number, height?: number) {
    this.service.isAvailable && this.service.banner && this.service.banner(placeholderId, width, height)
  }

  clearBanner(placeholderId: string) {
    this.service.isAvailable && this.service.clearBanner && this.service.clearBanner(placeholderId)
  }

  commercialBreak() {
    if (this.service.isAvailable && this.service.commercialBreak) {
      return this.service.commercialBreak()
    } else {
      return Promise.resolve(false)
    }
  }

  canReward() {
    if (this.service.isAvailable && this.service.canReward) {
      return this.service.canReward()
    } else {
      return false
    }
  }
  rewardedBreak(sideEffect?: () => void) {
    if (this.service.isAvailable && this.service.rewardedBreak) {
      return this.service.rewardedBreak(sideEffect)
    } else {
      // can't reward since there's no service avialable or implemented
      return Promise.resolve(false)
    }
  }
}

class TrackingService extends ServiceModule {}
class GameService extends ServiceModule {
  gameplayStart() {
    this.service.isAvailable && this.service.gameplayStart && this.service.gameplayStart()
  }
  gameplayStop() {
    this.service.isAvailable && this.service.gameplayStop && this.service.gameplayStop()
  }
  loadingStart() {
    this.service.isAvailable && this.service.loadingStart && this.service.loadingStart()
  }
  loadingStop() {
    this.service.isAvailable && this.service.loadingStop && this.service.loadingStop()
  }
  cellebrate() {
    this.service.isAvailable && this.service.cellebrate && this.service.cellebrate()
  }
  async getInviteLink(params: Record<string, any>) {
    const link = this.service.isAvailable && this.service.getInviteLink && this.service.getInviteLink(params)
    return link || ''
  }
  getInviteParam(paramName: string) {
    return this.service.isAvailable && this.service.getInviteParam && this.service.getInviteParam(paramName)
  }
  triggerInviteActions(params: Record<string, any>) {
    this.service.isAvailable && this.service.triggerInviteActions && this.service.triggerInviteActions(params)
  }
  triggerCloseInviteActions() {
    this.service.isAvailable && this.service.triggerCloseInviteActions && this.service.triggerCloseInviteActions()
  }
}

class UsersService extends ServiceModule {}
class DataService extends ServiceModule {
  clear() {
    this.service.isAvailable && this.service.clearData && this.service.clearData()
  }
  getItem(key: string) {
    return this.service.isAvailable && this.service.getItem && this.service.getItem(key)
  }
  removeItem(key: string) {
    this.service.isAvailable && this.service.removeItem && this.service.removeItem(key)
  }
  setItem(key: string, value: string) {
    this.service.isAvailable && this.service.setItem && this.service.setItem(key, value)
  }
}

const Platform = new PlatformServices(import.meta.env.VITE_PLATFORM_ID)

export default Platform
