function resetChessboard() {
	turnCounter = 0;
	turnCounterElement.innerText = "Turn counter:  " + turnCounter;
	turnDecider = 'white';
	turnDeciderText.innerText = "White to move";
	turnDeciderColorIndicator.className = "turn-white";
	stateGrid.fill(0);
	// remove all pieces with class name "piece"
	for (let i = 0; i < classNamePieceArray.length; i++) {
		classNamePieceArray[i].remove();
	}

	// create the piece elements. Append them as childs of the chessboard
	const visualPieceElements = CreatePieceElements.createPieceElements();
	for (let i = 0; i < visualPieceElements.length; i++) {
		chessboard.appendChild(visualPieceElements[i]);
	}
	classNamePieceArray = document.querySelectorAll('.piece');
	for (let i = 0; i < classNamePieceArray.length; i++) {
		classNamePieceArray[i].style.transition = "0.15s";
	}

	// fill pieceElementObject with array to corresponding color and piece
	for (let t = 0; t < CreatePieceElements.pieceTypeArray.length; t++) {
		let type = CreatePieceElements.pieceTypeArray[t];
		pieceElementsObject.black[type] = Array.from(document.querySelectorAll(`.black.${type}`));
		pieceElementsObject.white[type] = Array.from(document.querySelectorAll(`.white.${type}`));
	}
	console.log(pieceElementsObject);

	let pieceSquareIncrementation = {
		pawn: 1,
		knight: 5,
		bishop: 3,
		rook: 7,
		queen: 0,
		king: 0
	}
	let pieceStartingSquare = {
		black: {
			pawn: 8,
			knight: 1,
			bishop: 2,
			rook: 0,
			queen: 3,
			king: 4,
		},
		white: {
			pawn: 48,
			knight: 57,
			bishop: 58,
			rook: 56,
			queen: 59,
			king: 60
		}
	}
	// reset pieces visually (and in background)
	pawnHasNotMoved.black = Array(8).fill(true);
	pawnHasNotMoved.white = Array(8).fill(true);
	for (let t = 0; t < CreatePieceElements.pieceTypeArray.length; t++) {
		let type = CreatePieceElements.pieceTypeArray[t];
		for (let counts = 0, blackStartingSquare = pieceStartingSquare.black[type], whiteStartingSquare = pieceStartingSquare.white[type]; counts < CreatePieceElements.pieceCounts[type]; counts++) {
			console.log("Piece type:  " + type + "     Count:  " + counts);

			// reset background information
			pieceSquarePositionArray.black[type][counts] = blackStartingSquare;
			pieceSquarePositionArray.white[type][counts] = whiteStartingSquare;

			stateGrid[blackStartingSquare] = pieceNumberIdentifier.black[type];
			stateGrid[whiteStartingSquare] = pieceNumberIdentifier.white[type];

			// reset visual information
			pieceElementsObject.black[type][counts].style.left = (centerPositionSqaure[blackStartingSquare].x_coordinate - subtractBoardDimentionWidth) + "px";
			pieceElementsObject.black[type][counts].style.top = (centerPositionSqaure[blackStartingSquare].y_coordinate - subtractBoardDimentionWidth) + "px";
			pieceElementsObject.white[type][counts].style.left = (centerPositionSqaure[whiteStartingSquare].x_coordinate - subtractBoardDimentionWidth) + "px"; 
			pieceElementsObject.white[type][counts].style.top = (centerPositionSqaure[whiteStartingSquare].y_coordinate - subtractBoardDimentionWidth) + "px";

			pieceElementsObject.black[type][counts].style.backgroundColor = "transparent";
			pieceElementsObject.white[type][counts].style.backgroundColor = "transparent";

			blackStartingSquare += pieceSquareIncrementation[type];
			whiteStartingSquare += pieceSquareIncrementation[type];
		}
	}
	console.log(stateGrid);
}
