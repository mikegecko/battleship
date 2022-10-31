const {
    moduleExpression
} = require("@babel/types");
const Ship = require("./ship.js");

class Gameboard {
    constructor() {
        this.misses = [];
        this.hits = [];
        this.ships = [];
    }
    //Refactor so coord is plaired with ship object, not other way around ?
    placeShip(options) {
        if (options == null) {
            options = {
                name: "placeholder",
                length: 5,
                coord: [1, 3],
            };
        }
        const ship = new Ship(options);
        this.ships.push(ship);
        return ship;
    }
    receiveAttack(x, y) {
        //determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot
        for (let index = 0; index < this.ships.length; index++) {
            const element = this.ships[index];
            if (element.coord[0] == x) {
                if (element.coord[1] == y) {
                    this.hits.push([x, y]);
                    element.hit();
                    return "hit";
                } else {
                    this.misses.push([x, y]);
                    return "miss";
                }
            } else {
                this.misses.push([x, y]);
                return "miss";
            }
        }
        //No ships placed
        console.log('No ships placed');
        this.misses.push([x,y]);
        return "miss";
    }
    fleetStatus() {
        //reports whether or not all of the ships have been sunk
        let sunkShips = 0;
        for (let index = 0; index < this.ships.length; index++) {
            const ship = this.ships[index];
            if (ship.isSunk()) {
                sunkShips++;
            }
        }
        if (sunkShips == this.ships.length) {
            //All ships sunk
            return false;
        } else {
            //Not all sunk
            return true;
        }
    }
}

const compBoard = new Gameboard();
const playerBoard = new Gameboard();

class Player {
    constructor(plBoard, cpBoard, isComp) {
        this.isComputer = isComp || false;
        this.plBoard = plBoard;
        this.cpBoard = cpBoard;
    }
    aiPlay() {
        //Method for computer making random plays
        const x = randomIntFromInterval(1, 7);
        const y = randomIntFromInterval(1, 7);
        for (let index = 0; index < this.plBoard.misses.length; index++) {
            const element = this.plBoard.misses[index];
            if (element[0] == x) {
                if (element[1] == y) {
                    //values the same as previous move
                    return this.aiPlay();
                }
            }
        }
        for (let index = 0; index < this.plBoard.hits.length; index++) {
            const element = this.plBoard.hits[index];
            if (element[0] == x) {
                if (element[1] == y) {
                    return this.aiPlay();
                }
            }
        }
        return [x, y];
    }
    play(x, y) {
        if (this.isComputer) {
            //Attack player board
            const result = this.plBoard.receiveAttack(x, y);
            return result;
        } else {
            //Attack computer board
            const result = this.cpBoard.receiveAttack(x, y);
            return result;
        }
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const cp = new Player(playerBoard, compBoard, true);
console.log(cp.aiPlay());
module.exports = {
    Gameboard,
    Player,
    randomIntFromInterval,
};