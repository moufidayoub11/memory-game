"use client"

import type React from "react"
import { useCallback } from "react"
import type { GameState } from "../types"
import { useAudio } from "./useAudio"
import { GAME_TIMING } from "../utils/constants"

interface UseCardInteractionProps {
  gameState: GameState
  updateGameState: (updates: Partial<GameState>) => void
  isGameCompleting: boolean
  onMatch: (firstId: number, secondId: number) => void
  onNoMatch: () => void
}

export function useCardInteraction({
  gameState,
  updateGameState,
  isGameCompleting,
  onMatch,
  onNoMatch,
}: UseCardInteractionProps) {
  const { playFlipSound, playMatchSound } = useAudio()

  const handleCardClick = useCallback(
    (cardId: number, event: React.MouseEvent) => {
      // Early returns for invalid states
      if (!gameState.isGameActive || gameState.gameWon || gameState.showPreview || isGameCompleting) {
        return
      }

      const card = gameState.cards.find((c) => c.id === cardId)
      if (!card || card.isFlipped || card.isMatched || gameState.flippedCards.length >= 2) {
        return
      }

      playFlipSound()

      // Flip the card
      const newFlippedCards = [...gameState.flippedCards, cardId]
      updateGameState({
        flippedCards: newFlippedCards,
        cards: gameState.cards.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c)),
      })

      // Check for match when two cards are flipped
      if (newFlippedCards.length === 2) {
        updateGameState({ moves: gameState.moves + 1 })

        const [firstId, secondId] = newFlippedCards
        const firstCard = gameState.cards.find((c) => c.id === firstId)
        const secondCard = gameState.cards.find((c) => c.id === secondId)

        if (firstCard?.emoji === secondCard?.emoji) {
          // Match found
          playMatchSound()
          onMatch(firstId, secondId)

          setTimeout(() => {
            updateGameState({
              cards: gameState.cards.map((c) =>
                c.id === firstId || c.id === secondId ? { ...c, isMatched: true } : c,
              ),
              matchedPairs: gameState.matchedPairs + 1,
              flippedCards: [],
            })
          }, GAME_TIMING.MATCH_DELAY)
        } else {
          // No match
          onNoMatch()
          
          setTimeout(() => {
            updateGameState({
              cards: gameState.cards.map((c) =>
                c.id === firstId || c.id === secondId ? { ...c, isFlipped: false } : c,
              ),
              flippedCards: [],
            })
          }, GAME_TIMING.NO_MATCH_DELAY)
        }
      }
    },
    [gameState, updateGameState, playFlipSound, playMatchSound, isGameCompleting, onMatch, onNoMatch],
  )

  return {
    handleCardClick,
  }
}
