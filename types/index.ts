export type Difficulty = "easy" | "medium" | "hard"

export interface GameCard {
  id: number
  emoji: string
  isFlipped: boolean
  isMatched: boolean
}

export interface DifficultyConfig {
  pairs: number
  gridCols: number
  previewTime: number
}

export interface GameState {
  cards: GameCard[]
  flippedCards: number[]
  matchedPairs: number
  moves: number
  level: number
  difficulty: Difficulty
  isGameActive: boolean
  gameWon: boolean
  showPreview: boolean
  hasPlayedBefore: boolean
}

export interface ParticleEffect {
  show: boolean
  x: number
  y: number
  id: string
}

export interface GameScore {
  level: number
  time: number
  moves: number
  maxCombo: number
  totalCombos: number
  difficulty: Difficulty
}
