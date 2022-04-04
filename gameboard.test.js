import { test, expect } from '@jest/globals';
import * as gameBoard from './gameBoard.js';

test('gameBoard places ships correctly', () => {
    let board = gameBoard.createGameBoard(10, 10);
    board.placeShip(5, 0, 0, 'vertical');
    for (let i = 0; i < 5; i++) {
        expect(board.getShips()[0][i]).toBe(0);
    }
});

test('gameBoard refuses to place invalid ships exceeding bounds', () => {
    let board = gameBoard.createGameBoard(10, 10);
    expect(board.placeShip(5, 0, 6, 'vertical')).toBe(false);
    expect(board.placeShip(5, 6, 0, 'horizontal')).toBe(false);
});

test('gameBoard refuses to place invalid ships overlapping others', () => {
    let board = gameBoard.createGameBoard(10, 10);
    expect(board.placeShip(5, 0, 0, 'vertical')).toBe(true);
    expect(board.placeShip(5, 0, 3, 'horizontal')).toBe(false);
});

test('gameBoard registers attacks correctly', () => {
    let board = gameBoard.createGameBoard(10, 10);
    board.placeShip(5, 0, 0, 'vertical');
    for (let i = 0; i < 5; i++) {
        expect(board.receiveAttack(0, i)).toBe(true);
    }
});

test('gameboard registers shots in correct square', () => {
    let board = gameBoard.createGameBoard(10, 10);
    board.placeShip(5, 0, 0, 'vertical');
    board.receiveAttack(0, 0);
    expect(board.getShots()[0][0]).toBe(1);

    board.receiveAttack(1, 0);
    expect(board.getShots()[1][0]).toBe(0);
    expect(board.getShots()[0][1]).toBe(-1);
});

test('gameBoard rejects duplicate shots', () => {
    let board = gameBoard.createGameBoard(10, 10);
    expect(board.receiveAttack(0, 0)).toBe(true);
    expect(board.receiveAttack(0, 0)).toBe(false);
});

test('gameBoard returns correct size', () => {
    let board = gameBoard.createGameBoard(10, 10);
    expect(board.getSize()).toEqual([10,10]);
});