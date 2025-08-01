"use client"

import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"
import { useEffect, useState } from "react"

interface RestartButtonProps {
  onRestart: () => void
  show: boolean
}

export function RestartButton({ onRestart, show }: RestartButtonProps) {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (show) {
      // Small delay to ensure the component mounts before animation
      const timer = setTimeout(() => {
        setAnimate(true)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setAnimate(false)
    }
  }, [show])

  if (!show) return null

  return (
    <div className="flex justify-center mt-6">
      <Button
        onClick={onRestart}
        className={`bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-6 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform ${
          animate 
            ? "scale-100 opacity-100 translate-y-0" 
            : "scale-75 opacity-0 translate-y-4"
        } transition-all duration-500 ease-out`}
      >
        <RotateCcw className="w-5 h-5 mr-2" />
        New Game
      </Button>
    </div>
  )
}
