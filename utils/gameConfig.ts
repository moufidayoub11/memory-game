import type { Difficulty, DifficultyConfig } from "../types"

export const difficultyConfigs: Record<Difficulty, DifficultyConfig> = {
  easy: { pairs: 8, gridCols: 4, previewTime: 4000 },    // 4x4 grid (16 cards total, 8 pairs) - Perfect square
  medium: { pairs: 12, gridCols: 6, previewTime: 3000 }, // 6x4 grid (24 cards total, 12 pairs) - Close to square
  hard: { pairs: 18, gridCols: 6, previewTime: 2000 },   // 6x6 grid (36 cards total, 18 pairs) - Perfect square
}

export const emojiSets = [
  ["🎯", "🎨", "🎪", "🎭", "🎸", "🎺", "🎲", "🎳", "🚀", "🌟", "🎊", "🎈", "🎁", "🏆", "💎", "🔥", "⚡", "🌈"],
  ["🚀", "🌟", "🎊", "🎈", "🎁", "🏆", "💎", "🔥", "⚡", "🌈", "🦄", "🎭", "🎪", "🎨", "🎯", "🎲", "🎳", "🎸"],
  ["🐙", "🦋", "🌺", "🍀", "🌙", "☀️", "⭐", "🌊", "🏔️", "🌸", "🦚", "🎪", "🎭", "🎨", "🎯", "🎲", "🎳", "🎸", "🌟", "🎊", "🎈", "🎁", "🏆", "💎", "🔥", "⚡", "🌈", "🦄", "🚀", "🌟", "🎊", "🎈"],
  ["🎮", "🎵", "🎤", "🎬", "📱", "💻", "⌚", "📷", "🎧", "🎹", "🥁", "🎷", "🎻", "🪕", "🎺", "🎸", "🎯", "🏹", "🎪", "🎭", "🎨", "🖌️", "🖍️", "✏️", "📝", "📚", "📖", "📋", "📌", "📍", "🗺️", "🧭"],
]

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, "0")}`
}
