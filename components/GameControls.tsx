"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Play, BarChart3 } from "lucide-react"
import { difficultyConfigs } from "../utils/gameConfig"
import type { Difficulty } from "../types"

interface GameControlsProps {
  difficulty: Difficulty
  isGameActive: boolean
  showPreview: boolean
  gameWon: boolean
  hasPlayedBefore: boolean
  onDifficultyChange: (difficulty: Difficulty) => void
  onStartGame: () => void
  onShowLeaderboard: () => void
}

export const GameControls = React.memo<GameControlsProps>(
  ({
    difficulty,
    isGameActive,
    showPreview,
    gameWon,
    hasPlayedBefore,
    onDifficultyChange,
    onStartGame,
    onShowLeaderboard,
  }) => {
    const handleDifficultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      onDifficultyChange(event.target.value as Difficulty)
    }

    const showStartButton = !isGameActive && !showPreview && !gameWon

    return (
      <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-4 sm:mb-6 px-2">
        <select
          value={difficulty}
          onChange={handleDifficultyChange}
          className="px-3 sm:px-4 py-2 rounded-lg border border-slate-300 bg-white text-sm sm:text-base"
          disabled={isGameActive || showPreview}
        >
          <option value="easy">Easy ({difficultyConfigs.easy.pairs} pairs)</option>
          <option value="medium">Medium ({difficultyConfigs.medium.pairs} pairs)</option>
          <option value="hard">Hard ({difficultyConfigs.hard.pairs} pairs)</option>
        </select>

        {showStartButton && (
          <Button
            onClick={onStartGame}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base"
          >
            <Play className="w-4 h-4 mr-2" />
            {hasPlayedBefore ? "Play Again" : "Start Game"}
          </Button>
        )}

        <Button
          onClick={onShowLeaderboard}
          variant="outline"
          className="rounded-lg text-sm sm:text-base px-3 sm:px-4 bg-transparent"
        >
          <BarChart3 className="w-4 h-4 mr-2" />
          Leaderboard
        </Button>
      </div>
    )
  },
)

GameControls.displayName = "GameControls"
