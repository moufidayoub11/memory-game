"use client"

import React from "react"
import { GameCard } from "./GameCard"
import type { GameCard as GameCardType } from "../types"

interface GameGridProps {
  cards: GameCardType[]
  gridCols: number
  isGameActive: boolean
  showPreview: boolean
  gameWon: boolean
  onCardClick: (cardId: number, event: React.MouseEvent) => void
}

export const GameGrid = React.memo<GameGridProps>(
  ({ cards, gridCols, isGameActive, showPreview, gameWon, onCardClick }) => {
    // Calculate responsive card sizes based on screen size and grid columns
    const getGridClasses = () => {
      const baseClasses = "grid mx-auto px-2 sm:px-4"

      // Responsive gap and sizing based on columns
      if (gridCols <= 3) {
        return `${baseClasses} gap-2 sm:gap-3 max-w-xs sm:max-w-sm`
      } else if (gridCols === 4) {
        return `${baseClasses} gap-2 sm:gap-3 max-w-sm sm:max-w-md lg:max-w-lg`
      } else if (gridCols === 6) {
        return `${baseClasses} gap-1 sm:gap-2 max-w-md sm:max-w-lg lg:max-w-2xl`
      }
      return `${baseClasses} gap-2 sm:gap-3 max-w-md sm:max-w-lg`
    }

    return (
      <div className="mb-6 sm:mb-8">
        <div
          className={getGridClasses()}
          style={{
            gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
          }}
        >
          {cards.map((card) => (
            <GameCard
              key={card.id}
              card={card}
              isGameActive={isGameActive}
              showPreview={showPreview}
              gameWon={gameWon}
              onClick={onCardClick}
            />
          ))}
        </div>
      </div>
    )
  },
)

GameGrid.displayName = "GameGrid"
