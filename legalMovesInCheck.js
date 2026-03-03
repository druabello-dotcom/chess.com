import { winScreen, stateGrid, grid } from "./main.js";
import { kingAvailableSquares, kingUnavailableaSquares, pieceAttackingKing } from "./gameState.js"
import { checkIfPieceOnSquare } from "./createAvailableMoves.js"
import { moveToDestination } from "./movePieceToDestination.js";
import { onSquareClick } from "./onSquareClick.js";

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


let piecesCanDefend = [];

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


function canDefendKing(kingSquare, color) {
    if (1 < pieceAttackingKing.square.length) return false;

    for (let checkingSquare = kingSquare - pieceAttackingKing.direction[0], j = 0; j <= pieceAttackingKing.iterations[0]; checkingSquare-=pieceAttackingKing.direction[0], j++) {

        //Check for rook or queen (or pawn)
        let counter = 0; 
        for (let i = checkingSquare - 8; 0 <= i; i-=8, counter++) { //up
            if (counter === 0 && i === -1 && color === 'black') {
                letPieceDefend(i)
            }
            if (counter === 1 && i === -1 && color === 'black' && (i <= 8 && i < 16)) {
                letPieceDefend(i)
            }
            if (Math.abs(stateGrid[i]) === 4 || Math.abs(stateGrid[i] === 5)) {
                letPieceDefend(i)
            }
        }
        counter = 0;
        for (let i = checkingSquare + 8; i < 64; i+=8, counter++) { //down
            if (counter === 0 && i === 1 && color === 'white') {
                letPieceDefend(i)
            }
            if (counter === 1 && i === 1 && color === 'white' && (i <= 48 && i < 56)) {
                letPieceDefend(i)
            }
            if (Math.abs(stateGrid[i] === 4 || Math.abs(stateGrid[i] === 5))) {
                letPieceDefend(i);
            }
        }
        for (let i = checkingSquare + 1; (checkingSquare % 8) < (i % 8) && i < 64; i++) { //right
            if (Math.abs(stateGrid[i] !== 4 || Math.abs(stateGrid[i]) !== 5)) break;
            else letPieceDefend(i);
        }
        for (let i = checkingSquare - 1; (i % 8) < (checkingSquare % 8) && 0 <= i; i--)  { //left
            if (Math.abs(stateGrid[i] !== 4 || Math.abs(stateGrid[i]) !== 5)) break;
            else letPieceDefend(i);
        }

        //check for bishop
        for (let i = checkingSquare - 9; (i % 8) < (checkingSquare % 8) && 0 <= i; i-=9) {
            if (stateGrid[i] === 0) continue;
            if (!canBishopDefend(color, i)) break;
            else letPieceDefend(i)
        }
        for (let i = checkingSquare - 7; (checkingSquare % 8) < (i % 8) && 0 <= i; i-=7, iterations++) {
            if (stateGrid[i] === 0) continue;
            if (!canBishopDefend(color, i)) break;
            else letPieceDefend(i);
        }
        for (let i = checkingSquare + 7; (i % 8) < (checkingSquare % 8) && i < 64; i+=7) {
            if (stateGrid[i] === 0) continue;
            if (!canBishopDefend(color, i)) break;
            else letPieceDefend(i);
        }
        for (let i = checkingSquare + 9; (checkingSquare % 8) < (i % 8) && i < 64; i+=9) {
            if (stateGrid[i] === 0) continue;
            if (!canBishopDefend(color, i)) break;
            else letPieceDefend(i);
        }
        
        //check for knight
        let LU = checkingSquare - 10 
        let LUU = checkingSquare - 17;
        let LD = checkingSquare + 6;
        let LDD = checkingSquare + 15;

        let RU = checkingSquare - 6;
        let RUU = checkingSquare - 15;
        let RD = checkingSquare + 10;
        let RDD = checkingSquare + 17;

        if ((LD % 8) < (checkingSquare % 8) && LD < 64) {
            if (canKnightDefend(color, LD)) letPieceDefend(LD);
        }
        if ((LDD % 8) < (checkingSquare % 8) && LDD < 64) {
            if (canKnightDefend(color, LDD)) letPieceDefend(LDD);
        }
        if ((LU % 8) < (checkingSquare % 8) && 0 <= LU) {
            if (canKnightDefend(color, LU)) letPieceDefend(LU);
        }
        if ((LUU % 8) < (checkingSquare % 8) && 0 <= LUU) {
            if (canKnightDefend(color, LUU)) letPieceDefend(LUU);
        }
        if ((checkingSquare % 8) < (RU % 8) && 0 <= RU) {
            if (canKnightDefend(color, RU)) letPieceDefend(RU);
        }
        if ((checkingSquare % 8) < (RUU % 8) && 0 <= RUU) {
            if (canKnightDefend(color, RUU)) letPieceDefend(RUU);
        }
        if ((checkingSquare % 8) < (RD % 8) && RD < 64) {
            if (canKnightDefend(color, RD)) letPieceDefend(RD);
        }
        if ((checkingSquare % 8) < (RDD % 8) && RDD < 64) {
            if (canKnightDefend(color, RDD)) letPieceDefend(RDD);
        }
    }
}

function letPieceDefend(square) {
    grid[square].addEventListener('click', onSquareClick);
    piecesCanDefend.push(square);
}

function canKnightDefend(color, square) {
    if (color === 'black') {
        if (stateGrid[square] !== -2) return false;
        else return true;
    } else if (color === 'white') {
        if (stateGrid[square] !== 2) return false;
        else return true;
    }
}
function canBishopDefend(color, square) {
    if (color === 'black') {
        if (stateGrid[square] !== -3 || stateGrid[square] !== -5) return false;
        else return true
    } else if (color === 'white') {
        if (stateGrid[square] !== 3 || stateGrid[square] !== 5) return false;
        else return true;
    }
}