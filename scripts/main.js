// const {
//     moduleExpression
// } = require("@babel/types");
// const Ship = require("./ship.js");
// const Player = require("./player.js");
import {Ship} from "./ship.js"
import {Player} from "./player.js"
import {Gameboard} from "./gameboard.js"

class DOMinterface {
    constructor(params) {
        this.shotArea = document.querySelector('.shot-container');
        this.shipArea = document.querySelector(".ship-container");
        this.debugFlag = false;
    }   
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
            //console.log(ship);
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
            this.removeChildren(this.shotArea);
            this.createShotSquares();
            console.log('Hide');
            return;
        }
    }
    update(){
        console.log('update');
    }
}

//Main Game Loop
    function game(){
    //TODO: Turn this into a module & add turn, ggameEnd method
    //Initializing objects
    const compBoard = new Gameboard();
    const playerBoard = new Gameboard();
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
    //Temp debug button
    const db = document.querySelector('#cheat');
    db.addEventListener('click', function (e){
        UI.debugHandler(compBoard.getShips());
    });

    //Computer player
    const cp = new Player(playerBoard, compBoard, true);
    //Player
    const pl = new Player(playerBoard, compBoard, false);
    UI.renderPlayerShips(playerBoard.getShips());
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