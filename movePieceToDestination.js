import * as CreatePieceElements from "./createPieceElements.js"
import * as additFunc from "./additionalFunctions.js"

import { registerTurn } from "./turnRegister.js"
import { soundWhenMovingPiece } from "./sounds.js"
import { capturePieceFunction } from "./captureFunction.js"
import { attackingMovesObject } from "./attackingMovesKing.js"
import { promotePawn } from "./pawnPromotion.js"
import { chessboardBoard, subtractChessboardPixels } from "./main.js"
import { makeKingCastle } from "./makeKingCastle.js"
import { selectPieceState, piecesHasNotMoved, pieceSquarePositionArray, kingUnavailableaSquares, pieceAttackingKing, kingState } from "./gameState.js"

//———————————————————————————————————————————————————————————————————————————————————

export function moveToDestination(destination) {
	let oppositeColor = validateOppositeColor(selectPieceState.pieceColor);
	additFunc.reviewIfKingIsChecked(selectPieceState.pieceColor, oppositeColor)
	isKingChecked(selectPieceState.pieceColor, oppositeColor);

	//register destination square
    selectPieceState.destinationSquare = destination.target;
    selectPieceState.destinationSquareId = Number(destination.target.id);

	// if user clicks on a friendly piece, resetOnSquareClick()
	if (checkIfROS(selectPieceState.clickOnPieceToReset, selectPieceState.pieceColor, oppositeColor)) return;
	kingState[selectPieceState.pieceColor].checked = false;

	checkIfCastle(selectPieceState.pieceType, selectPieceState.selectedSquareId, selectPieceState.destinationSquareId, selectPieceState.pieceColor, oppositeColor);
	checkIfPromote(selectPieceState.pieceType, selectPieceState.destinationSquareId);
	
	// update board state
	pieceSquarePositionArray[selectPieceState.pieceColor][selectPieceState.pieceType][selectPieceState.selectedPieceIndex] = selectPieceState.destinationSquareId;
	capturePieceFunction(selectPieceState.destinationSquareId);
	additFunc.updateStateGrid();
	movePieceElementToDestination(selectPieceState.destinationSquareId);
	soundWhenMovingPiece();

	// pawn's double step rule: (Article 3.7.b), a pawn may move two squares forward on its very first move
	if (selectPieceState.pieceType === 'pawn') piecesHasNotMoved[selectPieceState.pieceColor].pawn[selectPieceState.selectedPieceIndex] = false;
	if (selectPieceState.pieceType === 'king') piecesHasNotMoved[selectPieceState.pieceColor].king = false; // disable castling if king has moved
	
	registerTurn();

	// update kingUnavailableSquares[oppositeColor]
	additFunc.resetPinnedPiecesList(oppositeColor);
	updateKAS(CreatePieceElements.pieceTypeArray, pieceSquarePositionArray, selectPieceState.pieceColor, oppositeColor)
	additFunc.reviewIfKingIsChecked(oppositeColor, selectPieceState.pieceColor);
	
	// reset after piece has been moved
	additFunc.resetOnSquareClick();
	additFunc.resetOnSquareClickInfo();
}

//———————————————————————————————————————————————————————————————————————————————————

function validateOppositeColor(color) {
	if (color === 'white') return 'black';
	else return 'white';
}

export function movePieceElementToDestination(destination) {
	selectPieceState.x_squareCoordinate = parseInt(chessboardBoard.centerPositionSqaure[destination].x_coordinate);
	selectPieceState.y_squareCoordinate = parseInt(chessboardBoard.centerPositionSqaure[destination].y_coordinate);

	// move piece to destination square
	selectPieceState.selectedPiece.style.left = (selectPieceState.x_squareCoordinate - subtractChessboardPixels.width) + "px"; // FIND better way, than to subtract
	selectPieceState.selectedPiece.style.top = (selectPieceState.y_squareCoordinate - subtractChessboardPixels.height) + "px"; 
}

function checkIfROS(array, color, oppositeColor) {
	for (let i = 0; i < array.length; i++) {
		if (array[i] === selectPieceState.destinationSquareId) {
			additFunc.resetLegalDirections(color);
			additFunc.reviewIfKingIsChecked(color, oppositeColor);
			additFunc.resetOnSquareClick();
			additFunc.resetOnSquareClickInfo();
			return true;
		}
	}
	return false;
}

function checkIfPromote(pieceType, destination) {
	if (pieceType === 'pawn') {
		if ((0 <= destination && destination < 8) || (56 <= destination && destination < 64)) {
			promotePawn(destination);
		}
	}
}

function checkIfCastle(pieceType, selectedSquare, destination, color, oppositeColor) {
	if (pieceType === 'king' && (destination === selectedSquare - 2 || destination === selectedSquare + 2)) {
		if (destination === selectedSquare - 2 && selectPieceState.letKingCastleLeft) { // castle to left
			if (color === 'white') makeKingCastle(0, -1, 56, oppositeColor);
			else if (color === 'black') makeKingCastle(0, -1, 0, oppositeColor);
		} else if (destination === selectedSquare + 2 && selectPieceState.letKingCastleRight) { // castle right
			if (color === 'white') makeKingCastle(1, 1, 63, oppositeColor);
			else if (color === 'black') makeKingCastle(1, 1, 7, oppositeColor);
		}
		return;
	}
}

function updateKAS(pieceTypeArr, positionArr, color, oppositeColor) {
	for (let t = 0; t < pieceTypeArr.length; t++) {
		let type = pieceTypeArr[t];
		for (let i = 0; i < positionArr[color][type].length; i++) {
			let squareIndex = positionArr[color][type][i];
			if (squareIndex === null) continue;
			attackingMovesObject[type](squareIndex, oppositeColor, color);
		}
	}
}

function isKingChecked(color, oppositeColor) {
	if (!kingState[color].checked) {
		kingUnavailableaSquares[oppositeColor].length = 0;
		pieceAttackingKing.square.length = 0;
		pieceAttackingKing.direction.length = 0;
		pieceAttackingKing.iterations.length = 0;
		pieceAttackingKing.pieceType.length = 0;
	}
}