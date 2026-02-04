/*	notater:
	hvis b < 0 -> otherPieceColor = "white"
	otherPieceType = mapPiece[Math.abs(b)] —> piece type

	få indeen

	pieceElementsObject[otherPieceColor][otherPieceType][destination.target.id].remove();
	*/ 

	/*       if (a > 0 && b > 0) return "same-W";
		if (a < 0 && b < 0) return "same-B"; */

	/*       if (a < 0 && b > 0) { // black moving, white target
			if (b === 1) return "white pawn";
			if (b === 2) return "white knight";
			if (b === 3) return "white bishop";
			if (b === 4) return "white rook";
			if (b === 5) return "white queen";
			if (b === 6) return "white king";
		}

		if (a > 0 && b < 0) { // white moving, black target
			if (b === -1) return "black pawn";
			if (b === -2) return "black knight";
			if (b === -3) return "black bishop";
			if (b === -4) return "black rook";
			if (b === -5) return "black queen";
			if (b === -6) return "black king";
		}

		return null; */

		/* let capturedPiece = checkColour(valueInSquare, stateGrid[destinationSquare.id]); */

/* 		let capturedPiece = checkColour(Number(destinationSquare.id));
		console.log(capturedPiece)
		if (!capturedPiece) return;

		if (capturedPiece.startsWith("black") || capturedPiece.startsWith("white")) {
			function removePieceFromDestinationSquare() {
			let colourCapturePiece = capturedPiece.split(" ")[0]; // "black" or "white"

			let index = stateGrid[Number(destinationSquare.id)]; // piece code like -1
			let enemyPieceType = mapPieces[Math.abs(index)]; // "pawn"

			let pieceIndexToRemove = pieceSquarePositionArray[colourCapturePiece][enemyPieceType].indexOf(Number(destinationSquare.id));
			pieceElementsObject[colourCapturePiece][enemyPieceType][pieceIndexToRemove].remove(); */
			/* } */
			/* removePieceFromDestinationSquare(); */


/* function checkColour(destination) {
	let enemyPieceColor = null;
	let enemyPieceType = null;
	let enemyPiece = null;
	if (valueInSquare < 0 && 0 < stateGrid[destination]) { // friendly piece is black, target piece is white
		enemyPieceColor = 'white';
		enemyPieceType = mapPieces[Math.abs(stateGrid[destination])];
		enemyPiece = `${enemyPieceColor} ${enemyPieceType}`;
	} else if (0 < valueInSquare && stateGrid[destination] < 0) {// friendly piece is white, target piece is black
		enemyPieceColor = 'black';
		enemyPieceType = mapPieces[Math.abs(stateGrid[destination])];
		enemyPiece = `${enemyPieceColor} ${enemyPieceType}`;
	}
} */
