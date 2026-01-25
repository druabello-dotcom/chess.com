function moveToDestination(destination) {
	// register destination square
	destinationSquare = destination.target;

	// if user clicks on a piece with same color, activate resetOnSquareClick()
	for (let i = 0; i < clickOnPieceToReset.length; i++) {
		if (Number(destinationSquare.id) === clickOnPieceToReset[i]) {
			resetOnSquareClick();
			return;
		}
	}
	x_squareCoordinate = parseInt(centerPositionSqaure[destinationSquare.id].x_coordinate);
	y_squareCoordinate = parseInt(centerPositionSqaure[destinationSquare.id].y_coordinate);
	console.log(x_squareCoordinate + ", " + y_squareCoordinate);

	// move piece to destination square
	selectedSquare.style.filter = "brightness(1)";
	selectedPiece.style.left = (x_squareCoordinate - subtractBoardDimentionWidth) + "px"; // FIND better way, than to subtract
	selectedPiece.style.top = (y_squareCoordinate - subtractBoardDimentionHeight) + "px"; 

	// update stateGrid
	stateGrid[selectedSquareId] = 0;
	stateGrid[destinationSquare.id] = valueInSquare;
	console.log(stateGrid);

	// update pieceSquarePositionArray
	pieceSquarePositionArray[pieceColor][pieceType][selectedPieceIndex] = Number(destinationSquare.id);
	console.log("Black " + pieceType + ":  " +  pieceSquarePositionArray.black[pieceType]);
	console.log("White " + pieceType + ":  " + pieceSquarePositionArray.white[pieceType]);

	// pawn's double step rule: (Article 3.7.b), a pawn may move two squares forward on its very first move
	if (pieceType === 'pawn') pawnHasNotMoved[pieceColor][selectedPieceIndex] = false;
	
	// the other player's turn
	turnCounter++;
	turnCounterElement.innerText = "Turn counter:  " + turnCounter;
	alternatingTurn();

	// reset after piece has been moved
	for (let i = 0; i < 64; i++) {
		grid[i].removeEventListener('click', moveToDestination)
		grid[i].addEventListener('click', onSquareClick);
		grid[i].style.boxShadow = "";
	}
	selectedSquare = null;
	selectedSquareId = null;
	destinationSquare = null;

	selectedPiece = null;
	selectedPieceArray = null;
	selectedPieceIndex = null;
	pieceType = null;

	x_squareCoordinate = null;
	y_squareCoordinate = null;
	isClicked = false;
}
