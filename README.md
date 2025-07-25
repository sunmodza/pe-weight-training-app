# PE Weight - Beginner Bodyweight Workout Timer App

A mobile-first web application for a structured 60-minute beginner bodyweight workout program with automatic timer progression.

## Features

### Core Features
- **Auto-Timer System**: 60-minute workout with automatic progression through exercises
- **User Profile**: BMI calculation and personalized recommendations  
- **Mobile-First Design**: Optimized for mobile devices with touch-friendly controls
- **Offline Capability**: PWA features for offline usage
- **Progress Tracking**: Workout history and statistics
- **LocalStorage Only**: No external servers, all data stored locally

### Workout Program
- **Duration**: Exactly 60 minutes
- **Structure**: 
  - Warmup: 10 minutes (6 exercises)
  - Main workout: 43 minutes (6 exercises with sets and rest periods)
  - Cooldown: 7 minutes (5 exercises)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser.

### Building for Production

```bash
npm run build
npm start
```

## Usage

1. **First Time Setup**: Enter your age, weight, and height for BMI calculation
2. **Start Workout**: Tap "เริ่มออกกำลังกาย" to begin the 60-minute program  
3. **During Workout**: 
   - Timer runs automatically through all exercises
   - Use pause/resume button in center of screen
   - Skip buttons available in top corners
4. **After Workout**: View summary with calories burned and completion percentage
5. **Track Progress**: Access workout history and statistics

## Technical Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **PWA**: next-pwa
- **Storage**: LocalStorage only

## Key Features

### Timer Controls
- **Auto-progression**: Automatically moves through exercises
- **Pause/Resume**: Large center button for easy access
- **Manual navigation**: Skip forward/backward buttons
- **Progress bar**: Visual indication of workout completion

### Data Privacy
- All data stored locally in browser's LocalStorage
- No external APIs or data transmission
- User has full control over their data

### Mobile Optimization
- Portrait orientation focused
- Touch targets minimum 44px
- Readable text from distance
- PWA installable on home screen

## Browser Support

- Chrome 80+
- Safari 13+
- Firefox 75+
- Edge 80+

Requires JavaScript enabled and LocalStorage support.
