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

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`)
    }
}

(async function main() {
    console.log(`🏁🚨 Corrida entre ${player1.name} e ${player2.name} Iniciando...\n`);

    await playRaceEngine(player1, player2);
})();


