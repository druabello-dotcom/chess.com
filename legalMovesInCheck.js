import { winScreen, stateGrid, grid } from "./main.js";
import { kingAvailableSquares, kingUnavailableaSquares  } from "./gameState.js"
import { checkIfPieceOnSquare } from "./createAvailableMoves.js"

//————————————————————————————————————————————————————————————————————————————————————
/* 
NOTATER:
- king gets checked
- check if there are any available moves FOR KING
- if not, check if there are any friendly pieces that can capture the piece that checked the king
- if not, check if there are any pieces that can block the check (from the direction it came from)

That means I need to store what piece, and what direction the attack came from
- store piece
- store square of the piece
- eventually store the incrementation (direction from where the attacking piee came from)

Where I need to update KAS:
- if king is in check
- in moveToDestination for opposite color 
- check if there are any available moves around the king
- if KAS.length = 0 —> checkmate
 */

export const attackingPieceInfo = {
    black: {
        piece: [],
        square: [],
        incrementation: []
    },
    white: {
        piece: [],
        square: [],
        incrementation: []
    }
}
function isSquareValid(square, oppositeColor) {
    if (square < 0 || 63 < square) return false;
    if (checkIfPieceOnSquare(square, oppositeColor)) return false;
    for (let i = 0; i < kingUnavailableaSquares[oppositeColor].length; i++) {
        if (kingUnavailableaSquares[oppositeColor][i] === square) {
            return false;
        }
    }
    return true;
}

//————————————————————————————————————————————————————————————————————————————————————

export function updateKAS(squareIndex, oppositeColor, color) {
    kingAvailableSquares[oppositeColor].length = 0;
    let upToLeft = squareIndex - 9;
    let up = squareIndex - 8;
    let upToRight = squareIndex - 7
    let right = squareIndex + 1;
    let downToRight = squareIndex + 9;
    let down = squareIndex + 8;
    let downToLeft = squareIndex + 7;
    let left = squareIndex - 1;

    if ((upToLeft % 8) < (squareIndex % 8) && isSquareValid(upToLeft, oppositeColor) === true) {
        kingAvailableSquares[oppositeColor].push(upToLeft);
    }
    if (0 <= up && isSquareValid(up, oppositeColor)) {
        kingAvailableSquares[oppositeColor].push(up);
    }
    if ((squareIndex % 8) < (upToRight % 8) && isSquareValid(upToRight, oppositeColor) === true) {
        kingAvailableSquares[oppositeColor].push(upToRight);
    }
    if ((squareIndex % 8) < (right % 8) && isSquareValid(right, oppositeColor) === true) {
        kingAvailableSquares[oppositeColor].push(right);
    }
    if ((squareIndex % 8) < (downToRight % 8) && isSquareValid(downToRight, oppositeColor) === true) {
        kingAvailableSquares[oppositeColor].push(downToRight);
    }
    if (down < 64 && isSquareValid(down, oppositeColor)) {
        kingAvailableSquares[oppositeColor].push(down);
    }
    if ((downToLeft % 8) < (squareIndex % 8) && isSquareValid(downToLeft, oppositeColor) === true) {
        kingAvailableSquares[oppositeColor].push(downToLeft);
    }
    if ((left % 8) < (squareIndex % 8) && isSquareValid(left, oppositeColor) === true) {
        kingAvailableSquares[oppositeColor].push(left);
    }

    if (kingAvailableSquares[oppositeColor].length === 0) {
        /* 
        check if there are any piecs that can defend king from check
        HOW?:
        */
        winScreen.style.display = "flex";
        let victoryAnnouncer = document.querySelector('#victoryAnnouncement h1');
        let victoryGoesTo = `${color} won!`;
        victoryAnnouncer.innerText = `${victoryGoesTo.toUpperCase()}`
        console.log("Checkmate");
    }
}

