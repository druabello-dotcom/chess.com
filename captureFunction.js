import * as Main from "./main.js";
import { captureSound } from "./sounds.js";
import { selectPieceState, pieceSquarePositionArray, pieceElementsObject, piecesHasNotMoved } from "./gameState.js";

//———————————————————————————————————————————————————————————————————————————————————

export function capturePieceFunction(enemyPieceSquarePlacement) {
    if (Main.stateGrid[enemyPieceSquarePlacement] === 0) return;

    let enemyPieceColor = null;
    let enemyPieceType = null;

    // selected piece is black, target is white
    if (selectPieceState.valueInSquare < 0 && 0 < Main.stateGrid[enemyPieceSquarePlacement]) {
        enemyPieceColor = 'white';
        enemyPieceType = Main.mapPieces[Math.abs(Main.stateGrid[enemyPieceSquarePlacement])];
    }
    // selected piece is white, target is black
    else if (0 < selectPieceState.valueInSquare && Main.stateGrid[enemyPieceSquarePlacement] < 0) {
        enemyPieceColor = 'black';
        enemyPieceType = Main.mapPieces[Math.abs(Main.stateGrid[enemyPieceSquarePlacement])];
    } else {
        // same color piece (should not be possible if your moves are correct)
        return;
    }

    // remove piece visually + from arrays
    let enemyPieceIndex = pieceSquarePositionArray[enemyPieceColor][enemyPieceType].indexOf(enemyPieceSquarePlacement);
    if (enemyPieceIndex === -1) return;
    pieceElementsObject[enemyPieceColor][enemyPieceType].splice(enemyPieceIndex, 1);
    pieceSquarePositionArray[enemyPieceColor][enemyPieceType].splice(enemyPieceIndex, 1);
    if (enemyPieceType === 'pawn' || enemyPieceType === 'rook') {
        piecesHasNotMoved[enemyPieceColor][enemyPieceType].splice(enemyPieceIndex, 1);
    }

    captureSound();
}