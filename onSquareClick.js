function onSquareClick(event) {
	selectedSquare = event.target;
	selectedSquareId = Number(event.target.id);
	if (isClicked === true) return;

	// check if selected square has a piece or not
	if (stateGrid[selectedSquareId] === 0) {
		return;
	}
	valueInSquare = stateGrid[selectedSquareId];
	if (valueInSquare < 0) pieceColor = 'black';
	else if (0 < valueInSquare) pieceColor = 'white';
	console.log("Color of piece:  " + pieceColor);
	if (pieceColor != turnDecider) return; // same player can't move twice in a row

	isClicked = true;
	selectedSquare.style.filter = "brightness(0.4)";

	// get information about piece
	pieceType = mapPieces[Math.abs(valueInSquare)];
	selectedPieceArray = pieceSquarePositionArray[pieceColor][pieceType];
	console.log(selectedPieceArray);
	console.log("You must move:  " + pieceType)
	selectedPieceIndex = selectedPieceArray.indexOf(selectedSquareId);

	// the selected piece is now found inside program
	selectedPiece = pieceElementsObject[pieceColor][pieceType][selectedPieceIndex];
	console.log(selectedPiece);

	// add eventListeners for available square for corresponding piece
	// determine what squares shall activate resetOnSquareClick()
	for (let i = 0; i < 64; i++) {
		grid[i].removeEventListener('click', onSquareClick);
		if (stateGrid[i] < 0 && pieceColor === 'black') { // 
			grid[i].addEventListener('click', moveToDestination);
			clickOnPieceToReset.push(i);
		} else if (0 < stateGrid[i] && pieceColor === 'white') {
			grid[i].addEventListener('click', moveToDestination);
			clickOnPieceToReset.push(i);
		} 
	}
	availablePieceMovesObject[pieceType]();
}
