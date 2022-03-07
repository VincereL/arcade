const BOARD = document.getElementsByClassName("board");
const WINNING_MESSAGE = document.getElementById("winner");
const TIE_MESSAGE = document.getElementById("tie");
const RESTART_BUTTON = document.getElementById("restartButton");
const SUBMIT_BUTTON = document.getElementById("playerForm");
const XNAME = document.getElementById("playerXName");
const ONAME = document.getElementById("playerOName");
const WIN_ARRAYS = [
  ["0", "1", "2"],
  ["3", "4", "5"],
  ["6", "7", "8"],
  ["0", "3", "6"],
  ["1", "4", "7"],
  ["2", "5", "8"],
  ["0", "4", "8"],
  ["2", "4", "6"],
];
let gameState = {
  players: ["x", "o"],
  boardX: [],
  boardO: [],
  isGameActive: false,
};
RESTART_BUTTON.addEventListener("click", startGame);
SUBMIT_BUTTON.addEventListener("submit", renderName);

function renderName(submit) {
  submit.preventDefault();
  XNAME.textContent = "Player X: " + submit.target.playerX.value;
  ONAME.textContent = "Player O: " + submit.target.playerO.value;
  submit.target.reset();
}

function startGame() {
  XNAME.textContent = "";
  ONAME.textContent = "";
  const CELL = document.getElementsByClassName("cell");
  
  for (const clearCell of CELL) {
    clearCell.innerText = "";
  }
  gameState.isGameActive = true;
  gameState.players = ["x", "o"];
  gameState.boardX = [];
  gameState.boardO = [];
}
console.log(gameState.isGameActive);

function addXOrCircle(currentCell) {
  let cell = document.getElementById(currentCell);
  let cellNumber = currentCell.charAt(currentCell.length - 1);
  
  if ((gameState.isGameActive = false)) {
    return;
  }
  if (
    gameState.boardO.includes(cellNumber) ||
    gameState.boardX.includes(cellNumber)
  ) {
    return;
  }

  cell.innerText = gameState.players[0];
  addToBoard(gameState.players[0], cellNumber);
  let result = checkWin();

  if (result) {
    WINNING_MESSAGE.innerText = "Win for " + gameState.players[0];
    gameState.isGameActive = false;
    return;
  }
  if (gameState.boardX.length + gameState.boardO.length == 9) {
    gameState.isGameActive = false;
    TIE_MESSAGE.innerText = "Tie!";
  }
  gameState.players.reverse();
}

function addToBoard(player, cell) {
  if (player === "x") {
    gameState.boardX.push(cell);
  } else {
    gameState.boardO.push(cell);
  }
}

function checkWin() {
  let winDetected;

  if (gameState.players[0] === "x") {
    for (let i = 0; i < WIN_ARRAYS.length; i++) {
      // Check each set
      winDetected = true;
      for (let j = 0; j < 3; j++) {
        // Check each cell
        winDetected =
          winDetected && gameState.boardX.includes(WIN_ARRAYS[i][j]);
      }
      if (winDetected) {
        return winDetected;
      }
    }
  } else {
    for (let i = 0; i < WIN_ARRAYS.length; i++) {
      // Check each set
      winDetected = true;
      for (let j = 0; j < 3; j++) {
        // Check each cell
        winDetected =
          winDetected && gameState.boardO.includes(WIN_ARRAYS[i][j]);
      }
      if (winDetected) {
        return winDetected;
      }
    }
  }
  return false;
}
