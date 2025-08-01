"use client"

import { useEffect, useCallback, useState } from "react"
import { useGameState } from "./hooks/useGameState"
import { useGameTimer } from "./hooks/useGameTimer"
import { useGameLogic } from "./hooks/useGameLogic"
import { GameHeader } from "./components/GameHeader"
import { GameControls } from "./components/GameControls"
import { GameStats } from "./components/GameStats"
import { GameGrid } from "./components/GameGrid"
import { ParticleEffect } from "./components/ParticleEffect"
import { ComboPopup } from "./components/ComboPopup"
import { WinScreen } from "./components/WinScreen"
import { Leaderboard } from "./components/Leaderboard"
import { RestartButton } from "./components/RestartButton"

export default function MemoryGame() {
  const [showLeaderboard, setShowLeaderboard] = useState(false)

  const { gameState, currentConfig, createGameGrid, updateGameState, setDifficulty } =
    useGameState()

  const { timer, resetTimer } = useGameTimer(gameState.isGameActive, gameState.showPreview || gameState.gameWon)

  const {
    combo,
    showCombo,
    particleEffects,
    showWinScreen,
    setShowWinScreen,
    currentScore,
    isGameCompleting,
    startGame,
    handleCardClick,
    handleParticleComplete,
    handleComboComplete,
  } = useGameLogic({
    gameState,
    updateGameState,
    currentConfig,
    timer,
    resetTimer,
  })

  // Initialize game grid on mount and when difficulty changes
  useEffect(() => {
    createGameGrid()
  }, [createGameGrid])

  const handleNewGame = useCallback(() => {
    createGameGrid()
    setShowWinScreen(false)
    resetTimer()
  }, [setShowWinScreen, createGameGrid, resetTimer])

  const handleShowLeaderboard = useCallback(() => {
    setShowLeaderboard(true)
    if (showWinScreen) {
      setShowWinScreen(false)
    }
  }, [showWinScreen, setShowWinScreen])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-4xl mx-auto">
        <GameHeader
          difficulty={gameState.difficulty}
          showPreview={gameState.showPreview}
          isGameActive={gameState.isGameActive}
          gameWon={gameState.gameWon}
          hasPlayedBefore={gameState.hasPlayedBefore}
        />

        <GameControls
          difficulty={gameState.difficulty}
          isGameActive={gameState.isGameActive}
          showPreview={gameState.showPreview}
          gameWon={gameState.gameWon}
          hasPlayedBefore={gameState.hasPlayedBefore}
          onDifficultyChange={setDifficulty}
          onStartGame={startGame}
          onShowLeaderboard={handleShowLeaderboard}
        />

        <GameStats
          timer={timer}
          moves={gameState.moves}
          matchedPairs={gameState.matchedPairs}
          totalPairs={currentConfig.pairs}
          combo={combo}
        />

        <GameGrid
          cards={gameState.cards}
          gridCols={currentConfig.gridCols}
          isGameActive={gameState.isGameActive}
          showPreview={gameState.showPreview}
          gameWon={gameState.gameWon}
          onCardClick={handleCardClick}
        />

        <RestartButton
          onRestart={handleNewGame}
          show={gameState.isGameActive || (gameState.gameWon && !showWinScreen)}
          isGameFinished={gameState.gameWon}
        />
      </div>

      {/* Effects and Modals */}
      <ParticleEffect triggers={particleEffects} onComplete={handleParticleComplete} />

      <ComboPopup combo={combo} show={showCombo} onComplete={handleComboComplete} />

      <Leaderboard isOpen={showLeaderboard} onClose={() => setShowLeaderboard(false)} currentScore={currentScore} />

      {showWinScreen && (
                <WinScreen
          score={currentScore}
          onPlayAgain={handleNewGame}
          onShowLeaderboard={handleShowLeaderboard}
        />
      )}

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  )
}
