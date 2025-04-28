# 🤖 Robot Recognition Game

A fun and challenging memory game built with Preact where players test their robot recognition skills.

## 🎮 Game Description

Robot Recognition Game is an engaging memory game where players need to:
1. Memorize robots and their names within a 5-second time limit
2. Match the correct robot name with the displayed image
3. Progress through increasing difficulty levels
4. Compete for high scores on the leaderboard

## 🚀 Features

- **Progressive Difficulty**: Game becomes more challenging as players advance
  - Starting with 3 robots at level 1
  - Additional robots introduced in higher levels
  - Maximum of 6 unique robots

- **Dynamic Scoring System**
  - Score calculation: `level × 100` points per correct match
  - Level advancement every 300 points
  - High score tracking with local storage persistence

- **Responsive Design**
  - Fluid layout adapting to different screen sizes
  - Touch-friendly interface
  - Smooth animations and transitions

## 🛠️ Technical Stack

- **Frontend Framework**: Preact
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: CSS with modern features
  - Flexbox/Grid layouts
  - CSS animations
  - Backdrop filters
  - Responsive design

## 🎯 Game Mechanics

1. **Preview Phase**
   - Display robots with names for 5 seconds
   - Visual countdown timer
   - Progress bar indication

2. **Guess Phase**
   - Show random robot image
   - Present name options for selection
   - Immediate feedback on guess

3. **Scoring System**
   - Points based on current level
   - Progressive difficulty scaling
   - Local storage for high scores

## 🚀 Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## 🎨 Featured Robots

- WALL-E
- R2-D2
- Baymax
- Optimus Prime
- BB-8
- C-3PO

## 🔧 Development

The game is built with modern web technologies and follows best practices:
- TypeScript for type safety
- Component-based architecture
- State management with React hooks
- Responsive design principles
- Progressive enhancement

## 🎮 How to Play

1. Click "Start Game" to begin
2. Memorize the robots and their names in 5 seconds
3. Match the displayed robot with its correct name
4. Try to achieve the highest score possible
5. Enter your name to save your high score

## 📱 Responsive Design

The game is fully responsive and works across:
- Desktop computers
- Tablets
- Mobile devices

## 🏆 Future Enhancements

- Additional robot characters
- Sound effects and background music
- Multiple game modes
- Online leaderboard
- Multiplayer support

## 📄 License

This project is open source and available under the MIT License.
