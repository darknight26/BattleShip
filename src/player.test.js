import Player from './player';
import Ship from './ship';

test('Player can place a ship on the gameboard', () => {
    const player = new Player('Ashutosh');
    const ship = new Ship(3);
    expect(player.placeShip(ship, 0, 0, 'horizontal')).toBe(true);
    expect(player.ships.length).toBe(1);
});

test('Player cannot place a ship out of bounds', () => {
    const player = new Player('Ashutosh');
    const ship = new Ship(3);
    expect(player.placeShip(ship, 7, 7, 'horizontal')).toBe(false);
    expect(player.ships.length).toBe(0);
});

test('Player can receive an attack', () => {
    const player = new Player('Ashutosh');
    const ship = new Ship(3);
    player.placeShip(ship, 0, 0, 'horizontal');
    expect(player.receiveAttack(0, 0)).toBe(true);
    expect(ship.hits).toBe(1);
});

test('Player can check if all ships are sunk', () => {
    const player = new Player('Ashutosh');
    const ship1 = new Ship(1);
    const ship2 = new Ship(1);
    player.placeShip(ship1, 0, 0, 'horizontal');
    player.placeShip(ship2, 1, 0, 'horizontal');
    player.receiveAttack(0, 0);
    player.receiveAttack(1, 0);
    expect(player.allShipsSunk()).toBe(true);
});

test('Player can check if not all ships are sunk', () => {
    const player = new Player('Ashutosh');
    const ship1 = new Ship(1);
    const ship2 = new Ship(1);
    player.placeShip(ship1, 0, 0, 'horizontal');
    player.placeShip(ship2, 1, 0, 'horizontal');
    player.receiveAttack(0, 0);
    expect(player.allShipsSunk()).toBe(false);
});