"use client"

import { useCallback, useRef } from "react"

export function useAudio() {
  const audioContext = useRef<AudioContext | null>(null)

  const initAudio = useCallback(() => {
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }, [])

  const playFlipSound = useCallback(() => {
    initAudio()
    if (!audioContext.current) return

    // Create a satisfying, harmonious flip sound similar to match sound but shorter
    const fundamentalFreq = 392 // G4 - a pleasant, mid-range frequency
    const majorThird = fundamentalFreq * 1.25 // B4
    const perfectFifth = fundamentalFreq * 1.5 // D5

    // Create oscillators for a major chord (shorter duration than match)
    const osc1 = audioContext.current.createOscillator()
    const osc2 = audioContext.current.createOscillator()
    const osc3 = audioContext.current.createOscillator()
    const gainNode = audioContext.current.createGain()
    const filterNode = audioContext.current.createBiquadFilter()

    // Set up filter for warm, pleasant sound
    filterNode.type = 'lowpass'
    filterNode.frequency.setValueAtTime(2500, audioContext.current.currentTime)
    filterNode.Q.setValueAtTime(0.8, audioContext.current.currentTime)

    // Connect all oscillators
    osc1.connect(gainNode)
    osc2.connect(gainNode)
    osc3.connect(gainNode)
    gainNode.connect(filterNode)
    filterNode.connect(audioContext.current.destination)

    // Set waveforms and frequencies for a rich, satisfying sound
    osc1.type = 'sine'
    osc2.type = 'triangle'
    osc3.type = 'sine'

    osc1.frequency.setValueAtTime(fundamentalFreq, audioContext.current.currentTime)
    osc2.frequency.setValueAtTime(majorThird, audioContext.current.currentTime)
    osc3.frequency.setValueAtTime(perfectFifth, audioContext.current.currentTime)

    // Quick, satisfying envelope - shorter than match sound
    gainNode.gain.setValueAtTime(0, audioContext.current.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.08, audioContext.current.currentTime + 0.005)
    gainNode.gain.exponentialRampToValueAtTime(0.04, audioContext.current.currentTime + 0.05)
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.current.currentTime + 0.2)

    osc1.start(audioContext.current.currentTime)
    osc2.start(audioContext.current.currentTime)
    osc3.start(audioContext.current.currentTime)
    osc1.stop(audioContext.current.currentTime + 0.2)
    osc2.stop(audioContext.current.currentTime + 0.2)
    osc3.stop(audioContext.current.currentTime + 0.2)
  }, [initAudio])

  const playMatchSound = useCallback(() => {
    initAudio()
    if (!audioContext.current) return

    // Create a pleasant, harmonious match sound
    const fundamentalFreq = 523.25 // C5
    const majorThird = fundamentalFreq * 1.25 // E5
    const perfectFifth = fundamentalFreq * 1.5 // G5

    // Create oscillators for a major chord
    const osc1 = audioContext.current.createOscillator()
    const osc2 = audioContext.current.createOscillator()
    const osc3 = audioContext.current.createOscillator()
    const gainNode = audioContext.current.createGain()
    const filterNode = audioContext.current.createBiquadFilter()

    // Set up filter
    filterNode.type = 'lowpass'
    filterNode.frequency.setValueAtTime(3000, audioContext.current.currentTime)
    filterNode.Q.setValueAtTime(1, audioContext.current.currentTime)

    // Connect all oscillators
    osc1.connect(gainNode)
    osc2.connect(gainNode)
    osc3.connect(gainNode)
    gainNode.connect(filterNode)
    filterNode.connect(audioContext.current.destination)

    // Set waveforms and frequencies for a rich, warm sound
    osc1.type = 'sine'
    osc2.type = 'triangle'
    osc3.type = 'sine'

    osc1.frequency.setValueAtTime(fundamentalFreq, audioContext.current.currentTime)
    osc2.frequency.setValueAtTime(majorThird, audioContext.current.currentTime)
    osc3.frequency.setValueAtTime(perfectFifth, audioContext.current.currentTime)

    // Create a pleasant bell-like envelope
    gainNode.gain.setValueAtTime(0, audioContext.current.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.12, audioContext.current.currentTime + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.08, audioContext.current.currentTime + 0.1)
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.current.currentTime + 0.4)

    osc1.start(audioContext.current.currentTime)
    osc2.start(audioContext.current.currentTime)
    osc3.start(audioContext.current.currentTime)
    osc1.stop(audioContext.current.currentTime + 0.4)
    osc2.stop(audioContext.current.currentTime + 0.4)
    osc3.stop(audioContext.current.currentTime + 0.4)
  }, [initAudio])

  const playWinSound = useCallback(() => {
    initAudio()
    if (!audioContext.current) return

    // Create a triumphant ascending arpeggio with rich harmonics
    const baseFreq = 261.63 // C4
    const melody = [
      baseFreq,           // C4
      baseFreq * 1.25,    // E4
      baseFreq * 1.5,     // G4
      baseFreq * 2,       // C5
      baseFreq * 2.5,     // E5
      baseFreq * 3        // G5
    ]

    melody.forEach((freq, index) => {
      // Main oscillator
      const mainOsc = audioContext.current!.createOscillator()
      const harmonic = audioContext.current!.createOscillator()
      const gainNode = audioContext.current!.createGain()
      const filterNode = audioContext.current!.createBiquadFilter()

      // Set up filter for sparkly sound
      filterNode.type = 'bandpass'
      filterNode.frequency.setValueAtTime(freq * 2, audioContext.current!.currentTime + index * 0.12)
      filterNode.Q.setValueAtTime(2, audioContext.current!.currentTime + index * 0.12)

      mainOsc.connect(gainNode)
      harmonic.connect(gainNode)
      gainNode.connect(filterNode)
      filterNode.connect(audioContext.current!.destination)

      // Main tone
      mainOsc.type = 'triangle'
      mainOsc.frequency.setValueAtTime(freq, audioContext.current!.currentTime + index * 0.12)

      // Harmonic for richness
      harmonic.type = 'sine'
      harmonic.frequency.setValueAtTime(freq * 2, audioContext.current!.currentTime + index * 0.12)

      // Beautiful envelope with sparkle
      const startTime = audioContext.current!.currentTime + index * 0.12
      gainNode.gain.setValueAtTime(0, startTime)
      gainNode.gain.linearRampToValueAtTime(0.15, startTime + 0.02)
      gainNode.gain.exponentialRampToValueAtTime(0.05, startTime + 0.15)
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.6)

      mainOsc.start(startTime)
      harmonic.start(startTime)
      mainOsc.stop(startTime + 0.6)
      harmonic.stop(startTime + 0.6)
    })
  }, [initAudio])

  const playComboSound = useCallback(() => {
    initAudio()
    if (!audioContext.current) return

    // Create an exciting, energetic combo sound with whoosh effect
    const oscillator1 = audioContext.current.createOscillator()
    const oscillator2 = audioContext.current.createOscillator()
    const noiseBuffer = audioContext.current.createBuffer(1, audioContext.current.sampleRate * 0.1, audioContext.current.sampleRate)
    const noiseSource = audioContext.current.createBufferSource()
    const gainNode1 = audioContext.current.createGain()
    const gainNode2 = audioContext.current.createGain()
    const noiseGain = audioContext.current.createGain()
    const filterNode = audioContext.current.createBiquadFilter()

    // Create white noise for whoosh effect
    const channelData = noiseBuffer.getChannelData(0)
    for (let i = 0; i < channelData.length; i++) {
      channelData[i] = Math.random() * 2 - 1
    }
    noiseSource.buffer = noiseBuffer

    // Set up high-pass filter for crisp noise
    filterNode.type = 'highpass'
    filterNode.frequency.setValueAtTime(2000, audioContext.current.currentTime)
    filterNode.frequency.exponentialRampToValueAtTime(4000, audioContext.current.currentTime + 0.25)

    // Connect nodes
    oscillator1.connect(gainNode1)
    oscillator2.connect(gainNode2)
    noiseSource.connect(noiseGain)
    gainNode1.connect(audioContext.current.destination)
    gainNode2.connect(audioContext.current.destination)
    noiseGain.connect(filterNode)
    filterNode.connect(audioContext.current.destination)

    // Main rising tone
    oscillator1.type = 'sawtooth'
    oscillator1.frequency.setValueAtTime(800, audioContext.current.currentTime)
    oscillator1.frequency.exponentialRampToValueAtTime(1600, audioContext.current.currentTime + 0.25)

    // Harmonic for excitement
    oscillator2.type = 'triangle'
    oscillator2.frequency.setValueAtTime(1200, audioContext.current.currentTime)
    oscillator2.frequency.exponentialRampToValueAtTime(2400, audioContext.current.currentTime + 0.25)

    // Volume envelopes
    gainNode1.gain.setValueAtTime(0, audioContext.current.currentTime)
    gainNode1.gain.linearRampToValueAtTime(0.15, audioContext.current.currentTime + 0.02)
    gainNode1.gain.exponentialRampToValueAtTime(0.001, audioContext.current.currentTime + 0.25)

    gainNode2.gain.setValueAtTime(0, audioContext.current.currentTime)
    gainNode2.gain.linearRampToValueAtTime(0.08, audioContext.current.currentTime + 0.02)
    gainNode2.gain.exponentialRampToValueAtTime(0.001, audioContext.current.currentTime + 0.25)

    // Noise whoosh
    noiseGain.gain.setValueAtTime(0, audioContext.current.currentTime)
    noiseGain.gain.linearRampToValueAtTime(0.05, audioContext.current.currentTime + 0.01)
    noiseGain.gain.exponentialRampToValueAtTime(0.001, audioContext.current.currentTime + 0.1)

    oscillator1.start(audioContext.current.currentTime)
    oscillator2.start(audioContext.current.currentTime)
    noiseSource.start(audioContext.current.currentTime)
    oscillator1.stop(audioContext.current.currentTime + 0.25)
    oscillator2.stop(audioContext.current.currentTime + 0.25)
    noiseSource.stop(audioContext.current.currentTime + 0.1)
  }, [initAudio])

  return {
    playFlipSound,
    playMatchSound,
    playWinSound,
    playComboSound,
  }
}
