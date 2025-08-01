"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import type { GameCard as GameCardType } from "../types"

interface GameCardProps {
  card: GameCardType
  isGameActive: boolean
  showPreview: boolean
  gameWon: boolean
  onClick: (cardId: number, event: React.MouseEvent) => void
}

export const GameCard = React.memo<GameCardProps>(({ card, isGameActive, showPreview, gameWon, onClick }) => {
  const handleClick = (event: React.MouseEvent) => {
    onClick(card.id, event)
  }

  return (
    <div
      data-card-id={card.id}
      className="aspect-square cursor-pointer perspective-1000 w-full h-full min-w-0"
      onClick={handleClick}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
          card.isFlipped || card.isMatched ? "rotate-y-180" : ""
        }`}
      >
        {/* Card Back */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <Card
            className={`w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 border-0 shadow-md hover:shadow-lg transition-all duration-300 ${
              !showPreview && (isGameActive && !gameWon)
                ? "hover:scale-105 hover:from-slate-300 hover:to-slate-400"
                : "cursor-not-allowed opacity-75"
            }`}
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-slate-400 rounded-full opacity-50"></div>
            </div>
          </Card>
        </div>

        {/* Card Front */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <Card
            className={`w-full h-full border-0 shadow-md transition-all duration-300 ${
              card.isMatched
                ? "bg-gradient-to-br from-green-100 to-green-200 ring-2 ring-green-300"
                : showPreview
                  ? "bg-gradient-to-br from-yellow-100 to-yellow-200"
                  : "bg-gradient-to-br from-blue-100 to-blue-200"
            }`}
          >
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-sm sm:text-lg md:text-xl lg:text-2xl select-none">{card.emoji}</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
})

GameCard.displayName = "GameCard"
