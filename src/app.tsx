import { useState, useEffect } from 'preact/hooks'
import './app.css'

interface Robot {
  name: string;
  imageUrl: string;
}

interface Score {
  name: string;
  score: number;
  date: string;
}

enum GameMode {
  Idle,
  Preview,
  Guess,
  GameOver
}

const ProgressBar = ({ progress }: { progress: number }) => (
  <div class="progress-container">
    <div
      class="progress-bar"
      style={{ width: `${(progress / 5) * 100}%` }}
    />
  </div>
)

export function App() {
  const [gameState, setGameState] = useState<GameMode>(GameMode.Idle)
  const [countdown, setCountdown] = useState(5)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [selectedRobot, setSelectedRobot] = useState<Robot | null>(null)
  const [options, setOptions] = useState<Robot[]>([])
  const [playerName, setPlayerName] = useState('')
  const [highScores, setHighScores] = useState<Score[]>(() => {
    const saved = localStorage.getItem('robotGameHighScores')
    return saved ? JSON.parse(saved) : []
  })

  const robots: Robot[] = [
    {
      name: "WALL-E",
      imageUrl: "/robot-3.png"
    },
    {
      name: "R2-D2",
      imageUrl: "/robot-4.png"
    },
    {
      name: "Baymax",
      imageUrl: "/robot-2.png"
    },
    {
      name: "Optimus Prime",
      imageUrl: "/optimus-prime.png"
    },
    {
      name: "BB-8",
      imageUrl: "/robot-5.png"
    },
    {
      name: "C-3PO",
      imageUrl: "/robot-6.png"
    }
  ]

  useEffect(() => {
    if (gameState === GameMode.Preview) {
      startNewRound()
    }
  }, [level])

  const startNewRound = () => {
    const numOptions = Math.min(3 + level, robots.length)
    const shuffled = [...robots].sort(() => 0.5 - Math.random())
    const roundRobots = shuffled.slice(0, numOptions)
    setOptions(roundRobots)
    setSelectedRobot(roundRobots[Math.floor(Math.random() * roundRobots.length)])
    setGameState(GameMode.Preview)
    setCountdown(5)

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setGameState(GameMode.Guess)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }

  const handleGuess = (robot: Robot) => {
    if (robot.name === selectedRobot?.name) {
      const newScore = score + (level * 100)
      setScore(newScore)

      if (newScore > 0 && newScore % 300 === 0) {
        setLevel(prev => prev + 1)
      }
      startNewRound()
    } else {
      setGameState(GameMode.GameOver)
    }
  }

  const handleGameOver = () => {
    if (playerName.trim()) {
      const newHighScore: Score = {
        name: playerName,
        score: score,
        date: new Date().toLocaleDateString()
      }

      if (score > 0) {
        const updatedScores = [...highScores, newHighScore]
          .sort((a, b) => b.score - a.score)

        setHighScores(updatedScores)
        localStorage.setItem('robotGameHighScores', JSON.stringify(updatedScores))
      }

      setGameState(GameMode.Idle)
      setScore(0)
      setLevel(1)
      setPlayerName('')
    }
  }

  const startGame = () => {
    setScore(0)
    setLevel(1)
    setGameState(GameMode.Preview)
    startNewRound()
  }

  return (
    <div class="container">
      <div class="overlay" />
      {gameState !== GameMode.Idle && <div class="game-info">
        <div class="score">Score: {score}</div>
        <div class="level">Level: {level}</div>
      </div>}

      <h1 class="title">🎮 Robot Recognition Game</h1>

      <div class="card">
        {gameState === GameMode.Idle ? (
          <div class="start-screen">
            <h2>🤖 Welcome to Robot Recognition Game!</h2>
            <p>Memorize the robots and their names in 5 seconds, then match the correct name with the image.</p>
            <button class="play-button" onClick={startGame}>
              Start Game
            </button>
          </div>
        ) : gameState === GameMode.Preview ? (
          <div class="preview-container">
            <h2>Memorize the Robots! {countdown}s</h2>
            <ProgressBar progress={countdown} />
            <div class="robots-grid">
              {options.map(robot => (
                <div class="robot-card" key={robot.name}>
                  <img src={robot.imageUrl} alt={robot.name} class="robot-image" />
                  <div class="robot-name">{robot.name}</div>
                </div>
              ))}
            </div>
          </div>
        ) : gameState === GameMode.Guess ? (
          <div class="guess-container">
            <h2>Match this robot!</h2>
            <div class="robot-image-container">
              <img
                src={selectedRobot?.imageUrl}
                alt="Robot to match"
                class="robot-image"
              />
            </div>
            <div class="options-grid">
              {options.map(robot => (
                <button
                  key={robot.name}
                  onClick={() => handleGuess(robot)}
                  class="option-button"
                >
                  {robot.name}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div class="gameover-screen">
            <h2>Game Over!</h2>
            <p>Your Score: {score}</p>
            <div class="name-input-container">
              <input
                type="text"
                value={playerName}
                onInput={(e) => setPlayerName((e.target as HTMLInputElement).value)}
                placeholder="Enter your name"
                class="name-input"
              />
              <button
                class="submit-score-button"
                onClick={handleGameOver}
                disabled={!playerName.trim()}
              >
                Submit Score
              </button>
            </div>
          </div>
        )}
      </div>

      <div class="leaderboard">
        <h2>🏆 Leaderboard</h2>
        <div class="scores-list">
          {highScores.map((score, index) => (
            <div class="score-item" key={index}>
              <span class="score-name">👨🏻‍💼 {score.name}</span>
              <span>🎯 {score.score}</span>
              <span>{score.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
