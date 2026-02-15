import * as Main from "./main.js";
import * as TurnRegister from "./turnRegister.js";
import { selectPieceState, pieceSquarePositionArray, pieceElementsObject } from "./gameState.js";
import { moveToDestination } from "./movePieceToDestination.js";
import { availablePieceMovesObject } from "./createAvailableMoves.js";

export function onSquareClick(event) {
	selectPieceState.selectedSquare = event.target;
	selectPieceState.selectedSquareId = Number(event.target.id);
	if (selectPieceState.isClicked === true) return;

	// check if selected square has a piece or not
	if (Main.stateGrid[selectPieceState.selectedSquareId] === 0) {
		return;
	}
	selectPieceState.valueInSquare = Main.stateGrid[selectPieceState.selectedSquareId];
	if (selectPieceState.valueInSquare < 0) selectPieceState.pieceColor = 'black';
	else if (0 < selectPieceState.valueInSquare) selectPieceState.pieceColor = 'white';
	if (selectPieceState.pieceColor != TurnRegister.registerTurnVariables.turnDecider) return; // same player can't move twice in a row

	selectPieceState.isClicked = true;
	selectPieceState.selectedSquare.style.filter = "brightness(0.4)";

	// get information about piece
	selectPieceState.pieceType = Main.mapPieces[Math.abs(selectPieceState.valueInSquare)];
	selectPieceState.selectedPieceArray = pieceSquarePositionArray[selectPieceState.pieceColor][selectPieceState.pieceType];
	selectPieceState.selectedPieceIndex = Number(selectPieceState.selectedPieceArray.indexOf(selectPieceState.selectedSquareId));

	// the selected piece is now found inside program
	selectPieceState.selectedPiece = pieceElementsObject[selectPieceState.pieceColor][selectPieceState.pieceType][selectPieceState.selectedPieceIndex];

	// add eventListeners for available square for corresponding piece
	// determine what squares shall activate resetOnSquareClick()
	for (let i = 0; i < 64; i++) {
		Main.grid[i].removeEventListener('click', onSquareClick);
		if (Main.stateGrid[i] < 0 && selectPieceState.pieceColor === 'black') { // 
			Main.grid[i].addEventListener('click', moveToDestination);
			selectPieceState.clickOnPieceToReset.push(i);
		} else if (0 < Main.stateGrid[i] && selectPieceState.pieceColor === 'white') {
			Main.grid[i].addEventListener('click', moveToDestination);
			selectPieceState.clickOnPieceToReset.push(i);
		} 
	}
	availablePieceMovesObject[selectPieceState.pieceType]();
}