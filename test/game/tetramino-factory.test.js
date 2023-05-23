import assert from 'node:assert';
import { RED, BLUE, GREEN } from '../../src/game/colors.js';
import { I, SQUARE, L, J, S, Z } from '../../src/game/tetramino-types.js';
import { createTetramino } from '../../src/game/tetramino-factory.js';

const COLS = 10;

describe('Create tetramino tests', function () {
    it('Creates I tetramino', function () {
        const tetramino = createTetramino(I, 10, RED);
        assert.equal(tetramino.type, I);
    });

    it('Creates Square tetramino', function () {
        const tetramino = createTetramino(SQUARE, 10, BLUE);
        assert.equal(tetramino.type, SQUARE);
    });

    it('Creates L tetramino', function () {
        const tetramino = createTetramino(L, 10, GREEN);
        assert.equal(tetramino.type, L);
    });

    it('Creates J tetramino', function () {
        const tetramino = createTetramino(J, 10, RED);
        assert.equal(tetramino.type, J);
    });

    it('Creates S tetramino', function () {
        const tetramino = createTetramino(S, 10, BLUE);
        assert.equal(tetramino.type, S);
    });

    it('Creates Z tetramino', function () {
        const tetramino = createTetramino(Z, 10, GREEN);
        assert.equal(tetramino.type, Z);
    });
});