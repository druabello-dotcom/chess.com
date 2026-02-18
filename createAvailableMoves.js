import * as Main from "./main.js";
import { selectPieceState, piecesHasNotMoved, noPieceBetweenKingRook, kingUnavailableaSquares } from "./gameState.js";
import { moveToDestination  } from "./movePieceToDestination.js";

//————————————————————————————————————————————————————————————————————————————————————

function checkIfPieceOnSquare(square) {
	let otherPieceColor = 0;
	let otherPieceValue = Main.stateGrid[square];
	if (otherPieceValue < 0) otherPieceColor = 'black';
	else if (0 < otherPieceValue) otherPieceColor = 'white';
	console.log(otherPieceValue);
	console.log(otherPieceColor);
	console.log("du kan ikke bevege deg her")
	if (selectPieceState.pieceColor === otherPieceColor) return false;
	else return true;
}
const highlightDestinationSquares = "inset 0 0 0 0.25em #80EF80";
function allowMove(desiredSquare) {
	Main.grid[desiredSquare].addEventListener('click', moveToDestination);
	Main.grid[desiredSquare].style.boxShadow = highlightDestinationSquares;
}

//————————————————————————————————————————————————————————————————————————————————————

export const availablePieceMovesObject = {
	pawn: function(squareIndex) {
		if (selectPieceState.pieceIsPinned === false) return;
		if (selectPieceState.pieceColor === 'black' && (squareIndex + 8) < 64) {
			allowMove(squareIndex + 8);
			if (piecesHasNotMoved.black.pawn[selectPieceState.selectedPieceIndex] === true) {
				allowMove(squareIndex + 16);
			}
		} else if(selectPieceState.pieceColor === 'white' && 0 <= (squareIndex - 8)) {
			allowMove(squareIndex - 8);
			if (piecesHasNotMoved.white.pawn[selectPieceState.selectedPieceIndex] === true) {
				allowMove(squareIndex - 16);
			}	
		}
	},
	bishop: function(squareIndex) {
		for (let i = (squareIndex + 9); (squareIndex % 8) < (i % 8) && i < 64; i+=9) {
			if (checkIfPieceOnSquare(i) === false) break;
			allowMove(i);
		}
		for (let i = (squareIndex + 7); (i % 8) < (squareIndex % 8) && i < 64; i+=7) {
			if (checkIfPieceOnSquare(i) === false) break;
			allowMove(i);
		}
		for (let i = (squareIndex - 9); (i % 8) < (squareIndex % 8) && 0 <= i; i-=9) {
			if (checkIfPieceOnSquare(i) === false) break;
			allowMove(i);
		}
		for (let i = (squareIndex - 7); (squareIndex % 8) < (i % 8) && 0 < i; i-=7) {
			if (checkIfPieceOnSquare(i) === false) break;
			allowMove(i);
		}
	},
	rook: function(squareIndex) {
		for (let i = (squareIndex + 1); (squareIndex % 8) < (i % 8) && i < 64; i++) {
			if (checkIfPieceOnSquare(i) === false) break;
			allowMove(i);
		}
		for (let i = (squareIndex - 1); (squareIndex) % 8 > (i % 8) && 0 <= i; i--) {
			if (checkIfPieceOnSquare(i) === false) break;
			allowMove(i);
		}
		for (let i = (squareIndex + 8); i < 64; i+=8) {
			if (checkIfPieceOnSquare(i) === false) break;
			allowMove(i);
		}
		for (let i = (squareIndex - 8); 0 <= i ; i-=8) {
			if (checkIfPieceOnSquare(i) === false) break;
			allowMove(i);
		}
	},
	knight: function(squareIndex){
		if (selectPieceState.pieceIsPinned === false) return;
		let LU = squareIndex - 10 
		let LUU = squareIndex - 17;
		let LD = squareIndex + 6;
		let LDD = squareIndex + 15;

		let RU = squareIndex - 6;
		let RUU = squareIndex - 15;
		let RD = squareIndex + 10;
		let RDD = squareIndex + 17;

		if ((LD % 8) < (squareIndex % 8) && LD < 64) {
			allowMove(LD);
		}
		if ((LDD % 8) < (squareIndex % 8) && LDD < 64) {
			allowMove(LDD);
		}
		if ((LU % 8) < (squareIndex % 8) && 0 <= LU) {
			allowMove(LU);
		}
		if ((LUU % 8) < (squareIndex % 8) && 0 <= LUU) {
			allowMove(LUU);
		}
		if ((squareIndex % 8) < (RU % 8) && 0 <= RU) {
			allowMove(RU);
		}
		if ((squareIndex % 8) < (RUU % 8) && 0 <= RUU) {
			allowMove(RUU);
		} 
		if ((squareIndex % 8) < (RD % 8) && RD < 64) {
			allowMove(RD);
		}
		if ((squareIndex % 8) < (RDD % 8) && RDD < 64) {
			allowMove(RDD);
		}
	},
	queen: function(squareIndex) {
		this.rook(squareIndex);
		this.bishop(squareIndex);
	},
	king: function(squareIndex) {
		let upToLeft = squareIndex - 9;
		let up = squareIndex - 8;
		let upToRight = squareIndex - 7;
		let right = squareIndex + 1;
		let downToRight = squareIndex + 9;
		let down = squareIndex + 8;
		let downToLeft = squareIndex + 7;
		let left = squareIndex - 1;

		function checkIfSquareIsAvailable(desiredSquare) {
			let letKingMovehere = true;
			for (let i = 0; i < kingUnavailableaSquares[selectPieceState.pieceColor].length; i++) {
				if (desiredSquare === kingUnavailableaSquares[selectPieceState.pieceColor][i]) {
					letKingMovehere = false;
					break;
				} 
			}
			if (checkIfPieceOnSquare(desiredSquare) === true && letKingMovehere === true) {
				allowMove(desiredSquare);
			}
		}
		if ((upToLeft % 8) < (squareIndex % 8) && 0 <= upToLeft) {
			checkIfSquareIsAvailable(upToLeft);
		}
		if (0 <= up) {
			checkIfSquareIsAvailable(up);
		}
		if ((squareIndex % 8) < (upToRight % 8) &&  0 <= upToRight) {
			checkIfSquareIsAvailable(upToRight);
		}
		if ((squareIndex % 8) < (right % 8) && right < 64) {
			checkIfSquareIsAvailable(right);
		}
		if ((squareIndex % 8) < (downToRight % 8) && downToRight < 64) {
			checkIfSquareIsAvailable(downToRight);
		}
		if (down < 64) {
			checkIfSquareIsAvailable(down);
		}
		if ((downToLeft % 8) < (squareIndex % 8) && downToLeft < 64) {
			checkIfSquareIsAvailable(downToLeft);
		}
		if ((left % 8) < (squareIndex % 8) && 0 <= left) {
			checkIfSquareIsAvailable(left);
		}

		// castle
		reviewIfKingMayCastleLeft(squareIndex, selectPieceState.pieceColor);
		reviewIfKingMayCastleRight(squareIndex, selectPieceState.pieceColor);
	}
}

function reviewIfKingMayCastleLeft(squareIndex, color) {
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
		if (noPieceBetweenKingRook.left[0] === true && noPieceBetweenKingRook.left[i] === true) selectPieceState.letKingCastleLeft = true;
		else break;
	}
	if (selectPieceState.letKingCastleLeft === true) {
		Main.grid[squareIndex - 2].addEventListener('click', moveToDestination);
		Main.grid[squareIndex - 2].style.boxShadow = highlightDestinationSquares;
	}
}
function reviewIfKingMayCastleRight(squareIndex, color) {
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
		if (noPieceBetweenKingRook.right[0] === true && noPieceBetweenKingRook.right[i] === true) selectPieceState.letKingCastleRight = true;
		else break;
	}
	if (selectPieceState.letKingCastleRight === true) {
		Main.grid[squareIndex + 2].addEventListener('click', moveToDestination);
		Main.grid[squareIndex + 2].style.boxShadow = highlightDestinationSquares;
	}
}