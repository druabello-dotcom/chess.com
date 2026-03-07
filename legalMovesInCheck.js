import { winScreen, stateGrid } from "./main.js";
import { kingAvailableSquares, kingState, kingUnavailableaSquares, pieceAttackingKing } from "./gameState.js"
import { checkIfPieceOnSquare } from "./createAvailableMoves.js"
import { endGame } from "./sounds.js";

//————————————————————————————————————————————————————————————————————————————————————

export const piecesCanDefend = [];
export const forcedDestination = [];

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

export function checkIfCheckmate(kingSquare, oppositeColor, color) {
    kingAvailableSquares[oppositeColor].length = 0;
    forcedDestination.length = null;
    let upToLeft = kingSquare - 9;
    let up = kingSquare - 8;
    let upToRight = kingSquare - 7
    let right = kingSquare + 1;
    let downToRight = kingSquare + 9;
    let down = kingSquare + 8;
    let downToLeft = kingSquare + 7;
    let left = kingSquare - 1;

    if ((upToLeft % 8) < (kingSquare % 8) && isSquareValid(upToLeft, oppositeColor)) {
        kingAvailableSquares[oppositeColor].push(upToLeft);
    }
    if (0 <= up && isSquareValid(up, oppositeColor)) {
        kingAvailableSquares[oppositeColor].push(up);
    }
    if ((kingSquare % 8) < (upToRight % 8) && isSquareValid(upToRight, oppositeColor)) {
        kingAvailableSquares[oppositeColor].push(upToRight);
    }
    if ((kingSquare % 8) < (right % 8) && isSquareValid(right, oppositeColor)) {
        kingAvailableSquares[oppositeColor].push(right);
    }
    if ((kingSquare % 8) < (downToRight % 8) && isSquareValid(downToRight, oppositeColor)) {
        kingAvailableSquares[oppositeColor].push(downToRight);
    }
    if (down < 64 && isSquareValid(down, oppositeColor)) {
        kingAvailableSquares[oppositeColor].push(down);
    }
    if ((downToLeft % 8) < (kingSquare % 8) && isSquareValid(downToLeft, oppositeColor)) {
        kingAvailableSquares[oppositeColor].push(downToLeft);
    }
    if ((left % 8) < (kingSquare % 8) && isSquareValid(left, oppositeColor)) {
        kingAvailableSquares[oppositeColor].push(left);
    }

    if (kingState[oppositeColor].checked) {
        canDefendKing(kingSquare, oppositeColor)
        if (piecesCanDefend.length === 0 && kingAvailableSquares[oppositeColor].length === 0) {
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
        if (pieceAttackingKing.pieceType[0] === 'knight') canPawnDefend(pieceAttackingKing.square[0], color, checkingSquare)
        else if (checkingSquare !== pieceAttackingKing.square[0]) canPawnDefend(checkingSquare, color, checkingSquare);

        //Check for rook or queen
        for (let i = checkingSquare - 8; 0 <= i; i-=8) { //up
            if (stateGrid[i] === 0) continue;
            if (Math.abs(stateGrid[i]) === 4 || Math.abs(stateGrid[i]) === 5) {
                letPieceDefend(i, color, checkingSquare);
            }
            break;
        }
        for (let i = checkingSquare + 8; i < 64; i+=8) { //down
            if (stateGrid[i] === 0) continue;
            if (Math.abs(stateGrid[i]) === 4 || Math.abs(stateGrid[i]) === 5) {
                letPieceDefend(i, color, checkingSquare);
            }
            break;
        }
        for (let i = checkingSquare + 1; (checkingSquare % 8) < (i % 8) && i < 64; i++) { //right
            if (stateGrid[i] === 0) continue;
            if (Math.abs(stateGrid[i]) === 4 || Math.abs(stateGrid[i]) === 5) {
                letPieceDefend(i, color, checkingSquare);
            }
            break;
        }
        for (let i = checkingSquare - 1; (i % 8) < (checkingSquare % 8) && 0 <= i; i--)  { //left
            if (stateGrid[i] === 0) continue;
            if (Math.abs(stateGrid[i]) === 4 || Math.abs(stateGrid[i]) === 5) {
                letPieceDefend(i, color, checkingSquare);
            }
            break;
        }

        //check for bishop or queen
        for (let i = checkingSquare - 9; (i % 8) < (checkingSquare % 8) && 0 <= i; i-=9) {
            if (stateGrid[i] === 0) continue;
            if (Math.abs(stateGrid[i]) === 3 || Math.abs(stateGrid[i]) === 5) {
                letPieceDefend(i, color, checkingSquare)
                break;
            }
            break;
        }
        for (let i = checkingSquare - 7; (checkingSquare % 8) < (i % 8) && 0 <= i; i-=7) {
            if (stateGrid[i] === 0) continue;
            if (Math.abs(stateGrid[i]) === 3 || Math.abs(stateGrid[i]) === 5) {
                letPieceDefend(i, color, checkingSquare)
                break;
            }
            break;
        }
        for (let i = checkingSquare + 7; (i % 8) < (checkingSquare % 8) && i < 64; i+=7) {
            if (stateGrid[i] === 0) continue;
            if (Math.abs(stateGrid[i]) === 3 || Math.abs(stateGrid[i]) === 5) {
                letPieceDefend(i, color, checkingSquare)
                break;
            }
            break;
        }
        for (let i = checkingSquare + 9; (checkingSquare % 8) < (i % 8) && i < 64; i+=9) {
            if (stateGrid[i] === 0) continue;
            if (Math.abs(stateGrid[i]) === 3 || Math.abs(stateGrid[i]) === 5) {
                letPieceDefend(i, color, checkingSquare)
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
            if (canKnightDefend(color, LD)) letPieceDefend(LD, color, checkingSquare);
        }
        if ((LDD % 8) < (checkingSquare % 8) && LDD < 64) {
            if (canKnightDefend(color, LDD)) letPieceDefend(LDD, color, checkingSquare);
        }
        if ((LU % 8) < (checkingSquare % 8) && 0 <= LU) {
            if (canKnightDefend(color, LU)) letPieceDefend(LU, color, checkingSquare);
        }
        if ((LUU % 8) < (checkingSquare % 8) && 0 <= LUU) {
            if (canKnightDefend(color, LUU)) letPieceDefend(LUU, color, checkingSquare);
        }
        if ((checkingSquare % 8) < (RU % 8) && 0 <= RU) {
            if (canKnightDefend(color, RU)) letPieceDefend(RU, color, checkingSquare);
        }
        if ((checkingSquare % 8) < (RUU % 8) && 0 <= RUU) {
            if (canKnightDefend(color, RUU)) letPieceDefend(RUU, color, checkingSquare);
        }
        if ((checkingSquare % 8) < (RD % 8) && RD < 64) {
            if (canKnightDefend(color, RD)) letPieceDefend(RD, color, checkingSquare);
        }
        if ((checkingSquare % 8) < (RDD % 8) && RDD < 64) {
            if (canKnightDefend(color, RDD)) letPieceDefend(RDD, color, checkingSquare);
        }
    }
}

//————————————————————————————————————————————————————————————————————————————————————

function letPieceDefend(square, color, checkingSquare) {
    if (stateGrid[square] === 0) return;
    if (color === 'black' && stateGrid[square] > 0) return;
    if (color === 'white' && stateGrid[square] < 0) return;
    piecesCanDefend.push(square);
    forcedDestination.push(checkingSquare)
}

function canPawnDefend (square, color) {
    if (color === 'black') {
        let oneStep = square - 8; 
        let doubleStep = square - 16;
        let left = pieceAttackingKing.square[0] - 9;
        let right = pieceAttackingKing.square[0] - 7;
        let minValueRow = 8;
        let maxValueRow = 16;
        pawnDefence(pieceAttackingKing.square[0], left, right, oneStep, -1, color, minValueRow, maxValueRow, doubleStep)
        return;
    } else {
        let oneStep = square + 8;
        let doubleStep = square + 16;
        let left = pieceAttackingKing.square[0] + 7;
        let right = pieceAttackingKing.square[0] + 9;
        let minValueRow = 48;
        let maxValueRow = 56
        pawnDefence(pieceAttackingKing.square[0], left, right, oneStep, 1, color, minValueRow, maxValueRow, doubleStep);
        return;
    }
}
function pawnDefence(square, left, right, oneStep, pawnValue, color, minRow, maxRow, doubleStep, checkingSquare) {
    if (pieceAttackingKing.pieceType[0] !== 'knight') {
        if (stateGrid[oneStep] === pawnValue) letPieceDefend(oneStep, color);
        if (stateGrid[doubleStep] === pawnValue && (minRow <= doubleStep && doubleStep < maxRow)) letPieceDefend(doubleStep, color)
    }
    if (stateGrid[left] === pawnValue && ((left % 8) < (square % 8))) letPieceDefend(left, color, checkingSquare);
    if (stateGrid[right] === pawnValue && ((square % 8) < (right % 8))) letPieceDefend(right, color, checkingSquare);
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