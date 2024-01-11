export interface BookFilter {
  publicationYearRange?: {
    startYear?: number
    endYear?: number
  }
  genre?: string[]
  theme?: string[]
  type?: string[]
  language?: string
  numberOfPagesRange?: {
    min?: number
    max?: number
  }
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}
