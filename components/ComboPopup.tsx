"use client"

import { useEffect, useState } from "react"

interface ComboPopupProps {
  combo: number
  show: boolean
  onComplete: () => void
}

export function ComboPopup({ combo, show, onComplete }: ComboPopupProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (show && combo > 1) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
        // Give time for fade out animation
        setTimeout(() => {
          onComplete()
        }, 300)
      }, 2000)
      return () => clearTimeout(timer)
    } else if (!show) {
      setVisible(false)
    }
  }, [show, combo, onComplete])

  if (!visible || combo <= 1) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-40">
      <div
        className={`transition-all duration-300 transform ${
          visible ? "animate-bounce opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
      >
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl shadow-2xl">
          <div className="text-center">
            <div className="text-2xl font-bold mb-1">🔥 COMBO!</div>
            <div className="text-sm">{combo}x matches in a row!</div>
          </div>
        </div>
      </div>
    </div>
  )
}
