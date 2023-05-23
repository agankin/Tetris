import { isInBounds, notIntersect, handleFilled } from './squares-utils.js';
import { Game } from './game.js';
import { MOVE_LEFT, MOVE_RIGHT, MOVE_DOWN, DROP, ROTATE_CLOCKWISE,
         ROTATE_COUNTER_CLOCKWISE, TICK } from './game-actions.js';

function canMoveTetramino(rows, cols, staticSquares, nextTetramino) {
    const nextTetraminoSquares = nextTetramino.squares;

    const isSquaresInBounds = isInBounds(rows, cols, nextTetraminoSquares);
    const notIntersectWithStatic = notIntersect(staticSquares, nextTetraminoSquares);

    return isSquaresInBounds && notIntersectWithStatic;
}

function getTetraminoCompleter(cols, getNextTetramino, getScoreByFilledLines) {
    return game => {
        const {squares, curScore} = game;
        
        const [staticSquares, filledRows] = handleFilled(cols, squares);
        const tetramino = getNextTetramino();
        const score = curScore + getScoreByFilledLines(filledRows.length);

        return {staticSquares, tetramino, score};
    }
}

function createMoveApplier(rows, cols) {
    return (game, transformTetramino, onCannotMove) => {
        const {staticSquares, tetramino} = game;

        if (!tetramino)
            return {};

        const nextTetramino = transformTetramino(tetramino);
        const canMove = canMoveTetramino(rows, cols, staticSquares, nextTetramino);

        if (canMove)
            return { tetramino: nextTetramino };

        if (onCannotMove)
            onCannotMove(game);
    }
}

function createGameReducer(rows, cols, getNextTetramino, getScoreByFilledLines) {
    const applyMove = createMoveApplier(rows, cols);
    const completeTetramino = getTetraminoCompleter(cols, getNextTetramino, getScoreByFilledLines);

    return (game, action) => {
        switch (action) { 
            case MOVE_LEFT:
                return game.cloneWith(applyMove(game, tetramino => tetramino.moveLeft()));

            case MOVE_RIGHT:
                return game.cloneWith(applyMove(game, tetramino => tetramino.moveRight()));

            case MOVE_DOWN:
            case TICK:
            case DROP:
                return game.cloneWith(applyMove(game, tetramino => tetramino.moveDown(), completeTetramino));

            case ROTATE_CLOCKWISE:
                return game.cloneWith(applyMove(game, tetramino => tetramino.rotateClockwise()));

            case ROTATE_COUNTER_CLOCKWISE:
                return game.cloneWith(applyMove(game, tetramino => tetramino.rotateCounterClockwise()));
        }
    };
}

export { createGameReducer };