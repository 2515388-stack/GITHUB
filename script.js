
let isPlayerX = true;
let isGameOver = false;
let scoreX = 0;
let scoreO = 0;


const cells = document.querySelectorAll(".cell");
const currentPlayerEl = document.getElementById("current-player");
const resultsEl = document.getElementById("results");
const scoreXEl = document.getElementById("scoreX");
const scoreOEl = document.getElementById("scoreO");
const restartBtn = document.getElementById("restart");
const winningLine = document.getElementById("winning-line");


const winningCombos = [
    { indices: [0, 1, 2], lineClass: 'line-row-1' },
    { indices: [3, 4, 5], lineClass: 'line-row-2' },
    { indices: [6, 7, 8], lineClass: 'line-row-3' },
    { indices: [0, 3, 6], lineClass: 'line-col-1' },
    { indices: [1, 4, 7], lineClass: 'line-col-2' },
    { indices: [2, 5, 8], lineClass: 'line-col-3' },
    { indices: [0, 4, 8], lineClass: 'line-diag-1' },
    { indices: [6, 4, 2], lineClass: 'line-diag-2' }
];


cells.forEach(cell => {
    cell.addEventListener('click', userMove);
});

function userMove(e) {
    const cell = e.target;

    if (isGameOver || cell.innerHTML !== "") return;

    if (isPlayerX) {
        cell.innerHTML = 'X';
        cell.classList.add('x-played');
    } else {
        cell.innerHTML = 'O';
        cell.classList.add('o-played');
    }


    const winningCombo = checkWin();
   
    if (winningCombo) {
        showWinner(isPlayerX ? 'X' : 'O', winningCombo);
    } else if (checkDraw()) {
        showDraw();
    } else {
        isPlayerX = !isPlayerX;
        updateTurnIndicator();
    }
}


function checkWin() {
    const currentSign = isPlayerX ? 'X' : 'O';
    return winningCombos.find(combo => {
        return combo.indices.every(index => {
            return cells[index].innerHTML === currentSign;
        });
    });
}

function checkDraw() {
    return [...cells].every(cell => cell.innerHTML !== "");
}

function updateTurnIndicator() {
    currentPlayerEl.innerText = isPlayerX ? 'X' : 'O';
    if (isPlayerX) {
        currentPlayerEl.className = 'player-x';
    } else {
        currentPlayerEl.className = 'player-o';
    }
}


function showWinner(winner, combo) {
    isGameOver = true;
    resultsEl.innerHTML = `¡Jugador ${winner} gana!`;
    resultsEl.style.color = winner === 'X' ? '#38bdf8' : '#f43f5e';


    winningLine.className = combo.lineClass;
    winningLine.style.display = 'block';    
   

    if (winner === 'X') {
        winningLine.style.backgroundColor = '#38bdf8';
        winningLine.style.boxShadow = '0 0 15px rgba(56, 189, 248, 0.8)';
    } else {
        winningLine.style.backgroundColor = '#f43f5e';
        winningLine.style.boxShadow = '0 0 15px rgba(244, 63, 94, 0.8)';
    }


    if (winner === 'X') {
        scoreX++;
        scoreXEl.innerText = scoreX;
    } else {
        scoreO++;
        scoreOEl.innerText = scoreO;
    }
}

function showDraw() {
    isGameOver = true;
    resultsEl.innerHTML = "¡Es un empate!";
    resultsEl.style.color = "#94a3b8";
}

if (restartBtn) {
    restartBtn.addEventListener('click', restartGame);
}

function restartGame() {
    cells.forEach(cell => {
        cell.innerHTML = "";
        cell.className = "cell";
    });


    winningLine.style.display = 'none';
    winningLine.className = '';

    resultsEl.innerHTML = "";
    isPlayerX = true;
    isGameOver = false;
    updateTurnIndicator();
}

//fin 
