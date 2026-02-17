import * as Main from "./main.js"
import { selectPieceState, kingUnavailableaSquares, pinnedPiecesObject } from "./gameState.js"

//————————————————————————————————————————————————————————————————————————————————————
/* function stopAttackingSquare(i) {
	if (Main.stateGrid[i] !== 0) return true;
} */

// KUS = kingUnavailableSquares
let allowPushToKUS = true;
let attackNextDirection = null;

let possiblyPinnedPiece = {
	pieceCounter: 0,
	value: null,
	square: null,
}
function pushToKUS(square, oppositeColor) {
	if (allowPushToKUS === true) {
		kingUnavailableaSquares[oppositeColor].push(square);
	} else return;
}
function resetPossiblyPinnedPiece() {
	possiblyPinnedPiece.pieceCounter = 0;
	possiblyPinnedPiece.value = null;
	possiblyPinnedPiece.square = null;
}

function attackSquare(i, oppositeColor) {
	if (attackNextDirection === true) {
		attackNextDirection = false;
		pushToKUS(i, oppositeColor);
		resetPossiblyPinnedPiece();
		return true;
	}
	if (Main.stateGrid[i] === 0 && attackNextDirection === false && possiblyPinnedPiece.pieceCounter === 0) {
		pushToKUS(i, oppositeColor);
		return true;
	}
	let value = Main.stateGrid[i];
	let otherColor = null;
	if (value < 0) otherColor = 'black';
	else if (0 < value) otherColor = 'white';

	if (otherColor === selectPieceState.pieceColor && possiblyPinnedPiece.pieceCounter === 0) {
		pushToKUS(i, oppositeColor);
		return false;
	}
	let enemyKing = null;
	if (selectPieceState.pieceColor === 'white') {
		enemyKing = -6;
	} else if (selectPieceState.pieceColor === 'black') {
		enemyKing = 6;
	}

	if (possiblyPinnedPiece.pieceCounter === 0 && attackNextDirection === false) {
		if (value !== enemyKing) {
			possiblyPinnedPiece.pieceCounter++;
			possiblyPinnedPiece.value = value;
			possiblyPinnedPiece.square = i;
			pushToKUS(i, oppositeColor);
			allowPushToKUS = false;
			return true;
		}
	} else if (1 === possiblyPinnedPiece.pieceCounter && attackNextDirection === false) {
		if (value === 0) {
			return true;
		} else if (value !== 0 && value !== enemyKing) { //if attack meets another piece that is not the enemyKing
			resetPossiblyPinnedPiece();
			allowPushToKUS = true;
			return false;
		} else if (value === enemyKing) {// save this piece as a pinned piece
			pinnedPiecesObject[oppositeColor].value = possiblyPinnedPiece.value;
			pinnedPiecesObject[oppositeColor].square = possiblyPinnedPiece.square;
		}
	}
}

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
		if ((attackingLeft % 8) < (squareIndex % 8)) {
			kingUnavailableaSquares[oppositeColor].push(attackingLeft);
		}
		if ((squareIndex % 8) < (attackingRight % 8)) {
			kingUnavailableaSquares[oppositeColor].push(attackingRight);
		}
    },
    bishop: function(squareIndex, oppositeColor) {
		attackNextDirection = true;
		for (let i = squareIndex - 9; (i % 8) < (squareIndex % 8) && 0 <= i; i-=9) {
			attackNextDirection = false;
			kingUnavailableaSquares[oppositeColor].push(i);
			if (stopAttackingSquare(i) === true) break;
		}
		attackNextDirection = true;
		for (let i = squareIndex - 7; (squareIndex % 8) < (i % 8) && 0 <= i; i-=7) {
			attackNextDirection = false;
			kingUnavailableaSquares[oppositeColor].push(i);
			if (stopAttackingSquare(i) === true) break;
		}
		attackNextDirection = true;
		for (let i = squareIndex + 7; (i % 8) < (squareIndex % 8) && i < 64; i+=7) {
			attackNextDirection = false;
			kingUnavailableaSquares[oppositeColor].push(i);
			if (stopAttackingSquare(i) === true) break;
		}
		attackNextDirection = true;
		for (let i = squareIndex + 9; (squareIndex % 8) < (i % 8) && i < 64; i+=9) {
			attackNextDirection = false;
			kingUnavailableaSquares[oppositeColor].push(i);
			if (stopAttackingSquare(i) === true) break;
		}
    },
    rook: function(squareIndex, oppositeColor) {
		attackNextDirection = true;
        for (let i = squareIndex + 8; i < 64; i+=8) {
			attackNextDirection = false;
            kingUnavailableaSquares[oppositeColor].push(i);
			if (stopAttackingSquare(i) === true) break;
        }
		attackNextDirection = true;
        for (let i = squareIndex - 8; 0 <= i; i-=8) {
			attackNextDirection = false;
            kingUnavailableaSquares[oppositeColor].push(i);
			if (stopAttackingSquare(i) === true) break;
        }
		attackNextDirection = true;
        for (let i = squareIndex + 1; (squareIndex % 8) < (i % 8) && i < 64; i++) {
			attackNextDirection = false;
            kingUnavailableaSquares[oppositeColor].push(i);
			if (stopAttackingSquare(i) === true) break;
        }
		attackNextDirection = true;
        for (let i = squareIndex - 1; (i % 8) < (squareIndex % 8) && 0 <= i; i--) {
			attackNextDirection = false;
            kingUnavailableaSquares[oppositeColor].push(i);
			if (stopAttackingSquare(i) === true) break;
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
		this.bishop(squareIndex, oppositeColor);
		this.rook(squareIndex, oppositeColor);
	},
	king: function(squareIndex, oppositeColor) {
		let upToLeft = squareIndex - 9;
		let up = squareIndex - 8;
		let upToRight = squareIndex - 7
		let right = squareIndex + 1;
		let downToRight = squareIndex + 9;
		let down = squareIndex + 8;
		let downToLeft = squareIndex + 7;
		let left = squareIndex - 1;

		if ((upToLeft % 8) < (squareIndex % 8) && 0 <= upToLeft) {
			kingUnavailableaSquares[oppositeColor].push(upToLeft);
		}
		if (0 <= (up % 8)) {
			kingUnavailableaSquares[oppositeColor].push(up);
		}
		if ((squareIndex % 8) < (upToRight % 8) && 0 <= upToRight) {
			kingUnavailableaSquares[oppositeColor].push(upToRight);
		}
		if ((squareIndex % 8) < (right % 8) && right < 64) {
			kingUnavailableaSquares[oppositeColor].push(right);
		}
		if ((squareIndex % 8) < (downToRight % 8) && downToRight < 64) {
			kingUnavailableaSquares[oppositeColor].push(downToRight);
		}
		if (down < 64) {
			kingUnavailableaSquares[oppositeColor].push(down);
		}
		if ((downToLeft % 8) < (squareIndex % 8) && downToLeft < 64) {
			kingUnavailableaSquares[oppositeColor].push(downToLeft);
		}
		if ((left % 8) < (squareIndex % 8) && 0 <= left) {
			kingUnavailableaSquares[oppositeColor].push(left);
		}
	}
}