import { gameboard } from "./gameboard";

test('out of bounds ship not allowed ', () => {
    const board = new gameboard(8);
    expect(board.place_ship([10,10],[11,11])).toThrow("Ship coordinates are out of bounds");
})

test('Ships should not overlap', () => {
    const board = new gameboard(8);
    board.place_ship([0,0],[0,1]);
    expect(() => board.place_ship([0,1],[0,2])).toThrow("Ships cannot overlap");
});

test('Ship placement within bounds', () => {
    const board = new gameboard(8);
    expect(board.place_ship([0,0],[0,1])).toBe(true);
});

test('Game over when all ships are sunk', () => {
    const board = new gameboard(8);
    board.place_ship([0,0],[0,1]);
    board.receiveAttack([0,0]);
    board.receiveAttack([0,1]);
    expect(board.gameOver()).toBe(true);
});

test('Receive attack on empty cell', () => {
    const board = new gameboard(8);
    board.place_ship([0,0],[0,1]);
    board.receiveAttack([1,1]);
    expect(board.board[1][1][0]).toBe(false);
});

