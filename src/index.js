const player1 = {
    name: "Mario",
    velocity: 4,
    maneuverability: 3,
    power: 3,
    points: 0
}

const player2 = {
    name: "Peach",
    velocity: 3,
    maneuverability: 4,
    power: 2,
    points: 0
}

const player3 = {
    name: "Yoshi",
    velocity: 2,
    maneuverability: 4,
    power: 3,
    points: 0
}

const player4 = {
    name: "Bowser",
    velocity: 5,
    maneuverability: 2,
    power: 5,
    points: 0
}

const player5 = {
    name: "Luigi",
    velocity: 3,
    maneuverability: 4,
    power: 4,
    points: 0
}

const player6 = {
    name: "Donkey Kong",
    velocity: 2,
    maneuverability: 2,
    power: 5,
    points: 0
}

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1
}

async function getRandomBlock() {
    let random = Math.random()
    let result

    switch (true) {
        case random < 0.33:
            result = "RETA"
            break;
        case random < 0.66:
            result = "CURVA"
            break;
        default:
            result = "CONFRONTO"
            break;
    }
    return result
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`)
}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);

        let block = await getRandomBlock()
        console.log(`Bloco: ${block}`);

        let diceResult1 = await rollDice()
        let diceResult2 = await rollDice()

        let TotalTestSkill1 = 0;
        let TotalTestSkill2 = 0;

        if (block === "RETA") {
            TotalTestSkill1 = diceResult1 + character1.velocity;
            TotalTestSkill2 = diceResult2 + character2.velocity;

            await logRollResult(character1.name, "velocidade", diceResult1, character1.velocity);
            await logRollResult(character2.name, "velocidade", diceResult2, character2.velocity);

        }

        if (block === "CURVA") {
            TotalTestSkill1 = diceResult1 + character1.maneuverability;
            TotalTestSkill2 = diceResult2 + character2.maneuverability;

            await logRollResult(character1.name, "manobrabilidade", diceResult1, character1.maneuverability);
            await logRollResult(character2.name, "manobrabilidade", diceResult2, character2.maneuverability);
        }

        if (block === "CONFRONTO") {
            let powerResult1 = diceResult1 + character1.power;
            let powerResult2 = diceResult2 + character2.power;

            console.log(`${character1.name} confrontou com ${character2.name}! 🥊`);

            await logRollResult(character1.name, "poder", diceResult1, character1.power);
            await logRollResult(character2.name, "poder", diceResult2, character2.power);

            if (powerResult1 > powerResult2 && character2.points > 0) {
                console.log(`${character1.name} venceu o confronto e ${character2.name} perdeu 1 ponto! 🐢`);
                character2.points--;
            }

            if (powerResult2 > powerResult1 && character1.points > 0) {
                console.log(`${character2.name} venceu o confronto e ${character1.name} perdeu 1 ponto! 🐢`);
                character1.points--;
            }

            console.log(powerResult2 === powerResult1 ? "Confronto empatado! Nenhum ponto foi perdido!" : "");

        }

        if (TotalTestSkill1 > TotalTestSkill2) {
            character1.points++;
            console.log(`${character1.name} marcou 1 ponto!`);
        } else if (TotalTestSkill2 > TotalTestSkill1) {
            character2.points++;
            console.log(`${character2.name} marcou 1 ponto!`);
        }

        console.log("---------------------------------------------------");
    }


}

async function declareWinner(character1, character2) {
    console.log("🏁 Fim da corrida!");
    console.log(`${character1.name}: ${character1.points} ponto(s)`);
    console.log(`${character2.name}: ${character2.points} ponto(s)`);

    if (character1.points > character2.points)
        console.log(`${character1.name} venceu a corrida! 🏆`);
    else if (character2.points > character1.points)
        console.log(`${character2.name} venceu a corrida! 🏆`);
    else
        console.log("Empate!");
}

(async function main() {
    console.log(`🏁🚨 Corrida entre ${player1.name} e ${player2.name} Iniciando...\n`);

    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();


