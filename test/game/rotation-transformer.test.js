import assert from 'node:assert';
import { R0, R90, R180, R270 } from '../../src/game/rotations.js';
import { RotationTransformer } from '../../src/game/rotation-transformer.js';

const figure = [
    { row: -2, col: -3 },
    { row: 0, col: 0 }
];

describe('Rotation transformer tests', function () {
    it('Rotates 0 degrees', function() {
        const [ square0, square1 ] = RotationTransformer.rotate(figure, R0);
        
        const { row: row0, col: col0 } = square0;
        const { row: row1, col: col1 } = square1;

        assert.equal(row0, -2);
        assert.equal(col0, -3);

        assert.equal(row1, 0);
        assert.equal(col1, 0);
    });

    it('Rotates 90 degrees', function() {
        const [ square0, square1 ] = RotationTransformer.rotate(figure, R90);
        
        const { row: row0, col: col0 } = square0;
        const { row: row1, col: col1 } = square1;

        assert.equal(row0, -3);
        assert.equal(col0, 2);

        assert.equal(row1, 0);
        assert.equal(col1, 0);
    });

    it('Rotates 180 degrees', function() {
        const [ square0, square1 ] = RotationTransformer.rotate(figure, R180);
        
        const { row: row0, col: col0 } = square0;
        const { row: row1, col: col1 } = square1;

        assert.equal(row0, 2);
        assert.equal(col0, 3);

        assert.equal(row1, 0);
        assert.equal(col1, 0);
    });

    it('Rotates 270 degrees', function() {
        const [ square0, square1 ] = RotationTransformer.rotate(figure, R270);
        
        const { row: row0, col: col0 } = square0;
        const { row: row1, col: col1 } = square1;

        assert.equal(row0, 3);
        assert.equal(col0, -2);

        assert.equal(row1, 0);
        assert.equal(col1, 0);
    });
});