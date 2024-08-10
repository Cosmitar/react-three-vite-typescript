import { SERVICE_READY } from './events'
import { Service } from './types'

declare global {
  interface Window {
    PokiSDK: any
  }
}

export class PokiService implements Service {
  name = 'Poki'
  isAvailable = false

  constructor() {
    PokiService.InjectHeaders()
    this.checkAvailability()
  }

  private async checkAvailability() {
    if (window.PokiSDK !== undefined) {
      try {
        import.meta.env.DEV && window.PokiSDK.setDebug(true)

        await window.PokiSDK.init()

        this.isAvailable = true

        SERVICE_READY.emit()
      } catch (e) {
        console.warn(e)
      }
    } else {
      setTimeout(this.checkAvailability.bind(this), 500)
    }
  }

  static InjectHeaders() {
    const script = window.document.createElement('script')
    script.src = 'https://game-cdn.poki.com/scripts/v2/poki-sdk.js'
    window.document.head.appendChild(script)
  }

  public async commercialBreak() {
    return window.PokiSDK.commercialBreak()
  }
  canReward() {
    return true
  }
  public async rewardedBreak(sideEffect?: () => void) {
    return window.PokiSDK.rewardedBreak(sideEffect)
  }

  public loadingStop(): void {
    window.PokiSDK.gameLoadingFinished()
  }

  gameplayStart(): void {
    window.PokiSDK.gameplayStart()
  }
  gameplayStop(): void {
    window.PokiSDK.gameplayStop()
  }

  public async getInviteLink(params: Record<string, any>): Promise<string> {
    // if run on e.g. https://poki.com/en/g/my-awesome-game it will return https://poki.com/en/g/my-awesome-game?gdid=myid&gdtype=mytype
    return window.PokiSDK.shareableURL(params)
  }

  public getInviteParam(paramName: string) {
    return window.PokiSDK.getURLParam(paramName)
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
