import { winScreen, stateGrid, grid } from "./main.js";
import { kingAvailableSquares, kingUnavailableaSquares, pieceAttackingKing } from "./gameState.js"
import { checkIfPieceOnSquare } from "./createAvailableMoves.js"
import { endGame } from "./sounds.js";

//————————————————————————————————————————————————————————————————————————————————————

export const piecesCanDefend = [];

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

    if ((upToLeft % 8) < (squareIndex % 8) && isSquareValid(upToLeft, oppositeColor)) {
        kingAvailableSquares[oppositeColor].push(upToLeft);
    }
    if (0 <= up && isSquareValid(up, oppositeColor)) {
        kingAvailableSquares[oppositeColor].push(up);
    }
    if ((squareIndex % 8) < (upToRight % 8) && isSquareValid(upToRight, oppositeColor)) {
        kingAvailableSquares[oppositeColor].push(upToRight);
    }
    if ((squareIndex % 8) < (right % 8) && isSquareValid(right, oppositeColor)) {
        kingAvailableSquares[oppositeColor].push(right);
    }
    if ((squareIndex % 8) < (downToRight % 8) && isSquareValid(downToRight, oppositeColor)) {
        kingAvailableSquares[oppositeColor].push(downToRight);
    }
    if (down < 64 && isSquareValid(down, oppositeColor)) {
        kingAvailableSquares[oppositeColor].push(down);
    }
    if ((downToLeft % 8) < (squareIndex % 8) && isSquareValid(downToLeft, oppositeColor)) {
        kingAvailableSquares[oppositeColor].push(downToLeft);
    }
    if ((left % 8) < (squareIndex % 8) && isSquareValid(left, oppositeColor)) {
        kingAvailableSquares[oppositeColor].push(left);
    }

    if (kingAvailableSquares[oppositeColor].length === 0) {
        canDefendKing(squareIndex, oppositeColor)
        console.log("square of attack:  " + pieceAttackingKing.square[0]);
        console.log("Direction of attackt:  " + pieceAttackingKing.direction[0]);
        console.log("iternations of attack:  " + pieceAttackingKing.iterations[0]);
        console.log(piecesCanDefend);
        if (piecesCanDefend.length === 0) {
            endGame();
            winScreen.style.display = "flex";
            let victoryAnnouncer = document.querySelector('#victoryAnnouncement h1');
            let victoryGoesTo = `${color} won!`;
            victoryAnnouncer.innerText = `${victoryGoesTo.toUpperCase()}`
        }
    }
}

