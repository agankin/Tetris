import { R0, R90, R180, R270 } from './rotations.js';
import { createRotationChain } from './rotation-chain.js';
import { Tetramino } from './tetramino.js';
import { I, SQUARE, L, J, S, Z } from './tetramino-types.js';

function createTetramino(type, cols, color) {
    switch (type) {
        case I:
            return createI(cols, color);

        case SQUARE:
            return createSquare(cols, color);

        case L:
            return createL(cols, color);

        case J:
            return createJ(cols, color);

        case S:
            return createS(cols, color);

        case Z:
            return createZ(cols, color);
            
        default:
            throw new Error(`Unsupported tetramino type: ${type.toString()}.`);
    }
}

function createI(cols, color) {
    return new Tetramino(
        I,
        [
            {row: 0, col: -1},
            {row: 0, col: 0},
            {row: 0, col: 1},
            {row: 0, col: 2}
        ],
        center(cols),
        createRotationChain(R0, R90),
        color);
}

function createSquare(cols, color) {
    return new Tetramino(
        SQUARE,
        [
            {row: 0, col: -1},
            {row: 0, col: 0},
            {row: 1, col: -1},
            {row: 1, col: 0}
        ],
        center(cols),
        createRotationChain(R0),
        color);
}

function createL(cols, color) {
    return new Tetramino(
        L,
        [
            {row: 0, col: -1},
            {row: 0, col: 0},
            {row: 0, col: 1},
            {row: 1, col: -1}
        ],
        center(cols),
        createRotationChain(R0, R90, R180, R270),
        color);
}

function createJ(cols, color) {
    return new Tetramino(
        J,
        [
            {row: 0, col: -1},
            {row: 0, col: 0},
            {row: 0, col: 1},
            {row: 1, col: 1}
        ],
        center(cols),
        createRotationChain(R0, R90, R180, R270),
        color);
}

function createS(cols, color) {
    return new Tetramino(
        S,
        [
            {row: 0, col: -1},
            {row: 0, col: 0},
            {row: -1, col: 0},
            {row: -1, col: 1}
        ],
        center(cols, 1),
        createRotationChain(R0, R90),
        color);
}

function createZ(cols, color) {
    return new Tetramino(
        Z,
        [
            {row: 0, col: 1},
            {row: 0, col: 0},
            {row: -1, col: 0},
            {row: -1, col: -1}
        ],
        center(cols, 1),
        createRotationChain(R0, R90),
        color);
}

function center(cols, row = 0) {
    return {row, col: Math.floor(cols / 2)};
}

export { createTetramino };