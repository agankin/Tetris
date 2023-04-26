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
}

export { Game };