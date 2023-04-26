import { isInBounds, notIntersect, handleFilled } from './SquaresUtils';
import { Game } from './Game';

function defaultCloneParams(game) {
	return {
		staticSquares: game.staticSquares,
		tetramino: game.tetramino,
		score: game.score
	};
}

function clone(game, overrideParams) {
	const {staticSquares, tetramino, score} = {
		...(defaultCloneParams(game)),
		...overrideParams
	};

	return new Game(staticSquares, tetramino, score);
}

function isValidMove(rows, cols) {
	return (staticSquares, nextTetramino) => {
		const nextTetraminoSquares = nextTetramino.squares;

		const isSquaresInBounds = isInBounds(rows, cols, nextTetraminoSquares);
		const notIntersectWithStatic = 
			notIntersect(staticSquares, nextTetraminoSquares);

		return isSquaresInBounds && notIntersectWithStatic;
	};
}

function getMoveApplier(rows, cols) {
	const isValidMove1 = isValidMove(rows, cols);

	return (game, moveMethodName, onCannotMove) => {
	    const {staticSquares, tetramino} = game;

		if (!tetramino)
			return {};

		const nextTetramino = tetramino[moveMethodName]();
		const getNoChanges = game => ({});
		
		return isValidMove1(staticSquares, nextTetramino)
			? {tetramino: nextTetramino}
			: (onCannotMove || getNoChanges)(game);
	}
}

function getTetraminoFinisher(cols, getNextTetramino, getScoreByFilledLines) {
	return game => {
		const {squares, curScore} = game;
		
		const [staticSquares, filledRows] = handleFilled(cols, squares);
		const tetramino = getNextTetramino();
		const score = curScore + getScoreByFilledLines(filledRows.length);

		return {staticSquares, tetramino, score};
	}
}

function createGameReducers(rows, cols, getNextTetramino, getScoreByFilledLines) {
	const applyMove = getMoveApplier(rows, cols);
	const finishTetramino = 
	    getTetraminoFinisher(cols, getNextTetramino, getScoreByFilledLines);

	return {
		rotate(game) {
			const cloneParams = applyMove(game, 'rotateClockWise');
			return clone(game, cloneParams);
		},

		moveLeft(game) {
			const cloneParams = applyMove(game, 'moveLeft');
			return clone(game, cloneParams);
		},

		moveRight(game) {
			const cloneParams = applyMove(game, 'moveRight');
			return clone(game, cloneParams);
		},

		moveDown(game) {
			const cloneParams = applyMove(game, 'moveDown', finishTetramino);
			return clone(game, cloneParams);
		}
	};
}

export { createGameReducers };