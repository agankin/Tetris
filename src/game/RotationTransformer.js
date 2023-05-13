import { R0, R90, R180, R270, chainRotation } from './Rotations';

class RotationTransformer {
    static rotate(squares, rotation) {
        return squares.map(square => this.#mapRotated(rotation, square));
    }

    static #mapRotated(rotation, square) {
        const {row, col} = square;

        const transform = RotationTransformer.#getTransformer(rotation);

        return {
            ...square,
            ...(transform(square))
        };
    }

    static #getTransformer(rotation) {
        const state = rotation.state;

        switch (state) {
            case R0:
                return this.#transformR0;

            case R90:
                return this.#transformR90;

            case R180:
                return this.#transformR180;

            case R270:
                return this.#transformR270;

            default:
                throw new Error(`Unsupported Rotation State value: ${state.toString()}.`)
        }
    }

    static #transformR0({row, col}) {
        return {row, col};
    }

    static #transformR90({row, col}) {
        return {
            row: col,
            col: -1 * row
        };
    }

    static #transformR180({row, col}) {
        return {
            row: -1 * row,
            col: -1 * col
        };
    }

    static #transformR270({row, col}) {
        return {
            row: -1 * col,
            col: row
        };
    }
}

export { RotationTransformer };