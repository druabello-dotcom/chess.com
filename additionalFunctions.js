import * as Main from "./main.js";
import { giveCheckSound } from "./sounds.js";
import { kingUnavailableaSquares, selectPieceState, pieceSquarePositionArray, pinnedPiecesObject } from "./gameState.js";
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
}
export function reviewIfKingIsChecked(oppositeColor) {
	for (let i = 0; i < kingUnavailableaSquares[oppositeColor].length; i++) {
		if (pieceSquarePositionArray[oppositeColor].king[0] === kingUnavailableaSquares[oppositeColor][i]) {
			giveCheckSound();
			Main.grid[pieceSquarePositionArray[oppositeColor].king[0]].style.boxShadow = "inset 0 0 0 4px #F01E2C";
			return;
		}
	}
}
export function isPiecePinned(squarePosition, color) {
	for (let i = 0; i < pinnedPiecesObject[color].square.length; i++) {
		if (squarePosition === pinnedPiecesObject[color].square[i]) {
			selectPieceState.pieceIsPinned = true;
			return pinnedPiecesObject[color].incrementation[i];
		} else {
			selectPieceState.pieceIsPinned = false;
			return false;
		}
	}
}