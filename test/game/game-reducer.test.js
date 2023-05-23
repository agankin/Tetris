import assert from 'node:assert';
import { GREEN } from '../../src/game/colors.js';
import { createTetramino } from '../../src/game/tetramino-factory.js';
import { I, SQUARE, L, J, S, Z } from '../../src/game/tetramino-types.js';
import { Game } from '../../src/game/game.js';
import { MOVE_LEFT, MOVE_RIGHT, MOVE_DOWN, DROP, ROTATE_CLOCKWISE,
         ROTATE_COUNTER_CLOCKWISE, TICK } from '../../src/game/game-actions.js';
import { createGameReducer } from '../../src/game/game-reducer.js';

const ROWS = 20;
const COLS = 10;

const tetramino = createTetramino(L, COLS, GREEN);
const gameState = new Game([], tetramino, 0);
const reduceGameState = createGameReducer(ROWS, COLS, _ => {}, _ => 0);

function assertEachSquare(squares, nextSquares, assertSquare) {
    assert.equal(squares.length, nextSquares.length);

    squares.map((square, idx) => [square, nextSquares[idx]]).forEach(assertSquare);
}

describe('Game reducer tests', function () {
    it('Moves tetramino left', function() {
        const nextGameState = reduceGameState(gameState, MOVE_LEFT);

        const squares = gameState.squares;
        const nextSquares = nextGameState.squares;

        assertEachSquare(squares, nextSquares, ([{row, col}, {row: nextRow, col: nextCol}]) => {
            assert.equal(row, nextRow);
            assert.equal(col, nextCol + 1);
        });
    });

    it('Moves tetramino right', function() {
        const nextGameState = reduceGameState(gameState, MOVE_RIGHT);

        const squares = gameState.squares;
        const nextSquares = nextGameState.squares;

        assertEachSquare(squares, nextSquares, ([{row, col}, {row: nextRow, col: nextCol}]) => {
            assert.equal(row, nextRow);
            assert.equal(col, nextCol - 1);
        });
    });

    it('Moves tetramino down', function() {
        const nextGameState = reduceGameState(gameState, MOVE_DOWN);

        const squares = gameState.squares;
        const nextSquares = nextGameState.squares;

        assertEachSquare(squares, nextSquares, ([{row, col}, {row: nextRow, col: nextCol}]) => {
            assert.equal(row, nextRow - 1);
            assert.equal(col, nextCol);
        });
    });
});