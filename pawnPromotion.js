import { stateGrid, subtractChessboardPixels } from "./main.js";
import * as CreatePieceElements from "./createPieceElements.js";
import { pieceElementsObject, pieceNumberIdentifier, pieceSquarePositionArray, selectPieceState } from "./gameState.js";
import { makeKingCastle } from "./makeKingCastle.js";

/* let squareDivision = [];
for (let row = 0; row < 8; row++) {
    for (let column = 0; column < 9; column++) {
        squareDivision.push({x_coordinate: pixelCoordinatesSquares * column, y_coordinate: pixelCoordinatesSquares * row})
    }
} */

//————————————————————————————————————————————————————————————————————————————————————

let promotionOptions = null;
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

    // create promotion options visually
    promotionOptions = document.createElement('div');
    promotionOptions.classList.add('white');
    promotionOptions.classList.add('promotionOptions');

    // promotion options placement on chessboard
    promotionOptions.style.left = parseInt(squareDivision[destinationSquare - optionsIndex].x_coordinate) + "px";
    promotionOptions.style.top = parseInt(squareDivision[destinationSquare - optionsIndex].y_coordinate) + "px";
    showPromotionOptions(selectPieceState.pieceColor);
    
    chessboard.appendChild(promotionOptions);
}

function showPromotionOptions(color) {
    for (let t = 1; t < (CreatePieceElements.pieceTypeArray.length - 1); t++) {
        let type = CreatePieceElements.pieceTypeArray[t];
        let optionSpan = document.createElement('span');
        let optionImg =document.createElement('img');
        optionSpan.classList.add('piece', color, type);        
        optionImg.src = CreatePieceElements.pieceIcons[color][type];
        optionImg.alt = CreatePieceElements.pieceIconAlt[color][type];

        optionSpan.appendChild(optionImg);
        promotionOptions.appendChild(optionSpan);
    }
}