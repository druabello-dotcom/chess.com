import { chessboard, stateGrid, mapPieces } from "./main.js";
import * as CreatePieceElements from "./createPieceElements.js";
import { pieceElementsObject, pieceNumberIdentifier, pieceSquarePositionArray, selectPieceState } from "./gameState.js";
import { pawnSpanElementObject } from "./resetChessboard.js";

//————————————————————————————————————————————————————————————————————————————————————

let promotionOptions = null;
let destinationSquareIndex = null;
let pawnIndex = null;
let selectedPieceSpan = null;
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
    for (let t = (CreatePieceElements.pieceTypeArray.length - 2); 0 < t; t--) {
        let type = CreatePieceElements.pieceTypeArray[t];
        let optionSpan = document.createElement('span');
        let optionImg =document.createElement('img');
        optionSpan.classList.add('piece', color, type);
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

    // push selected piece span into pieceElementsObject
    pieceElementsObject[color][promotionPieceType].push(selectedPieceSpan);
    console.log("THIS WAS PUSHED INTO PIECE ELEMENT OBJECT")
    console.log(selectedPieceSpan);

    promotionOptions = null;
    destinationSquareIndex = null;
    pawnIndex = null;
    selectedPieceSpan = null;
}

/* export function promotePawn(destinationSquare) {
    let squareDivision = [];
    let chessboard = document.getElementById('chessboard');
    let chessboardDim = chessboard.getBoundingClientRect();
    let pixelCoordinatesSquares = chessboardDim.width / 8;
    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 9; column++) {
            squareDivision.push({x_coordinate: pixelCoordinatesSquares * column, y_coordinate: pixelCoordinatesSquares * row})
        }
    }

    if ((0 <= selectPieceState.destinationSquareId && selectPieceState.destinationSquareId < 8) || (56 <= selectPieceState.destinationSquareId && selectPieceState.destinationSquareId < 64)) {
        let promotionOptions = document.createElement('div');
        promotionOptions.className = "promotionOptions"

        // promotion option placement on chessboard
        promotionOptions.style.left = parseInt(squareDivision[destinationSquare].x_coordinate) + "px";
        promotionOptions.style.top = parseInt(squareDivision[destinationSquare].y_coordinate) + "px";

        // show user bishop, rook, knight, queen as options
        showPromotionOptions(selectPieceState.pieceColor);
        chessboard.appendChild(promotionOptions);
    }
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

    let selectedPieceSpan = pieceElementsObject[selectPieceState.pieceColor][selectPieceState.pieceType][selectPieceState.selectedPieceIndex];
    console.log(selectedPieceSpan);
    console.log(selectedPieceSpan.classList);
    console.log(selectedPieceSpan.classList.length);
    let selectedPieceImg = selectedPieceSpan.querySelector('img');
    console.log(selectedPieceImg);
    selectedPieceImg.src = CreatePieceElements.pieceIcons[color][pieceType];
    selectedPieceImg.alt = CreatePieceElements.pieceIconAlt[color][pieceType];

    // update class for promoted piece
    for (let i = 1; i < selectedPieceSpan.length; i++) selectedPieceSpan.classList[i].remove();
    for (let i = 1; i < selectPieceState.selectPieceState.classList.length; i++) selectPieceState.selectPieceState.classList[i].remove();
    selectedPieceSpan.classList.add(color, pieceType); 

    // update pieceSquarePosition array & stateGrid
    stateGrid[selectPieceState.destinationSquareId] = pieceNumberIdentifier[color][pieceType];
    pieceSquarePositionArray[color].pawn[selectPieceState.selectedPieceIndex] = null;
    pieceSquarePositionArray[color][pieceType].push(selectPieceState.destinationSquareId);
}


    NOTATER:
    - create span elements with span element
        STYLING: 
        same with as chessboard squares
        highest z-index
        pieceIcons inside the span
        inside span elements shall be pieceicon */
