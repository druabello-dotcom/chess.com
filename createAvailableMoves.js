import * as Main from "./main.js";
import { selectPieceState, piecesHasNotMoved, noPieceBetweenKingRook } from "./gameState.js";
import { moveToDestination  } from "./movePieceToDestination.js";

//————————————————————————————————————————————————————————————————————————————————————

function checkIfPieceOnSquare(i) {
	let otherPieceColor = 0;
	let otherPieceValue = Main.stateGrid[i];
	if (otherPieceValue < 0) otherPieceColor = 'black';
	else if (0 < otherPieceValue) otherPieceColor = 'white';
	console.log(otherPieceValue);
	console.log(otherPieceColor);
	console.log("du kan ikke bevege deg her")
	if (selectPieceState.pieceColor === otherPieceColor) return false;
	else return true;
}

//————————————————————————————————————————————————————————————————————————————————————

const highlightDestinationSquares = "inset 0 0 0 0.25em #80EF80";
export const availablePieceMovesObject = {
	pawn: function(squareIndex) {
		if (selectPieceState.pieceColor == 'black' && (squareIndex + 8) < 64) {
			Main.grid[squareIndex + 8].addEventListener('click', moveToDestination);
			Main.grid[squareIndex + 8].style.boxShadow = highlightDestinationSquares;
			if (piecesHasNotMoved.black.pawn[selectPieceState.selectedPieceIndex] === true) {
				Main.grid[squareIndex + 16].addEventListener('click', moveToDestination);
				Main.grid[squareIndex + 16].style.boxShadow = highlightDestinationSquares;
			}
		} else if(selectPieceState.pieceColor == 'white' && 0 <= (squareIndex - 8)) {
			Main.grid[squareIndex - 8].addEventListener('click', moveToDestination);
			Main.grid[squareIndex - 8].style.boxShadow = highlightDestinationSquares;
			if (piecesHasNotMoved.white.pawn[selectPieceState.selectedPieceIndex] === true) {
				Main.grid[squareIndex - 16].addEventListener('click', moveToDestination);
				Main.grid[squareIndex - 16].style.boxShadow = highlightDestinationSquares
			}	
		}
	},
	bishop: function(squareIndex) {
		for (let i = (squareIndex + 9); (squareIndex % 8) < (i % 8) && i < 64; i+=9) {
			if (checkIfPieceOnSquare(i) === false) break;
			Main.grid[i].addEventListener('click', moveToDestination);
			Main.grid[i].style.boxShadow = highlightDestinationSquares;
		}
		for (let i = (squareIndex + 7); (i % 8) < (squareIndex % 8) && i < 64; i+=7) {
			if (checkIfPieceOnSquare(i) === false) break;
			Main.grid[i].addEventListener('click', moveToDestination);
			Main.grid[i].style.boxShadow = highlightDestinationSquares;
		}
		for (let i = (squareIndex - 9); (i % 8) < (squareIndex % 8) && 0 <= i; i-=9) {
			if (checkIfPieceOnSquare(i) === false) break;
			Main.grid[i].addEventListener('click', moveToDestination);
			Main.grid[i].style.boxShadow = highlightDestinationSquares;
		}
		for (let i = (squareIndex - 7); (squareIndex % 8) < (i % 8) && 0 < i; i-=7) {
			if (checkIfPieceOnSquare(i) === false) break;
			checkIfPieceOnSquare(i);
			Main.grid[i].addEventListener('click', moveToDestination);
			Main.grid[i].style.boxShadow = highlightDestinationSquares;
		}
	},
	rook: function(squareIndex) {
		for (let i = (squareIndex + 1); (squareIndex % 8) < (i % 8) && i < 64; i++) {
			if (checkIfPieceOnSquare(i) === false) break;
			Main.grid[i].addEventListener("click", moveToDestination);
			Main.grid[i].style.boxShadow = highlightDestinationSquares;
		}
		
		for (let i = (squareIndex - 1); (squareIndex) % 8 > (i % 8) && 0 <= i; i--) {
			if (checkIfPieceOnSquare(i) === false) break;
			Main.grid[i].addEventListener("click", moveToDestination);
			Main.grid[i].style.boxShadow = highlightDestinationSquares;
		}
		for (let i = (squareIndex + 8); i < 64; i+=8) {
			if (checkIfPieceOnSquare(i) === false) break;
			Main.grid[i].addEventListener("click", moveToDestination);
			Main.grid[i].style.boxShadow = highlightDestinationSquares;
		}
		for (let i = (squareIndex - 8); 0 <= i ; i-=8) {
			if (checkIfPieceOnSquare(i) === false) break;
			Main.grid[i].addEventListener("click", moveToDestination);
			Main.grid[i].style.boxShadow = highlightDestinationSquares;
		}
	},
	knight: function(squareIndex){
		function RD (){
			let i = squareIndex + 10;
			if ((squareIndex % 8) < (i % 8) && i < 64 && checkIfPieceOnSquare(i) === true){
				Main.grid[i].addEventListener("click", moveToDestination);
				Main.grid[i].style.boxShadow = highlightDestinationSquares;
			}
		}; RD();
		function RU (){
			let i = squareIndex - 10;
			if ((squareIndex % 8) > (i % 8) && i >= 0 && checkIfPieceOnSquare(i) == true){
				Main.grid[i].addEventListener("click", moveToDestination);
				Main.grid[i].style.boxShadow = highlightDestinationSquares;
			}
		}; RU();
		function LD (){
			let i = squareIndex + 6;
			if ((squareIndex % 8) > (i % 8) && i < 64 && checkIfPieceOnSquare(i) === true){
				Main.grid[i].addEventListener("click", moveToDestination);
				Main.grid[i].style.boxShadow = highlightDestinationSquares;
			}
		}; LD();
		function LU (){
			let i = squareIndex - 6;
			if ((squareIndex % 8) < (i % 8)  && i >= 0 && checkIfPieceOnSquare(i) == true){
				Main.grid[i].addEventListener("click", moveToDestination);
				Main.grid[i].style.boxShadow = highlightDestinationSquares;
			}
		}; LU();
		function RDD (){
			let i = squareIndex + 17;
			if ((squareIndex % 8) < (i % 8) && i < 64 && checkIfPieceOnSquare(i) == true){
				Main.grid[i].addEventListener("click", moveToDestination);
				Main.grid[i].style.boxShadow = highlightDestinationSquares;
			}
		}; RDD();
		function LDD (){
			let i = squareIndex + 15;
			if ((squareIndex % 8) > (i % 8) && i < 64 && checkIfPieceOnSquare(i) === true){
				Main.grid[i].addEventListener("click", moveToDestination);
				Main.grid[i].style.boxShadow = highlightDestinationSquares;
			}
		}; LDD();
		function LUU (){
			let i = squareIndex - 17;
			if ((squareIndex % 8) > (i % 8)  && i >= 0 && checkIfPieceOnSquare(i) === true){
				Main.grid[i].addEventListener("click", moveToDestination);
				Main.grid[i].style.boxShadow = highlightDestinationSquares;
			}
		}; LUU();
		function RUU (){
			let i = squareIndex - 15;
			if ((squareIndex % 8) < (i % 8) && i >= 0 && checkIfPieceOnSquare(i) === true){
				Main.grid[i].addEventListener("click", moveToDestination);
				Main.grid[i].style.boxShadow = highlightDestinationSquares;
			}
		}; RUU();
	},
	queen: function(squareIndex) {
		this.rook(squareIndex);
		this.bishop(squareIndex);
	},
	king: function(squareIndex) {
		if (0 <= (squareIndex - 9) && (squareIndex - 9) % 8 < squareIndex % 8 && checkIfPieceOnSquare(squareIndex - 9) === true) {
			Main.grid[squareIndex - 9].addEventListener('click', moveToDestination);
			Main.grid[squareIndex - 9].style.boxShadow = highlightDestinationSquares;
		}
		if (0 <= (squareIndex - 1) && (squareIndex - 1) % 8 < squareIndex % 8 && checkIfPieceOnSquare(squareIndex - 1) === true) {
			Main.grid[squareIndex - 1].addEventListener('click', moveToDestination);
			Main.grid[squareIndex - 1].style.boxShadow = highlightDestinationSquares;
		}
		if ((squareIndex + 7) < 64 && (squareIndex + 7) % 8 < squareIndex % 8 && checkIfPieceOnSquare(squareIndex + 7) === true) {
			Main.grid[squareIndex + 7].addEventListener('click', moveToDestination);
			Main.grid[squareIndex + 7].style.boxShadow = highlightDestinationSquares;
		}
		if ((squareIndex + 8) < 64) {
			if (checkIfPieceOnSquare(squareIndex + 8) === true) {
				Main.grid[squareIndex + 8].addEventListener('click', moveToDestination);
				Main.grid[squareIndex + 8].style.boxShadow = highlightDestinationSquares;
			}
		}
		if ((squareIndex + 9) < 64 && squareIndex % 8 < (squareIndex + 9) % 8) {
			if (checkIfPieceOnSquare(squareIndex + 9) === true) {
				Main.grid[squareIndex + 9].addEventListener('click', moveToDestination);
				Main.grid[squareIndex + 9].style.boxShadow = highlightDestinationSquares;
			} // if false, capturePiece()
		}
		if ((squareIndex + 1) < 64 && squareIndex % 8 < (squareIndex + 1) % 8) {
			if (checkIfPieceOnSquare(squareIndex + 1) === true) {
				Main.grid[squareIndex + 1].addEventListener('click', moveToDestination);
				Main.grid[squareIndex + 1].style.boxShadow = highlightDestinationSquares;
			}
		}
		if (0 <= (squareIndex - 7) && squareIndex % 8 < (squareIndex - 7) % 8) {
			if (checkIfPieceOnSquare(squareIndex - 7) === true) {
				Main.grid[squareIndex - 7].addEventListener('click', moveToDestination);
				Main.grid[squareIndex - 7].style.boxShadow = highlightDestinationSquares;
			}
		}
		if (0 <= squareIndex - 8) {
			if (checkIfPieceOnSquare(squareIndex - 8) === true) {
				Main.grid[squareIndex - 8].addEventListener('click', moveToDestination); 
				Main.grid[squareIndex - 8].style.boxShadow = highlightDestinationSquares;
			}
		}

		// castling
		if (piecesHasNotMoved[selectPieceState.pieceColor].king === true && piecesHasNotMoved[selectPieceState.pieceColor].rook[0] === true) {
			// check if there are any pieces in between rook and king before adding the event listeners
			for (let i = 0, j = squareIndex - 3; i < noPieceBetweenKingRook.left.length; i++, j++) {
				if (Main.stateGrid[j] != 0) noPieceBetweenKingRook.left[i] = false;
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

		//castle to right
		if (piecesHasNotMoved[selectPieceState.pieceColor].king === true && piecesHasNotMoved[selectPieceState.pieceColor].rook[1] === true) {
			// check if there are any pieces in between rook and king before adding the event listeners
			for (let i = 0, j = squareIndex + 1; i < 2; i++, j++) {
				if (Main.stateGrid[j] != 0) noPieceBetweenKingRook.right[i] = false;
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
	}
}