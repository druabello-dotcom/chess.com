import { stateGrid, subtractChessboardPixels } from "./main.js";
import * as CreatePieceElements from "./createPieceElements.js";
import { pieceElementsObject, pieceNumberIdentifier, pieceSquarePositionArray, selectPieceState } from "./gameState.js";
import { makeKingCastle } from "./makeKingCastle.js";



//————————————————————————————————————————————————————————————————————————————————————

export function promotePawn(destinationSquare) {
    let squareDivision = [];
    let chessboard = document.getElementById('chessboard');
    let chessboardDim = chessboard.getBoundingClientRect();
    let pixelCoordinatesSquares = chessboardDim.width / 8;
    let optionsIndex = null;
    if (selectPieceState.pieceColor === 'white') {
        for (let column = 0, row = 0; column < 8; column++) squareDivision.push({x_coordinate: pixelCoordinatesSquares * column, y_coordinate: pixelCoordinatesSquares * row});
        optionsIndex = 0;
    } else if (selectPieceState.pieceColor === 'black') {
        for (let column = 0, row = 7; column < 8; column++) squareDivision.push({x_coordinate: pixelCoordinatesSquares * column, y_coordinate: pixelCoordinatesSquares * row});
        optionsIndex = 56;
    }
    console.log(squareDivision);


    // create promotion options visually
    let promotionOptions = document.createElement('div');
    promotionOptions.classList.add('white');
    promotionOptions.classList.add('promotionOptions');

    // promotion options placement on chessboard
    promotionOptions.style.left = parseInt(squareDivision[destinationSquare - optionsIndex].x_coordinate) + "px";
    promotionOptions.style.top = parseInt(squareDivision[destinationSquare - optionsIndex].y_coordinate) + "px";
    promotionOptions.style.position = "absolute";
    promotionOptions.style.height = "100px";
    chessboard.appendChild(promotionOptions);
}