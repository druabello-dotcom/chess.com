import * as Main from "./main.js";
import { resetChessboardButtonElements } from "./resetChessboard.js";
import { chessboardBoard } from "./main.js";
import { subtractChessboardPixels } from "./main.js";
import { selectPieceState, pieceSquarePositionArray, pieceElementsObject } from "./gameState.js";

export let chessboardChildren = Array.from(chessboard.children);

export function resizeGame() {
	// centerPositionSquare Update
	for (let i = 0; i < chessboardChildren.length; i++) chessboardChildren[i].style.transition = "none";
	resetChessboardButtonElements.topLayerButton.style.transition = "none";
	updateElementsResize();
	for (let i = 0; i < chessboardChildren.length; i++) chessboardChildren[i].style.transition = "0.15s";
	resetChessboardButtonElements.topLayerButton.style.transition = "0.2s";
}

function updateElementsResize() {
	if (600 < window.innerWidth) {
		resetChessboardButtonElements.topLayerButton.innerText = "Reset Chessboard";
		resetChessboardButtonElements.topLayerButton.style.fontSize = "100%";
		resetChessboardButtonElements.topLayerButton.style.color = "black";
	}
	if (window.innerWidth < 600) {
		resetChessboardButtonElements.topLayerButton.innerText = "⟳";
		resetChessboardButtonElements.topLayerButton.style.fontSize = "200%"
		resetChessboardButtonElements.topLayerButton.style.color = "white";
	}

	chessboardBoard.chessboardDimentions = chessboard.getBoundingClientRect();
	/* console.log("Height of chessboard:  " + chessboardDimentions.height); */
	/* console.log("Width of chessboard:  " + chessboardDimentions.width); */
	//store coordinates for center of each square (x & y component)
	/* centerPositionSqaure = []; */
	/* let squareXValue = (chessboardDimentions.width) / 16; */
	/* let squareYValue = (chessboardDimentions.height) / 16; */
    chessboardBoard.centerPositionSqaure = [];
    let squareXValue = (chessboardBoard.chessboardDimentions.width / 16);
    let squareYValue = (chessboardBoard.chessboardDimentions.height / 16);
	for (let row = 1; row < 9; row++) {
		for (let column = 1; column < 9; column++) {
			chessboardBoard.centerPositionSqaure.push({x_coordinate: squareXValue * ((column * 2) - 1), y_coordinate: squareYValue * ((row * 2) - 1)});
		}
	}
    subtractChessboardPixels.width = (chessboardBoard.chessboardDimentions.width / 16)
    subtractChessboardPixels.height = (chessboardBoard.chessboardDimentions.height / 17)

	//——————————————————————————————————————————————————————————————————————
	// update pieces — make this into a function
	for (let i = 0; i < Main.stateGrid.length; i++) {
	if (Main.stateGrid[i] === 0) continue;
	selectPieceState.valueInSquare = Main.stateGrid[i];
	selectPieceState.pieceType = Main.mapPieces[Math.abs(selectPieceState.valueInSquare)];
		if (selectPieceState.valueInSquare < 0) selectPieceState.pieceColor = 'black';
		else if (0 < selectPieceState.valueInSquare) selectPieceState.pieceColor = 'white';
		selectPieceState.selectedPieceIndex = pieceSquarePositionArray[selectPieceState.pieceColor][selectPieceState.pieceType].indexOf(i);
		selectPieceState.selectedPiece = pieceElementsObject[selectPieceState.pieceColor][selectPieceState.pieceType][selectPieceState.selectedPieceIndex];
		
        // move piece to corresponding square
		selectPieceState.selectedPiece.style.left = (parseInt(chessboardBoard.centerPositionSqaure[i].x_coordinate) - subtractChessboardPixels.width)+ "px";
		selectPieceState.selectedPiece.style.top = (parseInt(chessboardBoard.centerPositionSqaure[i].y_coordinate) - subtractChessboardPixels.height) + "px";
	}
}