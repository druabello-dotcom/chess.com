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
