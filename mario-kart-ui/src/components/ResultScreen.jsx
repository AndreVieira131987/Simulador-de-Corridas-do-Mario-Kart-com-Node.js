import './ResultScreen.css'

export default function ResultScreen({ result, p1, p2, onRestart }) {
    const { final } = result
    const winner = final.winner

    return (
        <div className="result-screen">
            <h2 className="result-title">🏁 Fim da Corrida!</h2>

            <div className="result-players">
                <div className={`result-card ${winner === p1.name ? 'winner' : winner ? 'loser' : 'draw'}`}>
                    <img src={p1.img} alt={p1.name} className="result-gif" />
                    <p className="result-name">{p1.name}</p>
                    <p className="result-points">{final.p1.points} pt{final.p1.points !== 1 ? 's' : ''}</p>
                    {winner === p1.name && <span className="trophy">🏆 Vencedor!</span>}
                </div>

                <div className="result-vs">VS</div>

                <div className={`result-card ${winner === p2.name ? 'winner' : winner ? 'loser' : 'draw'}`}>
                    <img src={p2.img} alt={p2.name} className="result-gif" />
                    <p className="result-name">{p2.name}</p>
                    <p className="result-points">{final.p2.points} pt{final.p2.points !== 1 ? 's' : ''}</p>
                    {winner === p2.name && <span className="trophy">🏆 Vencedor!</span>}
                </div>
            </div>

            {!winner && <p className="draw-msg">🤝 Empate! Ninguém ganhou desta vez.</p>}

            <button className="restart-btn" onClick={onRestart}>
                🔄 Jogar Novamente
            </button>
        </div>
    )
}
