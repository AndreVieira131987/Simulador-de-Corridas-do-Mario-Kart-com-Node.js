import { useEffect, useState } from 'react'
import './RaceLog.css'

const blockLabel = { RETA: '🛣️ RETA', CURVA: '↩️ CURVA', CONFRONTO: '🥊 CONFRONTO' }

const eventClass = {
    roll: 'ev-roll',
    item: 'ev-item',
    confronto: 'ev-confronto',
    turbo: 'ev-turbo',
    noturbo: 'ev-noturbo',
    point: 'ev-point',
    tie: 'ev-tie',
}

export default function RaceLog({ result, p1, p2, onFinish }) {
    const [shownCount, setShownCount] = useState(0)
    const rounds = result.rounds
    const done = shownCount >= rounds.length

    useEffect(() => {
        if (shownCount >= rounds.length) return
        const timer = setTimeout(() => {
            setShownCount(prev => prev + 1)
        }, 1200)
        return () => clearTimeout(timer)
    }, [shownCount, rounds.length])

    const visibleRounds = rounds.slice(0, shownCount)

    return (
        <div className="race-log-screen">
            <div className="race-header">
                <div className="racer">
                    <img src={p1.img} alt={p1.name} />
                    <span>{p1.name}</span>
                </div>
                <span className="race-vs">VS</span>
                <div className="racer">
                    <img src={p2.img} alt={p2.name} />
                    <span>{p2.name}</span>
                </div>
            </div>

            <div className="rounds-list">
                {visibleRounds.map(r => (
                    <div key={r.round} className="round-card">
                        <div className="round-title">
                            <span className="round-num">Rodada {r.round}</span>
                            <span className="block-badge">{blockLabel[r.block]}</span>
                        </div>
                        <ul className="events-list">
                            {r.events.map((ev, i) => (
                                <li key={i} className={`event ${eventClass[ev.type] || ''}`}>{ev.text}</li>
                            ))}
                        </ul>
                        <div className="round-score">
                            Placar: <strong>{p1.name} {r.score1}</strong> × <strong>{r.score2} {p2.name}</strong>
                        </div>
                    </div>
                ))}
            </div>

            {!done && (
                <div className="loading-msg">⏳ Rodada {shownCount + 1} de {rounds.length}...</div>
            )}

            {done && (
                <button className="finish-btn" onClick={onFinish}>
                    🏆 Ver Resultado Final
                </button>
            )}
        </div>
    )
}
