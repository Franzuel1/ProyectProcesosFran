let currentPlayer = 'red';
let gameMode = 'computer'; // Default game mode
const rows = 6;
const columns = 7;
const board = [];

function createBoard() {
  const boardElement = document.getElementById('board');
  boardElement.innerHTML = '';

  for (let r = 0; r < rows; r++) {
    board[r] = [];
    for (let c = 0; c < columns; c++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.addEventListener('click', handleCellClick);
      boardElement.appendChild(cell);
      board[r][c] = null;
    }
  }
  updateTurnIndicator(); // Actualizar el indicador de turno al crear el tablero
}

function handleCellClick(event) {
  const col = parseInt(event.target.dataset.col);
  for (let r = rows - 1; r >= 0; r--) {
    if (!board[r][col]) {
      board[r][col] = currentPlayer;
      const cell = document.querySelector(`.cell[data-row='${r}'][data-col='${col}']`);
      cell.classList.add(currentPlayer);
      const player = currentPlayer;
      if (checkWin(r, col, player)) {
        setTimeout(() => {
          alert(`${player} wins!`);
          createBoard();
        }, 10);
      } else {
        currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
        updateTurnIndicator(); // Actualizar el indicador de turno después de cada movimiento
        if (gameMode === 'computer' && currentPlayer === 'yellow') {
          makeSystemMove();
        }
      }
      break;
    }
  }
}

function makeSystemMove() {
  setTimeout(() => {
    let madeMove = false;
    while (!madeMove) {
      const col = Math.floor(Math.random() * columns);
      for (let r = rows - 1; r >= 0; r--) {
        if (!board[r][col]) {
          board[r][col] = currentPlayer;
          const cell = document.querySelector(`.cell[data-row='${r}'][data-col='${col}']`);
          cell.classList.add(currentPlayer);
          const player = currentPlayer;
          if (checkWin(r, col, player)) {
            setTimeout(() => {
              alert(`${player} wins!`);
              createBoard();
            }, 10);
          }
          currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
          updateTurnIndicator(); // Actualizar el indicador de turno
          madeMove = true;
          break;
        }
      }
    }
  }, 500);
}

function checkWin(row, col, player) {
  return (
    checkDirection(row, col, 0, 1, player) || // horizontal
    checkDirection(row, col, 1, 0, player) || // vertical
    checkDirection(row, col, 1, 1, player) || // diagonal \
    checkDirection(row, col, 1, -1, player)   // diagonal /
  );
}

function checkDirection(row, col, rowDir, colDir, player) {
  let count = 1;

  // Check in the positive direction
  let r = row + rowDir;
  let c = col + colDir;
  while (r >= 0 && r < rows && c >= 0 && c < columns && board[r][c] === player) {
    count++;
    r += rowDir;
    c += colDir;
  }

  // Check in the negative direction
  r = row - rowDir;
  c = col - colDir;
  while (r >= 0 && r < rows && c >= 0 && c < columns && board[r][c] === player) {
    count++;
    r -= rowDir;
    c -= colDir;
  }

  return count >= 4;
}

function updateTurnIndicator() {
  const turnIndicator = document.getElementById('turnIndicator');
  if (gameMode === 'twoPlayer') {
    turnIndicator.textContent = `Turno del jugador: ${currentPlayer === 'red' ? 'Rojo' : 'Amarillo'}`;
  } else {
    turnIndicator.textContent = currentPlayer === 'red' ? 'Tu turno (Rojo)' : 'Turno de la computadora (Amarillo)';
  }
}

function setMode(mode) {
  gameMode = mode;
  createBoard(); // Reiniciar el tablero con el nuevo modo de juego
  if (mode === 'computer') {
    alert('Modo de juego: Contra la computadora');
  } else {
    alert('Modo de juego: Dos jugadores');
  }
}

document.getElementById('reset').addEventListener('click', createBoard);