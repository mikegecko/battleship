import {Ship} from "./ship.js"
import {genCoords} from "./main.js"
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
            console.log(options);
            this.placeShip(options);
        }
    }
    shipPlacementValid(shipObj){
        //TODO: Rewrite or add new method for checking edge cases
        const checkCoords = shipObj.coord;
        for (let j = 0; j < checkCoords.length; j++) {
            const element = checkCoords[j];
            for (let index = 0; index < this.ships.length; index++) {
                const ship = this.ships[index];
                for (let index = 0; index < ship.coord.length; index++) {
                    const xy = ship.coord[index];
                    if(element[0] == xy[0] && element[1] == xy[1]){
                        console.log(`Intersection detected at ${xy}`);
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
export { Gameboard };