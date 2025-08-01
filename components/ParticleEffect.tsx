"use client"

import { useEffect, useState } from "react"

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  color: string
}

interface ParticleEffectProps {
  triggers: Array<{ show: boolean; x: number; y: number; id: string }>
  onComplete: (id: string) => void
}

export function ParticleEffect({ triggers, onComplete }: ParticleEffectProps) {
  const [particleSets, setParticleSets] = useState<Record<string, Particle[]>>({})

  useEffect(() => {
    triggers.forEach((trigger) => {
      if (!trigger.show || particleSets[trigger.id]) return

      const colors = ["#fbbf24", "#f59e0b", "#d97706", "#92400e", "#78350f"]
      const newParticles: Particle[] = []

      for (let i = 0; i < 8; i++) {
        newParticles.push({
          id: i,
          x: trigger.x,
          y: trigger.y,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          life: 45,
          maxLife: 45,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }

      setParticleSets((prev) => ({ ...prev, [trigger.id]: newParticles }))

      const animate = () => {
        setParticleSets((prev) => {
          const updated = { ...prev }
          const particles = updated[trigger.id]

          if (!particles) return prev

          const newParticles = particles
            .map((particle) => ({
              ...particle,
              x: particle.x + particle.vx,
              y: particle.y + particle.vy,
              vx: particle.vx * 0.98,
              vy: particle.vy * 0.98 + 0.1,
              life: particle.life - 1,
            }))
            .filter((particle) => particle.life > 0)

          if (newParticles.length === 0) {
            delete updated[trigger.id]
            setTimeout(() => onComplete(trigger.id), 0)
            return updated
          }

          updated[trigger.id] = newParticles
          return updated
        })
      }

      const interval = setInterval(animate, 16)
      setTimeout(() => clearInterval(interval), 1000)
    })
  }, [triggers, particleSets, onComplete])

  const allParticles = Object.values(particleSets).flat()

  if (allParticles.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {allParticles.map((particle, index) => (
        <div
          key={`${particle.id}-${index}`}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            backgroundColor: particle.color,
            opacity: particle.life / particle.maxLife,
            transform: `scale(${particle.life / particle.maxLife})`,
          }}
        />
      ))}
    </div>
  )
}
