import React from "react"
import { Brain, Sparkles } from "lucide-react"
import type { Difficulty } from "../types"

interface GameHeaderProps {
  difficulty: Difficulty
  showPreview: boolean
  isGameActive: boolean
  gameWon: boolean
  hasPlayedBefore: boolean
}

export const GameHeader = React.memo<GameHeaderProps>(
  ({ difficulty, showPreview, isGameActive, gameWon, hasPlayedBefore }) => {
    const getStatusMessage = () => {
      if (showPreview) {
        return "Memorize the cards! Game starts soon..."
      }
      if (!isGameActive && !gameWon) {
        return hasPlayedBefore ? "Ready for another round!" : "Choose your difficulty and click Start!"
      }
      return null
    }

    const getDifficultyColor = () => {
      switch (difficulty) {
        case "easy": return "text-green-600 bg-green-50 border-green-200"
        case "medium": return "text-yellow-600 bg-yellow-50 border-yellow-200"
        case "hard": return "text-red-600 bg-red-50 border-red-200"
        default: return "text-gray-600 bg-gray-50 border-gray-200"
      }
    }

    const statusMessage = getStatusMessage()

    return (
      <div className="text-center mb-6 sm:mb-8">
        {/* Main Title with Icon */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="relative">
            <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
            <Sparkles className="w-4 h-4 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            Memory Game
          </h1>
        </div>

        {/* Difficulty Badge */}
        <div className="flex justify-center mb-4">
          <span className={`px-4 py-2 rounded-full border-2 font-semibold text-sm sm:text-base ${getDifficultyColor()}`}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Mode
          </span>
        </div>
      </div>
    )
  },
)

GameHeader.displayName = "GameHeader"
