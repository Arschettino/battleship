import { expect, test } from '@jest/globals';
import * as ship from './ship.js';

test('returns ship of correct length', () => {
    expect(ship.createShip(5).getLength()).toBe(5);
})

test('ship is initially not sunk', () => {
    expect(ship.createShip(5).isSunk()).toBe(false);
})

test('hit method works properly and sinks ship', () => {
    let carrier = ship.createShip(5);
    for (let i = 0; i<5; i++) {
        carrier.hit(i);
    }
    expect(carrier.isSunk()).toBe(true);
})

test('hit will not confirm on already hit slot', () => {
    let carrier = ship.createShip(5);
    carrier.hit(0);
    expect(carrier.hit(0)).toBe(false);
});

test('hit will not confirm on out of range slot', () => {
    let carrier = ship.createShip(5);
    expect(carrier.hit(5)).toBe(false);
});

