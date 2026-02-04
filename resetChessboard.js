import * as Main from "./main.js";
import * as TurnRegister from "./turnRegister.js";
import * as CreatePieceElements from "./createPieceElements.js";
import * as additFunc from "./additionalFunctions.js";

import { selectPieceState } from "./gameState.js";
import { piecesHasNotMoved } from "./gameState.js";
import { noPieceBetweenKingRook } from "./gameState.js";
import { pieceSquarePositionArray } from "./gameState.js";
import { pieceNumberIdentifier } from "./gameState.js";
import { pieceElementsObject } from "./gameState.js";
import { chessboardBoard } from "./main.js";
import { subtractChessboardPixels } from "./main.js";

export const resetChessboardButtonElements = {
    resetChessboardButton: document.getElementById('resetChessboardButton'),
    topLayerButton: document.getElementById('topLayer')
}

 //—————————————————————————————————————————————————————————————————————————————————————

let classNamePieceArray = document.querySelectorAll('.piece');
export function resetChessboard() {
	TurnRegister.registerTurnVariables.turnCounter = 0;
	TurnRegister.registerTurnVariables.turnCounterElement.innerText = "Turn counter:  " + TurnRegister.registerTurnVariables.turnCounter;
	TurnRegister.registerTurnVariables.turnDecider = 'white';
	TurnRegister.registerTurnVariables.turnDeciderText.innerText = "White to move";
	TurnRegister.registerTurnVariables.turnDeciderColorIndicator.className = "turn-white";
    Main.stateGrid.fill(0);

	// log book elements
	let moveCountColumnElements = document.querySelectorAll('#moveCountColumn span');
	let whiteMoveColumnElements = document.querySelectorAll('#whiteMoveColumn span');
	let blackMoveColumnElements = document.querySelectorAll('#blackMoveColumn span');

	// remove elements visually
	for (let i = 0; i < moveCountColumnElements.length; i++) {
		moveCountColumnElements[i].remove();
		whiteMoveColumnElements[i].remove();
	}
	for (let i = 0; i < blackMoveColumnElements.length; i++) blackMoveColumnElements[i].remove();
	TurnRegister.logBookVariables.logBookRowCounter = 0;

	// reset castling information
	noPieceBetweenKingRook.left.fill(false);
	noPieceBetweenKingRook.right.fill(false);

    selectPieceState.letKingCastleLeft = false;
    selectPieceState.letKingCastleRight = false;

    piecesHasNotMoved.black.pawn.fill(true);
    piecesHasNotMoved.white.pawn.fill(true);
    piecesHasNotMoved.black.rook.fill(true);
    piecesHasNotMoved.white.rook.fill(true);
    piecesHasNotMoved.black.king = true;
    piecesHasNotMoved.white.king = true;

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
	for (let t = 0; t < CreatePieceElements.pieceTypeArray.length; t++) {
		let type = CreatePieceElements.pieceTypeArray[t];
		for (let counts = 0, blackStartingSquare = pieceStartingSquare.black[type], whiteStartingSquare = pieceStartingSquare.white[type]; counts < CreatePieceElements.pieceCounts[type]; counts++) {
			console.log("Piece type:  " + type + "     Count:  " + counts);

			// reset background information
			pieceSquarePositionArray.black[type][counts] = blackStartingSquare;
			pieceSquarePositionArray.white[type][counts] = whiteStartingSquare;

			Main.stateGrid[blackStartingSquare] = pieceNumberIdentifier.black[type];
			Main.stateGrid[whiteStartingSquare] = pieceNumberIdentifier.white[type];

			// reset visual information
			pieceElementsObject.black[type][counts].style.left = (chessboardBoard.centerPositionSqaure[blackStartingSquare].x_coordinate - subtractChessboardPixels.width) + "px";
			pieceElementsObject.black[type][counts].style.top = (chessboardBoard.centerPositionSqaure[blackStartingSquare].y_coordinate - subtractChessboardPixels.height) + "px";
			pieceElementsObject.white[type][counts].style.left = (chessboardBoard.centerPositionSqaure[whiteStartingSquare].x_coordinate - subtractChessboardPixels.width) + "px"; 
			pieceElementsObject.white[type][counts].style.top = (chessboardBoard.centerPositionSqaure[whiteStartingSquare].y_coordinate - subtractChessboardPixels.height) + "px";

			pieceElementsObject.black[type][counts].style.backgroundColor = "transparent";
			pieceElementsObject.white[type][counts].style.backgroundColor = "transparent";

			blackStartingSquare += pieceSquareIncrementation[type];
			whiteStartingSquare += pieceSquareIncrementation[type];
		}
	}
    additFunc.resetOnSquareClick();
	console.log(Main.stateGrid);
}