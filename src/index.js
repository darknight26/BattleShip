import Player from "./player.js";

// Game state variables
let player1 = new Player('Player 1');
let player2 = null;
let currentPlayer = null;
let aiMoves = new Set();
let gameStarted = false;

// Initialize player 1's board
player1.gameboard.generateBoard(8);

function toggleBoards() {
    const selectionBoard = document.querySelector('.selectionBoard');
    const AIboard = document.querySelector('.AIboard');
    
    if (selectionBoard && AIboard) {
        selectionBoard.style.display = selectionBoard.style.display === 'none' ? 'flex' : 'none';
        AIboard.style.display = AIboard.style.display === 'none' ? 'flex' : 'none';
    }
}

// Create initial selection board
player1.gameboard.createSelectionBoard();

function waitForAllShipsRemoved() {
    return new Promise((resolve) => {
        const selectionBoard = document.querySelector('.selectionBoard');
        if (!selectionBoard) {
            resolve();
            return;
        }

        const interval = setInterval(() => {
            const ships = selectionBoard.querySelectorAll('.ship');
            if (ships.length === 0) {
                clearInterval(interval);
                resolve();
            }
        }, 100);
    });
}

function getRandomCell() {
    const row = Math.floor(Math.random() * 8);
    const col = Math.floor(Math.random() * 8);
    return { row, col };
}

function makeAIMove() {
    let move;
    let pos;
    
    do {
        move = getRandomCell();
        pos = move.row * 8 + move.col;
    } while (aiMoves.has(pos));

    aiMoves.add(pos);
    return move;
}

function checkGameOver() {
    if (!player1 || !player2) return false;

    if (player1.gameboard.gameOver()) {
        player1.gameboard.showResult("gameboard");
        aiMoves.clear();
        return true;
    } else if (player2.gameboard.gameOver()) {
        player1.gameboard.showResult("aiboard");
        aiMoves.clear();
        return true;
    }
    return false;
}

function switchTurn() {
    if (!player1 || !player2) return;
    currentPlayer = currentPlayer === player1 ? player2 : player1;
}

function playerTurn() {
    if (!gameStarted || checkGameOver()) return;

    if (currentPlayer === player1) {
        console.log("Player1's turn");
        // Player's turn is handled by click events
    } else {
        console.log("AI's turn");
        const move = makeAIMove();
        const gameBoard = document.querySelector('.gameboard');
        
        if (gameBoard) {
            const cell = gameBoard.children[move.row * 8 + move.col];
            if (cell) {
                cell.click();
            }
        }
    }
}

function initializeGame() {
    player2 = new Player("AI");
    player2.gameboard.createAIboard(8);
    currentPlayer = player1;
    gameStarted = true;
}

function setupEventListeners() {
    const gameBoard = document.querySelector('.gameboard');
    const aiBoard = document.querySelector('.AIboard');

    const handleBoardClick = (event) => {
        if (!checkGameOver()) {
            switchTurn();
            playerTurn();
        }
    };

    if (gameBoard) {
        gameBoard.addEventListener('click', handleBoardClick);
    }

    if (aiBoard) {
        aiBoard.addEventListener('click', handleBoardClick);
    }
}

// Start the game when all ships are placed
waitForAllShipsRemoved().then(() => {
    toggleBoards();
    initializeGame();
    setupEventListeners();
    playerTurn();
});