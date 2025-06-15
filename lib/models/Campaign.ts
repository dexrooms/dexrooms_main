export interface Campaign {
  _id?: string
  tokenAddress: string
  name: string
  symbol: string
  logo: string
  description: string
  socialLinks: {
    twitter?: string
    website?: string
  }
  marketCap: string
  totalSupply: string
  escrowWallet: string
  raised: number
  goal: number
  contributors: number
  status: "active" | "completed" | "failed"
  createdAt: Date
  expiresAt: Date
  replies?: number
}

export interface TokenData {
  mint: string
  standard: string
  name: string
  symbol: string
  logo: string
  decimals: string
  fullyDilutedValue: string
  totalSupply: string
  totalSupplyFormatted: string
  links: {
    twitter?: string
    website?: string
    moralis?: string
  }
  description: string
  isVerifiedContract: boolean
  possibleSpam: boolean
}
