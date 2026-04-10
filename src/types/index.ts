export type DimScore = 'L' | 'M' | 'H'
export type Profile = DimScore[]

export interface Question {
  id: number
  dimensionIndex: number
  model: string
  dimension: string
  text: string
  options: [string, string, string, string]
}

export interface PersonalityType {
  code: string
  name: string
  tagline: string
  description: string
  growth: string
  profile: Profile
  isSpecial?: boolean
  rarity?: number            // theoretical probability (%), e.g. 4.28
  nemesis?: string           // code of workplace nemesis
  nemesisReason?: string     // short funny reason
  soulmate?: string          // code of workplace soulmate
  soulmateReason?: string    // short funny reason
}
