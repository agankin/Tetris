import assert from 'node:assert';
import { R0, R90, R180, R270 } from '../../src/game/rotations.js';
import { createRotationChain } from '../../src/game/rotation-chain.js';

describe('Rotation chain tests', function () {
    it('Changes rotation states clockwise', function () {
        const rotation = createRotationChain(R0, R90, R180, R270);

        let next = rotation.rotateClockwise();
        assert.equal(next.currentRotation, R90);

        next = next.rotateClockwise();
        assert.equal(next.currentRotation, R180);

        next = next.rotateClockwise();
        assert.equal(next.currentRotation, R270);

        next = next.rotateClockwise();
        assert.equal(next.currentRotation, R0);
    });

    it('Changes rotation states counter clockwise', function () {
        const rotation = createRotationChain(R0, R90, R180, R270);

        let next = rotation.rotateCounterClockwise();
        assert.equal(next.currentRotation, R270);

        next = next.rotateCounterClockwise();
        assert.equal(next.currentRotation, R180);

        next = next.rotateCounterClockwise();
        assert.equal(next.currentRotation, R90);

        next = next.rotateCounterClockwise();
        assert.equal(next.currentRotation, R0);
    });
});