import './PlayerSelector.css'

export default function PlayerSelector({ players, selected1, selected2, onSelect1, onSelect2, onStart }) {
    const canStart = selected1 !== null && selected2 !== null && selected1 !== selected2

    return (
        <div className="selector-screen">
            <img src="/docs/header.gif" alt="Mario Kart" className="header-gif" />
            <h1 className="title">Mario Kart.JS</h1>
            <p className="subtitle">Escolha os personagens e vamos correr!</p>

            <div className="players-pick">
                <div className="pick-column">
                    <h2 className="pick-label">🕹️ Player 1</h2>
                    <div className="cards-grid">
                        {players.map(p => (
                            <button
                                key={p.id}
                                className={`card ${selected1 === p.id ? 'selected-p1' : ''} ${selected2 === p.id ? 'taken' : ''}`}
                                onClick={() => selected2 !== p.id && onSelect1(p.id)}
                                disabled={selected2 === p.id}
                                title={selected2 === p.id ? "Escolhido pelo Player 2" : p.name}
                            >
                                <img src={p.img} alt={p.name} className="card-gif" />
                                <p className="card-name">{p.name}</p>
                                <div className="card-stats">
                                    <span>⚡ {p.velocity}</span>
                                    <span>🔄 {p.maneuverability}</span>
                                    <span>💪 {p.power}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="vs-divider">VS</div>

                <div className="pick-column">
                    <h2 className="pick-label">🕹️ Player 2</h2>
                    <div className="cards-grid">
                        {players.map(p => (
                            <button
                                key={p.id}
                                className={`card ${selected2 === p.id ? 'selected-p2' : ''} ${selected1 === p.id ? 'taken' : ''}`}
                                onClick={() => selected1 !== p.id && onSelect2(p.id)}
                                disabled={selected1 === p.id}
                                title={selected1 === p.id ? "Escolhido pelo Player 1" : p.name}
                            >
                                <img src={p.img} alt={p.name} className="card-gif" />
                                <p className="card-name">{p.name}</p>
                                <div className="card-stats">
                                    <span>⚡ {p.velocity}</span>
                                    <span>🔄 {p.maneuverability}</span>
                                    <span>💪 {p.power}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <button className="start-btn" onClick={onStart} disabled={!canStart}>
                {canStart ? '🏁 Iniciar Corrida!' : 'Escolha os dois personagens'}
            </button>
        </div>
    )
}
