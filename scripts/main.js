// const {
//     moduleExpression
// } = require("@babel/types");
// const Ship = require("./ship.js");
// const Player = require("./player.js");
import {Ship} from "./ship.js"
import {Player} from "./player.js"
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
                head: [1,3],
                rot: 1,
            };
        }
        const ship = new Ship(options);
        if(this.shipPlacementValid(ship)){
            this.ships.push(ship);
            return ship;
        }
        else{
            console.log('Creating new ship');
            options.head = genCoords();
            this.placeShip(options);
            //We need to create a new ship
        }
    }
    shipPlacementValid(shipObj){
        const checkCoords = shipObj.coord;
        for (let j = 0; j < checkCoords.length; j++) {
            const element = checkCoords[j];
            for (let index = 0; index < this.ships.length; index++) {
                const ship = this.ships[index];
                for (let index = 0; index < ship.coord.length; index++) {
                    const xy = ship.coord[index];
                    if(element[0] == xy[0] && element[1] == xy[1]){
                        console.log('Intersection detected');
                        return(false);
                    }
                }
            }
        }
        return(true);
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
    getShips(){
        return(this.ships);
    }
}

class DOMinterface {
    constructor(params) {
        this.shotArea = document.querySelector('.shot-container');
        this.shipArea = document.querySelector(".ship-container")
    }   
    renderShips(shipArr){
        const mark = "x";
        for (let index = 0; index < shipArr.length; index++) {
            const element = shipArr[index];
            console.log(element);
            for (let index = 0; index < element.coord.length; index++) {
                const coor = element.coord[index];
                const gridItem = document.createElement('div');
                gridItem.textContent = mark;
                gridItem.style.gridColumn = coor[0];
                gridItem.style.gridRow = coor[1];
                gridItem.classList.add('ship')
                this.shipArea.appendChild(gridItem);
            }
            
        }
    }
    shotHandler(callback){
        console.log(callback.target.id);
    }
    createShotSquares(){

        for (let irow = 0; irow < 10; irow++) {
            for (let icolumn = 0; icolumn < 10; icolumn++) {
                const square = document.createElement('div');
                square.style.gridColumn = icolumn+1;
                square.style.gridRow = irow+1;
                square.id = `${icolumn}-${irow}`;
                square.classList.add('item');
                square.addEventListener("click",this.shotHandler);
                this.shotArea.appendChild(square);
            }
        }
    }
    renderShots(playerObj){

    }
    update(){

    }
}

//Main Game Loop
function game() {
    //TODO: Turn this into a module & add turn, gameEnd method
    //Initializing objects
    const compBoard = new Gameboard();
    const playerBoard = new Gameboard();
    const UI = new DOMinterface();
    UI.createShotSquares();
    //Place ships TEMP
    const shipProto = createShips();
    // compBoard.placeShip(shipProto[0]);
    // playerBoard.placeShip(shipProto[1]);
    // playerBoard.placeShip(shipProto[2]);
    shipProto.forEach(element => {
        playerBoard.placeShip(element);
    });
    //Computer player
    const cp = new Player(playerBoard, compBoard, true);
    //Player
    const pl = new Player(playerBoard, compBoard, false);
    UI.renderShips(playerBoard.getShips());
    console.log('Ran successfully');
}

function createShips(){
    let shiparr = [];
    const carrier = {name: "Carrier", length: 5, head: genCoords() };
    const battleship = {name: "Battleship", length: 4, head: genCoords()};
    const destroyer = {name: "Cruiser", length: 3, head: genCoords()};
    const submarine = {name: "Submarine", length: 3, head: genCoords()};
    const patrolboat = {name: "Patrol Boat", length: 2, head: genCoords()};
    shiparr.push(carrier,battleship,destroyer,submarine,patrolboat);
    return(shiparr);
}
function genCoords(){
    const x = randomIntFromInterval(1, 10);
    const y = randomIntFromInterval(1, 10);
    return [x,y]
}
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
game();
console.log('Fin');
//module.exports = Gameboard;