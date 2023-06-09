import { RotationTransformer } from './rotation-transformer.js';

class Tetramino {
    static #rotationTransformer = new RotationTransformer();
    static #squareId = 0
    
    #type
    #squares
    #position
    #rotation
    #color

    constructor(type, squares, position, rotation, color) {
        this.#type = type;
        this.#squares = squares;
        this.#position = position;
        this.#rotation = rotation;
        this.#color = color;
    }

    get type() { return this.#type; }

    get squares() {
        const squaresRelativeCenter = RotationTransformer.rotate(this.#squares, this.#rotation.currentRotation);

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
        return this.#cloneWith({ col: this.#position.col - 1 });
    }

    moveRight() {
        return this.#cloneWith({ col: this.#position.col + 1 });
    }

    moveDown() {
        return this.#cloneWith({ row: this.#position.row + 1 });
    }

    rotateClockwise() {
        return this.#cloneWith({ rotation: this.#rotation.rotateClockwise() });
    }

    rotateCounterClockwise() {
        return this.#cloneWith({ rotation: this.#rotation.rotateCounterClockwise() });
    }

    #cloneWith({ row, col, rotation }) {
        const clonePosition = {
            row: row ?? this.#position.row,
            col: col ?? this.#position.col
        };
        const cloneRotation = rotation ?? this.#rotation;

        return new Tetramino(this.#type, this.#squares, clonePosition, cloneRotation, this.#color);
    }
}

export { Tetramino };