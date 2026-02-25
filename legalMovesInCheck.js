import { kingAvailableSquares, kingUnavailableaSquares, pieceSquarePositionArray } from "./gameState.js"
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

export function updateKAS(squareIndex, oppositeColor) {
    let upToLeft = squareIndex - 9;
    let up = squareIndex - 8;
    let upToRight = squareIndex - 7
    let right = squareIndex + 1;
    let downToRight = squareIndex + 9;
    let down = squareIndex + 8;
    let downToLeft = squareIndex + 7;
    let left = squareIndex - 1;

    if ((upToLeft % 8) < (squareIndex % 8) && 0 <= upToLeft && checkIfPieceOnSquare(upToLeft) === true) {
        kingAvailableSquares[oppositeColor].push(upToLeft);
    }
    if (0 <= up && checkIfPieceOnSquare(up) && checkIfPieceOnSquare(up) === true) {
        kingAvailableSquares[oppositeColor].push(up);
    }
    if ((squareIndex % 8) < (upToRight % 8) && 0 <= upToRight && checkIfPieceOnSquare(upToRight) === true) {
        kingAvailableSquares[oppositeColor].push(upToRight);
    }
    if ((squareIndex % 8) < (right % 8) && right < 64 && checkIfPieceOnSquare(right) === true) {
        kingAvailableSquares[oppositeColor].push(right);
    }
    if ((squareIndex % 8) < (downToRight % 8) && downToRight < 64 && checkIfPieceOnSquare(downToRight ) === true) {
        kingAvailableSquares[oppositeColor].push(downToRight);
    }
    if (down < 64 && checkIfPieceOnSquare(down) === true) {
        kingAvailableSquares[oppositeColor].push(down);
    }
    if ((downToLeft % 8) < (squareIndex % 8) && downToLeft < 64 && checkIfPieceOnSquare(downToLeft) === true) {
        kingAvailableSquares[oppositeColor].push(downToLeft);
    }
    if ((left % 8) < (squareIndex % 8) && 0 <= left && checkIfPieceOnSquare(left) === true) {
        kingAvailableSquares[oppositeColor].push(left);
    }

    let indexKAS = {
        upToLeft: kingAvailableSquares[oppositeColor].indexOf(upToLeft),
        up: kingAvailableSquares[oppositeColor].indexOf(up),
        upToRight: kingAvailableSquares[oppositeColor].indexOf(upToRight),
        right: kingAvailableSquares[oppositeColor].indexOf(right),
        downToRight: kingAvailableSquares[oppositeColor].indexOf(downToRight),
        down: kingAvailableSquares[oppositeColor].indexOf(down),
        downToLeft: kingAvailableSquares[oppositeColor].indexOf(downToLeft),
        left: kingAvailableSquares[oppositeColor].indexOf(left)
    }

    for (let i = 0; i < kingUnavailableaSquares[oppositeColor].length; i++) {
        if (kingUnavailableaSquares[oppositeColor][i] === upToLeft) {
            kingAvailableSquares[oppositeColor].splice(indexKAS.upToLeft, 1);
        }
        if (kingUnavailableaSquares[oppositeColor][i] === up) {
            kingAvailableSquares[oppositeColor].splice(indexKAS, 1);
        }
        if (kingUnavailableaSquares[oppositeColor][i] === upToRight) {
            kingAvailableSquares[oppositeColor].splice(indexKAS.upToRight, 1);
        }
        if (kingUnavailableaSquares[oppositeColor][i] === right) {
            kingAvailableSquares[oppositeColor].splice(indexKAS.right, 1);
        }
        if (kingUnavailableaSquares[oppositeColor][i] === downToRight) {
            kingAvailableSquares[oppositeColor].splice(indexKAS.downToRight, 1);
        }
        if (kingUnavailableaSquares[oppositeColor][i] === down) {
            kingAvailableSquares[oppositeColor].splice(indexKAS.down, 1);
        }
        if (kingUnavailableaSquares[oppositeColor][i] === downToLeft) {
            kingAvailableSquares[oppositeColor].splice(indexKAS.downToLeft, 1);
        }
        if (kingUnavailableaSquares[oppositeColor][i] === left) {
            kingAvailableSquares[oppositeColor].splice(indexKAS.left, 1);
        }
    }
    console.log(kingAvailableSquares[oppositeColor].length);
    if (kingAvailableSquares[oppositeColor].length === 0) document.body.style.backgroundColor = "blue";
}

function kingUnableToMove(color) {
    let squareIndex = pieceSquarePositionArray[color].king[0];
    let upToLeft = squareIndex - 9;
    let up = squareIndex - 8;
    let upToRight = squareIndex - 7
    let right = squareIndex + 1;
    let downToRight = squareIndex + 9;
    let down = squareIndex + 8;
    let downToLeft = squareIndex + 7;
    let left = squareIndex - 1;
}

function iterateThroughKAS(color, square) {
    for (let i = 0; i < kingAvailableSquares[color].length; i++) {
        if (square === kingAvailableSquares[color][i]) return true;
    }
}