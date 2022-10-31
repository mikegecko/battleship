
module.exports = class Player {
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