// check what piece that checkmated the king
function checkAttackingPiece(kingSquare, color) {
    let iterationsCounter = 0; 
    
    //check for bishop
    iterationsCounter = 0;
    for (let i = kingSquare - 9; (i % 8) < (kingSquare % 8) && 0 <= i; i-=9)  {// up to left 
        if ((stateGrid[i] < 0 && color ==='black') || (0 < stateGrid[i] && color === 'white')) break;
        else if (((stateGrid[i] === 3 || stateGrid[i] === 5) && color === 'black') || ((stateGrid[i] === -3 || stateGrid[i] === -5) && color === 'white')) return i;
    }
    for (let i = kingSquare - 7; (kingSquare % 8) < (i % 8) && 0 <= i; i-=7) { // up to right
        if ((stateGrid[i] < 0 && color ==='black') || (0 < stateGrid[i] && color === 'white')) break;
        else if (((stateGrid[i] === 3 || stateGrid[i] === 5) && color === 'black') || ((stateGrid[i] === -3 || stateGrid[i] === -5) && color === 'white')) return i; 
    } 
    for (let i = kingSquare + 7; (i % 8) < (kingSquare % 8) && i < 64; i+=7) {
        if ((stateGrid[i] < 0 && color ==='black') || (0 < stateGrid[i] && color === 'white')) break;
        else if (((stateGrid[i] === 3 || stateGrid[i] === 5) && color === 'black') || ((stateGrid[i] === -3 || stateGrid[i] === -5) && color === 'white')) return i; 
    }
    for (let i = kingSquare + 9; (kingSquare % 8) < (i % 8) && i < 64; i+=9) {
        if ((stateGrid[i] < 0 && color ==='black') || (0 < stateGrid[i] && color === 'white')) break;
        else if (((stateGrid[i] === 3 || stateGrid[i] === 5) && color === 'black') || ((stateGrid[i] === -3 || stateGrid[i] === -5) && color === 'white')) return i; 
    }

    //check for rook
    for (let i = kingSquare + 8; i < 64; i+=8) {
        if ((stateGrid[i] < 0 && color ==='black') || (0 < stateGrid[i] && color === 'white')) break;
        else if (((stateGrid[i] === 4 || stateGrid[i] === 5) && color === 'black') || ((stateGrid[i] === -4 || stateGrid[i] === -5) && color === 'white')) return i;  
    }
    for (let i = kingSquare - 8; 0 <= i; i-=8) {
        if ((stateGrid[i] < 0 && color ==='black') || (0 < stateGrid[i] && color === 'white')) break;
        else if (((stateGrid[i] === 4 || stateGrid[i] === 5) && color === 'black') || ((stateGrid[i] === -4 || stateGrid[i] === -5) && color === 'white')) return i;  
    }
    for (let i = kingSquare + 1; (kingSquare % 8) < (i % 8) && i < 64; i++) {
        if ((stateGrid[i] < 0 && color ==='black') || (0 < stateGrid[i] && color === 'white')) break;
        else if (((stateGrid[i] === 4 || stateGrid[i] === 5) && color === 'black') || ((stateGrid[i] === -4 || stateGrid[i] === -5) && color === 'white')) return i;  
    }
    for (let i = kingSquare - 1; (i % 8) < (kingSquare % 8) && 0 <= i; i--) {
        if ((stateGrid[i] < 0 && color ==='black') || (0 < stateGrid[i] && color === 'white')) break;
        else if (((stateGrid[i] === 4 || stateGrid[i] === 5) && color === 'black') || ((stateGrid[i] === -4 || stateGrid[i] === -5) && color === 'white')) return i;  
    }

    //check for knight
    let LU = kingSquare - 10 
    let LUU = kingSquare - 17;
    let LD = kingSquare + 6;
    let LDD = kingSquare + 15;

    let RU = kingSquare - 6;
    let RUU = kingSquare - 15;
    let RD = kingSquare + 10;
    let RDD = kingSquare + 17;

    if ((LD % 8) < (kingSquare % 8) && LD < 64) {
        if ((stateGrid[LD] === 2 && color === 'black') || (stateGrid[LD] === -2 && color === 'white')) return LD;
    }
    if ((LDD % 8) < (kingSquare % 8) && LDD < 64) {
        if ((stateGrid[LDD] === 2 && color === 'black') || (stateGrid[LDD] === -2 && color === 'white')) return LDD;
    } 
    if ((LU % 8) < (kingSquare % 8) && 0 <= LU) {
        if ((stateGrid[LU] === 2 && color === 'black') || (stateGrid[LU] === -2 && color === 'white')) return LU;
    }
    if ((LUU % 8) < (kingSquare % 8) && 0 <= LUU) {
        if ((stateGrid[LUU] === 2 && color === 'black') || (stateGrid[LUU] === -2 && color === 'white')) return LUU;
    }
    if ((kingSquare % 8) < (RU % 8) && 0 <= RU) {
        if ((stateGrid[RU] === 2 && color === 'black') || (stateGrid[RU] === -2 && color === 'white')) return RU;
    }
    if ((kingSquare % 8) < (RUU % 8) && 0 <= RUU) {
        if ((stateGrid[RUU] === 2 && color === 'black') || (stateGrid[RUU] === -2 && color === 'white')) return RUU;
    }
    if ((kingSquare % 8) < (RD % 8) && RD < 64) {
        if ((stateGrid[RD] === 2 && color === 'black') || (stateGrid[RD] === -2 && color === 'white')) return RD;
    }
    if ((kingSquare % 8) < (RDD % 8) && RDD < 64) {
        if ((stateGrid[RDD] === 2 && color === 'black') || (stateGrid[RDD] === -2 && color === 'white')) return RDD;
    }

    //check for pawn
    let attackingLeft = null;
    let attackingRight = null;
    if  (selectPieceState.pieceColor === 'white') {
        attackingLeft = kingSquare - 9;
        attackingRight = kingSquare - 7;
        oppositeColor = 'black'; 
    } else if (selectPieceState.pieceColor === 'black') {
        attackingLeft = kingSquare + 7;
        attackingRight = kingSquare + 9;
    }
    if ((attackingLeft % 8) < (kingSquare % 8)) return attackingLeft;
    if ((kingSquare % 8) < (attackingRight % 8)) return attackingRight;
}
