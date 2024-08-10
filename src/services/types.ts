export interface Service {
  name: string
  isAvailable: boolean
  banner?(placeholderId: string, width?: number, height?: number): Promise<void>
  clearBanner?(placeholderId?: string): void
  commercialBreak?(): Promise<boolean>
  canReward?(): boolean
  rewardedBreak?(sideEffect?: () => void): Promise<boolean>
  cellebrate?(): void
  gameplayStart?(): void
  gameplayStop?(): void
  loadingStart?(): void
  loadingStop?(): void
  getInviteLink?(params: Record<string, any>): Promise<string>
  triggerInviteActions?(params: Record<string, any>): void
  triggerCloseInviteActions?(): void
  getInviteParam?(paramName: string): any
  // data
  clearData?: () => void
  getItem?(key: string): string | null
  removeItem?(key: string): void
  setItem?(key: string, value: string): void
  // ----
}
