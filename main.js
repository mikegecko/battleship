const {
    moduleExpression
} = require("@babel/types");
const Ship = require("./ship.js");
const Player = require("./player.js");
class Gameboard {
    
    constructor() {
        this.misses = [];
        this.hits = [];
        this.ships = [];
    }
    placeShip(options) {
        if (options == null) {
            options = {
                name: "placeholder",
                length: 2,
                coord: [1,3],
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
        console.log("No ships placed");
        this.misses.push([x, y]);
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


//Main Game Loop
function game() {
    //Initializing objects
    const compBoard = new Gameboard();
    const playerBoard = new Gameboard();
    //Place ships TEMP
    const shipProto = createShips();
    compBoard.placeShip(shipProto[0]);
    playerBoard.placeShip(shipProto[1]);
    //Computer player
    const cp = new Player(playerBoard, compBoard, true);
    //Player
    const pl = new Player(playerBoard, compBoard, false);
    //TODO: fix coordinates and make it easier to place ships
}

function createShips(){
    let shiparr = [];
    const carrier = {name: "Carrier", length: 5, coord: genCoords() };
    const battleship = {name: "Battleship", length: 4, coord: genCoords()};
    const destroyer = {name: "Cruiser", length: 3, coord: genCoords()};
    const submarine = {name: "Submarine", length: 3, coord: genCoords()};
    const patrolboat = {name: "Patrol Boat", length: 2, coord: genCoords()};
    shiparr.push(carrier,battleship,destroyer,submarine,patrolboat);
    return(shiparr);
}
function genCoords(){
    const x = randomIntFromInterval(1, 7);
    const y = randomIntFromInterval(1, 7);
    return [x,y]
}
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
game();
module.exports = Gameboard;