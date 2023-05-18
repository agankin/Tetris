import { RotationTransformer } from './rotation-transformer';

class Tetramino {
    static #rotationTransformer = new RotationTransformer();
    static #squareId = 0

    #squares
    #position
    #rotation
    #color

    constructor(squares, position, rotation, color) {
        this.#squares = squares;
        this.#position = position;
        this.#rotation = rotation;
        this.#color = color;
    }

    get squares() {
        const squaresRelativeCenter = RotationTransformer.rotate(this.#squares, this.#rotation);

        const {row: posRow, col: posCol} = this.#position;
        const toGameSquare = square => ({
            ...square,
            color: this.#color,
            squareId: Tetramino.#squareId++,
            row: square.row + posRow,
            col: square.col + posCol
        });

        return squaresRelativeCenter.map(toGameSquare);
    }

    moveLeft() {
        const nextPosition = this.#clonePosition({col: this.#position.col - 1});
        return this.#clone({position: nextPosition});
    }

    moveRight() {
        const nextPosition = this.#clonePosition({col: this.#position.col + 1});
        return this.#clone({position: nextPosition});
    }

    moveDown() {
        const nextPosition = this.#clonePosition({row: this.#position.row + 1});
        return this.#clone({position: nextPosition});
    }

    rotateClockWise() {
        const nextRotation = this.#rotation.rotateClockWise();
        return this.#clone({rotation: nextRotation});
    }

    rotateCounterClockWise() {
        const nextRotation = this.#rotation.rotateCounterClockWise();
        return this.#clone({rotation: nextRotation});
    }

    #clone(overrideParams) {
        const {squares, position, rotation, color} = {
            ...(this.#defaultCloneParams()),
            ...overrideParams
        };

        return new Tetramino(squares, position, rotation, color);
    }

    #defaultCloneParams() {
        return {
            squares: this.#squares,
            position: this.#position,
            rotation: this.#rotation,
            color: this.#color
        }
    }

    #clonePosition(overrideParams) {
        return {
            ...this.#position,
            ...overrideParams
        }
    }
}

export { Tetramino };