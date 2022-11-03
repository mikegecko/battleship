class Ship {
    constructor(options = {}) {
        this.name = options.name || 'no name';
        this.length = options.length || null;
        this.hits = 0;
        this.sunk = false;
        this.head = options.head || [null, null];
        this.rotation = options.rot || 1;
        this.coord = null;
        this.automaticShipPosition = function () {
            // Checks for the first valid rotation of the ship
            //  down:1 left:2 up:3 right:4
            const coordArr = [];
            let hx = this.head[0];
            let hy = this.head[1];
            for (let index = 0; index < this.length; index++) {
                if (hx > 10 || hy > 10 || hx < 0 || hy < 0) {
                    index = 0;
                    hx = this.head[0];
                    hy = this.head[1];
                    if (this.rotation == 4) {
                        console.log("No placeable position!");
                    } else {
                        this.rotation++;
                    }

                } else {
                    //Up
                    if (this.rotation == 3) {
                        coordArr.push([hx, hy--]);
                    }
                    //Down
                    if (this.rotation == 1) {
                        coordArr.push([hx, hy++]);
                    }
                    //Left
                    if (this.rotation == 2) {
                        coordArr.push([hx--, hy]);
                    }
                    //Right
                    if (this.rotation == 4) {
                        coordArr.push([hx++, hy]);
                    }
                }
            }
            this.coord = coordArr;
            return (coordArr);
        }
        this.automaticShipPosition();
    }

    hit(int) {
        if (int !== undefined) {
            this.hits += int;
            this.isSunk();
        } else {
            this.hits++;
            this.isSunk();
        }
        return (this.hits);
    }
    getName() {
        return (this.name);
    }
    getLength() {
        return (this.length);
    }
    getCoord() {
        return (this.coord);
    }
    isSunk() {
        if (this.hits == this.length || this.hits > this.length) {
            this.sunk = true;
        } else {
            this.sunk = false;
        }
        return (this.sunk);
    }
}
//module.exports = Ship;
export {
    Ship
};