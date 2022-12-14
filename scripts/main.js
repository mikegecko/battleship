import {
    Ship
} from "./ship.js"
import {
    Player
} from "./player.js"
import {
    Gameboard
} from "./gameboard.js"

/*
    TODO:✅❌

    ❌ Create console div for displaying if the move hit/miss/sunk
    ❌ Move DOMinterface into separate module
    ❌ Implement placement system for ships
    ❌ Refactor newGame() function into game class
    g
    EXTRA:
    - Implement Salvo game mode
    - Implement Fleet health bar
    - Implement smart AI to improve attacks
    - Add pictures/textures to ships

    BUGS:

*/

class DOMinterface {
    constructor() {
        this.shotArea = document.querySelector('.shot-container');
        this.shipArea = document.querySelector(".ship-container");
        this.debugFlag = false;
    }
    //Refactor into one renderShips() method
    renderPlayerShips(shipArr) {
        // console.log('Player Ships');
        // console.log(shipArr);
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
                this.shipArea.appendChild(gridItem);
            }
        }
    }
    renderEnemyShips(shipArr) {
        // console.log('Computer Ships');
        // console.log(shipArr);
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
    createShipSquares() {
        for (let irow = 0; irow < 10; irow++) {
            for (let icolumn = 0; icolumn < 10; icolumn++) {
                const square = document.createElement('div');
                square.style.gridColumn = icolumn + 1;
                square.style.gridRow = irow + 1;
                square.id = `P${icolumn}-${irow}`;
                square.classList.add('item');
                //square.addEventListener("click",this.shotHandler);
                this.shipArea.appendChild(square);
            }
        }
    }

    createShotSquares() {
        for (let irow = 0; irow < 10; irow++) {
            for (let icolumn = 0; icolumn < 10; icolumn++) {
                const square = document.createElement('div');
                square.style.gridColumn = icolumn + 1;
                square.style.gridRow = irow + 1;
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
    mouseHoverHandler(event) {
        const element = event.target;
        const arr = [...element.id];
        const x = parseInt(arr[0]) + 1;
        const y = parseInt(arr[2]) + 1;
        const result = compBoard.checkValidMove(x, y);
        if (result[0]) {
            //Valid move
            element.classList.add('valid');
        } else if (!result[0] && result[1] == 2) {
            //invalid move (hit)
            element.classList.add('invalid');
        } else if (!result[0] && result[1] == 1) {
            //invalid move (miss)
            element.classList.add('invalidmiss');
        }
    }
    mouseLeaveHandler(event) {
        const element = event.target;
        element.classList.remove('valid');
        element.classList.remove('invalid');
        element.classList.remove('invalidmiss');
    }
    shotHandler(event) {
        g.turn(event);
        //Temp for displaying hits/misses
        this.renderShots(compBoard);
        this.renderShots(playerBoard);
        this.mouseHoverHandler(event);
    }
    renderShots(playerObj) {
        const hits = playerObj.hits;
        const misses = playerObj.misses;
        for (let index = 0; index < misses.length; index++) {
            let coord = misses[index];
            if (playerObj == playerBoard) {
                let element = document.getElementById(`P${coord[0]-1}-${coord[1]-1}`);
                element.classList.add('miss');
                element.textContent = '';
            } else {
                let element = document.getElementById(`${coord[0]-1}-${coord[1]-1}`);
                element.classList.add('miss');
                element.textContent = '';
            }
        }
        for (let index = 0; index < hits.length; index++) {
            let coord = hits[index];
            if (playerObj == playerBoard) {
                let element = document.getElementById(`P${coord[0]-1}-${coord[1]-1}`);
                element.classList.remove('.ship');
                element.classList.add('hit');
                element.textContent = '💥'
            } else {
                let element = document.getElementById(`${coord[0]-1}-${coord[1]-1}`);
                element.classList.add('hit');
                element.textContent = '💥'
            }

        }
    }
    removeChildren(parentNode) {
        while (parentNode.firstChild) {
            parentNode.removeChild(parentNode.lastChild);
        }
    }
    debugHandler(shipArr) {
        this.debugFlag = !this.debugFlag;
        if (this.debugFlag == true) {
            console.log('Show');
            this.renderEnemyShips(shipArr);
            this.renderPlayerShips(playerBoard.getShips());
        } else {
            this.update();
            console.log('Hide');
            return;
        }
    }
    update() {
        //console.log('update');
        //Rendering enemy waters
        this.removeChildren(this.shotArea);
        this.createShotSquares();
        this.renderShots(compBoard);
        //Rendering player waters
        this.removeChildren(this.shipArea);
        this.createShipSquares();
        this.renderShots(playerBoard);
    }
    createModals() {
        const modalOptions = {
            win: {
                header: 'You Won!',
                text: 'All enemy ships have been destroyed!',
                id: 'wmodal',
                btn: 'Restart'
            },
            lose: {
                header: 'You Lost!',
                text: 'Your fleet has been destroyed!',
                id: 'lmodal',
                btn: 'Restart'
            },
            start: {
                header: 'Battleship',
                text: 'Sink all the enemy ships to win!',
                id: 'smodal',
                btn: 'Start Game'
            }
        }
        Object.values(modalOptions).forEach(element => {
            const modal = document.createElement('div');
            const modalBox = document.createElement('div');
            const modalHeader = document.createElement('h3');
            const modalText = document.createElement('p');
            const modalBtn = document.createElement('button');
            modal.classList.add('modal');
            modal.classList.add('hidden');
            modal.id = element.id;
            modalBox.classList.add('modal-content');
            modalBtn.classList.add('btn');
            modalBtn.id = 'start';
            modalBtn.addEventListener('click', (event) => {
                this.modalListener(event);
            });
            modalHeader.textContent = element.header;
            modalText.textContent = element.text;
            modalBtn.textContent = element.btn;
            modal.appendChild(modalBox);
            modalBox.appendChild(modalHeader);
            modalBox.appendChild(modalText);
            modalBox.appendChild(modalBtn);
            document.body.appendChild(modal);
        });
    }
    modalListener(event) {
        //console.log(event);
        if(event.target.innerText == 'Start Game'){
            this.hideModals();
            g.startGame(event);
        }
        else{
            this.hideModals();
            newGame();
        }
    }
    hideModals() {
        let modalArr = {};
        const startModal = document.querySelector('#smodal');
        const winModal = document.querySelector('#wmodal');
        const lossModal = document.querySelector('#lmodal');
        startModal.classList.add('hidden');
        winModal.classList.add('hidden');
        lossModal.classList.add('hidden');
    }
    showWin() {
        const modal = document.querySelector('#wmodal');
        modal.classList.remove('hidden');
    }
    showLoss() {
        const modal = document.querySelector('#lmodal');
        modal.classList.remove('hidden');
    }
    showStart() {
        const modal = document.querySelector('#smodal');
        modal.classList.remove('hidden');
    }
}

//Main Game Loop
class Game {
    constructor(params) {

    }
    startGame(event) {
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
        // const db = document.querySelector('#cheat');
        // db.addEventListener('click', function (e) {
        //     UI.debugHandler(compBoard.getShips());
        // });
        UI.renderPlayerShips(playerBoard.getShips());
    }

    turn(event) {
        const coord = [...event.target.id];
        const x = parseInt(coord[0]) + 1;
        const y = parseInt(coord[2]) + 1;
        //console.log(x, y);
        const result = compBoard.checkValidMove(x, y);
        if (result[0]) {
            //console.log('Player: ' + pl.play(x, y));
            pl.play(x, y);
            //console.log('Computer: ' + cp.play(...cp.aiPlay()));
            cp.play(...cp.aiPlay());
            this.checkWin();
        } else {
            //console.log('Duplicate move');
        }
    }
    //This runs before game start
    init() {
        UI.createModals();
        UI.showStart();
        UI.update();
    }
    checkWin() {
        //Check win/lose and display modal
        if (playerBoard.fleetStatus() && !compBoard.fleetStatus()) {
            UI.showWin();
            console.log('YOU WIN!');
        } else if (!playerBoard.fleetStatus() && compBoard.fleetStatus()) {
            UI.showLoss();
            console.log('YOU LOSE!');
        }
    }
    gameEnd() {

    }
}

function createShips() {
    let shiparr = [];
    const carrier = {
        name: "Carrier",
        length: 5,
        head: genCoords()
    };
    const battleship = {
        name: "Battleship",
        length: 4,
        head: genCoords()
    };
    const destroyer = {
        name: "Destroyer",
        length: 3,
        head: genCoords()
    };
    const submarine = {
        name: "Submarine",
        length: 3,
        head: genCoords()
    };
    const patrolboat = {
        name: "Patrol Boat",
        length: 2,
        head: genCoords()
    };
    shiparr.push(carrier, battleship, destroyer, submarine, patrolboat);
    return (shiparr);
}

function genCoords() {
    const x = randomIntFromInterval(1, 10);
    const y = randomIntFromInterval(1, 10);
    return [x, y]
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function newGame() {
    compBoard = new Gameboard();
    playerBoard = new Gameboard();
    //Computer player
    cp = new Player(playerBoard, compBoard, true);
    //Player
    pl = new Player(playerBoard, compBoard, false);
    UI = new DOMinterface();
    g = new Game();
    g.init();
}
//Global scope
let compBoard = new Gameboard();
let playerBoard = new Gameboard();
//Computer player
let cp = new Player(playerBoard, compBoard, true);
//Player
let pl = new Player(playerBoard, compBoard, false);
let UI = new DOMinterface();
let g = new Game();
g.init();
export {
    genCoords
};