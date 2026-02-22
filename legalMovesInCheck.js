import { kingAvailableSquares, kingUnavailableaSquares, pieceSquarePositionArray } from "./gameState.js"
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

// KAS - king available moves
export function updateKAS(color) {
    for (let i = 0; i < 64; i++) kingAvailableSquares.push(i);
    for (let i = 0; i < kingUnavailableaSquares[color].length; i++) {
        if (kingUnavailableaSquares[color][i] === kingAvailableSquares[color][i]) {
            kingAvailableSquares[color].splice(i, 1);
        }
    }
    kingUnableToMove(color);
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

function iterateThroughKAS (color, square) {
    for (let i = 0; i < kingAvailableSquares[color].length; i++) {
        if (square === kingAvailableSquares[color][i]) return true;
    }
}