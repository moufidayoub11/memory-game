"use client"

import { useState, useEffect } from "react"

export function useGameTimer(isActive: boolean, isPaused: boolean) {
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1)
      }, 1000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isActive, isPaused])

  const resetTimer = () => setTimer(0)

  return { timer, resetTimer }
}
