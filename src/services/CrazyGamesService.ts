import { SERVICE_READY } from './events'
import { Service } from './types'

declare global {
  interface Window {
    CrazyGames: any
  }
}

export class CrazyGamesService implements Service {
  name = 'CrazyGames'
  isAvailable = false

  constructor() {
    CrazyGamesService.InjectHeaders()
    this.checkAvailability()
  }

  private async checkAvailability() {
    if (window.CrazyGames !== undefined) {
      try {
        await window.CrazyGames.SDK.init()
        this.isAvailable = window.CrazyGames.SDK.environment !== 'disabled'
        SERVICE_READY.emit()
      } catch (e) {
        console.warn(e)
      }
    } else {
      console.log('re-check')

      setTimeout(this.checkAvailability.bind(this), 500)
    }
  }

  static InjectHeaders() {
    const script = window.document.createElement('script')
    script.src = `https://sdk.crazygames.com/crazygames-sdk-v3.js${import.meta.env.DEV ? '?useLocalSdk=true' : ''}`
    window.document.head.appendChild(script)
  }

  public async banner(placeholderId: string, width?: number, height?: number) {
    try {
      // await is not mandatory when requesting banners, but it will allow you to catch errors
      if (width && height) {
        await window.CrazyGames.SDK.banner.requestBanner({
          id: placeholderId,
          width,
          height,
        })
      } else {
        await window.CrazyGames.SDK.banner.requestResponsiveBanner(placeholderId)
      }
    } catch (e) {
      console.log('Banner request error', e)
    }
  }

  public clearBanner(placeholderId?: string) {
    if (placeholderId) {
      window.CrazyGames.SDK.banner.clearBanner(placeholderId)
    } else {
      window.CrazyGames.SDK.banner.clearAllBanners()
    }
  }

  public cellebrate() {
    window.CrazyGames.SDK.game.happytime()
  }

  public gameplayStart() {
    window.CrazyGames.SDK.game.gameplayStart()
  }

  public gameplayStop() {
    window.CrazyGames.SDK.game.gameplayStop()
  }

  public loadingStart() {
    window.CrazyGames.SDK.game.loadingStart()
  }

  public loadingStop() {
    window.CrazyGames.SDK.game.loadingStop()
  }

  public async getInviteLink(params: Record<string, any>): Promise<string> {
    return window.CrazyGames.SDK.game.inviteLink(params)
  }

  public triggerInviteActions(params: Record<string, any>): void {
    window.CrazyGames.SDK.game.showInviteButton(params)
  }

  public triggerCloseInviteActions(): void {
    window.CrazyGames.SDK.game.hideInviteButton()
  }

  public getInviteParam(paramName: string) {
    return window.CrazyGames.SDK.game.getInviteParam(paramName)
  }
}
