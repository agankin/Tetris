class Game {
    #score
    #staticSquares
    #tetramino

    constructor(staticSquares, tetramino, score) {
        this.#staticSquares = staticSquares;
        this.#tetramino = tetramino;
        this.#score = score;
    }

    get staticSquares() {
        return this.#staticSquares;
    }

    get tetramino() {
        return this.#tetramino;
    }

    get score() {
        return this.#score;
    }

    get squares() {
        const tetraminoSquares = this.#tetramino ? this.#tetramino.squares : [];
        return this.#staticSquares.concat(tetraminoSquares);
    }

    static new(tetramino) {
        const staticSquares = [];
        const score = 0;

        return new Game(staticSquares, tetramino, score);
    }

    cloneWith({ staticSquares, tetramino, score }) {
        const cloneStaticSquares = this.staticSquares ?? staticSquares;
        const cloneTetramino = this.tetramino ?? tetramino;
        const cloneScore = this.score ?? score;

        return new Game(cloneStaticSquares, cloneTetramino, cloneScore);
    }
}

export { Game };