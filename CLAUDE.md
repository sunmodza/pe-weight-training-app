# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PE Weight is a mobile-first Next.js PWA for a structured 60-minute beginner bodyweight workout program with automatic timer progression. The app is offline-first using LocalStorage only, with no external dependencies or server communication.

## Development Commands

```bash
# Development server with turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint
```

## Architecture

### Core Structure
- **Framework**: Next.js 15.4.4 with App Router
- **Language**: TypeScript with strict typing
- **Styling**: Tailwind CSS v4
- **State Management**: React hooks (useState/useReducer) - no external state libraries
- **Data Storage**: LocalStorage only via `StorageAPI` class
- **PWA**: next-pwa for offline functionality

### File Organization
```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with PWA meta tags
│   └── page.tsx           # Main app state machine
├── components/            # React components
├── data/                  # Static workout program data
├── hooks/                 # Custom hooks (useTimer)
├── lib/                   # Utilities (StorageAPI)
└── types/                 # TypeScript interfaces
```

### Key Components
- `page.tsx`: Main state machine managing app flow (profile → timer → summary → history)
- `WorkoutTimer`: Core timer component with auto-progression
- `UserProfileForm`: BMI calculation and user data collection
- `WorkoutSummary`: Post-workout results and calorie estimation
- `WorkoutHistory`: Historical data display

### Data Models
- `UserProfile`: Age, weight, height, BMI calculations
- `WorkoutSession`: Complete workout records with exercise logs
- `Exercise`: Individual exercise definitions with timing and instructions
- `TimerState`: Real-time timer state management

### Timer System
- **Auto-progression**: 60-minute structured workout (warmup: 10min, main: 43min, cooldown: 7min)
- **Precision**: 100ms update intervals using `requestAnimationFrame` principles
- **Controls**: Large center pause/resume button, small skip arrows in corners
- **Data**: Hard-coded workout program in `workout-program.ts`

### Storage Strategy
- All data persists in browser LocalStorage via `StorageAPI` class
- No external APIs, databases, or authentication
- Supports data export/import for backup
- Privacy-focused: data never leaves user's device

## Technical Specifications

### Mobile-First Design
- Portrait orientation primary
- Touch targets minimum 44px
- Optimized for 375px-414px screens
- PWA installable with offline capability

### Performance Requirements
- Timer accuracy: ±100ms tolerance
- First load: <3 seconds
- Runtime: 60fps animations, <50MB memory
- Bundle size: <2MB

### Browser Support
- Modern browsers: Chrome 80+, Safari 13+, Firefox 75+, Edge 80+
- Requires JavaScript and LocalStorage (minimum 5MB)

## Development Guidelines

### Code Conventions
- TypeScript strict mode enabled
- Tailwind CSS for all styling
- Mobile-first responsive design patterns
- Functional components with hooks
- Error boundaries for timer operations

### Key Functions to Understand
- `useTimer()` hook: Core timer logic with auto-progression
- `StorageAPI`: All LocalStorage operations with proper serialization
- `getExerciseAtTime()`: Determines current exercise based on elapsed time
- BMI calculations and calorie estimation algorithms

### Testing Focus Areas
- Timer precision over 60-minute duration
- LocalStorage data persistence
- Mobile UI/UX during active workout
- PWA offline functionality
- Cross-browser compatibility

### Constraints
- Single workout program: "Beginner Full-body Bodyweight" (60 minutes exactly)
- No customization UI (program changes require code modification)
- No external dependencies beyond specified tech stack
- Thai language primary with English fallbacks

## Workout Program Structure

The workout is hard-coded with precise timing:
- **Warmup** (10 min): 6 exercises (marching, arm circles, leg swings, torso twists, knee raises, squats)
- **Main** (43 min): 6 exercises with sets and rest periods (wall push-ups, chair squats, modified plank, knee raises, wall sit, calf raises)
- **Cooldown** (7 min): 5 exercises (walking, stretches, breathing)

All exercise data is defined in `src/data/workout-program.ts` with Thai/English names, durations, sets, reps, and instructions.