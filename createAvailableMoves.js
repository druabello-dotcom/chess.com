import * as Main from "./main.js";
import { selectPieceState, piecesHasNotMoved, noPieceBetweenKingRook, kingUnavailableaSquares, legalDirection } from "./gameState.js";
import { moveToDestination  } from "./movePieceToDestination.js";

//————————————————————————————————————————————————————————————————————————————————————

export function checkIfPieceOnSquare(square, color) {
	let otherPieceColor = 0;
	let otherPieceValue = Main.stateGrid[square];
	if (otherPieceValue < 0) otherPieceColor = 'black';
	else if (0 < otherPieceValue) otherPieceColor = 'white';
	if (color === otherPieceColor) return true;
	else return false;
}
const highlightDestinationSquares = "inset 0 0 0 0.25em #80EF80";
const highlightCaptureDestinationSquares = "inset 0px 0px 0px 0.25em #fc2c03";
export function allowMove(desiredSquare) {
	Main.grid[desiredSquare].addEventListener('click', moveToDestination);

	if (Main.stateGrid[desiredSquare] === 0) {
		Main.grid[desiredSquare].style.boxShadow = highlightDestinationSquares;
	} else {
		Main.grid[desiredSquare].style.boxShadow = highlightCaptureDestinationSquares;
	}
}

//————————————————————————————————————————————————————————————————————————————————————

