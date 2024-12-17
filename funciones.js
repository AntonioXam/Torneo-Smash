// script.js

const teams = [
    { name: "Equipo Pikachu", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" },
    { name: "Equipo Bulbasaur", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" },
    { name: "Equipo Charmander", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png" },
    { name: "Equipo Squirtle", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png" },
    { name: "Equipo Jigglypuff", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png" },
    { name: "Equipo Meowth", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/52.png" },
    { name: "Equipo Psyduck", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png" },
    { name: "Equipo Snorlax", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png" },
    { name: "Equipo Eevee", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png" },
    { name: "Equipo Vaporeon", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/134.png" },
    { name: "Equipo Jolteon", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/135.png" },
    { name: "Equipo Flareon", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/136.png" },
    { name: "Equipo Mewtwo", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png" },
    { name: "Equipo Gengar", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png" },
    { name: "Equipo Lapras", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/131.png" },
    { name: "Equipo Dragonite", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png" }
];

let availableTeams = [...teams];
let matchesGenerated = 0;
const bracket = document.getElementById('bracket');
const generateButton = document.getElementById('generateMatch');
const resetButton = document.getElementById('reset');
const secondsDisplay = document.getElementById('seconds');
let timer;
let secondsElapsed = 0;
let matchNumber = 1;

function startTimer() {
    timer = setInterval(() => {
        secondsElapsed++;
        secondsDisplay.textContent = secondsElapsed;
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function generateMatch() {
    if (availableTeams.length < 2) {
        generateButton.disabled = true;
        displayEndMessage();
        stopTimer();
        return;
    }

    const currentMatch = matchNumber++;

    let team1Index = Math.floor(Math.random() * availableTeams.length);
    let team1 = availableTeams.splice(team1Index, 1)[0];

    let team2Index = Math.floor(Math.random() * availableTeams.length);
    let team2 = availableTeams.splice(team2Index, 1)[0];

    const matchDiv = document.createElement('div');
    matchDiv.classList.add('match');

    const matchNumberDiv = document.createElement('div');
    matchNumberDiv.classList.add('match-number');
    matchNumberDiv.textContent = `Combate ${currentMatch}`;

    const vsDiv = document.createElement('div');
    vsDiv.classList.add('vs');
    vsDiv.textContent = 'VS';

    const team1Div = createTeamDiv(team1);
    const team2Div = createTeamDiv(team2);

    matchDiv.appendChild(matchNumberDiv);
    matchDiv.appendChild(team1Div);
    matchDiv.appendChild(vsDiv);
    matchDiv.appendChild(team2Div);

    bracket.insertBefore(matchDiv, bracket.firstChild);

    matchesGenerated++;

    if (matchesGenerated === teams.length / 2) {
        generateButton.disabled = true;
        displayEndMessage();
        stopTimer();
    }
}

function createTeamDiv(team) {
    const teamDiv = document.createElement('div');
    teamDiv.classList.add('team');

    const img = document.createElement('img');
    img.src = team.image;
    img.alt = team.name;

    const name = document.createElement('span');
    name.textContent = team.name;

    teamDiv.appendChild(img);
    teamDiv.appendChild(name);

    return teamDiv;
}

function resetApplication() {
    availableTeams = [...teams];
    matchesGenerated = 0;
    bracket.innerHTML = '';
    generateButton.disabled = false;
    secondsElapsed = 0;
    secondsDisplay.textContent = secondsElapsed;
    stopTimer();
    startTimer();
}

function displayEndMessage() {
    const endMessageContainer = document.getElementById('end-message-container');
    endMessageContainer.innerHTML = '<h2>Fin de los combates</h2>';

    const video = document.createElement('video');
    video.src = 'video/charizard.mp4';
    video.controls = true;
    video.autoplay = true;
    video.width = 600;
    endMessageContainer.appendChild(video);
}

generateButton.addEventListener('click', generateMatch);
resetButton.addEventListener('click', resetApplication);

startTimer();