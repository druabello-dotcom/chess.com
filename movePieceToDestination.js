import * as Main from "./main.js"
import * as CreatePieceElements from "./createPieceElements.js"
import * as additFunc from "./additionalFunctions.js"
import * as TurnRegister from "./turnRegister.js"

import { soundWhenMovingPiece } from "./sounds.js";
import { attackingMovesObject } from "./attackingMovesKing.js"
import { promotePawn } from "./pawnPromotion.js"
import { chessboardBoard } from "./main.js"
import { subtractChessboardPixels } from "./main.js"
import { makeKingCastle } from "./makeKingCastle.js"
import { selectPieceState, piecesHasNotMoved, pieceSquarePositionArray, kingUnavailableaSquares } from "./gameState.js"

//———————————————————————————————————————————————————————————————————————————————————

export function moveToDestination(destination) {
	// register destination square
	let oppositeColor = null;
	if (selectPieceState.pieceColor === 'white') oppositeColor = 'black'
	else oppositeColor = 'white';
	kingUnavailableaSquares[oppositeColor] = [];
	
    selectPieceState.destinationSquare = destination.target;
    selectPieceState.destinationSquareId = Number(destination.target.id);

	// if pawn is on the other side —> promote
	if (selectPieceState.pieceType === 'pawn') {
		if ((0 <= selectPieceState.destinationSquareId && selectPieceState.destinationSquareId < 8) || (56 <= selectPieceState.destinationSquareId && selectPieceState.destinationSquareId < 64)) {
			promotePawn(selectPieceState.destinationSquareId);
		}
	}

	// if user wants to castle, here it is activated
	if (selectPieceState.pieceType === 'king' && (selectPieceState.destinationSquareId === selectPieceState.selectedSquareId - 2 || selectPieceState.destinationSquareId === selectPieceState.selectedSquareId + 2)) {
		if (selectPieceState.destinationSquareId === selectPieceState.selectedSquareId - 2 && selectPieceState.letKingCastleLeft === true) { // castle to left
			if (selectPieceState.pieceColor === 'white') makeKingCastle(0, -1, 56);
			else if (selectPieceState.pieceColor === 'black') makeKingCastle(0, -1, 0);
		} else if (selectPieceState.destinationSquareId === selectPieceState.selectedSquareId + 2 && selectPieceState.letKingCastleRight === true) { // castle right
			if (selectPieceState.pieceColor === 'white') makeKingCastle(1, 1, 63);
			else if (selectPieceState.pieceColor === 'black') makeKingCastle(1, 1, 7);
		}
		return;
	}

	// if user clicks on a piece with same color, activate resetOnSquareClick()
	for (let i = 0; i < selectPieceState.clickOnPieceToReset.length; i++) {
		if (selectPieceState.destinationSquareId === selectPieceState.clickOnPieceToReset[i]) {
			additFunc.resetOnSquareClick();
			additFunc.resetOnSquareClickInfo();
			return;
		}
	}
	movePieceElementToDestination();
	additFunc.updateStateGrid();
	soundWhenMovingPiece();

	// update Main.pieceSquarePositionArray
	pieceSquarePositionArray[selectPieceState.pieceColor][selectPieceState.pieceType][selectPieceState.selectedPieceIndex] = selectPieceState.destinationSquareId;

	// pawn's double step rule: (Article 3.7.b), a pawn may move two squares forward on its very first move
	if (selectPieceState.pieceType === 'pawn') piecesHasNotMoved[selectPieceState.pieceColor].pawn[selectPieceState.selectedPieceIndex] = false;
	if (selectPieceState.pieceType === 'king') piecesHasNotMoved[selectPieceState.pieceColor].king = false; // king can't castle if they have moved
	
	TurnRegister.registerTurn();

	// update kingUnavailableSquares[oppositeColor]
	for (let t = 0; t < CreatePieceElements.pieceTypeArray.length; t++) {
		let type = CreatePieceElements.pieceTypeArray[t];
		for (let i = 0; i < pieceSquarePositionArray[selectPieceState.pieceColor][type].length; i++) {
			let squareIndex = pieceSquarePositionArray[selectPieceState.pieceColor][type][i];
			if (squareIndex === null) continue;
			attackingMovesObject[type](squareIndex, oppositeColor);
		}
	}
	
	// reset after piece has been moved
	
	additFunc.resetOnSquareClick();
	additFunc.resetOnSquareClickInfo();
	additFunc.reviewIfKingIsChecked(oppositeColor);
}

//———————————————————————————————————————————————————————————————————————————————————

export function movePieceElementToDestination() {
	selectPieceState.x_squareCoordinate = parseInt(chessboardBoard.centerPositionSqaure[selectPieceState.destinationSquareId].x_coordinate);
	selectPieceState.y_squareCoordinate = parseInt(chessboardBoard.centerPositionSqaure[selectPieceState.destinationSquareId].y_coordinate);

	// move piece to destination square
	selectPieceState.selectedPiece.style.left = (selectPieceState.x_squareCoordinate - subtractChessboardPixels.width) + "px"; // FIND better way, than to subtract
	selectPieceState.selectedPiece.style.top = (selectPieceState.y_squareCoordinate - subtractChessboardPixels.height) + "px"; 
}