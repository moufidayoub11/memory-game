"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Trophy, Star, RotateCcw, BarChart3 } from "lucide-react"
import { useEffect, useState } from "react"

interface WinScreenProps {
  score?: {
    level: number
    time: number
    moves: number
    maxCombo: number
    totalCombos: number
    difficulty: string
  }
  onPlayAgain: () => void
  onShowLeaderboard: () => void
}

export function WinScreen({ score, onPlayAgain, onShowLeaderboard }: WinScreenProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Start animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 50)
    return () => clearTimeout(timer)
  }, [])
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getStars = () => {
    if (!score) return 1
    
    const { moves, time, maxCombo, totalCombos, difficulty } = score
    
    // Base thresholds per difficulty
    const thresholds = {
      easy: { 
        perfectMoves: 16, // 8 pairs × 2 moves per pair
        goodMoves: 24,
        perfectTime: 30,
        goodTime: 60
      },
      medium: { 
        perfectMoves: 24, // 12 pairs × 2 moves per pair
        goodMoves: 36,
        perfectTime: 45,
        goodTime: 90
      },
      hard: { 
        perfectMoves: 36, // 18 pairs × 2 moves per pair
        goodMoves: 54,
        perfectTime: 60,
        goodTime: 120
      }
    }
    
    const diffThreshold = thresholds[difficulty as keyof typeof thresholds] || thresholds.medium
    let stars = 1
    
    // Calculate base stars from moves and time
    if (moves <= diffThreshold.perfectMoves && time <= diffThreshold.perfectTime) {
      stars = 3 // Perfect performance
    } else if (moves <= diffThreshold.goodMoves && time <= diffThreshold.goodTime) {
      stars = 2 // Good performance
    } else if (moves <= diffThreshold.goodMoves || time <= diffThreshold.goodTime) {
      stars = 2 // Good in one category
    }
    
    // Combo bonuses can upgrade star rating
    if (maxCombo >= 5) {
      stars = Math.max(stars, 3) // Epic combo guarantees 3 stars
    } else if (maxCombo >= 3) {
      stars = Math.max(stars, 2) // Good combo guarantees at least 2 stars
    }
    
    // Multiple combos bonus
    if (totalCombos >= 3) {
      stars = Math.max(stars, 3) // Consistent combo performance
    } else if (totalCombos >= 2) {
      stars = Math.max(stars, 2)
    }
    
    return Math.min(stars, 3) // Cap at 3 stars
  }

  if (!score) return null

  const stars = getStars()

  return (
    <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Card className={`w-full max-w-md bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-2xl shadow-2xl text-center border border-slate-200/50 transform transition-all duration-500 ease-out ${isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-95 opacity-0'}`}>
        <div className="mb-6">
          <div className={`w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg transform transition-all duration-700 delay-200 ${isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h2 className={`text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-2 transform transition-all duration-500 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}`}>
            Game Complete!
          </h2>
          <p className={`text-slate-600 transition-all duration-500 delay-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>Congratulations on finishing the memory game!</p>
        </div>

        <div className={`flex justify-center gap-2 mb-6 transform transition-all duration-500 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}>
          {[1, 2, 3].map((star, index) => (
            <Star
              key={star}
              className={`w-8 h-8 ${star <= stars ? "text-yellow-500 fill-yellow-500" : "text-slate-300"} transform transition-all duration-300`}
              style={{ 
                transitionDelay: isVisible ? `${600 + index * 100}ms` : '0ms',
                transform: isVisible ? 'scale(1)' : 'scale(0.8)',
                opacity: isVisible ? 1 : 0
              }}
            />
          ))}
        </div>

        <div className={`grid grid-cols-2 gap-4 mb-6 transform transition-all duration-500 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
          <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-blue-200/50 shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{formatTime(score.time)}</div>
            <div className="text-sm text-blue-500">Time</div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-purple-200/50 shadow-sm">
            <div className="text-2xl font-bold text-purple-600">{score.moves}</div>
            <div className="text-sm text-purple-500">Moves</div>
          </div>
        </div>

        {/* Combo Achievement Section */}
        {(score.maxCombo > 1 || score.totalCombos > 0) && (
          <div className={`grid grid-cols-2 gap-4 mb-8 transform transition-all duration-500 delay-750 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
            <div className="bg-white/70 backdrop-blur-sm p-3 rounded-xl border border-yellow-200/50 shadow-sm">
              <div className="text-xl font-bold text-yellow-600">{score.maxCombo}x</div>
              <div className="text-xs text-yellow-500">Max Combo</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-3 rounded-xl border border-orange-200/50 shadow-sm">
              <div className="text-xl font-bold text-orange-600">{score.totalCombos}</div>
              <div className="text-xs text-orange-500">Total Combos</div>
            </div>
          </div>
        )}

        <div className={`space-y-3 transform transition-all duration-500 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <Button
            onClick={onPlayAgain}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Play Again
          </Button>
          <Button 
            onClick={onShowLeaderboard} 
            variant="outline" 
            className="w-full py-3 rounded-xl bg-white/50 backdrop-blur-sm border-slate-300 hover:bg-white/70 text-slate-700 hover:text-slate-800 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <BarChart3 className="w-5 h-5 mr-2" />
            View Leaderboard
          </Button>
        </div>
      </Card>
    </div>
  )
}
