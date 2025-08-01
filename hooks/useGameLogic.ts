"use client"

import type React from "react"
import { useCallback } from "react"
import type { GameState } from "../types"
import { useComboSystem } from "./useComboSystem"
import { useParticleEffects } from "./useParticleEffects"
import { useGameCompletion } from "./useGameCompletion"
import { useCardInteraction } from "./useCardInteraction"

interface UseGameLogicProps {
  gameState: GameState
  updateGameState: (updates: Partial<GameState>) => void
  currentConfig: { pairs: number; previewTime: number }
  timer: number
}

export function useGameLogic({ gameState, updateGameState, currentConfig, timer }: UseGameLogicProps) {
  // Specialized hooks for different concerns
  const combo = useComboSystem()
  const particles = useParticleEffects()
  const completion = useGameCompletion({
    matchedPairs: gameState.matchedPairs,
    totalPairs: currentConfig.pairs,
    isGameActive: gameState.isGameActive,
    timer,
    moves: gameState.moves,
    maxCombo: combo.maxCombo,
    totalCombos: combo.totalCombos,
    difficulty: gameState.difficulty,
    updateGameState,
  })

  // Handle card matches
  const handleMatch = useCallback((firstId: number, secondId: number) => {
    combo.handleMatch()
    particles.triggerParticleEffects([firstId, secondId])
  }, [combo, particles])

  // Handle no matches
  const handleNoMatch = useCallback(() => {
    combo.resetCombo()
  }, [combo])

  // Card interaction logic
  const cardInteraction = useCardInteraction({
    gameState,
    updateGameState,
    isGameCompleting: completion.isGameCompleting,
    onMatch: handleMatch,
    onNoMatch: handleNoMatch,
  })

  const startGame = useCallback(() => {
    completion.resetCompletion()
    combo.resetAllStats()

    // Store current cards to avoid stale closure
    const currentCards = gameState.cards
    
    // Show all cards during preview and set preview state
    updateGameState({
      hasPlayedBefore: true,
      showPreview: true,
      cards: currentCards.map((card) => ({ ...card, isFlipped: true })),
    })

    setTimeout(() => {
      // Hide cards and start the game
      updateGameState({
        cards: currentCards.map((card) => ({ ...card, isFlipped: false })),
        showPreview: false,
        isGameActive: true,
      })
    }, currentConfig.previewTime)
  }, [gameState.cards, updateGameState, currentConfig.previewTime, completion, combo])

  return {
    combo: combo.combo,
    showCombo: combo.showCombo,
    setShowCombo: combo.setShowCombo,
    particleEffects: particles.particleEffects,
    showWinScreen: completion.showWinScreen,
    setShowWinScreen: completion.setShowWinScreen,
    currentScore: completion.currentScore,
    isGameCompleting: completion.isGameCompleting,
    startGame,
    handleCardClick: cardInteraction.handleCardClick,
    handleParticleComplete: particles.removeParticleEffect,
    handleComboComplete: combo.hideCombo,
  }
}
