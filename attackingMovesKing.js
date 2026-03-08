import * as Main from "./main.js"
import { kingUnavailableaSquares, pinnedPiecesObject, pieceAttackingKing, kingState } from "./gameState.js"
import { giveCheckSound } from "./sounds.js";

//————————————————————————————————————————————————————————————————————————————————————

let attackNextDirection = null;
let countBehindKing = 0;
let possiblyPinnedPiece = {
	pieceCounter: 0,
	square: null
}
function attackSquare(square, oppositeColor, incrementation, color) {
	let value = Main.stateGrid[square];
	if (attackNextDirection) {
		resetPossiblyPinnedPiece();
		pushToKUS(square, oppositeColor, color);
		attackNextDirection = false;
		if (value === 0) {
			return true;
		}
	}
	if (0 < countBehindKing) {
		resetPossiblyPinnedPiece();
		pushToKUS(square, oppositeColor, color);
		return false;
	}
	if (value === 0 && possiblyPinnedPiece.pieceCounter === 0) {
		pushToKUS(square, oppositeColor, color);
		return true;
	}
	let otherColor = otherColorValue(value);
	if (otherColor === color && possiblyPinnedPiece.pieceCounter === 0) {
		pushToKUS(square, oppositeColor, color);
		return false;
	}
	let enemyKing = enemyKingValue(color);
	return checkPinnedRay(square, oppositeColor, enemyKing, value, incrementation, color);
}
function checkPinnedRay(square, oppositeColor, enemyKing, value, incrementation, color) {
	if (possiblyPinnedPiece.pieceCounter === 0) {
		if (value === enemyKing) {
			pushToKUS(square, oppositeColor, color);
			kingState[oppositeColor].checked = true;
			countBehindKing++;
			return true;
		} else if (value !== enemyKing) {
			possiblyPinnedPiece.pieceCounter++;
			possiblyPinnedPiece.square = square;
			pushToKUS(square, oppositeColor, color);
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
function pushToKUS(square, oppositeColor, color) {
	kingUnavailableaSquares[oppositeColor].push(square);
	if (Main.stateGrid[square] === enemyKingValue(color)) giveCheckSound();
}
function resetPossiblyPinnedPiece() {
	possiblyPinnedPiece.pieceCounter = 0;
	possiblyPinnedPiece.square = null;
	countBehindKing = 0;
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
        if  (color === 'white') {
			leftIncrementation = -9;
			rightIncrementation = -7;
            attackingLeft = squareIndex - 9;
            attackingRight = squareIndex - 7;
            oppositeColor = 'black'; 
        } else if (color === 'black') {
			leftIncrementation = 7;
			rightIncrementation = 9;
            attackingLeft = squareIndex + 7;
            attackingRight = squareIndex + 9;
        }
		if ((attackingLeft % 8) < (squareIndex % 8)) {
			savePieceAttackingKing(squareIndex, leftIncrementation, 1, color, 'pawn', attackingLeft);
			pushToKUS(attackingLeft, oppositeColor, color);
		}
		if ((squareIndex % 8) < (attackingRight % 8)) {
			savePieceAttackingKing(squareIndex, rightIncrementation, 1, color, 'pawn', attackingRight);
			pushToKUS(attackingRight, oppositeColor, color);
		}
    },
    bishop: function(squareIndex, oppositeColor, color) {
		resetPossiblyPinnedPiece();
		attackNextDirection = true;
		let iterations = 1;
		for (let i = squareIndex - 9; (i % 8) < (squareIndex % 8) && 0 <= i; i-=9, iterations++) {
			savePieceAttackingKing(squareIndex, -9, iterations, color, 'bishop', i);
			if (!attackSquare(i, oppositeColor, 9, color)) break;
		}

		attackNextDirection = true;
		iterations = 1;
		for (let i = squareIndex - 7; (squareIndex % 8) < (i % 8) && 0 <= i; i-=7, iterations++) {
			savePieceAttackingKing(squareIndex, -7, iterations, color, 'bishop', i);
			if (!attackSquare(i, oppositeColor, 7, color)) break;
		}

		attackNextDirection = true;
		iterations = 1;
		for (let i = squareIndex + 7; (i % 8) < (squareIndex % 8) && i < 64; i+=7, iterations++) {
			savePieceAttackingKing(squareIndex, 7, iterations, color, 'bishop', i);
			if (!attackSquare(i, oppositeColor, 7, color)) break;
		}

		attackNextDirection = true;
		iterations = 1;
		for (let i = squareIndex + 9; (squareIndex % 8) < (i % 8) && i < 64; i+=9, iterations++) {
			savePieceAttackingKing(squareIndex, 9, iterations, color, 'bishop', i);
			if (!attackSquare(i, oppositeColor, 9, color)) break;
		}
    },
    rook: function(squareIndex, oppositeColor, color) {
		resetPossiblyPinnedPiece();
		attackNextDirection = true;
		let iterations = 1;
        for (let i = squareIndex + 8; i < 64; i+=8, iterations++) {
			savePieceAttackingKing(squareIndex, 8, iterations, color, 'rook', i);
			if (!attackSquare(i, oppositeColor, 8, color)) break;
        }

		attackNextDirection = true;
		iterations = 1;
        for (let i = squareIndex - 8; 0 <= i; i-=8, iterations++) {
			savePieceAttackingKing(squareIndex, -8, iterations, color, 'rook', i);
			if (!attackSquare(i, oppositeColor, 8, color)) break;
        }

		attackNextDirection = true;
		iterations = 1;
        for (let i = squareIndex + 1; (squareIndex % 8) < (i % 8) && i < 64; i++, iterations++) {
			savePieceAttackingKing(squareIndex, 1, iterations, color, 'rook', i);
			if (!attackSquare(i, oppositeColor, 1, color)) break;
        }

		attackNextDirection = true;
		iterations = 1;
        for (let i = squareIndex - 1; (i % 8) < (squareIndex % 8) && 0 <= i; i--, iterations++) {
			savePieceAttackingKing(squareIndex, -1, iterations, color, 'rook', i);
			if (!attackSquare(i, oppositeColor, 1, color)) break;
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
			pushToKUS(LD, oppositeColor, color);
		}
		if ((LDD % 8) < (squareIndex % 8) && LDD < 64) {
			savePieceAttackingKing(squareIndex, 15, 1, color, 'knight', LDD);
			pushToKUS(LDD, oppositeColor, color);
		}
		if ((LU % 8) < (squareIndex % 8) && 0 <= LU) {
			savePieceAttackingKing(squareIndex, -10, 1, color, 'knight', LU);
			pushToKUS(LU, oppositeColor, color);
		}
		if ((LUU % 8) < (squareIndex % 8) && 0 <= LUU) {
			savePieceAttackingKing(squareIndex, -17, 1, color, 'knight', LUU);
			pushToKUS(LUU, oppositeColor, color);
		}
		if ((squareIndex % 8) < (RU % 8) && 0 <= RU) {
			savePieceAttackingKing(squareIndex, -6, 1, color, 'knight', RU);
			pushToKUS(RU, oppositeColor, color);
		}
		if ((squareIndex % 8) < (RUU % 8) && 0 <= RUU) {
			savePieceAttackingKing(squareIndex, -15, 1, color, 'knight', RUU);
			pushToKUS(RUU, oppositeColor, color);
		} 
		if ((squareIndex % 8) < (RD % 8) && RD < 64) {
			savePieceAttackingKing(squareIndex, 10, 1, color, 'knight', RD);
			pushToKUS(RD, oppositeColor, color);
		}
		if ((squareIndex % 8) < (RDD % 8) && RDD < 64) {
			savePieceAttackingKing(squareIndex, 17, 1, color, 'knight', RDD);
			pushToKUS(RDD, oppositeColor, color);
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
