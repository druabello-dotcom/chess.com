import * as Main from "./main.js";
import { chessboardBoard, subtractChessboardPixels } from "./main.js";
import * as additFunc from "./additionalFunctions.js"
/* import { updateStateGrid, resetOnSquareClickInfo } from "./additionalFunctions.js"; */
import { registerTurn } from "./turnRegister.js";
import { selectPieceState, pieceSquarePositionArray, piecesHasNotMoved, pieceElementsObject, pieceNumberIdentifier } from "./gameState.js";
import { movePieceElementToDestination } from "./movePieceToDestination.js";

export function makeKingCastle(rookIndex, rookMove, rookGridPlacement) {
	let rookMoveTo = selectPieceState.selectedSquareId + (rookMove)
	piecesHasNotMoved[selectPieceState.pieceColor].king = false;
	piecesHasNotMoved[selectPieceState.pieceColor].rook[rookIndex] = false;

	movePieceElementToDestination();
	let x_squareCoordinateRook = parseInt(chessboardBoard.centerPositionSqaure[rookMoveTo].x_coordinate);
	let y_squareCoordinateRook = parseInt(chessboardBoard.centerPositionSqaure[rookMoveTo].y_coordinate);
	let selectedCastlingRook = pieceElementsObject[selectPieceState.pieceColor].rook[rookIndex];
	selectedCastlingRook.style.left = (x_squareCoordinateRook - subtractChessboardPixels.width) + "px";
	selectedCastlingRook.style.top = (y_squareCoordinateRook - subtractChessboardPixels.height) + "px";

	Main.stateGrid[rookMoveTo] = pieceNumberIdentifier[selectPieceState.pieceColor].rook;
	Main.stateGrid[rookGridPlacement] = 0;
	pieceSquarePositionArray[selectPieceState.pieceColor].rook[rookIndex] = rookMoveTo;
	pieceSquarePositionArray[selectPieceState.pieceColor].king[selectPieceState.selectedPieceIndex] = selectPieceState.destinationSquareId;
	additFunc.updateStateGrid();

	registerTurn();

	// castling is no longer possible again
    selectPieceState.letKingCastleLeft = false;
    selectPieceState.letKingCastleRight = false;
	piecesHasNotMoved[selectPieceState.pieceColor].rook[rookIndex] = false;
	piecesHasNotMoved[selectPieceState.pieceColor].king = false;
	
	// reset onSquareClick information
	additFunc.resetOnSquareClick();
	additFunc.resetOnSquareClickInfo();
	rookMoveTo = null;
	x_squareCoordinateRook = null;
	y_squareCoordinateRook = null;
	selectedCastlingRook = null;
}