import * as Main from "./main.js";
import { selectPieceState } from "./gameState.js";
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
	console.log(Main.stateGrid);
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