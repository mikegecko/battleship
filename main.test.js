const Ship = require('./main.js');
const testData = {name:'test', length: 4}
const testShip = new Ship(testData);

test('Ship assignment', () => {    
    expect(testShip).toEqual({name: 'test', length: 4, hits: 0, sunk: false});
});
test('Ship name', () => {
    expect(testShip.getName()).toBe('test')
});
test('Ship length', () => {
    expect(testShip.getLength()).toBe(4);
});
test('Ship hit method', () => {
    expect(testShip.hit()).toBe(1);
})
test('Ship Sinking method', () => {
    expect(testShip.isSunk()).toBe(false);
    testShip.hit();
    testShip.hit();
    testShip.hit();
    expect(testShip.isSunk()).toBe(true);
})
