import * as Main from "./main.js"
import { selectPieceState, kingUnavailableaSquares, pinnedPiecesObject, pieceAttackingKing } from "./gameState.js"

//————————————————————————————————————————————————————————————————————————————————————

let attackNextDirection = null;
let possiblyPinnedPiece = {
	pieceCounter: 0,
	square: null
}
function attackSquare(square, oppositeColor, incrementation) {
	let value = Main.stateGrid[square];
	if (attackNextDirection === true) {
		resetPossiblyPinnedPiece();
		pushToKUS(square, oppositeColor);
		attackNextDirection = false;
		if (value === 0) {
			return true;
		}
	}
	if (value === 0 && possiblyPinnedPiece.pieceCounter === 0) {
		pushToKUS(square, oppositeColor);
		return true;
	}
	let otherColor = otherColorValue(value);
	if (otherColor === selectPieceState.pieceColor && possiblyPinnedPiece.pieceCounter === 0) {
		pushToKUS(square, oppositeColor);
		return false;
	}
	let enemyKing = enemyKingValue(selectPieceState.pieceColor);
	return checkPinnedRay(square, oppositeColor, enemyKing, value, incrementation);
}
function checkPinnedRay(square, oppositeColor, enemyKing, value, incrementation) {
	if (possiblyPinnedPiece.pieceCounter === 0) {
		if (value === enemyKing) {
			pushToKUS(square, oppositeColor);
			return false;
		} else if (value !== enemyKing) {
			possiblyPinnedPiece.pieceCounter++;
			possiblyPinnedPiece.square = square;
			pushToKUS(square, oppositeColor);
			return true;
		}
	} else if (possiblyPinnedPiece.pieceCounter === 1) {
		if (value === 0) {
			return true;
		} else if (value !== 0 && value !== enemyKing) {
			resetPossiblyPinnedPiece();
			return false;
		} else if (value === enemyKing) {// save this piece as a pinned piece
			pinnedPiecesObject[oppositeColor].square.push(possiblyPinnedPiece.square);
			pinnedPiecesObject[oppositeColor].incrementation.push(incrementation);
			resetPossiblyPinnedPiece();
			return false;
		}
	}
}
function pushToKUS(square, oppositeColor) {
	kingUnavailableaSquares[oppositeColor].push(square);
}
function resetPossiblyPinnedPiece() {
	possiblyPinnedPiece.pieceCounter = 0;
	possiblyPinnedPiece.value = null;
	possiblyPinnedPiece.square = null;
}
function otherColorValue(value) {
	if (value < 0) return 'black';
	else if (0 < value) return 'white';
}
function enemyKingValue(pieceColor) {
	if (pieceColor === 'white') {
		return -6;
	} else if (pieceColor === 'black') {
		return 6;
	}
}

//————————————————————————————————————————————————————————————————————————————————————

function savePieceAttackingKing(square, incrementation, iterations, color, pieceType, checkSquare) {
	if ((Main.stateGrid[checkSquare] === 6 && color === 'black') || (Main.stateGrid[checkSquare] === -6 && color === 'white')) {
		pieceAttackingKing.square.push(square);
		pieceAttackingKing.direction.push(incrementation);
		pieceAttackingKing.iterations.push(iterations);
		pieceAttackingKing.pieceType.push(pieceType);
	}
}

//————————————————————————————————————————————————————————————————————————————————————

