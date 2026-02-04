import { chessboard, chessboardBoard, stateGrid } from "./main.js";
import * as CreatePieceElements from "./createPieceElements.js";
import { pieceNumberIdentifier, pieceSquarePositionArray, selectPieceState } from "./gameState.js";
import { makeKingCastle } from "./makeKingCastle.js";

let squareDivision = [];
let pixelCoordinatesForSquares = (chessboardBoard.chessboardDimentions.width / 8);
for (let row = 0; row < 8; row++) {
    for (let column = 0; column < 9; column++) {
        squareDivision.push({x_coordinate: pixelCoordinatesForSquares * column, y_coordinate: pixelCoordinatesForSquares * row})
    }
}

//————————————————————————————————————————————————————————————————————————————————————

export function promotePawn(destinationSquare) {
    let promotionOptions = document.createElement('div');
    promotionOptions.className = "promotionOptions"

    // promotion option placement on chessboard
    promotionOptions.style.left = parseInt(squareDivision[destinationSquare].x_coordinate) + "px";
    promotionOptions.style.top = parseInt(squareDivision[destinationSquare].y_coordinate) + "px";

    // show user bishop, rook, knight, queen as options
    showPromotionOptions(selectPieceState.pieceColor)
    chessboard.appendChild(promotionOptions);
}
