"use client"

import { useState, useCallback } from "react"
import type { ParticleEffect } from "../types"

export function useParticleEffects() {
  const [particleEffects, setParticleEffects] = useState<ParticleEffect[]>([])

  const createParticleEffect = useCallback((cardId: number): ParticleEffect | null => {
    const element = document.querySelector(`[data-card-id="${cardId}"]`) as HTMLElement
    if (!element) return null

    const rect = element.getBoundingClientRect()
    return {
      show: true,
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      id: `match-${cardId}-${Date.now()}`,
    }
  }, [])

  const triggerParticleEffects = useCallback((cardIds: number[]) => {
    const effects = cardIds
      .map(createParticleEffect)
      .filter((effect): effect is ParticleEffect => effect !== null)
    
    setParticleEffects(effects)
  }, [createParticleEffect])

  const removeParticleEffect = useCallback((id: string) => {
    setParticleEffects((prev) => prev.filter((effect) => effect.id !== id))
  }, [])

  const clearAllParticleEffects = useCallback(() => {
    setParticleEffects([])
  }, [])

  return {
    particleEffects,
    triggerParticleEffects,
    removeParticleEffect,
    clearAllParticleEffects,
  }
}
