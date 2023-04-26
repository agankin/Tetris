function isInBounds(rows, cols, squares) {
	const squareOutOf = (rows, cols) =>
	    ({row, col}) => row < 0 || row >= rows || col < 0 || col >= cols;

	return squares.filter(squareOutOf(rows, cols)).length === 0;
}

function notIntersect(squares1, squares2) {
	const squareEq = ({row: row1, col: col1}) =>
		({row: row2, col: col2}) => row1 === row2 && col1 === col2;

	const squareIn = squares =>
	    square => squares.filter(squareEq(square)).length > 0;

	return squares1.filter(squareIn(squares2)).length === 0;
}

function getFilledRows(cols, squares) {
	const isLine = (cols, rowColsArr) => ([row, rowCols]) => {
		const allCols = [...new Array(cols)].map((_, idx) => idx);
	    return allCols.filter(col => !rowCols.includes(col)).length === 0;
	}
	
	const colsByRows = squares.reduce((rowsCols, {row, col}) => {
		(rowsCols[row] = rowsCols[row] || []).push(col);

		return rowsCols;
	}, {});

	return Object.entries(colsByRows).filter(isLine(cols, colsByRows))
	    .map(([row, _]) => parseInt(row));
}

function removeFilled(squares, filledRows) {
	return squares.filter(({row, col}) => !filledRows.includes(row));
}

function pushRemainingDown(squares, filledRows) {
	const getPushDownRows = (row, filledRows) =>
		filledRows.filter(filledRow => filledRow > row).length;

	return squares.map(square => ({
		...square,
		row: square.row + getPushDownRows(square.row, filledRows)
	}));
}

function handleFilled(cols, squares) {
	const filledRows = getFilledRows(cols, squares);
	const squaresWithoutFilled = removeFilled(squares, filledRows);
	const resultSquares = pushRemainingDown(squaresWithoutFilled, filledRows);

	return [resultSquares, filledRows];
}

export {isInBounds, notIntersect, handleFilled};