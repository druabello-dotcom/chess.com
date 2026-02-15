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
	pawn: function() {
		if (selectPieceState.pieceColor == 'black' && (selectPieceState.selectedSquareId + 8) < 64) {
			Main.grid[selectPieceState.selectedSquareId + 8].addEventListener('click', moveToDestination);
			Main.grid[selectPieceState.selectedSquareId + 8].style.boxShadow = highlightDestinationSquares;
			if (piecesHasNotMoved.black.pawn[selectPieceState.selectedPieceIndex] === true) {
				Main.grid[selectPieceState.selectedSquareId + 16].addEventListener('click', moveToDestination);
				Main.grid[selectPieceState.selectedSquareId + 16].style.boxShadow = highlightDestinationSquares;
			}
		} else if(selectPieceState.pieceColor == 'white' && 0 <= (selectPieceState.selectedSquareId - 8)) {
			Main.grid[selectPieceState.selectedSquareId - 8].addEventListener('click', moveToDestination);
			Main.grid[selectPieceState.selectedSquareId - 8].style.boxShadow = highlightDestinationSquares;
			if (piecesHasNotMoved.white.pawn[selectPieceState.selectedPieceIndex] === true) {
				Main.grid[selectPieceState.selectedSquareId - 16].addEventListener('click', moveToDestination);
				Main.grid[selectPieceState.selectedSquareId - 16].style.boxShadow = highlightDestinationSquares
			}	
		}
	},
	bishop: function() {
		for (let i = (selectPieceState.selectedSquareId + 9); (selectPieceState.selectedSquareId % 8) < (i % 8) && i < 64; i+=9) {
			if (checkIfPieceOnSquare(i) === false) break;
			Main.grid[i].addEventListener('click', moveToDestination);
			Main.grid[i].style.boxShadow = highlightDestinationSquares;
		}
		for (let i = (selectPieceState.selectedSquareId + 7); (i % 8) < (selectPieceState.selectedSquareId % 8) && i < 64; i+=7) {
			if (checkIfPieceOnSquare(i) === false) break;
			Main.grid[i].addEventListener('click', moveToDestination);
			Main.grid[i].style.boxShadow = highlightDestinationSquares;
		}
		for (let i = (selectPieceState.selectedSquareId - 9); (i % 8) < (selectPieceState.selectedSquareId % 8) && 0 <= i; i-=9) {
			if (checkIfPieceOnSquare(i) === false) break;
			Main.grid[i].addEventListener('click', moveToDestination);
			Main.grid[i].style.boxShadow = highlightDestinationSquares;
		}
		for (let i = (selectPieceState.selectedSquareId - 7); (selectPieceState.selectedSquareId % 8) < (i % 8) && 0 < i; i-=7) {
			if (checkIfPieceOnSquare(i) === false) break;
			checkIfPieceOnSquare(i);
			Main.grid[i].addEventListener('click', moveToDestination);
			Main.grid[i].style.boxShadow = highlightDestinationSquares;
		}
	},
	rook: function() {
		for (let i = (selectPieceState.selectedSquareId + 1); (selectPieceState.selectedSquareId % 8) < (i % 8) && i < 64; i++) {
			if (checkIfPieceOnSquare(i) === false) break;
			Main.grid[i].addEventListener("click", moveToDestination);
			Main.grid[i].style.boxShadow = highlightDestinationSquares;
		}
		
		for (let i = (selectPieceState.selectedSquareId - 1); (selectPieceState.selectedSquareId) % 8 > (i % 8) && 0 <= i; i--) {
			if (checkIfPieceOnSquare(i) === false) break;
			Main.grid[i].addEventListener("click", moveToDestination);
			Main.grid[i].style.boxShadow = highlightDestinationSquares;
		}
		for (let i = (selectPieceState.selectedSquareId + 8); i < 64; i+=8) {
			if (checkIfPieceOnSquare(i) === false) break;
			Main.grid[i].addEventListener("click", moveToDestination);
			Main.grid[i].style.boxShadow = highlightDestinationSquares;
		}
		for (let i = (selectPieceState.selectedSquareId - 8); 0 <= i ; i-=8) {
			if (checkIfPieceOnSquare(i) === false) break;
			Main.grid[i].addEventListener("click", moveToDestination);
			Main.grid[i].style.boxShadow = highlightDestinationSquares;
		}
	},
	knight: function(){
		function RD (){
			let i = selectPieceState.selectedSquareId + 10;
			if ((selectPieceState.selectedSquareId % 8) < (i % 8) && i < 64 && checkIfPieceOnSquare(i) === true){
				Main.grid[i].addEventListener("click", moveToDestination);
				Main.grid[i].style.boxShadow = highlightDestinationSquares;
			}
		}; RD();
		function RU (){
			let i = selectPieceState.selectedSquareId - 10;
			if ((selectPieceState.selectedSquareId % 8) > (i % 8) && i >= 0 && checkIfPieceOnSquare(i) == true){
				Main.grid[i].addEventListener("click", moveToDestination);
				Main.grid[i].style.boxShadow = highlightDestinationSquares;
			}
		}; RU();
		function LD (){
			let i = selectPieceState.selectedSquareId + 6;
			if ((selectPieceState.selectedSquareId % 8) > (i % 8) && i < 64 && checkIfPieceOnSquare(i) === true){
				Main.grid[i].addEventListener("click", moveToDestination);
				Main.grid[i].style.boxShadow = highlightDestinationSquares;
			}
		}; LD();
		function LU (){
			let i = selectPieceState.selectedSquareId - 6;
			if ((selectPieceState.selectedSquareId % 8) < (i % 8)  && i >= 0 && checkIfPieceOnSquare(i) == true){
				Main.grid[i].addEventListener("click", moveToDestination);
				Main.grid[i].style.boxShadow = highlightDestinationSquares;
			}
		}; LU();
		function RDD (){
			let i = selectPieceState.selectedSquareId + 17;
			if ((selectPieceState.selectedSquareId % 8) < (i % 8) && i < 64 && checkIfPieceOnSquare(i) == true){
				Main.grid[i].addEventListener("click", moveToDestination);
				Main.grid[i].style.boxShadow = highlightDestinationSquares;
			}
		}; RDD();
		function LDD (){
			let i = selectPieceState.selectedSquareId + 15;
			if ((selectPieceState.selectedSquareId % 8) > (i % 8) && i < 64 && checkIfPieceOnSquare(i) === true){
				Main.grid[i].addEventListener("click", moveToDestination);
				Main.grid[i].style.boxShadow = highlightDestinationSquares;
			}
		}; LDD();
		function LUU (){
			let i = selectPieceState.selectedSquareId - 17;
			if ((selectPieceState.selectedSquareId % 8) > (i % 8)  && i >= 0 && checkIfPieceOnSquare(i) === true){
				Main.grid[i].addEventListener("click", moveToDestination);
				Main.grid[i].style.boxShadow = highlightDestinationSquares;
			}
		}; LUU();
		function RUU (){
			let i = selectPieceState.selectedSquareId - 15;
			if ((selectPieceState.selectedSquareId % 8) < (i % 8) && i >= 0 && checkIfPieceOnSquare(i) === true){
				Main.grid[i].addEventListener("click", moveToDestination);
				Main.grid[i].style.boxShadow = highlightDestinationSquares;
			}
		}; RUU();
	},
	queen: function() {
		this.rook();
		this.bishop();
	},
	king: function() {
		if (0 <= (selectPieceState.selectedSquareId - 9) && (selectPieceState.selectedSquareId - 9) % 8 < selectPieceState.selectedSquareId % 8 && checkIfPieceOnSquare(selectPieceState.selectedSquareId - 9) === true) {
			Main.grid[selectPieceState.selectedSquareId - 9].addEventListener('click', moveToDestination);
			Main.grid[selectPieceState.selectedSquareId - 9].style.boxShadow = highlightDestinationSquares;
		}
		if (0 <= (selectPieceState.selectedSquareId - 1) && (selectPieceState.selectedSquareId - 1) % 8 < selectPieceState.selectedSquareId % 8 && checkIfPieceOnSquare(selectPieceState.selectedSquareId - 1) === true) {
			Main.grid[selectPieceState.selectedSquareId - 1].addEventListener('click', moveToDestination);
			Main.grid[selectPieceState.selectedSquareId - 1].style.boxShadow = highlightDestinationSquares;
		}
		if ((selectPieceState.selectedSquareId + 7) < 64 && (selectPieceState.selectedSquareId + 7) % 8 < selectPieceState.selectedSquareId % 8 && checkIfPieceOnSquare(selectPieceState.selectedSquareId + 7) === true) {
			Main.grid[selectPieceState.selectedSquareId + 7].addEventListener('click', moveToDestination);
			Main.grid[selectPieceState.selectedSquareId + 7].style.boxShadow = highlightDestinationSquares;
		}
		if ((selectPieceState.selectedSquareId + 8) < 64) {
			if (checkIfPieceOnSquare(selectPieceState.selectedSquareId + 8) === true) {
				Main.grid[selectPieceState.selectedSquareId + 8].addEventListener('click', moveToDestination);
				Main.grid[selectPieceState.selectedSquareId + 8].style.boxShadow = highlightDestinationSquares;
			}
		}
		if ((selectPieceState.selectedSquareId + 9) < 64 && selectPieceState.selectedSquareId % 8 < (selectPieceState.selectedSquareId + 9) % 8) {
			if (checkIfPieceOnSquare(selectPieceState.selectedSquareId + 9) === true) {
				Main.grid[selectPieceState.selectedSquareId + 9].addEventListener('click', moveToDestination);
				Main.grid[selectPieceState.selectedSquareId + 9].style.boxShadow = highlightDestinationSquares;
			} // if false, capturePiece()
		}
		if ((selectPieceState.selectedSquareId + 1) < 64 && selectPieceState.selectedSquareId % 8 < (selectPieceState.selectedSquareId + 1) % 8) {
			if (checkIfPieceOnSquare(selectPieceState.selectedSquareId + 1) === true) {
				Main.grid[selectPieceState.selectedSquareId + 1].addEventListener('click', moveToDestination);
				Main.grid[selectPieceState.selectedSquareId + 1].style.boxShadow = highlightDestinationSquares;
			}
		}
		if (0 <= (selectPieceState.selectedSquareId - 7) && selectPieceState.selectedSquareId % 8 < (selectPieceState.selectedSquareId - 7) % 8) {
			if (checkIfPieceOnSquare(selectPieceState.selectedSquareId - 7) === true) {
				Main.grid[selectPieceState.selectedSquareId - 7].addEventListener('click', moveToDestination);
				Main.grid[selectPieceState.selectedSquareId - 7].style.boxShadow = highlightDestinationSquares;
			}
		}
		if (0 <= selectPieceState.selectedSquareId - 8) {
			if (checkIfPieceOnSquare(selectPieceState.selectedSquareId - 8) === true) {
				Main.grid[selectPieceState.selectedSquareId - 8].addEventListener('click', moveToDestination); 
				Main.grid[selectPieceState.selectedSquareId - 8].style.boxShadow = highlightDestinationSquares;
			}
		}

		// castling
		if (piecesHasNotMoved[selectPieceState.pieceColor].king === true && piecesHasNotMoved[selectPieceState.pieceColor].rook[0] === true) {
			// check if there are any pieces in between rook and king before adding the event listeners
			for (let i = 0, j = selectPieceState.selectedSquareId - 3; i < noPieceBetweenKingRook.left.length; i++, j++) {
				if (Main.stateGrid[j] != 0) noPieceBetweenKingRook.left[i] = false;
				else noPieceBetweenKingRook.left[i] = true;
			}
			for (let i = 1; i < noPieceBetweenKingRook.left.length; i++) {
				if (noPieceBetweenKingRook.left[0] === true && noPieceBetweenKingRook.left[i] === true) selectPieceState.letKingCastleLeft = true;
				else break;
			}
			if (selectPieceState.letKingCastleLeft === true) {
				Main.grid[selectPieceState.selectedSquareId - 2].addEventListener('click', moveToDestination);
				Main.grid[selectPieceState.selectedSquareId - 2].style.boxShadow = highlightDestinationSquares;
			}
		}

		//castle to right
		if (piecesHasNotMoved[selectPieceState.pieceColor].king === true && piecesHasNotMoved[selectPieceState.pieceColor].rook[1] === true) {
			// check if there are any pieces in between rook and king before adding the event listeners
			for (let i = 0, j = selectPieceState.selectedSquareId + 1; i < 2; i++, j++) {
				if (Main.stateGrid[j] != 0) noPieceBetweenKingRook.right[i] = false;
				else noPieceBetweenKingRook.right[i] = true;
			}
			for (let i = 1; i < noPieceBetweenKingRook.right.length; i++) {
				if (noPieceBetweenKingRook.right[0] === true && noPieceBetweenKingRook.right[i] === true) selectPieceState.letKingCastleRight = true;
				else break;
			}
			if (selectPieceState.letKingCastleRight === true) {
				Main.grid[selectPieceState.selectedSquareId + 2].addEventListener('click', moveToDestination);
				Main.grid[selectPieceState.selectedSquareId + 2].style.boxShadow = highlightDestinationSquares;
			}
		}
	}
}