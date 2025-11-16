export type ApiSeries = {
  _id: string
  title: string
  description: string
  coverImage: string
  price: number
  isVisible: boolean
  freeEpisodesCount: number
  createdAt: string
  updatedAt: string
}

export type ApiEpisode = {
  episodeNumber: number
  isComplete: boolean
  isFree: boolean
  availableMediaCount: number
}

export type SeriesEpisodesResponse = {
  series: ApiSeries
  episodes: ApiEpisode[]
  isPurchased: boolean
}

export type ApiFaqItem = {
  _id: string
  question: string
  answer: string
  order: number
}

export type CrownExchangeRate = {
  rubPerCrown: number
  usdPerCrown: number
  telegramStarPerCrown: number
}

export type GetTokenRequest = {
  initData: string
}

export type GetTokenResponseUser = {
  telegramId: number
  username: string | null
  displayName: string | null
  crowns: number
}

export type GetTokenResponse = {
  accessToken: string
  user: GetTokenResponseUser
}

export type UserBalance = {
  telegramId: number
  crowns: number
  username: string | null
  displayName: string | null
}

export type UserProfile = {
  telegramId: number
  username: string | null
  displayName: string | null
  crowns: number
  registeredAt: string
  lastActivityAt: string
  totalPurchases: number
  totalSpent: number
  totalViews: number
}

export type PurchaseCrownsRequest = {
  amount: number
  currency: 'RUB' | 'USD' | 'TELEGRAM_STAR'
  transactionHash?: string
}

export type PurchaseCrownsResponse = {
  success: boolean
  user: UserProfile | UserBalance | null
  crownsAdded: number
  amount: number
  currency: 'RUB' | 'USD' | 'TELEGRAM_STAR'
  purchase: unknown
}


