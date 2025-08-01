"use client"

import { useState, useCallback, useMemo } from "react"
import type { GameState, Difficulty } from "../types"
import { difficultyConfigs, emojiSets } from "../utils/gameConfig"

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>({
    cards: [],
    flippedCards: [],
    matchedPairs: 0,
    moves: 0,
    level: 1, // Keep for compatibility but not used
    difficulty: "medium",
    isGameActive: false,
    gameWon: false,
    showPreview: false,
    hasPlayedBefore: false,
  })

  const currentConfig = useMemo(() => {
    return difficultyConfigs[gameState.difficulty]
  }, [gameState.difficulty])

  const createGameGrid = useCallback(() => {
    const config = currentConfig
    const availableEmojis = emojiSets[0] // Always use the first emoji set
    const selectedEmojis = availableEmojis.slice(0, config.pairs)

    const shuffledEmojis = [...selectedEmojis, ...selectedEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }))

    setGameState((prev) => ({
      ...prev,
      cards: shuffledEmojis,
      flippedCards: [],
      matchedPairs: 0,
      moves: 0,
      isGameActive: false,
      gameWon: false,
      showPreview: false,
    }))
  }, [currentConfig])

  const updateGameState = useCallback((updates: Partial<GameState>) => {
    setGameState((prev) => ({ ...prev, ...updates }))
  }, [])

  const setDifficulty = useCallback((difficulty: Difficulty) => {
    setGameState((prev) => ({ ...prev, difficulty }))
  }, [])

  return {
    gameState,
    currentConfig,
    createGameGrid,
    updateGameState,
    setDifficulty,
  }
}
