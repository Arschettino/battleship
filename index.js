let player1, player2;
let winner = '';
let bullet = '&#8226;';

function initializeGame() {
    let message = document.querySelector('.message');
    message.textContent = '';
    player1 = createPlayer('Andrew', createGameBoard(10, 10));
    player2 = createPlayer('AI', createGameBoard(10, 10));

    winner = '';

    for (let i = 2; i <= 5; i++) {
        player1.placeRandom(i);
        player2.placeRandom(i);
    }
    paintShips(player1);
    paintShips(player2);
}

function takeTurn(row, col) {
    if (winner) return false;
    if (!player1.attack(player2, row, col)) return false;
    paintShots(player2);
    if (player2.checkLose()) {
        winner = player1.name + " wins!";
        showWinner();
    }
    if (winner) return true;
    player2.automaticAttack(player1);
    paintShots(player1);
    if (player1.checkLose()) {
        winner = player2.name + " wins!";
        showWinner();
    }
    return true;
}

function paintShips(player) {
    let shipPlacement = player.gameBoard.getShips()
    for (let i = 0; i < shipPlacement.length; i++) {
        for (let j = 0; j < shipPlacement[i].length; j++) {
            if (shipPlacement[i][j] != -1) {
                let id = i + "\." + j + '.' + (player.name === 'AI' ? 1 : 0);
                let select = document.getElementById(id);
                select.classList.add('ship');
            }
        }
    }
}

function paintShots(player) {
    let shots = player.gameBoard.getShots();
    for (let i = 0; i < shots.length; i++) {
        for (let j = 0; j < shots[i].length; j++) {
            let id = j + "\." + i + '.' + (player.name === 'AI' ? 1 : 0);
            let select = document.getElementById(id);
            if (shots[j][i] !== -1) {
                select.innerHTML = bullet;
            }
            if (shots[j][i] === 0) {
                select.classList.add('miss');
            }
            if (shots[j][i] === 1) {
                select.classList.add('hit');
            }
        }
    }
}

function showWinner() {
    let message = document.querySelector('.message');
    message.textContent = winner;
}


function initializeGrid() {
    let left = document.querySelector('.left');
    let right = document.querySelector('.right');
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = i + '.' + j + '.0';
            let cell2 = document.createElement('div');
            cell2.classList.add('cell');
            cell2.id = i + '.' + j + '.1';
            left.appendChild(cell);
            right.appendChild(cell2);
            cell2.addEventListener('click', (event) => {
                let [row, col, side] = event.target.id.split('.');
                if (takeTurn(row, col)) {
                    event.target.classList.toggle('active');
                    setTimeout(() => { event.target.classList.toggle('active') }, 150);
                }
                else {
                    event.target.classList.toggle('error');
                    setTimeout(() => { event.target.classList.toggle('error') }, 150);
                }
            })
        }
    }
}

initializeGrid();
initializeGame();