"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Trophy, Clock, Zap } from "lucide-react"

interface LeaderboardEntry {
  id: string
  level: number
  time: number
  moves: number
  date: string
  tryNumber: number
  maxCombo?: number
  totalCombos?: number
  difficulty?: string
}

interface LeaderboardProps {
  isOpen: boolean
  onClose: () => void
  currentScore?: { level: number; time: number; moves: number }
}

export function Leaderboard({ isOpen, onClose, currentScore }: LeaderboardProps) {
  const [scores, setScores] = useState<LeaderboardEntry[]>([])
  const processedScoreRef = useRef<string | null>(null)

  useEffect(() => {
    const savedScores = localStorage.getItem("memoryGameScores")
    if (savedScores) {
      const parsedScores = JSON.parse(savedScores)
      // Add tryNumber to existing scores that don't have it
      const scoresWithTryNumber = parsedScores.map((score: any, index: number) => ({
        ...score,
        tryNumber: score.tryNumber || index + 1
      }))
      setScores(scoresWithTryNumber)
    }
  }, [])

  useEffect(() => {
    if (currentScore) {
      // Create a unique identifier for this score to prevent duplicate processing
      const scoreId = `${currentScore.time}_${currentScore.moves}_${Date.now()}`
      
      // Only process if we haven't already processed this score
      if (processedScoreRef.current !== scoreId) {
        processedScoreRef.current = scoreId
        
        // Calculate try number from all existing scores (including those not in top 10)
        const savedScores = localStorage.getItem("memoryGameScores")
        const allScores = savedScores ? JSON.parse(savedScores) : []
        const newTryNumber = allScores.length + 1
        
        const newEntry: LeaderboardEntry = {
          id: Date.now().toString(),
          ...currentScore,
          date: new Date().toLocaleString(),
          tryNumber: newTryNumber,
        }

        // Update scores
        setScores(prevScores => {
          const updatedScores = [...prevScores, newEntry]
            .sort((a, b) => {
              if (a.level !== b.level) return b.level - a.level
              if (a.time !== b.time) return a.time - b.time
              return a.moves - b.moves
            })
            .slice(0, 10)

          // Save all scores (not just top 10) to maintain accurate try counter
          const allUpdatedScores = [...allScores, newEntry]
          localStorage.setItem("memoryGameScores", JSON.stringify(allUpdatedScores))
          
          return updatedScores
        })
      }
    }
  }, [currentScore])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md bg-white p-6 rounded-2xl shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <h2 className="text-2xl font-bold text-slate-800">Leaderboard</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {scores.length === 0 ? (
            <div className="text-center py-8 text-slate-500">No scores yet. Play a game to get started!</div>
          ) : (
            scores.map((score, index) => (
              <div
                key={score.id}
                className={`flex items-center justify-between p-3 rounded-xl ${
                  index === 0
                    ? "bg-gradient-to-r from-yellow-100 to-amber-100 border border-yellow-200"
                    : index === 1
                      ? "bg-gradient-to-r from-gray-100 to-slate-100 border border-gray-200"
                      : index === 2
                        ? "bg-gradient-to-r from-orange-100 to-red-100 border border-orange-200"
                        : "bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Try #{score.tryNumber}</div>
                    <div className="text-sm text-slate-600">{score.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm text-slate-600">
                    <Clock className="w-4 h-4" />
                    {formatTime(score.time)}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-slate-600">
                    <Zap className="w-4 h-4" />
                    {score.moves} moves
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <Button
          onClick={onClose}
          className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
        >
          Close
        </Button>
      </Card>
    </div>
  )
}
