// Lista de equipos participantes
const equipos = [
    { nombre: "Equipo Pikachu", imagen: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" },
    { nombre: "Equipo Bulbasaur", imagen: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" },
    { nombre: "Equipo Charmander", imagen: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png" },
    { nombre: "Equipo Squirtle", imagen: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png" },
    { nombre: "Equipo Jigglypuff", imagen: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png" },
    { nombre: "Equipo Meowth", imagen: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/52.png" },
    { nombre: "Equipo Psyduck", imagen: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png" },
    { nombre: "Equipo Snorlax", imagen: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png" },
    { nombre: "Equipo Eevee", imagen: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png" },
    { nombre: "Equipo Vaporeon", imagen: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/134.png" },
    { nombre: "Equipo Jolteon", imagen: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/135.png" },
    { nombre: "Equipo Flareon", imagen: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/136.png" },
    { nombre: "Equipo Mewtwo", imagen: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png" },
    { nombre: "Equipo Gengar", imagen: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png" },
    { nombre: "Equipo Lapras", imagen: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/131.png" },
    { nombre: "Equipo Dragonite", imagen: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png" }
];

// Copia de los equipos disponibles para generar combates
let equiposDisponibles = [...equipos];
let combatesGenerados = 0;
const cuadroCruces = document.getElementById('cuadroCruces');
const botonGenerar = document.getElementById('generarCombate');
const botonReiniciar = document.getElementById('reiniciar');
const displaySegundos = document.getElementById('segundos');
let temporizador;
let segundosTranscurridos = 0;
let numeroCombate = 1;

// Iniciar el temporizador
function iniciarTemporizador() {
    temporizador = setInterval(() => {
        segundosTranscurridos++;
        displaySegundos.textContent = segundosTranscurridos;
    }, 1000);
}

// Detener el temporizador
function detenerTemporizador() {
    clearInterval(temporizador);
}

// Generar un nuevo combate
function generarCombate() {
    if (equiposDisponibles.length < 2) {
        botonGenerar.disabled = true;
        mostrarMensajeFin();
        detenerTemporizador();
        return;
    }

    const combateActual = numeroCombate++;

    // Seleccionar aleatoriamente dos equipos
    let indiceEquipo1 = Math.floor(Math.random() * equiposDisponibles.length);
    let equipo1 = equiposDisponibles.splice(indiceEquipo1, 1)[0];

    let indiceEquipo2 = Math.floor(Math.random() * equiposDisponibles.length);
    let equipo2 = equiposDisponibles.splice(indiceEquipo2, 1)[0];

    // Crear contenedor para el combate
    const divCombate = document.createElement('div');
    divCombate.classList.add('combate');

    // Número del combate
    const divNumeroCombate = document.createElement('div');
    divNumeroCombate.classList.add('numero-combate');
    divNumeroCombate.textContent = `Combate ${combateActual}`;

    // Texto VS
    const divVS = document.createElement('div');
    divVS.classList.add('vs');
    divVS.textContent = 'VS';

    // Crear visualización de los equipos
    const divEquipo1 = crearDivEquipo(equipo1);
    const divEquipo2 = crearDivEquipo(equipo2);

    // Agregar elementos al contenedor del combate
    divCombate.appendChild(divNumeroCombate);
    divCombate.appendChild(divEquipo1);
    divCombate.appendChild(divVS);
    divCombate.appendChild(divEquipo2);

    // Insertar el combate en el cuadro de cruces
    cuadroCruces.insertBefore(divCombate, cuadroCruces.firstChild);

    combatesGenerados++;

    // Verificar si se han generado todos los combates posibles
    if (combatesGenerados === equipos.length / 2) {
        botonGenerar.disabled = true;
        mostrarMensajeFin();
        detenerTemporizador();
    }
}

// Crear un div para un equipo
function crearDivEquipo(equipo) {
    const divEquipo = document.createElement('div');
    divEquipo.classList.add('equipo');

    const img = document.createElement('img');
    img.src = equipo.imagen;
    img.alt = equipo.nombre;

    const nombre = document.createElement('span');
    nombre.textContent = equipo.nombre;

    divEquipo.appendChild(img);
    divEquipo.appendChild(nombre);

    return divEquipo;
}

// Reiniciar la aplicación
function reiniciarAplicacion() {
    equiposDisponibles = [...equipos];
    combatesGenerados = 0;
    cuadroCruces.innerHTML = '';
    botonGenerar.disabled = false;
    segundosTranscurridos = 0;
    displaySegundos.textContent = segundosTranscurridos;
    detenerTemporizador();
    iniciarTemporizador();
}

// Mostrar mensaje de fin de combates
function mostrarMensajeFin() {
    const contenedorMensajeFin = document.getElementById('mensajeFin');
    contenedorMensajeFin.innerHTML = '<h2>Fin de los combates</h2>';

    const video = document.createElement('video');
    video.src = 'video/charizard.mp4';
    video.controls = true;
    video.autoplay = true;
    video.width = 600;
    contenedorMensajeFin.appendChild(video);
}

// Eventos de los botones
botonGenerar.addEventListener('click', generarCombate);
botonReiniciar.addEventListener('click', reiniciarAplicacion);

// Iniciar el temporizador al cargar la página
iniciarTemporizador();