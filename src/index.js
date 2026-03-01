// ==========================================================
// 1. DADOS DOS PERSONAGENS
// ==========================================================
// Aqui definimos uma lista com todos os personagens disponíveis no jogo.
// Cada personagem tem atributos que serão usados durante as rodadas.
const players = [
    { name: "Mario", velocity: 4, maneuverability: 3, power: 3, points: 0, img: "mario.gif" },
    { name: "Peach", velocity: 3, maneuverability: 4, power: 2, points: 0, img: "peach.gif" },
    { name: "Yoshi", velocity: 2, maneuverability: 4, power: 3, points: 0, img: "yoshi.gif" },
    { name: "Bowser", velocity: 5, maneuverability: 2, power: 5, points: 0, img: "bowser.gif" },
    { name: "Luigi", velocity: 3, maneuverability: 4, power: 4, points: 0, img: "luigi.gif" },
    { name: "Donkey Kong", velocity: 2, maneuverability: 2, power: 5, points: 0, img: "dk.gif" },
]

// ==========================================================
// 2. FUNÇÕES AUXILIARES DE SORTEIO
// ==========================================================

// Simula a rolagem de um dado de 6 lados (retorna número entre 1 e 6)
async function rollDice() {
    return Math.floor(Math.random() * 6) + 1
}

// Sorteia aleatoriamente qual será o tipo de bloco da rodada
// 33% RETA, 33% CURVA, 34% CONFRONTO
async function getRandomBlock() {
    const random = Math.random()
    if (random < 0.33) return "RETA"
    if (random < 0.66) return "CURVA"
    return "CONFRONTO"
}

// Durante um confronto, sorteia o item de penalidade
// 50% de chance para CASCO (-1pt) ou BOMBA (-2pts)
async function getRandomItem() {
    return Math.random() < 0.5 ? "CASCO" : "BOMBA"
}

// Sorteia se o vencedor de um confronto vai ganhar um turbo bônus (50% de chance)
async function getRandomTurbo() {
    return Math.random() < 0.5
}