export const availablePieceMovesObject = {
	pawn: function(squareIndex, color) {
		if (legalDirection[color].north_south !== true) return;
		let oneStep = null;
		let doubleStep = null;
		let attackingLeft = null;
		let attackingRight = null;
		if (color === 'black') {
			oneStep = squareIndex + 8;
			doubleStep = squareIndex + 16;
			attackingLeft = squareIndex + 7;
			attackingRight = squareIndex + 9
			if (0 < Main.stateGrid[attackingLeft] && ((attackingLeft % 8) < (squareIndex % 8)) && attackingLeft < 64) {
				allowMove(attackingLeft);
			}
			if (0 < Main.stateGrid[attackingRight] && ((squareIndex % 8) < (attackingRight % 8)) && attackingRight < 64) {
				allowMove(attackingRight);
			}
		} else if (color === 'white') {
			oneStep = squareIndex - 8;
			doubleStep = squareIndex - 16;
			attackingLeft = squareIndex - 9;
			attackingRight = squareIndex - 7;
			if (Main.stateGrid[attackingLeft] < 0 && ((attackingLeft % 8) < (squareIndex % 8)) && 0 <= attackingLeft) {
				allowMove(attackingLeft);
			}
			if (Main.stateGrid[attackingRight] < 0 && ((squareIndex % 8) < (attackingRight % 8)) && 0 <= attackingRight) {
				allowMove(attackingRight);
			}
		}

		if (Main.stateGrid[oneStep] === 0 && 0 <= oneStep && oneStep < 64) allowMove(oneStep);
		if (piecesHasNotMoved[color].pawn[selectPieceState.selectedPieceIndex] && Main.stateGrid[doubleStep] === 0 && 0 <= doubleStep && doubleStep < 64) {
			allowMove(doubleStep);
		}
	},
	bishop: function(squareIndex, color) {
		if (legalDirection[color].NW_SE) {
			for (let i = (squareIndex - 9); (i % 8) < (squareIndex % 8) && 0 <= i; i-=9) {
				if (checkIfPieceOnSquare(i, selectPieceState.pieceColor)) break;
				allowMove(i);
				if (Main.stateGrid[i] !== 0) break;
			}
			for (let i = (squareIndex + 9); (squareIndex % 8) < (i % 8) && i < 64; i+=9) {
				if (checkIfPieceOnSquare(i, selectPieceState.pieceColor)) break;
				allowMove(i);
				if (Main.stateGrid[i] !== 0) break;
			}
		}
		if (legalDirection[color].NE_SW) {
			for (let i = (squareIndex - 7); (squareIndex % 8) < (i % 8) && 0 < i; i-=7) {
				if (checkIfPieceOnSquare(i, selectPieceState.pieceColor)) break;
				allowMove(i);
				if (Main.stateGrid[i] !== 0) break;
			}
			for (let i = (squareIndex + 7); (i % 8) < (squareIndex % 8) && i < 64; i+=7) {
				if (checkIfPieceOnSquare(i, selectPieceState.pieceColor)) break;
				allowMove(i);
				if (Main.stateGrid[i] !== 0) break;
			}
		}
	},
	rook: function(squareIndex, color) {
		if (legalDirection[color].east_west) {
			for (let i = (squareIndex - 1); (squareIndex) % 8 > (i % 8) && 0 <= i; i--) {
				if (checkIfPieceOnSquare(i, selectPieceState.pieceColor)) break;
				allowMove(i);
				if (Main.stateGrid[i] !== 0) break;
			}
			for (let i = (squareIndex + 1); (squareIndex % 8) < (i % 8) && i < 64; i++) {
				if (checkIfPieceOnSquare(i, selectPieceState.pieceColor)) break;
				allowMove(i);
				if (Main.stateGrid[i] !== 0) break;
			}
		}
		if (legalDirection[color].north_south) {
			for (let i = (squareIndex - 8); 0 <= i; i-=8) {
				if (checkIfPieceOnSquare(i, selectPieceState.pieceColor)) break;
				allowMove(i);
				if (Main.stateGrid[i] !== 0) break;
			}
			for (let i = (squareIndex + 8); i < 64; i+=8) {
				if (checkIfPieceOnSquare(i, selectPieceState.pieceColor)) break;
				allowMove(i);
				if (Main.stateGrid[i] !== 0) break;
			}
		}
	},
	knight: function(squareIndex, color){
		if (selectPieceState.pieceIsPinned) return;
		let LU = squareIndex - 10 
		let LUU = squareIndex - 17;
		let LD = squareIndex + 6;
		let LDD = squareIndex + 15;

		let RU = squareIndex - 6;
		let RUU = squareIndex - 15;
		let RD = squareIndex + 10;
		let RDD = squareIndex + 17;

		if ((LD % 8) < (squareIndex % 8) && LD < 64 && !checkIfPieceOnSquare(LD, color)) {
			allowMove(LD);
		}
		if ((LDD % 8) < (squareIndex % 8) && LDD < 64 && !checkIfPieceOnSquare(LDD, color)) {
			allowMove(LDD);
		}
		if ((LU % 8) < (squareIndex % 8) && 0 <= LU && !checkIfPieceOnSquare(LU, color)) {
			allowMove(LU);
		}
		if ((LUU % 8) < (squareIndex % 8) && 0 <= LUU && !checkIfPieceOnSquare(LUU, color)) {
			allowMove(LUU);
		}
		if ((squareIndex % 8) < (RU % 8) && 0 <= RU && !checkIfPieceOnSquare(RU, color)) {
			allowMove(RU);
		}
		if ((squareIndex % 8) < (RUU % 8) && 0 <= RUU && !checkIfPieceOnSquare(RUU, color)) {
			allowMove(RUU);
		} 
		if ((squareIndex % 8) < (RD % 8) && RD < 64 && !checkIfPieceOnSquare(RD, color)) {
			allowMove(RD);
		}
		if ((squareIndex % 8) < (RDD % 8) && RDD < 64 && !checkIfPieceOnSquare(RDD, color)) {
			allowMove(RDD);
		}
	},
	queen: function(squareIndex, color) {
		this.rook(squareIndex, color);
		this.bishop(squareIndex, color);
	},
	king: function(squareIndex, color) {
		let upToLeft = squareIndex - 9;
		let up = squareIndex - 8;
		let upToRight = squareIndex - 7;
		let right = squareIndex + 1;
		let downToRight = squareIndex + 9;
		let down = squareIndex + 8;
		let downToLeft = squareIndex + 7;
		let left = squareIndex - 1;

		function checkIfSquareIsAvailable(desiredSquare, color) {
			let letKingMovehere = true;
			for (let i = 0; i < kingUnavailableaSquares[selectPieceState.pieceColor].length; i++) {
				if (desiredSquare === kingUnavailableaSquares[selectPieceState.pieceColor][i]) {
					letKingMovehere = false;
					break;
				} 
			}
			if (!checkIfPieceOnSquare(desiredSquare, color) && letKingMovehere) {
				allowMove(desiredSquare);
			}
		}
		if ((upToLeft % 8) < (squareIndex % 8) && 0 <= upToLeft) {
			checkIfSquareIsAvailable(upToLeft, color);
		}
		if (0 <= up) {
			checkIfSquareIsAvailable(up, color);
		}
		if ((squareIndex % 8) < (upToRight % 8) &&  0 <= upToRight) {
			checkIfSquareIsAvailable(upToRight, color);
		}
		if ((squareIndex % 8) < (right % 8) && right < 64) {
			checkIfSquareIsAvailable(right, color);
		}
		if ((squareIndex % 8) < (downToRight % 8) && downToRight < 64) {
			checkIfSquareIsAvailable(downToRight, color);
		}
		if (down < 64) {
			checkIfSquareIsAvailable(down, color);
		}
		if ((downToLeft % 8) < (squareIndex % 8) && downToLeft < 64) {
			checkIfSquareIsAvailable(downToLeft, color);
		}
		if ((left % 8) < (squareIndex % 8) && 0 <= left) {
			checkIfSquareIsAvailable(left, color);
		}
		reviewIfKingMayCastleLeft(squareIndex, selectPieceState.pieceColor);
		reviewIfKingMayCastleRight(squareIndex, selectPieceState.pieceColor);
	}
}