export const attackingMovesObject = {
    pawn: function(squareIndex, oppositeColor, color) {
		let leftIncrementation = null
		let rightIncrementation = null;
        let attackingLeft = null;
        let attackingRight = null;
        if  (selectPieceState.pieceColor === 'white') {
			leftIncrementation = -9;
			rightIncrementation = -7;
            attackingLeft = squareIndex - 9;
            attackingRight = squareIndex - 7;
            oppositeColor = 'black'; 
        } else if (selectPieceState.pieceColor === 'black') {
			leftIncrementation = 7;
			rightIncrementation = 9;
            attackingLeft = squareIndex + 7;
            attackingRight = squareIndex + 9;
        }
		if ((attackingLeft % 8) < (squareIndex % 8)) {
			savePieceAttackingKing(squareIndex, leftIncrementation, 1, color, 'pawn', attackingLeft);
			kingUnavailableaSquares[oppositeColor].push(attackingLeft);
		}
		if ((squareIndex % 8) < (attackingRight % 8)) {
			savePieceAttackingKing(squareIndex, rightIncrementation, 1, color, 'pawn', attackingRight);
			kingUnavailableaSquares[oppositeColor].push(attackingRight);
		}
    },
    bishop: function(squareIndex, oppositeColor, color) {
		attackNextDirection = true;
		let iterations = 1;
		for (let i = squareIndex - 9; (i % 8) < (squareIndex % 8) && 0 <= i; i-=9, iterations++) {
			savePieceAttackingKing(squareIndex, -9, iterations, color, 'bishop', i);
			if (attackSquare(i, oppositeColor, 9) === false) break;
		}

		attackNextDirection = true;
		iterations = 1;
		for (let i = squareIndex - 7; (squareIndex % 8) < (i % 8) && 0 <= i; i-=7, iterations++) {
			savePieceAttackingKing(squareIndex, -7, iterations, color, 'bishop', i);
			if (attackSquare(i, oppositeColor, 7) === false) break;
		}

		attackNextDirection = true;
		iterations = 1;
		for (let i = squareIndex + 7; (i % 8) < (squareIndex % 8) && i < 64; i+=7, iterations++) {
			savePieceAttackingKing(squareIndex, 7, iterations, color, 'bishop', i);
			if (attackSquare(i, oppositeColor, 7) === false) break;
		}

		attackNextDirection = true;
		iterations = 1;
		for (let i = squareIndex + 9; (squareIndex % 8) < (i % 8) && i < 64; i+=9, iterations++) {
			savePieceAttackingKing(squareIndex, 9, iterations, color, 'bishop', i);
			if (attackSquare(i, oppositeColor, 9) === false) break;
		}
    },
    rook: function(squareIndex, oppositeColor, color) {
		attackNextDirection = true;
		let iterations = 1;
        for (let i = squareIndex + 8; i < 64; i+=8, iterations++) {
			savePieceAttackingKing(squareIndex, 8, iterations, color, 'rook', i);
			if (attackSquare(i, oppositeColor, 8) === false) break;
        }

		attackNextDirection = true;
		iterations = 1;
        for (let i = squareIndex - 8; 0 <= i; i-=8, iterations++) {
			savePieceAttackingKing(squareIndex, -8, iterations, color, 'rook', i);
			if (attackSquare(i, oppositeColor, 8) === false) break;
        }

		attackNextDirection = true;
		iterations = 1;
        for (let i = squareIndex + 1; (squareIndex % 8) < (i % 8) && i < 64; i++, iterations++) {
			savePieceAttackingKing(squareIndex, 1, iterations, color, 'rook', i);
			if (attackSquare(i, oppositeColor, 1) === false) break;
        }

		attackNextDirection = true;
		iterations = 1;
        for (let i = squareIndex - 1; (i % 8) < (squareIndex % 8) && 0 <= i; i--, iterations++) {
			savePieceAttackingKing(squareIndex, -1, iterations, color, 'rook', i);
			if (attackSquare(i, oppositeColor, 1) === false) break;
        }
    },
    knight: function(squareIndex, oppositeColor, color) {
		let LU = squareIndex - 10 
		let LUU = squareIndex - 17;
		let LD = squareIndex + 6;
		let LDD = squareIndex + 15;

		let RU = squareIndex - 6;
		let RUU = squareIndex - 15;
		let RD = squareIndex + 10;
		let RDD = squareIndex + 17;

		if ((LD % 8) < (squareIndex % 8) && LD < 64) {
			savePieceAttackingKing(squareIndex, 6, 1, color, 'knight', LD);
			kingUnavailableaSquares[oppositeColor].push(LD);
		}
		if ((LDD % 8) < (squareIndex % 8) && LDD < 64) {
			savePieceAttackingKing(squareIndex, 15, 1, color, 'knight', LDD);
			kingUnavailableaSquares[oppositeColor].push(LDD);
		}
		if ((LU % 8) < (squareIndex % 8) && 0 <= LU) {
			savePieceAttackingKing(squareIndex, -10, 1, color, 'knight', LU);
			kingUnavailableaSquares[oppositeColor].push(LU);
		}
		if ((LUU % 8) < (squareIndex % 8) && 0 <= LUU) {
			savePieceAttackingKing(squareIndex, -17, 1, color, 'knight', LUU);
			kingUnavailableaSquares[oppositeColor].push(LUU);
		}
		if ((squareIndex % 8) < (RU % 8) && 0 <= RU) {
			savePieceAttackingKing(squareIndex, -6, 1, color, 'knight', RU);
			kingUnavailableaSquares[oppositeColor].push(RU);
		}
		if ((squareIndex % 8) < (RUU % 8) && 0 <= RUU) {
			savePieceAttackingKing(squareIndex, -15, 1, color, 'knight', RUU);
			kingUnavailableaSquares[oppositeColor].push(RUU)
		} 
		if ((squareIndex % 8) < (RD % 8) && RD < 64) {
			savePieceAttackingKing(squareIndex, 10, 1, color, 'knight', RD);
			kingUnavailableaSquares[oppositeColor].push(RD);
		}
		if ((squareIndex % 8) < (RDD % 8) && RDD < 64) {
			savePieceAttackingKing(squareIndex, 17, 1, color, 'knight', RDD);
			kingUnavailableaSquares[oppositeColor].push(RDD);
		}
	},
	queen: function(squareIndex, oppositeColor, color) {
		this.bishop(squareIndex, oppositeColor, color);
		this.rook(squareIndex, oppositeColor, color);
	},
	king: function(squareIndex, oppositeColor, color) {
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
		if (0 <= up) {
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