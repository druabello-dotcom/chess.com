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

export function updateKAS(squareIndex, oppositeColor) {
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
        document.body.style.backgroundColor = "blue";
        console.log("Checkmate");
    }
}
