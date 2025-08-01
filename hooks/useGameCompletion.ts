"use client"

import { useState, useCallback, useEffect } from "react"
import type { GameScore } from "../types"
import { useAudio } from "./useAudio"
import { GAME_TIMING } from "../utils/constants"

interface UseGameCompletionProps {
  matchedPairs: number
  totalPairs: number
  isGameActive: boolean
  timer: number
  moves: number
  maxCombo: number
  totalCombos: number
  difficulty: string
  updateGameState: (updates: any) => void
}

export function useGameCompletion({
  matchedPairs,
  totalPairs,
  isGameActive,
  timer,
  moves,
  maxCombo,
  totalCombos,
  difficulty,
  updateGameState,
}: UseGameCompletionProps) {
  const [showWinScreen, setShowWinScreen] = useState(false)
  const [currentScore, setCurrentScore] = useState<GameScore | undefined>()
  const [isGameCompleting, setIsGameCompleting] = useState(false)

  const { playWinSound } = useAudio()

  // Check for game completion
  useEffect(() => {
    if (matchedPairs === totalPairs && isGameActive && !isGameCompleting) {
      setIsGameCompleting(true)
      updateGameState({ isGameActive: false, gameWon: true })
      setCurrentScore({ 
        level: 1, 
        time: timer, 
        moves, 
        maxCombo,
        totalCombos,
        difficulty: difficulty as any
      })
      playWinSound()

      // Wait for combo to finish naturally, then show win screen
      setTimeout(() => {
        setShowWinScreen(true)
        setIsGameCompleting(false)
      }, GAME_TIMING.WIN_SCREEN_DELAY)
    }
  }, [
    matchedPairs,
    totalPairs,
    isGameActive,
    timer,
    moves,
    maxCombo,
    totalCombos,
    difficulty,
    updateGameState,
    playWinSound,
    isGameCompleting,
  ])

  const hideWinScreen = useCallback(() => {
    setShowWinScreen(false)
  }, [])

  const resetCompletion = useCallback(() => {
    setIsGameCompleting(false)
    setShowWinScreen(false)
    setCurrentScore(undefined)
  }, [])

  return {
    showWinScreen,
    currentScore,
    isGameCompleting,
    setShowWinScreen,
    hideWinScreen,
    resetCompletion,
  }
}
