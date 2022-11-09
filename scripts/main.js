import {Ship} from "./ship.js"
import {Player} from "./player.js"
import {Gameboard} from "./gameboard.js"


/*
    TODO:✅❌
    - Implement displaying of hits and misses in DOM [1/2]
        - hits/misses in enemy board ✅
        - hits/misses in player board ❌
    - Implement game loop:
        - taking turns
        - win/lose modal
    - Create console div for displaying if the move hit/miss/sunk
    - Move DOMinterface into separate module
    - Implement placement system of ships
    - Add pictures/textures to ships

    BUGS:
    - Fix ships generating off grid
    - Fix ships generating with one less length
    - Fix player ability to attack same space ✅
*/

class DOMinterface {
    constructor() {
        this.shotArea = document.querySelector('.shot-container');
        this.shipArea = document.querySelector(".ship-container");
        this.debugFlag = false;
    }   
    //Refactor into one renderShips() method
    renderPlayerShips(shipArr){
        for (let index = 0; index < shipArr.length; index++) {
            const ship = shipArr[index];
            console.log(ship);
            for (let index = 0; index < ship.coord.length; index++) {
                const coor = ship.coord[index];
                const gridItem = document.createElement('div');
                const mark = ship.marker;
                gridItem.textContent = mark;
                gridItem.style.gridColumn = coor[0];
                gridItem.style.gridRow = coor[1];
                gridItem.classList.add('item');
                gridItem.classList.add('ship');
                this.shipArea.appendChild(gridItem);
            }
        }
    }
    renderEnemyShips(shipArr){
        for (let index = 0; index < shipArr.length; index++) {
            const ship = shipArr[index];
            for (let index = 0; index < ship.coord.length; index++) {
                const coor = ship.coord[index];
                const gridItem = document.createElement('div');
                const mark = ship.marker;
                gridItem.textContent = mark;
                gridItem.style.gridColumn = coor[0];
                gridItem.style.gridRow = coor[1];
                gridItem.classList.add('item');
                gridItem.classList.add('ship');
                this.shotArea.appendChild(gridItem);
            }
        }
    }
    createShipSquares(){
        for (let irow = 0; irow < 10; irow++) {
            for (let icolumn = 0; icolumn < 10; icolumn++) {
                const square = document.createElement('div');
                square.style.gridColumn = icolumn+1;
                square.style.gridRow = irow+1;
                //square.id = `${icolumn}-${irow}`;
                square.classList.add('item');
                //square.addEventListener("click",this.shotHandler);
                this.shipArea.appendChild(square);
            }
        }
    }
    
    createShotSquares(){
        for (let irow = 0; irow < 10; irow++) {
            for (let icolumn = 0; icolumn < 10; icolumn++) {
                const square = document.createElement('div');
                square.style.gridColumn = icolumn+1;
                square.style.gridRow = irow+1;
                square.id = `${icolumn}-${irow}`;
                square.classList.add('item');
                square.addEventListener("click", (event) => {
                    this.shotHandler(event);
                });
                square.addEventListener('mouseover', (event) => {
                    this.mouseHoverHandler(event);
                });
                this.shotArea.appendChild(square);
                square.addEventListener('mouseout', (event) => {
                    this.mouseLeaveHandler(event);
                });
            }
        }
    }
    mouseHoverHandler(event){
        const element = event.target;
        const arr = [...element.id];
        const x = parseInt(arr[0]) + 1;
        const y = parseInt(arr[2]) + 1;
        if(compBoard.checkValidMove(x, y)){
            //Valid move
            element.classList.add('valid');
        }
        else{
            //invalid move
            element.classList.add('invalid');
        }
    }
    mouseLeaveHandler(event){
        const element = event.target;
        element.classList.remove('valid');
        element.classList.remove('invalid');
    }
    shotHandler(event){
        const coord = [...event.target.id];
        const x = parseInt(coord[0]) + 1;
        const y = parseInt(coord[2]) + 1;
        console.log(x, y);
        if(compBoard.checkValidMove(x, y)){
            console.log(pl.play(x,y));
        }
        //Temp for displaying hits/misses
        this.renderShots(compBoard);
        //TODO: After this is executed end players turn and let computer move
    }
    renderShots(playerObj){
        const hits = playerObj.hits;
        const misses = playerObj.misses;
        for (let index = 0; index < misses.length; index++) {
            let coord = misses[index];
            let element = document.getElementById(`${coord[0]-1}-${coord[1]-1}`);
            element.classList.add('miss');
            element.textContent = '⋅';
        }
        for (let index = 0; index < hits.length; index++) {
            let coord = hits[index];
            let element = document.getElementById(`${coord[0]-1}-${coord[1]-1}`);
            element.classList.add('hit');
            element.textContent = 'X'
        }
    }
    removeChildren(parentNode){
        while(parentNode.firstChild){
            parentNode.removeChild(parentNode.lastChild);
        }
    }
    debugHandler(shipArr){
        this.debugFlag = !this.debugFlag;
        if(this.debugFlag == true){
            console.log('Show');
            this.renderEnemyShips(shipArr)
        }
        else{
            this.update();
            console.log('Hide');
            return;
        }
    }
    update(){
        console.log('update');
        //Rendering enemy waters
        this.removeChildren(this.shotArea);
        this.createShotSquares();
        this.renderShots(compBoard);
    }
}
// I Dont like these here
    const compBoard = new Gameboard();
    const playerBoard = new Gameboard();
     //Computer player
     const cp = new Player(playerBoard, compBoard, true);
     //Player
     const pl = new Player(playerBoard, compBoard, false);
//Main Game Loop
    function game(){
    //TODO: Turn this into a module & add turn, gameEnd method
    //Initializing objects (Do not put into contructor)
    const UI = new DOMinterface();
    UI.createShotSquares();
    UI.createShipSquares();
    //Place ships TEMP
    const playerShips = createShips();
    playerShips.forEach(element => {
        playerBoard.placeShip(element);
    });
    const computerShips = createShips();
    computerShips.forEach(element => {
        compBoard.placeShip(element);
    });
    //Debug button
    const db = document.querySelector('#cheat');
    db.addEventListener('click', function (e){
        UI.debugHandler(compBoard.getShips());
    });
   
    UI.renderPlayerShips(playerBoard.getShips());

    //Player turn start
}

function createShips(){
    //TODO: Fix bug where battleship generates with a length of 3
    //TODO: Fix ships still intersecting sometimes
    let shiparr = [];
    const carrier = {name: "Carrier", length: 5, head: genCoords() };
    const battleship = {name: "Battleship", length: 4, head: genCoords()};
    const destroyer = {name: "Destroyer", length: 3, head: genCoords()};
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
export {genCoords};