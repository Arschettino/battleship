function createShip(length) {
    let obj = {};
    let slots = length;
    let status = 0;

    obj.hit = () => {
        status++;
    };
    obj.isSunk = () => {
        if (status>=slots) return true;
        return false;
    };
    obj.getStatus = () => {
        return status;
    }
    obj.getLength = () => {
        return slots;
    }
    return obj;
}

