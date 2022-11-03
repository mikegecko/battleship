class Ship {
    constructor(options = {}) {
        this.name = options.name || 'no name';
        this.length = options.length || null;
        this.hits = 0;
        this.sunk = false;
        this.head = options.head || [null, null];
        this.rotation = options.rot || 'down';
        this.coord = null;
        this.createCoords = function () {
            //TODO: Fix coords getting generated out of bounds
            const coordArr = [];
            let hx = this.head[0];
            let hy = this.head[1];
            for (let index = 0; index < this.length; index++) {
                if (this.rotation == 'up') {
                    coordArr.push([hx, hy--]);
                }
                if (this.rotation == 'down') {
                    coordArr.push([hx, hy++]);
                }
            }
            this.coord = coordArr;
            return (coordArr);
        }
        this.createCoords();
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