// Exibe de forma formatada o que cada jogador rolou nos dados
async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`)
}

// ==========================================================
// 3. ENGINE PRINCIPAL DA CORRIDA
// ==========================================================
async function playRaceEngine(character1, character2) {
    // A corrida sempre terá 5 rodadas
    for (let round = 1; round <= 5; round++) {
        console.log(`\n🏁 Rodada ${round}`)

        // Sorteia o bloco da rodada
        const block = await getRandomBlock()
        console.log(`Bloco: ${block}`)

        // Os jogadores rolam os dados
        const diceResult1 = await rollDice()
        const diceResult2 = await rollDice()

        let TotalTestSkill1 = 0
        let TotalTestSkill2 = 0

        // ---------------------------------------------------
        // LÓGICA DO BLOCO "RETA" (Testa Velocidade)
        // ---------------------------------------------------
        if (block === "RETA") {
            TotalTestSkill1 = diceResult1 + character1.velocity
            TotalTestSkill2 = diceResult2 + character2.velocity
            await logRollResult(character1.name, "velocidade", diceResult1, character1.velocity)
            await logRollResult(character2.name, "velocidade", diceResult2, character2.velocity)
        }

        // ---------------------------------------------------
        // LÓGICA DO BLOCO "CURVA" (Testa Manobrabilidade)
        // ---------------------------------------------------
        if (block === "CURVA") {
            TotalTestSkill1 = diceResult1 + character1.maneuverability
            TotalTestSkill2 = diceResult2 + character2.maneuverability
            await logRollResult(character1.name, "manobrabilidade", diceResult1, character1.maneuverability)
            await logRollResult(character2.name, "manobrabilidade", diceResult2, character2.maneuverability)
        }

        // ---------------------------------------------------
        // LÓGICA DO BLOCO "CONFRONTO" (Testa Poder com Itens)
        // ---------------------------------------------------
        if (block === "CONFRONTO") {
            const powerResult1 = diceResult1 + character1.power
            const powerResult2 = diceResult2 + character2.power

            // Sorteia item de penalidade antes do confronto
            const item = await getRandomItem()
            const penalty = item === "CASCO" ? 1 : 2
            const itemEmoji = item === "CASCO" ? "🐢" : "💣"
            console.log(`\nItem sorteado: ${item} ${itemEmoji} (penalidade: -${penalty} ponto${penalty > 1 ? "s" : ""})`)

            console.log(`${character1.name} confrontou com ${character2.name}! 🥊`)

            await logRollResult(character1.name, "poder", diceResult1, character1.power)
            await logRollResult(character2.name, "poder", diceResult2, character2.power)

            let winner = null
            let loser = null

            // Determina quem ganhou e quem perdeu no confronto
            if (powerResult1 > powerResult2) {
                winner = character1
                loser = character2
            } else if (powerResult2 > powerResult1) {
                winner = character2
                loser = character1
            }

            if (winner && loser) {
                // Aplica a penalidade do item (Cuidado para não deixar pontos negativos)
                const actualPenalty = Math.min(penalty, loser.points)
                loser.points -= actualPenalty
                console.log(`${winner.name} venceu o confronto! ${loser.name} perdeu ${actualPenalty} ponto(s) ${itemEmoji}`)

                // Verifica na sorte se o ganhador ganha Turbo (+1pt bônus)
                const hasTurbo = await getRandomTurbo()
                if (hasTurbo) {
                    winner.points++
                    console.log(`🚀 TURBO! ${winner.name} ganhou +1 ponto de bônus!`)
                } else {
                    console.log(`Sem turbo desta vez.`)
                }
            } else {
                console.log("Confronto empatado! Nenhum ponto foi perdido!")
            }
        }

        // ---------------------------------------------------
        // DISTRIBUIÇÃO DE PONTOS (Para Reta ou Curva)
        // ---------------------------------------------------
        if (block !== "CONFRONTO") {
            if (TotalTestSkill1 > TotalTestSkill2) {
                character1.points++
                console.log(`${character1.name} marcou 1 ponto! ⭐`)
            } else if (TotalTestSkill2 > TotalTestSkill1) {
                character2.points++
                console.log(`${character2.name} marcou 1 ponto! ⭐`)
            } else {
                console.log("Empate na rodada! Nenhum ponto marcado.")
            }
        }

        // Exibe o placar final de cada rodada
        console.log(`Placar: ${character1.name} ${character1.points} x ${character2.points} ${character2.name}`)
        console.log("---------------------------------------------------")
    }
}

// ==========================================================
// 4. FUNÇÕES DE ENCERRAMENTO E PONTO DE ENTRADA
// ==========================================================

// Mostra o total de pontos e declara quem foi o grande vencedor
async function declareWinner(character1, character2) {
    console.log("\n🏁 Fim da corrida!")
    console.log(`${character1.name}: ${character1.points} ponto(s)`)
    console.log(`${character2.name}: ${character2.points} ponto(s)`)

    if (character1.points > character2.points)
        console.log(`\n🏆 ${character1.name} venceu a corrida!`)
    else if (character2.points > character1.points)
        console.log(`\n🏆 ${character2.name} venceu a corrida!`)
    else
        console.log("\n🤝 Empate!")
}

// Esta é a função principal que roda quando iniciamos o programa no terminal
(async function main() {
    // Captura as opções passadas pelo terminal: node src/index.js 0 3
    // Índices: 0=Mario, 1=Peach, 2=Yoshi, 3=Bowser, 4=Luigi, 5=Donkey Kong
    const args = process.argv.slice(2)
    const idx1 = parseInt(args[0] ?? 0)
    const idx2 = parseInt(args[1] ?? 1)

    // Impede que os dois jogadores escolham o mesmo boneco
    if (idx1 === idx2) {
        console.error("❌ Os dois jogadores não podem escolher o mesmo personagem!")
        process.exit(1)
    }

    // Cria uma cópia dos personagens escolhidos zerando os pontos
    const character1 = { ...players[idx1], points: 0 }
    const character2 = { ...players[idx2], points: 0 }

    // Exibe os personagens e iniciar
    console.log("Personagens disponíveis:")
    players.forEach((p, i) => console.log(`  ${i}: ${p.name} (Vel:${p.velocity} Man:${p.maneuverability} Pow:${p.power})`))
    console.log(`\n🏁🚨 Corrida entre ${character1.name} e ${character2.name} Iniciando...\n`)

    // Executa a corrida e declara o vencedor 
    await playRaceEngine(character1, character2)
    await declareWinner(character1, character2)
})()

