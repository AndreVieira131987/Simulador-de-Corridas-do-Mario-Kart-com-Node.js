import { useState, useRef, useEffect } from 'react'
import { players } from './data/players'
import { runRace } from './engine/raceEngine'
import PlayerSelector from './components/PlayerSelector'
import RaceLog from './components/RaceLog'
import ResultScreen from './components/ResultScreen'
import './App.css'

export default function App() {
  const [screen, setScreen] = useState('select') // 'select' | 'race' | 'result'
  const [sel1, setSel1] = useState(null)
  const [sel2, setSel2] = useState(null)
  const [raceResult, setRaceResult] = useState(null)

  const audioRef = useRef(null)

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio('/docs/1-05. Mario Circuit.mp3')
    audioRef.current.loop = true
    audioRef.current.volume = 0.5 // Set to 50% volume for better experience
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  function handleStart() {
    const p1 = players[sel1]
    const p2 = players[sel2]
    const result = runRace(p1, p2)
    setRaceResult(result)
    setScreen('race')

    // Resume/start audio
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio autoplay prevented:', e))
    }
  }

  function handleFinish() {
    setScreen('result')
  }

  function handleRestart() {
    setSel1(null)
    setSel2(null)
    setRaceResult(null)
    setScreen('select')
  }

  return (
    <div className="app">
      {/* Optional: Add a mute toggle if needed, or simply let it autoplay after interaction */}
      {screen === 'select' && (
        <PlayerSelector
          players={players}
          selected1={sel1}
          selected2={sel2}
          onSelect1={setSel1}
          onSelect2={setSel2}
          onStart={handleStart}
        />
      )}
      {screen === 'race' && raceResult && (
        <RaceLog
          result={raceResult}
          p1={players[sel1]}
          p2={players[sel2]}
          onFinish={handleFinish}
        />
      )}
      {screen === 'result' && raceResult && (
        <ResultScreen
          result={raceResult}
          p1={players[sel1]}
          p2={players[sel2]}
          onRestart={handleRestart}
        />
      )}
    </div>
  )
}
