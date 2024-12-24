import Ship from './ship';

test('Ship is initialized correctly', () => {
    const ship = new Ship(1, 0, [0, 0], [0, 4]);
    expect(ship.idx).toBe(1);
    expect(ship.hits).toBe(0);
    expect(ship.sunk).toBe(false);
    expect(ship.st_coor).toEqual([0, 0]);
    expect(ship.en_coor).toEqual([0, 4]);
    expect(ship.orientation).toBe("horizontal");
});

test('Ship is hit and not sunk', () => {
    const ship = new Ship(1, 0, [0, 0], [0, 4]);
    expect(ship.isHit()).toBe(true);
    expect(ship.hits).toBe(1);
    expect(ship.isSunk()).toBe(false);
});

test('Ship is hit and sunk', () => {
    const ship = new Ship(1, 3, [0, 0], [0, 4]);
    expect(ship.isHit()).toBe(true);
    expect(ship.hits).toBe(4);
    expect(ship.isSunk()).toBe(true);
});

test('Ship is already sunk', () => {
    const ship = new Ship(1, 4, [0, 0], [0, 4]);
    ship.sunk = true;
    expect(ship.isHit()).toBe(false);
    expect(ship.hits).toBe(4);
    expect(ship.isSunk()).toBe(true);
});