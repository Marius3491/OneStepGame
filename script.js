const roomSize = 3; // Tamaño de la cuadrícula de la sala
let currentRoom = 1; // Número de sala actual
let playerPosition = [1, 1]; // Posición inicial del jugador (centro de la sala)
let correctDoor = getRandomDoor(); // Puerta correcta al azar
let gameOver = false;

function getRandomDoor() {
    return Math.floor(Math.random() * 4) + 1; // 1 para N, 2 para S, 3 para E, 4 para O
}

function createGrid() {
    const grid = document.getElementById("grid");
    grid.innerHTML = "";

    for (let i = 0; i < roomSize; i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < roomSize; j++) {
            const cell = createCell(i, j);
            row.appendChild(cell);
        }

        grid.appendChild(row);
    }
}

function createCell(i, j) {
    const cell = document.createElement("td");

    if (i === playerPosition[0] && j === playerPosition[1]) {
        cell.textContent = "X"; // Jugador
        cell.classList.add("player");
    } else if (i === 0 && j === 1) {
        cell.textContent = "N"; // Puerta Norte
    } else if (i === 2 && j === 1) {
        cell.textContent = "S"; // Puerta Sur
    } else if (i === 1 && j === 0) {
        cell.textContent = "O"; // Puerta Oeste
    } else if (i === 1 && j === 2) {
        cell.textContent = "E"; // Puerta Este
    }

    return cell;
}

function isNewPositionValid(position) {
    return position[0] >= 0 && position[0] < roomSize && position[1] >= 0 && position[1] < roomSize;
}

function checkDoor() {
    const doorPositions = [
        [0, 1], // Puerta Norte
        [2, 1], // Puerta Sur
        [1, 0], // Puerta Oeste
        [1, 2], // Puerta Este
    ];

    for (let i = 0; i < doorPositions.length; i++) {
        const door = doorPositions[i];

        if (playerPosition[0] === door[0] && playerPosition[1] === door[1]) {
            if (i === correctDoor - 1) {
                currentRoom++;
                alert("Has cruzado la sala sin problemas");
                correctDoor = getRandomDoor();
                playerPosition = [1, 1]; // Posicionar al jugador en el centro
                createGrid();
                displayRoomInfo();
                return;
            } else {
                gameOver = true;
                alert("Has muerto");
                restartGame();
            }
            break;
        }
    }
}

function displayRoomInfo() {
    const roomInfo = document.getElementById("room");
    roomInfo.textContent = `Sala: ${currentRoom}`;
}

function updateGame(event) {
    if (gameOver) return;

    const key = event.key.toLowerCase();

    const newPosition = [...playerPosition]; // Clonar la posición del jugador

    switch (key) {
        case "w":
            newPosition[0]--; // Mover hacia arriba
            break;
        case "s":
            newPosition[0]++; // Mover hacia abajo
            break;
        case "a":
            newPosition[1]--; // Mover hacia la izquierda
            break;
        case "d":
            newPosition[1]++; // Mover hacia la derecha
            break;
        default:
            return; // Ignorar otras teclas
    }

    if (isNewPositionValid(newPosition)) {
        playerPosition = newPosition;
        checkDoor();
    } else {
        gameOver = true;
        alert("Has muerto");
        restartGame();
    }
}

function restartGame() {
    currentRoom = 1;
    playerPosition = [1, 1];
    correctDoor = getRandomDoor();
    gameOver = false;
    createGrid();
    displayRoomInfo();
}

document.addEventListener("keydown", updateGame);
createGrid();
displayRoomInfo();