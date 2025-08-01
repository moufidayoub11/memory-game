import React from "react"
import { Card } from "@/components/ui/card"
import { Timer, Zap, Target } from "lucide-react"
import { formatTime } from "../utils/gameConfig"

interface GameStatsProps {
  timer: number
  moves: number
  matchedPairs: number
  totalPairs: number
  combo: number
}

export const GameStats = React.memo<GameStatsProps>(({ timer, moves, matchedPairs, totalPairs, combo }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-4 sm:mb-8 px-2">
      <Card className="px-3 sm:px-4 py-2 sm:py-3 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <div className="flex items-center gap-2 text-slate-700">
          <Timer className="w-4 sm:w-5 h-4 sm:h-5 text-blue-500" />
          <span className="font-semibold text-sm sm:text-base">{formatTime(timer)}</span>
        </div>
      </Card>

      <Card className="px-3 sm:px-4 py-2 sm:py-3 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <div className="flex items-center gap-2 text-slate-700">
          <Zap className="w-4 sm:w-5 h-4 sm:h-5 text-amber-500" />
          <span className="font-semibold text-sm sm:text-base">{moves} moves</span>
        </div>
      </Card>

      <Card className="px-3 sm:px-4 py-2 sm:py-3 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <div className="flex items-center gap-2 text-slate-700">
          <Target className="w-4 sm:w-5 h-4 sm:h-5 text-green-500" />
          <span className="font-semibold text-sm sm:text-base">
            {matchedPairs}/{totalPairs} pairs
          </span>
        </div>
      </Card>

      {combo > 1 && (
        <Card className="px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-purple-100 to-pink-100 border-0 shadow-lg">
          <div className="flex items-center gap-2 text-purple-700">
            <span className="text-base sm:text-lg">🔥</span>
            <span className="font-semibold text-sm sm:text-base">{combo}x Combo!</span>
          </div>
        </Card>
      )}
    </div>
  )
})

GameStats.displayName = "GameStats"
