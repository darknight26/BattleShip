import Ship from "./ship";

let flg = 1;

export class gameboard{
    constructor(x){
        this.x = x;
        this.board = Array.from({ length: x }, () => Array(x).fill([0,0]));
        this.ships = [];
        this.sunkShips = 0;
    }
    createSelectionBoard(){
        const selectionBoard = document.querySelector('.selectionBoard');
        selectionBoard.style.display = 'flex';
        selectionBoard.style.flexDirection = 'column';

        // Define ship sizes
        const shipSizes = [3, 5, 3, 2, 4];

        shipSizes.forEach((size, idx) => {
            const ship = document.createElement('div');
            ship.classList.add('ship');
            ship.setAttribute('draggable', true);
            ship.dataset.size = size; // Store ship size for placement logic
            ship.dataset.index = idx; // Use index to associate the Ship object
            ship.dataset.orientation = 'horizontal'; // Default orientation

            // Add ship parts for visual representation
            for (let i = 0; i < size; i++) {
                const part = document.createElement('div');
                part.classList.add('ship-part');
                ship.appendChild(part);
            }

            // Drag events
            ship.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('size', ship.dataset.size);
                e.dataTransfer.setData('index', ship.dataset.index);
                e.dataTransfer.setData('orientation', ship.dataset.orientation);
            });

            selectionBoard.appendChild(ship);
        });
    }

    createAIboard(x) {
        const aiboard = document.querySelector('.AIboard');
        aiboard.style.display = 'grid';
        aiboard.style.gridTemplateColumns = `repeat(${x}, 1fr)`;
        aiboard.style.gridTemplateRows = `repeat(${x}, 1fr)`;
        // Clear previous cells if any
        aiboard.innerHTML = '';
        for (let i = 0; i < x; i++) {
            for (let j = 0; j < x; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.addEventListener('click', () => {
                    this.receiveAttack([i, j], '.AIboard');
                });
                aiboard.appendChild(cell);
            }
        }
        const shipSizes = [3, 5, 3, 2, 4];
        shipSizes.forEach((size) => {
            let placed = false;
            while (!placed) {
                const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
                const startX = Math.floor(Math.random() * (orientation === 'horizontal' ? x : x - size + 1));
                const startY = Math.floor(Math.random() * (orientation === 'horizontal' ? x - size + 1 : x));
                const endX = orientation === 'horizontal' ? startX : startX + size - 1;
                const endY = orientation === 'horizontal' ? startY + size - 1 : startY;

                // Check if the path is clear
                let pathClear = true;
                if (orientation === 'horizontal') {
                    for (let j = startY; j <= endY; j++) {
                        if (this.board[startX][j][0] !== 0) {
                            pathClear = false;
                            break;
                        }
                    }
                } else {
                    for (let i = startX; i <= endX; i++) {
                        if (this.board[i][startY][0] !== 0) {
                            pathClear = false;
                            break;
                        }
                    }
                }

                if (pathClear) {
                    try {
                        this.place_ship([startX, startY], [endX, endY]);
                        placed = true;

                        // if (orientation === 'horizontal') {
                        //     for (let j = startY; j <= endY; j++) {
                        //         aiboard.children[x * startX + j].classList.add('placed-ship');
                        //     }
                        // } else {
                        //     for (let i = startX; i <= endX; i++) {
                        //         aiboard.children[x * i + startY].classList.add('placed-ship');
                        //     }
                        // }
                    } catch (err) {
                        // If placement fails, try again
                    }
                }
            }
        });
    }

    generateBoard(x) {

        const gameboard = document.querySelector('.gameboard');
        gameboard.style.display = 'grid';
        gameboard.style.gridTemplateColumns = `repeat(${x}, 1fr)`;
        gameboard.style.gridTemplateRows = `repeat(${x}, 1fr)`;
        // Clear previous cells if any
        gameboard.innerHTML = '';
        for (let i = 0; i < x; i++) {
            for (let j = 0; j < x; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');

                cell.addEventListener('drop', (e) => {
                    e.preventDefault();

                    const size = parseInt(e.dataTransfer.getData('size'), 10);
                    const orientation = e.dataTransfer.getData('orientation');
                    const index = parseInt(e.dataTransfer.getData('index'), 10);

                    const startCoordinates = [i, j];
                    const endCoordinates = orientation === 'horizontal'
                        ? [i, j + size - 1]
                        : [i + size - 1, j];
                    
                    try {
                        // Attempt to place the ship
                        this.place_ship(startCoordinates, endCoordinates);

                        // Visually mark the cells
                        if (orientation === 'horizontal') {
                            for (let k = 0; k < size; k++) {
                                gameboard.children[i * this.x + j + k].classList.add('placed-ship');
                            }
                        } else {
                            for (let k = 0; k < size; k++) {
                                gameboard.children[(i + k) * this.x + j].classList.add('placed-ship');
                            }
                        }

                        // Remove the ship from the selection board
                        const selectionBoard = document.querySelector('.selectionBoard');
                        const shipElement = selectionBoard.querySelector(`[data-index="${index}"]`);
                        selectionBoard.removeChild(shipElement);
                    } catch (err) {
                        alert(err.message); // Notify the user of invalid placement
                    }
                });

                cell.addEventListener('dragover', (e) => {
                    e.preventDefault();
                });

                cell.addEventListener('click', () => {
                    this.receiveAttack([i, j], '.gameboard');
                });

                gameboard.appendChild(cell);
            }
        }
        flg = 0;
    }

    place_ship(sti, eni) {
        const orientation = sti[0] === eni[0] ? 'horizontal' : 'vertical';

        // Calculate the ship's size
        const size = orientation === 'horizontal'
            ? eni[1] - sti[1] + 1
            : eni[0] - sti[0] + 1;

        let ship = new Ship(this.ships.length, 0, sti, eni);
        ship.orientation = orientation;
        let idx = this.ships.length;
        ship.idx = idx;
        let st = ship.st_coor;
        let en = ship.en_coor;
        let orien = ship.orientation;
        if (st[0] < 0 || st[0] >= this.x || st[1] < 0 || st[1] >= this.x || en[0] < 0 || en[0] >= this.x || en[1] < 0 || en[1] >= this.x) {
            throw new Error("Ship coordinates are out of bounds");
        }
        if (orien === 'horizontal') {
            for (let i = st[1]; i <= en[1]; i++) {
                if (this.board[st[0]][i][0] == 0)
                    this.board[st[0]][i] = [1, idx];
            }
        } else if (orien === 'vertical') {
            for (let i = st[0]; i <= en[0]; i++) {
                if (this.board[i][st[1]][0] == 0)
                    this.board[i][st[1]] = [1, idx];
            }
        }

        this.ships.push(ship);
        return true;
    }

    gameOver() {
        return this.ships.every(ship => ship.isSunk());
    }

    showResult(board) {
        if (board == 'gameboard')
            alert('You lose');
        else
            alert('You win');
        this.resetGame();
    }

    resetGame() {
        // Show a pop-up in the middle of the screen
        const popup = document.createElement('div');
        popup.style.position = 'fixed';
        popup.style.top = '50%';
        popup.style.left = '50%';
        popup.style.transform = 'translate(-50%, -50%)';
        popup.style.padding = '20px';
        popup.style.backgroundColor = 'black';
        popup.style.border = '1px solid black';
        popup.style.zIndex = '1000';
        popup.innerText = 'Game over! Reload to play again.';

        const reloadButton = document.createElement('button');
        reloadButton.innerText = 'Reload';
        reloadButton.addEventListener('click', () => {
            location.reload();
        });

        popup.appendChild(reloadButton);
        document.body.appendChild(popup);
    }

    showBlue(x, y, board) {
        const gameboard = document.querySelector(board);
        const cell = gameboard.children[x * this.x + y];
        cell.style.backgroundColor = 'blue';
    }

    showRed(x, y, board) {
        const gameboard = document.querySelector(board);
        const cell = gameboard.children[x * this.x + y];
        cell.style.backgroundColor = 'red';
    }

    receiveAttack(pos, board) {
        let x = pos[0];
        let y = pos[1];
        if (this.board[x][y][0] == 1) {
            let ship = this.ships[this.board[x][y][1]];
            ship.isHit();
            console.log(ship);
            this.board[x][y][0] = 2;
            this.showBlue(x, y, board);
        } else if(this.board[x][y][0]==0){
            this.showRed(x, y, board);
        }

        console.log(this.ships)

        // if (this.gameOver()) {
        //     this.showResult(board);
        //     return;
        // }
    }
}