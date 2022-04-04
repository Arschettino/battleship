
function createPlayer(name, gameBoard) {
    let obj = {};
    obj.gameBoard = gameBoard;
    obj.name = name;

    obj.attack = (player, row, col) => {
        return player.receiveAttack(row, col);
    }

    obj.automaticAttack = (player) => {
        let newX, newY;
        let [x, y] = player.gameBoard.getSize()
        
        do {
            newX = Math.floor(Math.random() * x);
            newY = Math.floor(Math.random() * y);
        } while (!player.receiveAttack(newX, newY));
    }

    obj.receiveAttack = (row, col) => {
        return obj.gameBoard.receiveAttack(row, col);
    }

    obj.checkLose = () => {
        return obj.gameBoard.gameOver();
    }

    obj.placeRandom = (length) => {
        let options = ['vertical', 'horizontal']
        let newX, newY, direction;
        let [x, y] = obj.gameBoard.getSize();

        do {
            newX = Math.floor(Math.random() * x);
            newY = Math.floor(Math.random() * y);
            direction = Math.floor(Math.random() * 2);

        } while (!obj.gameBoard.placeShip(length, newX, newY, options[direction]));

    }

    return obj;
}