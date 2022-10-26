const Gameboard = require('./main.js');

const gb = new Gameboard();
const options = {name:"placeholder", length: 5, coord:[1,3], hits: 0, sunk: false}
test('Gameboard placing ship', () => {
    expect(gb.placeShip(options)).toEqual(options)
    expect(gb.ships).toEqual([options])
});
test('Gameboard receiving a hit', () => {
    expect(gb.receiveAttack(1, 3)).toBe('hit')
    expect(gb.ships[0].hits).toBe(1)
    expect(gb.hits[0]).toEqual([1,3])
});
test('Gameboard receiving a miss', () => {
    expect(gb.receiveAttack(5, 5)).toEqual('miss')
    expect(gb.misses[0]).toEqual([5,5])
});
test('Fleet status alive', () => {
    expect(gb.fleetStatus()).toBe(true);
})
test('Fleet status destroyed', () => {
    gb.ships[0].hit(5);
    expect(gb.fleetStatus()).toBe(false);
})