// register pieces that defend the king from check (block the check)
function canDefendKing(kingSquare, color) {
    piecesCanDefend.length = 0;
    if (1 < pieceAttackingKing.square.length) return;
    for (let checkingSquare = kingSquare - pieceAttackingKing.direction[0], j = 0; j < pieceAttackingKing.iterations[0]; checkingSquare -= pieceAttackingKing.direction[0], j++) {
        //check for pawn
        console.log("checking square:  " + checkingSquare);
        if (checkingSquare !== pieceAttackingKing.square[0]) canPawnDefend(checkingSquare, color);

        //Check for rook or queen
        for (let i = checkingSquare - 8; 0 <= i; i-=8) { //up
            if (stateGrid[i] === 0) continue;
            if (Math.abs(stateGrid[i]) === 4 || Math.abs(stateGrid[i]) === 5) {
                letPieceDefend(i, color)
            }
            break;
        }
        for (let i = checkingSquare + 8; i < 64; i+=8) { //down
            if (stateGrid[i] === 0) continue;
            if (Math.abs(stateGrid[i]) === 4 || Math.abs(stateGrid[i]) === 5) {
                letPieceDefend(i, color);
            }
            break;
        }
        for (let i = checkingSquare + 1; (checkingSquare % 8) < (i % 8) && i < 64; i++) { //right
            if (stateGrid[i] === 0) continue;
            if (Math.abs(stateGrid[i]) === 4 || Math.abs(stateGrid[i]) === 5) {
                letPieceDefend(i, color);
            }
            break;
        }
        for (let i = checkingSquare - 1; (i % 8) < (checkingSquare % 8) && 0 <= i; i--)  { //left
            if (stateGrid[i] === 0) continue;
            if (Math.abs(stateGrid[i]) === 4 || Math.abs(stateGrid[i]) === 5) {
                letPieceDefend(i, color);
            }
            break;
        }

        //check for bishop
        for (let i = checkingSquare - 9; (i % 8) < (checkingSquare % 8) && 0 <= i; i-=9) {
            if (stateGrid[i] === 0) continue;
            if (Math.abs(stateGrid[i]) === 3 || Math.abs(stateGrid[i]) === 5) {
                letPieceDefend(i, color)
                break;
            }
            break;
        }
        for (let i = checkingSquare - 7; (checkingSquare % 8) < (i % 8) && 0 <= i; i-=7) {
            if (stateGrid[i] === 0) continue;
            if (Math.abs(stateGrid[i]) === 3 || Math.abs(stateGrid[i]) === 5) {
                letPieceDefend(i, color)
                break;
            }
            break;
        }
        for (let i = checkingSquare + 7; (i % 8) < (checkingSquare % 8) && i < 64; i+=7) {
            if (stateGrid[i] === 0) continue;
            if (Math.abs(stateGrid[i]) === 3 || Math.abs(stateGrid[i]) === 5) {
                letPieceDefend(i, color)
                break;
            }
            break;
        }
        for (let i = checkingSquare + 9; (checkingSquare % 8) < (i % 8) && i < 64; i+=9) {
            if (stateGrid[i] === 0) continue;
            if (Math.abs(stateGrid[i]) === 3 || Math.abs(stateGrid[i]) === 5) {
                letPieceDefend(i, color)
                break;
            }
            break;
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
            if (canKnightDefend(color, LD)) letPieceDefend(LD, color);
        }
        if ((LDD % 8) < (checkingSquare % 8) && LDD < 64) {
            if (canKnightDefend(color, LDD)) letPieceDefend(LDD, color);
        }
        if ((LU % 8) < (checkingSquare % 8) && 0 <= LU) {
            if (canKnightDefend(color, LU)) letPieceDefend(LU, color);
        }
        if ((LUU % 8) < (checkingSquare % 8) && 0 <= LUU) {
            if (canKnightDefend(color, LUU)) letPieceDefend(LUU, color);
        }
        if ((checkingSquare % 8) < (RU % 8) && 0 <= RU) {
            if (canKnightDefend(color, RU)) letPieceDefend(RU, color);
        }
        if ((checkingSquare % 8) < (RUU % 8) && 0 <= RUU) {
            if (canKnightDefend(color, RUU)) letPieceDefend(RUU, color);
        }
        if ((checkingSquare % 8) < (RD % 8) && RD < 64) {
            if (canKnightDefend(color, RD)) letPieceDefend(RD, color);
        }
        if ((checkingSquare % 8) < (RDD % 8) && RDD < 64) {
            if (canKnightDefend(color, RDD)) letPieceDefend(RDD, color);
        }
    }
}

//————————————————————————————————————————————————————————————————————————————————————

function letPieceDefend(square, color) {
    if (stateGrid[square] === 0) return;

    if (color === 'black' && stateGrid[square] > 0) return;
    if (color === 'white' && stateGrid[square] < 0) return;

    piecesCanDefend.push(square);
}

function canPawnDefend (square, color) {
    if (color === 'black') {
        let move = square - 8; 
        let doubleStep = square - 16;
        if (stateGrid[move] === -1) letPieceDefend(move, color);
        if (stateGrid[doubleStep] === -1 && (8 <= doubleStep && doubleStep < 16)) letPieceDefend(doubleStep, color);
        return;
    } else {
        let move = square + 8;
        let doubleStep = square + 16;
        if (stateGrid[move] === 1) letPieceDefend(move, color);
        if (stateGrid[doubleStep] === 1 && (48 <= doubleStep && doubleStep < 56)) letPieceDefend(doubleStep, color);
        return;
    }
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