function reviewIfKingMayCastleLeft(squareIndex, color) {
	if (!piecesHasNotMoved[color].king || !piecesHasNotMoved[color].rook[0]) return;
	for (let i = 0; i < kingUnavailableaSquares[color].length; i++) {
		if (squareIndex === kingUnavailableaSquares[color][i]) return;
		if (squareIndex - 3 === kingUnavailableaSquares[color][i]) return;
		if (squareIndex - 2 === kingUnavailableaSquares[color][i]) return;
		if (squareIndex - 1 === kingUnavailableaSquares[color][i]) return;
	} 
	for (let i = 0, j = squareIndex - 3; i < noPieceBetweenKingRook.left.length; i++, j++) {
		if (Main.stateGrid[j] !== 0) noPieceBetweenKingRook.left[i] = false;
		else noPieceBetweenKingRook.left[i] = true;
	}
	for (let i = 1; i < noPieceBetweenKingRook.left.length; i++) {
		if (noPieceBetweenKingRook.left[0] && noPieceBetweenKingRook.left[i]) selectPieceState.letKingCastleLeft = true;
		else break;
	}
	if (selectPieceState.letKingCastleLeft) {
		Main.grid[squareIndex - 2].addEventListener('click', moveToDestination);
		Main.grid[squareIndex - 2].style.boxShadow = highlightDestinationSquares;
	}
}
function reviewIfKingMayCastleRight(squareIndex, color) {
	if (!piecesHasNotMoved[color].king || !piecesHasNotMoved[color].rook[1]) return;
	for (let i = 0; i < kingUnavailableaSquares[color].length; i++) {
		if (squareIndex === kingUnavailableaSquares[color][i]) return;
		if (squareIndex + 2 === kingUnavailableaSquares[color][i]) return;
		if (squareIndex + 1 === kingUnavailableaSquares[color][i]) return;
	}
	for (let i = 0, j = squareIndex + 1; i < 2; i++, j++) {
		if (Main.stateGrid[j] !== 0) noPieceBetweenKingRook.right[i] = false;
		else noPieceBetweenKingRook.right[i] = true;
	}
	for (let i = 1; i < noPieceBetweenKingRook.right.length; i++) {
		if (noPieceBetweenKingRook.right[0] && noPieceBetweenKingRook.right[i]) selectPieceState.letKingCastleRight = true;
		else break;
	}
	if (selectPieceState.letKingCastleRight) {
		Main.grid[squareIndex + 2].addEventListener('click', moveToDestination);
		Main.grid[squareIndex + 2].style.boxShadow = highlightDestinationSquares;
	}
}