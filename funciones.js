class Equipo {
    constructor(nombre, imagen) {
        this.nombre = nombre;
        this.imagen = imagen;
    }
}

const equipos = [
    new Equipo("Equipo Pikachu", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"),
    new Equipo("Equipo Bulbasaur", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"),
    new Equipo("Equipo Charmander", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"),
    new Equipo("Equipo Squirtle", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png"),
    new Equipo("Equipo Jigglypuff", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png"),
    new Equipo("Equipo Meowth", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/52.png"),
    new Equipo("Equipo Psyduck", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png"),
    new Equipo("Equipo Snorlax", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png"),
    new Equipo("Equipo Eevee", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png"),
    new Equipo("Equipo Vaporeon", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/134.png"),
    new Equipo("Equipo Jolteon", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/135.png"),
    new Equipo("Equipo Flareon", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/136.png"),
    new Equipo("Equipo Mewtwo", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png"),
    new Equipo("Equipo Gengar", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png"),
    new Equipo("Equipo Lapras", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/131.png"),
    new Equipo("Equipo Dragonite", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png")
];

let equiposDisponibles = [...equipos];
let combatesGenerados = 0;
let numeroCombate = 1;
const cuadroCruces = document.getElementById('cuadroCruces');
const botonGenerar = document.getElementById('generarCombate');
const botonReiniciar = document.getElementById('reiniciar');
const displaySegundos = document.getElementById('segundos');
let temporizador;
let segundosTranscurridos = 0;

// Crear una instancia del sonido golpe_pelea
const sonidoGolpe = new Audio('audio/golpe_pelea.mp3');

// Función para iniciar el temporizador
function iniciarTemporizador() {
    temporizador = setInterval(() => {
        segundosTranscurridos++;
        displaySegundos.textContent = segundosTranscurridos;
    }, 1000);
}

// Función para detener el temporizador
function detenerTemporizador() {
    clearInterval(temporizador);
}

// Función para generar un nuevo combate
/**
 * Genera un nuevo combate aleatorio entre dos equipos disponibles.
 * Esta función maneja la creación y visualización de un enfrentamiento entre equipos,
 * incluyendo la selección aleatoria de participantes y la construcción del DOM necesario
 * para mostrar el combate en la interfaz.
 * 
 * Si no hay suficientes equipos disponibles para generar un combate, la función
 * deshabilita el botón de generación de combates y muestra un mensaje de fin de combates.
 */
function generarCombate() {
    // Reproducir el sonido golpe_pelea
    sonidoGolpe.currentTime = 0; // Reiniciar el sonido si ya está reproduciéndose
    sonidoGolpe.play();

    if (equiposDisponibles.length < 2) {
        botonGenerar.disabled = true;
        mostrarMensajeFin();
        detenerTemporizador();
        return;
    }

    const combateActual = numeroCombate++;

    let equipo1 = equiposDisponibles.splice(Math.floor(Math.random() * equiposDisponibles.length), 1)[0];
    let equipo2 = equiposDisponibles.splice(Math.floor(Math.random() * equiposDisponibles.length), 1)[0];

    const divCombate = document.createElement('div');
    divCombate.classList.add('combate');

    const divNumeroCombate = document.createElement('div');
    divNumeroCombate.classList.add('numero-combate');
    divNumeroCombate.textContent = `Combate ${combateActual}`;

    const divVS = document.createElement('div');
    divVS.classList.add('vs');
    divVS.textContent = 'VS';

    const divEquipo1 = crearDivEquipo(equipo1);
    const divEquipo2 = crearDivEquipo(equipo2);

    divCombate.append(divNumeroCombate, divEquipo1, divVS, divEquipo2);

    cuadroCruces.insertBefore(divCombate, cuadroCruces.firstChild);

    combatesGenerados++;

    if (combatesGenerados === equipos.length / 2) {
        botonGenerar.disabled = true;
        mostrarMensajeFin();
        detenerTemporizador();
    }
}


/**
 * Crea y devuelve un nuevo elemento div que representa un equipo con su imagen y nombre.
 * Esta función genera un contenedor div con la clase 'equipo' que incluye:
 * - Un elemento img con la imagen del equipo y texto alternativo
 * - Un elemento span que contiene el nombre del equipo
 * Los elementos se añaden en ese orden dentro del contenedor div
 *
 * @returns {HTMLDivElement} Un elemento div que contiene la imagen y nombre del equipo
 */

function crearDivEquipo(equipo) {
    const divEquipo = document.createElement('div');
    divEquipo.classList.add('equipo');

    const img = document.createElement('img');
    img.src = equipo.imagen;
    img.alt = equipo.nombre;

    const nombre = document.createElement('span');
    nombre.textContent = equipo.nombre;

    divEquipo.append(img, nombre);

    return divEquipo;
}

// Función para reiniciar la aplicación
function reiniciarAplicacion() {
    equiposDisponibles = [...equipos];
    combatesGenerados = 0;
    numeroCombate = 1; // Reiniciar el contador de combates
    cuadroCruces.innerHTML = '';
    botonGenerar.disabled = false;
    segundosTranscurridos = 0;
    displaySegundos.textContent = segundosTranscurridos;
    detenerTemporizador();
    iniciarTemporizador();
    const contenedorMensajeFin = document.getElementById('mensajeFin');
    contenedorMensajeFin.innerHTML = '';
}

// Función para mostrar el mensaje de fin
function mostrarMensajeFin() {
    const contenedorMensajeFin = document.getElementById('mensajeFin');
    contenedorMensajeFin.innerHTML = '<h2>Fin de los combates</h2>';

    const video = document.createElement('video');
    video.src = 'video/charizard.mp4';
    video.controls = true;
    video.autoplay = true;
    video.loop = true;
    video.width = 600;
    contenedorMensajeFin.appendChild(video);
}

botonGenerar.addEventListener('click', generarCombate);
botonReiniciar.addEventListener('click', reiniciarAplicacion);

iniciarTemporizador();

// música de fondo
window.addEventListener('load', () => {
    const musicaFondo = document.getElementById('musica-fondo');
    if (musicaFondo) {
        musicaFondo.volume = 0.3; 
        musicaFondo.play().catch(error => {
            console.log("Autoplay fue bloqueado:", error);
        }); // Intentar reproducir la música al cargar la página
    }
});

// Obtener los botones de pausar y reanudar música
const botonPausarMusica = document.getElementById('pausarMusica');
const botonReanudarMusica = document.getElementById('reanudarMusica');

// Función para pausar la música
function pausarMusica() {
    const musica = document.getElementById('musica-fondo');
    if (musica && !musica.paused) {
        musica.pause();
    }
}

// Función para reanudar la música
function reanudarMusica() {
    const musica = document.getElementById('musica-fondo');
    if (musica && musica.paused) {
        musica.play();
    }
}

// Asignar las funciones a los botones correspondientes
if (botonPausarMusica) {
    botonPausarMusica.addEventListener('click', pausarMusica);
}

if (botonReanudarMusica) {
    botonReanudarMusica.addEventListener('click', reanudarMusica);
}