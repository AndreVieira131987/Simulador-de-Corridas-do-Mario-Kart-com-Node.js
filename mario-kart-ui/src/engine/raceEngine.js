function rollDice() {
    return Math.floor(Math.random() * 6) + 1
}

function getRandomBlock() {
    const r = Math.random()
    if (r < 0.33) return "RETA"
    if (r < 0.66) return "CURVA"
    return "CONFRONTO"
}

function getRandomItem() {
    return Math.random() < 0.5 ? "CASCO" : "BOMBA"
}

function getRandomTurbo() {
    return Math.random() < 0.5
}

export function runRace(p1, p2) {
    const c1 = { ...p1, points: 0 }
    const c2 = { ...p2, points: 0 }
    const rounds = []

    for (let round = 1; round <= 5; round++) {
        const block = getRandomBlock()
        const dice1 = rollDice()
        const dice2 = rollDice()
        const events = []

        let skill1 = 0
        let skill2 = 0

        if (block === "RETA") {
            skill1 = dice1 + c1.velocity
            skill2 = dice2 + c2.velocity
            events.push({ type: "roll", text: `${c1.name} 🎲 rolou velocidade: ${dice1} + ${c1.velocity} = ${skill1}` })
            events.push({ type: "roll", text: `${c2.name} 🎲 rolou velocidade: ${dice2} + ${c2.velocity} = ${skill2}` })

            if (skill1 > skill2) {
                c1.points++
                events.push({ type: "point", text: `⭐ ${c1.name} marcou 1 ponto!` })
            } else if (skill2 > skill1) {
                c2.points++
                events.push({ type: "point", text: `⭐ ${c2.name} marcou 1 ponto!` })
            } else {
                events.push({ type: "tie", text: "Empate na rodada!" })
            }
        }

        if (block === "CURVA") {
            skill1 = dice1 + c1.maneuverability
            skill2 = dice2 + c2.maneuverability
            events.push({ type: "roll", text: `${c1.name} 🎲 rolou manobrabilidade: ${dice1} + ${c1.maneuverability} = ${skill1}` })
            events.push({ type: "roll", text: `${c2.name} 🎲 rolou manobrabilidade: ${dice2} + ${c2.maneuverability} = ${skill2}` })

            if (skill1 > skill2) {
                c1.points++
                events.push({ type: "point", text: `⭐ ${c1.name} marcou 1 ponto!` })
            } else if (skill2 > skill1) {
                c2.points++
                events.push({ type: "point", text: `⭐ ${c2.name} marcou 1 ponto!` })
            } else {
                events.push({ type: "tie", text: "Empate na rodada!" })
            }
        }

        if (block === "CONFRONTO") {
            const power1 = dice1 + c1.power
            const power2 = dice2 + c2.power
            const item = getRandomItem()
            const penalty = item === "CASCO" ? 1 : 2
            const itemEmoji = item === "CASCO" ? "🐢" : "💣"

            events.push({ type: "item", text: `Item sorteado: ${item} ${itemEmoji} (penalidade: -${penalty}pt${penalty > 1 ? "s" : ""})` })
            events.push({ type: "roll", text: `${c1.name} 🥊 rolou poder: ${dice1} + ${c1.power} = ${power1}` })
            events.push({ type: "roll", text: `${c2.name} 🥊 rolou poder: ${dice2} + ${c2.power} = ${power2}` })

            if (power1 > power2) {
                const actualPenalty = Math.min(penalty, c2.points)
                c2.points -= actualPenalty
                events.push({ type: "confronto", text: `${c1.name} venceu o confronto! ${c2.name} perdeu ${actualPenalty} pt(s) ${itemEmoji}` })
                const turbo = getRandomTurbo()
                if (turbo) {
                    c1.points++
                    events.push({ type: "turbo", text: `🚀 TURBO! ${c1.name} ganhou +1 ponto de bônus!` })
                } else {
                    events.push({ type: "noturbo", text: `Sem turbo desta vez.` })
                }
            } else if (power2 > power1) {
                const actualPenalty = Math.min(penalty, c1.points)
                c1.points -= actualPenalty
                events.push({ type: "confronto", text: `${c2.name} venceu o confronto! ${c1.name} perdeu ${actualPenalty} pt(s) ${itemEmoji}` })
                const turbo = getRandomTurbo()
                if (turbo) {
                    c2.points++
                    events.push({ type: "turbo", text: `🚀 TURBO! ${c2.name} ganhou +1 ponto de bônus!` })
                } else {
                    events.push({ type: "noturbo", text: `Sem turbo desta vez.` })
                }
            } else {
                events.push({ type: "tie", text: "Confronto empatado! Nenhum ponto perdido." })
            }
        }

        rounds.push({
            round,
            block,
            events,
            score1: c1.points,
            score2: c2.points,
        })
    }

    let winner = null
    if (c1.points > c2.points) winner = c1.name
    else if (c2.points > c1.points) winner = c2.name

    return { rounds, final: { p1: c1, p2: c2, winner } }
}
