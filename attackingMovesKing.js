import { selectPieceState } from "./gameState";
import { kingUnavailableaSquares, pieceSquarePositionArray } from "./gameState";

//————————————————————————————————————————————————————————————————————————————————————

export const attackingMovesObject = {
    pawn: function(squareIndex, oppositeColor) {
        let attackingLeft = null;
        let attackingRight = null;
        if  (selectPieceState.pieceColor === 'white') {
            attackingLeft = squareIndex - 9;
            attackingRight = squareIndex - 7;
            oppositeColor = 'black'; 
        } else if (selectPieceState.pieceColor === 'black') {
            attackingLeft = squareIndex + 7;
            attackingRight = squareIndex + 9;
        }
        kingUnavailableaSquares[oppositeColor].push(attackingLeft)
        kingUnavailableaSquares[oppositeColor].push(attackingRight);
    },
    bishop: function(squareIndex, oppositeColor) {
        for (let i = squareIndex - 7; (i % 8) < (squareIndex % 8) && 0 <= i; i-=7) {
            kingUnavailableaSquares[oppositeColor].push(i);
        }
        for (let i = squareIndex - 9; (squareIndex % 8) < (i % 8) && 0 <= i; i-=9) {
            kingUnavailableaSquares[oppositeColor].push(i);
        }
        for (let i = squareIndex + 7; (i % 8) < (squareIndex % 8) && i < 64; i+=7) {
            kingUnavailableaSquares[oppositeColor].push(i);
        }
        for (let i = squareIndex + 9; (squareIndex % 8) < (i % 8) && i < 64; i+=9) {
            kingUnavailableaSquares[oppositeColor].push(i);
        }
    },
    rook: function(squareIndex, oppositeColor) {
        for (let i = squareIndex + 8; i < 64; i+=8) {
            kingUnavailableaSquares[oppositeColor].push(i);
        }
        for (let i = squareIndex - 8; 0 <= i; i-=8) {
            kingUnavailableaSquares[oppositeColor].push(i);
        }
        for (let i = squareIndex + 1; (squareIndex % 8) < (i % 8) && i < 64; i++) {
            kingUnavailableaSquares[oppositeColor].push(i);
        }
        for (let i = squareIndex - 1; (i % 8) < (squareIndex % 8) && 0 <= i; i--) {
            kingUnavailableaSquares[oppositeColor].push(i);
        }
    },
    knight: function(squareIndex, oppositeColor) {
		let LU = squareIndex - 10 
		let LUU = squareIndex - 17;
		let LD = squareIndex + 6;
		let LDD = squareIndex + 15;

		let RU = squareIndex - 6;
		let RUU = squareIndex - 15;
		let RD = squareIndex + 10;
		let RDD = squareIndex + 17;

		if ((LD % 8) < (squareIndex % 8) && LD < 64) {
			kingUnavailableaSquares[oppositeColor].push(LD);
		}
		if ((LDD % 8) < (squareIndex % 8) && LDD < 64) {
			kingUnavailableaSquares[oppositeColor].push(LDD);
		}
		if ((LU % 8) < (squareIndex % 8) && 0 <= LU) {
			kingUnavailableaSquares[oppositeColor].push(LU);
		}
		if ((LUU % 8) < (squareIndex % 8) && 0 <= LUU) {
			kingUnavailableaSquares[oppositeColor].push(LUU);
		}
		if ((squareIndex % 8) < (RU % 8) && 0 <= RU) {
			kingUnavailableaSquares[oppositeColor].push(RU);
		}
		if ((squareIndex % 8) < (RUU % 8) && 0 <= RUU) {
			kingUnavailableaSquares[oppositeColor].push(RUU)
		} 
		if ((squareIndex % 8) < (RD % 8) && RD < 64) {
			kingUnavailableaSquares[oppositeColor].push(RD);
		}
		if ((squareIndex % 8) < (RDD % 8) && RDD < 64) {
			kingUnavailableaSquares[oppositeColor].push(RDD);
		}
	},
	queen: function(squareIndex, oppositeColor) {
		// rook
		for (let i = squareIndex + 8; i < 64; i+=8) {
			kingUnavailableaSquares[oppositeColor].push(i);
		}
		for (let i = squareIndex - 8; 0 <= i; i-=8) {
			kingUnavailableaSquares[oppositeColor].push(i);
		}
		for (let i = squareIndex + 1; (squareIndex % 8) < (i % 8) && i < 64; i++) {
			kingUnavailableaSquares[oppositeColor].push(i);
		}
		for (let i = squareIndex - 1; (i % 8) < (squareIndex % 8) && 0 <= i; i--) {
			kingUnavailableaSquares[oppositeColor].push(i);
		}

		// bishop
		for (let i = squareIndex - 7; (squareIndex % 8) < (i % 8) && 0 <= i; i-=7) { // up to the right 
			kingUnavailableaSquares[oppositeColor].push(i);
		}
		for (let i = squareIndex + 9; (squareIndex % 8) < (i % 8) && i < 64; i+=9) { // down to the right
			kingUnavailableaSquares[oppositeColor].push(i);
		}
		for (let i = squareIndex - 9; (i % 8) < (squareIndex % 8) && 0 <= 64; i-=9) { // up to the left
			kingUnavailableaSquares[oppositeColor].push(i);
		}
		for (let i = squareIndex + 7; (i % 8) < (squareIndex % 8) && i < 64; i+=7) { // down to the left
			kingUnavailableaSquares[oppositeColor].push(i);
		}
	},
}