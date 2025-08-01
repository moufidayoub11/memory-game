// Game timing constants
export const GAME_TIMING = {
  COMBO_TIME_WINDOW: 3000, // 3 seconds for combo chain
  WIN_SCREEN_DELAY: 2500, // Time to let combo finish before showing win screen
  MATCH_DELAY: 600, // Time before marking cards as matched
  NO_MATCH_DELAY: 1000, // Time before flipping cards back
} as const

// Animation constants
export const ANIMATION = {
  CARD_FLIP_DURATION: 500, // CSS transition duration for card flip
  PARTICLE_DURATION: 1500, // Particle effect duration
} as const
