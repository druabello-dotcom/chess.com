import * as Main from "./main.js";
import { giveCheckSound } from "./sounds.js";
import { kingUnavailableaSquares, selectPieceState, pieceSquarePositionArray, pinnedPiecesObject, legalDirection } from "./gameState.js";
import { onSquareClick } from "./onSquareClick.js";
import { moveToDestination } from "./movePieceToDestination.js";

//—————————————————————————————————————————————————————————————————————————————————————

export function resetOnSquareClick() {
	// reset array
	while (0 < selectPieceState.clickOnPieceToReset.length) {
		selectPieceState.clickOnPieceToReset.pop();
	}
}
export function updateStateGrid() {
	Main.stateGrid[selectPieceState.selectedSquareId] = 0;
	Main.stateGrid[selectPieceState.destinationSquareId] = selectPieceState.valueInSquare;
}
export function resetOnSquareClickInfo() {
	for (let i = 0; i < 64; i++) {
		Main.grid[i].removeEventListener('click', moveToDestination)
		Main.grid[i].addEventListener('click', onSquareClick);
		Main.grid[i].style.boxShadow = "";
	}
	selectPieceState.selectedSquare.style.filter = "brightness(1)";
	selectPieceState.isClicked = false;
	selectPieceState.pieceColor = false;

	selectPieceState.selectedSquare = null;
	selectPieceState.selectedSquareId = null;
	selectPieceState.destinationSquare = null;

	selectPieceState.selectedPiece = null; 
	selectPieceState.selectedPieceArray = null;
	selectPieceState.selectedPieceIndex = null;
	selectPieceState.pieceType = null;
	selectPieceState.valueInSquare = null;
	selectPieceState.pieceColor = null;

	selectPieceState.x_squareCoordinate = null;
	selectPieceState.y_squareCoordinate = null;
	resetLegalDirections();
}
export function reviewIfKingIsChecked(oppositeColor) {
	for (let i = 0; i < kingUnavailableaSquares[oppositeColor].length; i++) {
		if (pieceSquarePositionArray[oppositeColor].king[0] === kingUnavailableaSquares[oppositeColor][i]) {
			giveCheckSound();
			Main.grid[pieceSquarePositionArray[oppositeColor].king[0]].style.boxShadow = "inset 0 0 0 4px #F01E2C";
		}
	}
}
export function isPiecePinned(squarePosition, color) {
	for (let i = 0; i < pinnedPiecesObject[color].square.length; i++) {
		if (squarePosition === pinnedPiecesObject[color].square[i]) {
			selectPieceState.pieceIsPinned = true;
			return pinnedPiecesObject[color].incrementation[i];
		}
	}
	selectPieceState.pieceIsPinned = false;
	return false;
}
export function checkIfPieceIsPinned(squarePosition, color) {
	if (isPiecePinned(squarePosition, color) !== false) {
		let incrementation = isPiecePinned(squarePosition, color);
		checkLegalDirection(incrementation, color);
	}
}
export function checkLegalDirection(incrementation, color) {
	if (incrementation === 9) {
		legalDirection[color].north_south = false;
		legalDirection[color].east_west = false;
		legalDirection[color].NE_SW = false;	
		legalDirection[color].NW_SE = true;
	} else if (incrementation === 7) {
		legalDirection[color].east_west = false;
		legalDirection[color].north_south = false;
		legalDirection[color].NE_SW = true;
		legalDirection[color].NW_SE = false;
	} else if (incrementation === 8) {
		legalDirection[color].north_south = true;
		legalDirection[color].east_west = false;
		legalDirection[color].NE_SW = false;
		legalDirection[color].NW_SE = false;
	} else if (incrementation === 1) {
		legalDirection[color].north_south = false;
		legalDirection[color].east_west = true;
		legalDirection[color].NE_SW = false;
		legalDirection[color].NW_SE = false;
	}
}
export function resetLegalDirections() {
	legalDirection.north_south = true;
	legalDirection.east_west = true;
	legalDirection.NE_SW = true;
	legalDirection.NW_SE = true;
}
export function resetPinnedPiecesList(color) {
	pinnedPiecesObject[color].square.length = 0;
	resetLegalDirections();
}