import { chessboard, stateGrid, mapPieces } from "./main.js";
import * as CreatePieceElements from "./createPieceElements.js";
import { pieceElementsObject, pieceNumberIdentifier, pieceSquarePositionArray, selectPieceState } from "./gameState.js";
import { pawnSpanElementObject } from "./resetChessboard.js";
import { promotionSound } from "./sounds.js";

//————————————————————————————————————————————————————————————————————————————————————

let promotionOptions = null;
let destinationSquareIndex = null;
let pawnIndex = null;
let selectedPieceSpan = null;

//————————————————————————————————————————————————————————————————————————————————————

export function promotePawn(destinationSquare) {
    pawnIndex = selectPieceState.selectedPieceIndex;
    destinationSquareIndex = destinationSquare;
    console.log(selectPieceState.destinationSquareId);
    console.log("pawn index:  " + pawnIndex);
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
    showPromotionOptions(selectPieceState.pieceColor);
    
    chessboard.appendChild(promotionOptions);
}

//————————————————————————————————————————————————————————————————————————————————————

function showPromotionOptions(color) {
    for (let t = (CreatePieceElements.pieceTypeArray.length - 2); 0 < t; t--) {
        let type = CreatePieceElements.pieceTypeArray[t];
        let optionSpan = document.createElement('span');
        let optionImg =document.createElement('img');
        optionSpan.classList.add('piece', 'white');
        optionImg.src = CreatePieceElements.pieceIcons[color][type];
        optionImg.alt = CreatePieceElements.pieceIconAlt[color][type];
        
        optionSpan.addEventListener('click', () => {
            switchToPieceType(color, type);
        });
        optionSpan.appendChild(optionImg);
        promotionOptions.appendChild(optionSpan);
    }
    console.log(pieceSquarePositionArray[color]);
}

//————————————————————————————————————————————————————————————————————————————————————

function switchToPieceType(color, promotionPieceType) {
    // get selected piece span and img
    console.log("pawn index is still:  " + pawnIndex);
    let promotingPawnImg = pawnSpanElementObject[color][pawnIndex];
    promotingPawnImg.src = CreatePieceElements.pieceIcons[color][promotionPieceType];
    promotingPawnImg.alt = CreatePieceElements.pieceIconAlt[color][promotionPieceType];

    chessboard.removeChild(promotionOptions);
    console.log("YOU HAVE SELECTED A PROMOTION OPTION");
    console.log(promotingPawnImg);
    console.log("color and type:  " + color + promotionPieceType);

    // update stateGrid
    stateGrid[destinationSquareIndex] = pieceNumberIdentifier[color][promotionPieceType];
    console.log(stateGrid[destinationSquareIndex]);
    console.log(mapPieces[Math.abs(stateGrid[destinationSquareIndex])]);

    console.log(stateGrid);
    console.log(destinationSquareIndex);

    // update pieceSquarePositionArray
    pieceSquarePositionArray[color].pawn[pawnIndex] = null;
    pieceSquarePositionArray[color][promotionPieceType].push(destinationSquareIndex);
    console.log(pieceSquarePositionArray[color]);

    // update pieceElementsObject
    // set pieceElementsObject.pawn[index] as null
    selectedPieceSpan = pieceElementsObject[color].pawn[pawnIndex];
    console.log("THIS WILL BE PUSHED INTO PIECE ELEMENT OBJECT")
    console.log(selectedPieceSpan);
    pieceElementsObject[color].pawn[pawnIndex] = null;

    // update class of promoted pawn
    selectedPieceSpan.className = `piece ${color} ${promotionPieceType}`;

    // push selected piece span into pieceElementsObject
    pieceElementsObject[color][promotionPieceType].push(selectedPieceSpan);
    console.log("THIS WAS PUSHED INTO PIECE ELEMENT OBJECT")
    console.log(selectedPieceSpan);

    promotionSound();

    promotionOptions = null;
    destinationSquareIndex = null;
    pawnIndex = null;
    selectedPieceSpan = null;
}