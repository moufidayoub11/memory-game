# Memory Game 🧠

A polished memory card matching game that I built to explore modern React patterns and create something genuinely fun to play. What started as a simple card-matching concept evolved into a feature-rich game with combos, particle effects, and a surprisingly sophisticated audio system.

## Why I Built This

I wanted to challenge myself with:
- Clean, modular React architecture using custom hooks
- Advanced Web Audio API for dynamic sound generation
- Smooth animations and visual feedback
- TypeScript for better development experience
- Creating something that feels professional and polished

## What Makes It Special

🎵 **Dynamic Audio System** - No audio files! Everything is synthesized in real-time using Web Audio API with proper musical theory (major chords, harmonic progressions)

🎯 **Smart Combo System** - Chain matches within 3 seconds for bonus effects and better scores

⭐ **Intelligent Star Rating** - Your rating considers time, moves, AND combo performance - great combo chains can boost even slower games

🎨 **Thoughtful UX** - Every interaction has visual and audio feedback, with smooth animations that never feel janky

🏗️ **Clean Architecture** - Refactored from a 189-line monolithic hook into 5 focused, testable hooks following single responsibility principle

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000 and start playing!

## How to Play

1. **Choose your difficulty** - Easy (4×4), Medium (6×4), or Hard (6×6)
2. **Memorize the preview** - Cards show briefly when you start
3. **Find matching pairs** - Click cards to flip and match emojis
4. **Chain combos** - Match pairs quickly (within 3 seconds) for bonus effects
5. **Earn stars** - Performance is rated on time, moves, and combo skill

The game tracks your attempts and best scores locally.

## Technical Highlights

### Architecture Decision: Custom Hooks

I split the game logic into focused hooks instead of one massive component:

```typescript
useGameLogic()        // Orchestrates everything
├── useGameState()    // Cards, moves, game status
├── useComboSystem()  // Combo detection and timing
├── useParticleEffects() // Celebration particles
├── useCardInteraction() // Click handling
├── useGameCompletion()  // Win conditions
└── useAudio()        // Sound synthesis
```

This makes the code much easier to test, debug, and extend.

### Audio System Deep Dive

Rather than using audio files, everything is synthesized with Web Audio API:

```typescript
// Card flip: Pleasant G major chord
const fundamentalFreq = 392    // G4
const majorThird = freq * 1.25 // B4  
const perfectFifth = freq * 1.5 // D5

// Creates rich, musical feedback that never gets annoying
```

### Star Rating Algorithm

The rating system is more nuanced than just time/moves:

- **Base performance**: Time and move efficiency per difficulty
- **Combo bonuses**: Epic combos (5+) guarantee 3 stars
- **Consistency rewards**: Multiple combo chains boost rating
- **Balanced scoring**: Great combo play can overcome slower times

### Project Structure

```
components/
├── ui/              # Reusable components (Button, Card)
├── GameCard.tsx     # Individual flip card
├── GameGrid.tsx     # Card layout logic
├── WinScreen.tsx    # Victory celebration
└── RestartButton.tsx # Appears after win popup closes

hooks/
├── useGameLogic.ts  # Main coordinator
├── useComboSystem.ts # 3-second combo windows
├── useAudio.ts      # Web Audio synthesis
└── ...

utils/
├── gameConfig.ts    # Difficulty settings
└── constants.ts     # Timing constants
```

## Tech Stack

- **Next.js 15** - React framework with app directory
- **React 19** - UI library with latest concurrent features  
- **TypeScript** - Type safety and better DX
- **Tailwind CSS** - Utility-first styling with custom classes
- **Web Audio API** - Real-time audio synthesis

## Performance Notes

- Components are memoized to prevent unnecessary re-renders
- State updates use functional patterns to avoid stale closures
- Card flip animations use CSS transforms (hardware accelerated)
- Audio context is reused across all sound generation
- Local storage efficiently tracks game history and try counter

## Development Experience

The codebase prioritizes maintainability:
- Full TypeScript coverage with strict checking
- Clean separation of concerns via custom hooks
- No prop drilling - clean data flow
- Easy to extend with new features
- Well-documented interfaces and types

## What I Learned

Building this taught me a lot about:
- Advanced React patterns and hook composition
- Web Audio API and digital audio synthesis
- Complex state management without external libraries
- Creating smooth, responsive animations
- Balancing feature richness with code simplicity

## Future Ideas

Some things I'd like to add:
- Keyboard navigation for accessibility
- PWA features for offline play
- Settings panel (volume, theme options)
- More visual themes
- Analytics to understand player behavior

## License

MIT - feel free to use this code for learning or your own projects.
