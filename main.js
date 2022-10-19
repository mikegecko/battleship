class Ship {
    constructor(options = {}){
        this.name = options.name || 'no name';
        this.length = options.length || null;
        this.hits = 0;
        this.sunk = false;
    }
    hit(){
        this.hits++;
    }
    getName(){
        return(this.name);
    }
    getLength(){
        return(this.length);
    }
    isSunk(){
        if(this.hits == this.length){
            this.sunk = true;
        }
        return(this.sunk);
    }
}

const data = {name: "Destroyer", length: 5}
const destroyer = new Ship(data);
destroyer.hit();

console.log(destroyer);