import { R0, R90, R180, R270 } from './rotations.js';
import { createRotationChain } from './rotation-chain.js';
import { Tetramino } from './tetramino.js';
import { I, SQUARE, L, J, S, Z } from './tetramino-types.js';

function createTetramino(type, cols, color) {
    const centerCol = Math.floor(cols / 2);

    switch (type) {
        case I:
            return createI(centerCol, color);

        case SQUARE:
            return createSquare(centerCol, color);

        case L:
            return createL(centerCol, color);

        case J:
            return createJ(centerCol, color);

        case S:
            return createS(centerCol, color);

        case Z:
            return createZ(centerCol, color);
            
        default:
            throw new Error(`Unsupported tetramino type: ${type.toString()}.`);
    }
}

function createI(centerCol, color) {
    return new Tetramino(
        I,
        [
            { row: 0, col: -1 },
            { row: 0, col: 0 },
            { row: 0, col: 1 },
            { row: 0, col: 2 }
        ],
        { row: 0, col: centerCol },
        createRotationChain(R0, R90),
        color);
}

function createSquare(centerCol, color) {
    return new Tetramino(
        SQUARE,
        [
            { row: 0, col: -1 },
            { row: 0, col: 0 },
            { row: 1, col: -1 },
            { row: 1, col: 0 }
        ],
        { row: 0, col: centerCol },
        createRotationChain(R0),
        color);
}

function createL(centerCol, color) {
    return new Tetramino(
        L,
        [
            { row: 0, col: -1 },
            { row: 0, col: 0 },
            { row: 0, col: 1 },
            { row: 1, col: -1 }
        ],
        { row: 0, col: centerCol },
        createRotationChain(R0, R90, R180, R270),
        color);
}

function createJ(centerCol, color) {
    return new Tetramino(
        J,
        [
            { row: 0, col: -1 },
            { row: 0, col: 0 },
            { row: 0, col: 1 },
            { row: 1, col: 1 }
        ],
        { row: 0, col: centerCol },
        createRotationChain(R0, R90, R180, R270),
        color);
}

function createS(centerCol, color) {
    return new Tetramino(
        S,
        [
            {row: 0, col: -1},
            {row: 0, col: 0},
            {row: -1, col: 0},
            {row: -1, col: 1}
        ],
        { row: 1, col: centerCol },
        createRotationChain(R0, R90),
        color);
}

function createZ(centerCol, color) {
    return new Tetramino(
        Z,
        [
            {row: 0, col: 1},
            {row: 0, col: 0},
            {row: -1, col: 0},
            {row: -1, col: -1}
        ],
        { row: 1, col: centerCol },
        createRotationChain(R0, R90),
        color);
}

export { createTetramino };