import { R0, R90, R180, R270, chainRotation } from './Rotations';
import { Tetramino } from './Tetramino';
import { getRandomColor } from './Colors';
import { getOneOf } from '../utils/RandomUtils';

function createRandomTetramino(cols) {
    return getOneOf(
        createI,
        createSquare,
        createL,
        createJ,
        createS,
        createJ)(cols);
}

function createI(cols) {
    return new Tetramino(
        [
            {row: 0, col: -1},
            {row: 0, col: 0},
            {row: 0, col: 1},
            {row: 0, col: 2}
        ],
        center(cols),
        chainRotation(R0, R90),
        getRandomColor());
}

function createSquare(cols) {
    return new Tetramino(
        [
            {row: 0, col: -1},
            {row: 0, col: 0},
            {row: 1, col: -1},
            {row: 1, col: 0}
        ],
        center(cols),
        chainRotation(R0),
        getRandomColor());
}

function createL(cols) {
    return new Tetramino(
        [
            {row: 0, col: -1},
            {row: 0, col: 0},
            {row: 0, col: 1},
            {row: 1, col: -1}
        ],
        center(cols),
        chainRotation(R0, R90, R180, R270),
        getRandomColor());
}

function createJ(cols) {
    return new Tetramino(
        [
            {row: 0, col: -1},
            {row: 0, col: 0},
            {row: 0, col: 1},
            {row: 1, col: 1}
        ],
        center(cols),
        chainRotation(R0, R90, R180, R270),
        getRandomColor());
}

function createS(cols) {
    return new Tetramino(
        [
            {row: 0, col: -1},
            {row: 0, col: 0},
            {row: -1, col: 0},
            {row: -1, col: 1}
        ],
        center(cols, 1),
        chainRotation(R0, R90),
        getRandomColor());
}

function createZ(cols) {
    return new Tetramino(
        [
            {row: 0, col: 1},
            {row: 0, col: 0},
            {row: -1, col: 0},
            {row: -1, col: -1}
        ],
        center(cols, 1),
        chainRotation(R0, R90),
        getRandomColor());
}

function center(cols, row = 0) {
    return {row, col: Math.floor(cols / 2)};
}

export { createRandomTetramino };