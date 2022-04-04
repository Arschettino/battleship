

function createGameBoard(width, height) {
    let obj = {};
    let ships = [];

    let shipPlacement = [];
    for (let i = 0; i < height; i++) {
        shipPlacement[i] = new Array(width).fill(-1);
    }

    let shotsBoard = [];
    for (let i = 0; i < height; i++) {
        shotsBoard[i] = new Array(width).fill(-1);
    }

    let validShipPlacement = (length, row, column, direction) => {
        switch (direction) {
            case 'vertical':
                if (row + length > height - 1) return false; //check if ship would exceed bounds
                for (let i = row; i < row + length; i++) { //check if ship would overlap another ship
                    if (shipPlacement[i][column] != -1) return false;
                }
                break;
            case 'horizontal':
                if (column + length > width - 1) return false;
                for (let i = column; i < column + length; i++) { //check if ship would overlap another ship
                    if (shipPlacement[row][i] != -1) return false;
                }
                break;
        }
        return true;
    }

    obj.placeShip = (length, row, column, direction) => {
        let newShip;
        if(!validShipPlacement(length,row,column,direction)) return false;
        switch (direction) {
            case 'vertical':
                newShip = createShip(length)
                ships.push(newShip);

                for (let i = row; i < row + length; i++) {
                    shipPlacement[i][column] = ships.indexOf(newShip);
                }
                return true;
                break;
            case 'horizontal':
                newShip = createShip(length)
                ships.push(newShip);
                for (let i = column; i < column + length; i++) {
                    shipPlacement[row][i] = ships.indexOf(newShip);
                }
                return true;
                break;
        }
    }

    obj.receiveAttack = (row, column) => {
        if (shotsBoard[row][column] != -1) return false;
        if (shipPlacement[row][column] != -1) {
            shotsBoard[row][column] = 1
            ships[shipPlacement[row][column]].hit();
        }
        else shotsBoard[row][column] = 0;
        return true;
    }

    obj.getShots = () => {
        return shotsBoard;
    }

    obj.getShips = () => {
        return shipPlacement;
    }

    obj.getallships = () => {
        return ships;
    }

    obj.gameOver = () => {
        for (let i of ships) {
            if (!i.isSunk()) return false;
        }
        return true;
    }

    obj.getSize = () => {
        return [shotsBoard[0].length,shotsBoard.length];
    }

    return obj;
}