"use client"

import { useState, useCallback } from "react"
import { useAudio } from "./useAudio"
import { GAME_TIMING } from "../utils/constants"

export function useComboSystem() {
  const [combo, setCombo] = useState(0)
  const [maxCombo, setMaxCombo] = useState(0)
  const [totalCombos, setTotalCombos] = useState(0)
  const [lastMatchTime, setLastMatchTime] = useState(0)
  const [showCombo, setShowCombo] = useState(false)

  const { playComboSound } = useAudio()

  const handleMatch = useCallback(() => {
    const currentTime = Date.now()
    
    if (currentTime - lastMatchTime < GAME_TIMING.COMBO_TIME_WINDOW && combo >= 0) {
      const newCombo = combo + 1
      setCombo(newCombo)
      
      // Update max combo if this is a new record
      if (newCombo > maxCombo) {
        setMaxCombo(newCombo)
      }
      
      // Count total combos (combos of 2 or more)
      if (newCombo === 2) {
        setTotalCombos(prev => prev + 1)
      }
      
      if (newCombo > 1) {
        setShowCombo(true)
        playComboSound()
      }
    } else {
      setCombo(1)
    }
    
    setLastMatchTime(currentTime)
  }, [combo, maxCombo, lastMatchTime, playComboSound])

  const resetCombo = useCallback(() => {
    setCombo(0)
    setShowCombo(false)
  }, [])

  const resetAllStats = useCallback(() => {
    setCombo(0)
    setMaxCombo(0)
    setTotalCombos(0)
    setShowCombo(false)
    setLastMatchTime(0)
  }, [])

  const hideCombo = useCallback(() => {
    setShowCombo(false)
  }, [])

  return {
    combo,
    maxCombo,
    totalCombos,
    showCombo,
    handleMatch,
    resetCombo,
    resetAllStats,
    hideCombo,
    setShowCombo,
  }
}
