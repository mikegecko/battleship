
const Gameboard = require('./main');
const Player = require('./player');
const randomIntFromInterval = require('./main.js');
const gb = new Gameboard();
const options = {name:"placeholder", length: 5, coord:[1,3], hits: 0, sunk: false}
const pb = new Gameboard();
const cb = new Gameboard();
const cp = new Player(pb, cb, true);
const pp = new Player(pb,cb);
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
test('Ai move generation', () => {
    const testmve = cp.aiPlay();
    for (let index = 0; index < 2; index++) {
        expect(testmve[index]).toBeGreaterThanOrEqual(1);
        expect(testmve[index]).toBeLessThanOrEqual(7);
    }
})
test('Computer move', () => {
    expect(cp.play(cp.aiPlay())).toBe('miss')
})
test('Player move', () => {
    expect(pp.play(0,0)).toBe('miss')
})
// test('Random num generation', () => {
//     expect(randomIntFromInterval(1,7)).toBeGreaterThanOrEqual(1)
// })