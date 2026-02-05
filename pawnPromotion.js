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

function showPromotionOptions(color) {
    for (let t = 1; t < (CreatePieceElements.pieceTypeArray.length - 1); t++) {
        let type = CreatePieceElements.pieceTypeArray[t];
        let pieceElementSpan = document.createElement('span');
        pieceElementSpan.addEventListener('click', switchPieceType(color, type));
        let pieceElementIcon = document.createElement('img');
        pieceElementSpan.classList.add('piece', color, type);
        pieceElementIcon.src = CreatePieceElements.pieceIcons[color][type];
        pieceElementIcon.alt = CreatePieceElements.pieceIconAlt[color][type];

        pieceElementSpan.appendChild(pieceElementIcon);
    }
}
function switchPieceType(color, pieceType) {
    // pieceElementsObject[pieceColor][pieceType][pieceIndex] — get img.src = pieceIcons[color][pieceType];
    // remove current pawn icon, and replace with selected promotion
    let selectedPieceImg = selectPieceState.selectPieceState.getElementsByTagName('img');
    selectedPieceImg.src = CreatePieceElements.pieceIcons[color][pieceType];
    selectedPieceImg.alt = CreatePieceElements.pieceIcons[color][pieceType];

    // update class for promoted piece
    for (let i = 1; i < selectPieceState.selectPieceState.classList.length; i++) selectPieceState.selectPieceState.classList[i].remove();
    selectPieceState.selectPieceState.classList.add(color, pieceType);

    // update pieceSquarePosition array & stateGrid
    stateGrid[selectPieceState.destinationSquareId] = pieceNumberIdentifier[color][pieceType];
    pieceSquarePositionArray[color].pawn[selectPieceState.selectedPieceIndex] = null;
    pieceSquarePositionArray[color][pieceType].push(selectPieceState.destinationSquareId);
}

/* 
    NOTATER:
    - create span elements with span element
        STYLING: 
        same with as chessboard squares
        highest z-index
        pieceIcons inside the span
        inside span elements shall be pieceicon
*/