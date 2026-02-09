import * as Main from "./main.js"
import * as additFunc from "./additionalFunctions.js"
import * as TurnRegister from "./turnRegister.js";

import { promotePawn } from "./pawnPromotion.js";
import { chessboardBoard } from "./main.js";
import { subtractChessboardPixels } from "./main.js";
import { makeKingCastle } from "./makeKingCastle.js";
import { selectPieceState, piecesHasNotMoved, pieceSquarePositionArray } from "./gameState.js";

export function moveToDestination(destination) {
	// register destination square
	/* selectPieceStateselectPieceState.destinationSquareIddestination.target; */
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

	// update Main.pieceSquarePositionArray
	pieceSquarePositionArray[selectPieceState.pieceColor][selectPieceState.pieceType][selectPieceState.selectedPieceIndex] = selectPieceState.destinationSquareId;
	/* console.log("Black " + selectPieceState.pieceType + ":  " +  Main.pieceSquarePositionArray.black[selectPieceState.pieceType]); */
	/* console.log("White " + selectPieceState.pieceType + ":  " + Main.pieceSquarePositionArray.white[selectPieceState.pieceType]); */

	// pawn's double step rule: (Article 3.7.b), a pawn may move two squares forward on its very first move
	if (selectPieceState.pieceType === 'pawn') piecesHasNotMoved[selectPieceState.pieceColor].pawn[selectPieceState.selectedPieceIndex] = false;
	if (selectPieceState.pieceType === 'king') piecesHasNotMoved[selectPieceState.pieceColor].king = false; // king can't castle if they have moved
	
	TurnRegister.registerTurn();

	// reset after piece has been moved
	additFunc.resetOnSquareClick();
	additFunc.resetOnSquareClickInfo();

	console.log(pieceSquarePositionArray);
}

export function movePieceElementToDestination() {
	selectPieceState.x_squareCoordinate = parseInt(chessboardBoard.centerPositionSqaure[selectPieceState.destinationSquareId].x_coordinate);
	selectPieceState.y_squareCoordinate = parseInt(chessboardBoard.centerPositionSqaure[selectPieceState.destinationSquareId].y_coordinate);
	console.log(selectPieceState.x_squareCoordinate + ", " + selectPieceState.y_squareCoordinate);

	// move piece to destination square
	selectPieceState.selectedPiece.style.left = (selectPieceState.x_squareCoordinate - subtractChessboardPixels.width) + "px"; // FIND better way, than to subtract
	selectPieceState.selectedPiece.style.top = (selectPieceState.y_squareCoordinate - subtractChessboardPixels.height) + "px"; 
}