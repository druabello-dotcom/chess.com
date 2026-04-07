import { chessboard, stateGrid } from "./main.js";
import * as CreatePieceElements from "./createPieceElements.js";
import { kingUnavailableaSquares, pieceElementsObject, pieceNumberIdentifier, pieceSquarePositionArray, selectPieceState, piecesHasNotMoved } from "./gameState.js";
import { pawnSpanElementObject } from "./resetChessboard.js";
import { promotionSound } from "./sounds.js";
import { updateKAS } from "./movePieceToDestination.js";
import { reviewIfKingIsChecked } from "./additionalFunctions.js";

//————————————————————————————————————————————————————————————————————————————————————

let promotionOptions = null;
let destinationSquareIndex = null;
let pawnIndex = null;
let selectedPieceSpan = null;

//————————————————————————————————————————————————————————————————————————————————————

export function promotePawn(destinationSquare, oppositeColor) {
    pawnIndex = selectPieceState.selectedPieceIndex;
    destinationSquareIndex = destinationSquare;
    let squareDivision = [];
    let chessboard = document.getElementById('chessboard');
    let chessboardDim = chessboard.getBoundingClientRect();
    let pixelCoordinatesSquares = chessboardDim.width / 8;
    let optionsIndex = null;
    if (selectPieceState.pieceColor === 'white') {
        for (let column = 0, row = 0; column < 8; column++) squareDivision.push({x_coordinate: pixelCoordinatesSquares * column, y_coordinate: pixelCoordinatesSquares * row});
        optionsIndex = 0;
    } else if (selectPieceState.pieceColor === 'black') { // fix promotion options placement
        for (let column = 0, row = 7; column < 8; column++) squareDivision.push({x_coordinate: pixelCoordinatesSquares * column, y_coordinate: pixelCoordinatesSquares * row});
        optionsIndex = 56;
    }

    // create promotion options visually
    promotionOptions = document.createElement('div');
    promotionOptions.classList.add('white');
    promotionOptions.classList.add('promotionOptions');

    // promotion options placement on chessboard
    promotionOptions.style.left = parseInt(squareDivision[destinationSquare - optionsIndex].x_coordinate) + "px";
    if (selectPieceState.pieceColor === 'white') promotionOptions.style.top = parseInt(squareDivision[destinationSquare - optionsIndex].y_coordinate) + "px";
    else promotionOptions.style.bottom = parseInt((squareDivision[destinationSquare - optionsIndex].y_coordinate) - (pixelCoordinatesSquares * 7)) + "px"
    showPromotionOptions(selectPieceState.pieceColor, oppositeColor);
    
    chessboard.appendChild(promotionOptions);
}

//————————————————————————————————————————————————————————————————————————————————————

function showPromotionOptions(color, oppositeColor) {
    for (let t = (CreatePieceElements.pieceTypeArray.length - 2); 0 < t; t--) {
        let type = CreatePieceElements.pieceTypeArray[t];
        let optionSpan = document.createElement('span');
        let optionImg =document.createElement('img');
        optionSpan.classList.add('piece', 'white');
        optionImg.src = CreatePieceElements.pieceIcons[color][type];
        optionImg.alt = CreatePieceElements.pieceIconAlt[color][type];
        
        optionSpan.addEventListener('click', () => {
            switchToPieceType(color, type, oppositeColor);
        });
        optionSpan.appendChild(optionImg);
        promotionOptions.appendChild(optionSpan);
    }
}

//————————————————————————————————————————————————————————————————————————————————————

function switchToPieceType(color, promotionPieceType, oppositeColor) {
    // get selected piece span and img
    let promotingPawnImg = pawnSpanElementObject[color][pawnIndex];
    promotingPawnImg.src = CreatePieceElements.pieceIcons[color][promotionPieceType];
    promotingPawnImg.alt = CreatePieceElements.pieceIconAlt[color][promotionPieceType];

    chessboard.removeChild(promotionOptions);

    // update stateGrid
    stateGrid[destinationSquareIndex] = pieceNumberIdentifier[color][promotionPieceType];

    // update pieceSquarePositionArray
    piecesHasNotMoved[color].pawn.splice(pawnIndex, 1);
    pieceSquarePositionArray[color].pawn.splice(pawnIndex, 1);
    pieceSquarePositionArray[color][promotionPieceType].push(destinationSquareIndex);
    
    // update pieceElementsObject
    selectedPieceSpan = pieceElementsObject[color].pawn[pawnIndex];
    pieceElementsObject[color].pawn.splice(pawnIndex, 1);
    pawnSpanElementObject[color].splice(pawnIndex, 1);
    
    // update class of promoted pawn
    selectedPieceSpan.className = `piece ${color} ${promotionPieceType}`;

    // push selected piece span into pieceElementsObject
    pieceElementsObject[color][promotionPieceType].push(selectedPieceSpan);
    promotionSound();
    kingUnavailableaSquares[oppositeColor].length = 0;
    updateKAS(color, oppositeColor);
    reviewIfKingIsChecked(oppositeColor, color)

    promotionOptions = null;
    destinationSquareIndex = null;
    pawnIndex = null;
    selectedPieceSpan = null;
}