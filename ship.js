class Ship {
    constructor(options = {}){
        this.name = options.name || 'no name';
        this.length = options.length || null;
        this.hits = 0;
        this.sunk = false;
        this.coord = options.coord || [null,null];
    }
    hit(int){
        if(int !== undefined){
            this.hits += int;
        }
        else{
            this.hits++;
        }
        return(this.hits);
    }
    getName(){
        return(this.name);
    }
    getLength(){
        return(this.length);
    }
    getCoord(){
        return(this.coord);
    }
    isSunk(){
        if(this.hits == this.length || this.hits > this.length){
            this.sunk = true;
        }
        else{
            this.sunk = false;
        }
        return(this.sunk);
    }
}
module.exports = Ship;