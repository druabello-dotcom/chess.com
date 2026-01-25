const chessboard = document.getElementById('chessboard');
let posIndx = 0;
let square;
for (let row = 0; row < 8; row++) {
	for (let col = 0; col < 8; col++) {
		square = document.createElement('div');
		square.classList.add('square');
		square.setAttribute('id', posIndx);

		// alternate colors
		if ((row + col) % 2 === 0) {
			square.classList.add('white');
		} else {
			square.classList.add('black');
		}

		chessboard.appendChild(square);
		posIndx++;
	}
}

let turnCounter = 0;
let turnCounterElement = document.getElementById('turn-counter');
let turnDecider = null;
let turnDeciderText = document.getElementById('turnDecider');
let turnDeciderColorIndicator = document.getElementById('turnDeciderColorIndicator');
function alternatingTurn() {
	if (turnCounter % 2 === 0) {
		turnDecider = 'white'
		turnDeciderText.innerText = "White to move";
		turnDeciderColorIndicator.className = "turn-white";
	} else {
		turnDecider = 'black'
		turnDeciderText.innerText = "Black to move";
		turnDeciderColorIndicator.className = "turn-black";
	};
}
alternatingTurn();

const stateGrid = [];
for (let i = 0; i < 64; i++) {
	stateGrid.push(null);
}
// grid-array with all square elements
const grid = Array.from(document.querySelectorAll('.square'));

// chessboard styling
grid[0].style.borderTopLeftRadius = "1.5mm"
grid[7].style.borderTopRightRadius = "1.5mm"
grid[56].style.borderBottomLeftRadius = "1.5mm";
grid[63].style.borderBottomRightRadius = "1.5mm";
/* for (let i = 0, j = 56, k = 0, l = 7; i < 8; i++,j++, k+=8, l+=8) {
	grid[i].style.boxShadow = "0 -2px black";
	grid[j].style.boxShadow = "0 2px black";
	grid[k].style.boxShadow = "-2px 0 black";
	grid[l].style.boxShadow = "2px 2px black";
} */

/* for (let i = 0, j = 56, k = 0, l = 7; i < 8; i++,j++, k+=8, l+=8) {
	grid[i].style.borderTop = "2px solid black"
	grid[j].style.borderBottom = "2px solid black";
	grid[k].style.borderLeft = "2px solid black";
	grid[l].style.borderRight = "2px solid black";
} */

const pieceNumberIdentifier = {
	black: {
		 pawn: -1,
		 knight: -2,
		 bishop: -3, 
		 rook: -4, 
		 queen: -5,
		 king: -6
		},
	white: {
		pawn: 1,
		knight: 2, 
		bishop: 3, 
		rook: 4,
		queen: 5,
		king: 6
	} 
}
const mapPieces = {
	1: "pawn",
	2: "knight",
	3: "bishop",
	4: "rook",
	5: "queen",
	6: "king"
  };

const pieceSquarePositionArray = {
	black: {
		pawn:   Array(8).fill(null),
		knight: Array(2).fill(null),
		bishop: Array(2).fill(null),
		rook:   Array(2).fill(null),
		queen:  Array(1).fill(null),
		king:   Array(1).fill(null)
	},
	white: {
		pawn:   Array(8).fill(null),
		knight: Array(2).fill(null),
		bishop: Array(2).fill(null),
		rook:   Array(2).fill(null),
		queen:  Array(1).fill(null),
		king:   Array(1).fill(null)
	}
};
const pawnHasNotMoved = {
	black: [true, true, true, true, true, true, true, true],
	white: [true, true, true, true, true, true, true, true]
}

// get chessboard dimentions
const chessboardDimentions = chessboard.getBoundingClientRect();
console.log("Height of chessboard:  " + chessboardDimentions.height);
console.log("Width of chessboard:  " + chessboardDimentions.width);

//store coordinates for center of each square (x & y component)
let centerPositionSqaure = []; 
let squareXValue = (chessboardDimentions.width) / 16;
let squareYValue = (chessboardDimentions.height) / 16;
for (let row = 1; row < 9; row++) {
	for (let column = 1; column < 9; column++) {
		centerPositionSqaure.push({x_coordinate: squareXValue * ((column * 2) - 1), y_coordinate: squareYValue * ((row * 2) - 1)});
	}
}

const subtractBoardDimentionWidth = (chessboardDimentions.width / 16);
const subtractBoardDimentionHeight = (chessboardDimentions.height / 17);

// reset chessboard
const resetChessboardButton = document.getElementById('resetChessboardButton');
resetChessboardButton.addEventListener('click', resetChessboard);
import * as CreatePieceElements from './createPieceElements.js';
let classNamePieceArray = null;
const pieceElementsObject = {
	black: {
		pawn: null,
		knight: null,
		bishop: null,
		rook: null,
		queen: null,
		king: null
	},
	white: {
		pawn: null,
		knight: null,
		bishop: null,
		rook: null,
		queen: null,
		king: null
	}
}

classNamePieceArray = document.querySelectorAll('.piece');
resetChessboard();

// toggle dropdown menu
const select = document.querySelector('.select');
const options = document.querySelector('.options');
const caret = document.querySelector('.caret');
select.addEventListener('click', () => {
	options.classList.toggle('options-open');
	caret.classList.toggle('caret-rotate');
	select.classList.toggle('select-clicked');
});
// choose colorway
let colorwayArray = [];
const colorwayElements = Array.from(document.querySelectorAll('.options span'));
let colorIndicator = document.querySelector('.selected');
for (let i = 1; i <= colorwayElements.length; i++) colorwayArray.push(i);
for (let i = 0;  i < colorwayArray.length; i++) {
	colorwayElements[i].addEventListener('click', (event) => {
		let selectedColorway = event.target.id;
		let selectedColorwayText = event.target.innerText;
		chessboard.className = selectedColorway;
		colorIndicator.innerText = selectedColorwayText;

	})
}

function pointToGridIdx(x, y) {
	return y * 8 + x;
}

console.log(centerPositionSqaure)

// adding event listeners to all square elements in the chessboard. If square get clicked, go to the function onSquareClick
for (let i = 0; i < 64; i++) {
	grid[i].addEventListener('click', onSquareClick);
};
	
let isClicked = false;
	// the square that got clicked
	let selectedSquare = null;
	let selectedSquareId = null;
	let destinationSquare = null;
	let clickOnPieceToReset = []; // determines what squares activates resetOnSquareClick()
	
	// information about the piece inside selected square
	let selectedPiece = null; 
	let selectedPieceArray = null;
	let selectedPieceIndex = null;
	let pieceType = null;
	let valueInSquare = null;
	let pieceColor = null;

	// change position of the piece, via destination square
	let x_squareCoordinate = null;
	let y_squareCoordinate = null;

function onSquareClick(event) {
	selectedSquare = event.target;
	selectedSquareId = Number(event.target.id);
	if (isClicked === true) return;

	// check if selected square has a piece or not
	if (stateGrid[selectedSquareId] === 0) {
		return;
	}
	valueInSquare = stateGrid[selectedSquareId];
	if (valueInSquare < 0) pieceColor = 'black';
	else if (0 < valueInSquare) pieceColor = 'white';
	console.log("Color of piece:  " + pieceColor);
	if (pieceColor != turnDecider) return; // same player can't move twice in a row

	isClicked = true;
	selectedSquare.style.filter = "brightness(0.4)";

	// get information about piece
	pieceType = mapPieces[Math.abs(valueInSquare)];
	selectedPieceArray = pieceSquarePositionArray[pieceColor][pieceType];
	console.log(selectedPieceArray);
	console.log("You must move:  " + pieceType)
	selectedPieceIndex = selectedPieceArray.indexOf(selectedSquareId);

	// the selected piece is now found inside program
	selectedPiece = pieceElementsObject[pieceColor][pieceType][selectedPieceIndex];
	console.log(selectedPiece);

	// add eventListeners for available square for corresponding piece
	// determine what squares shall activate resetOnSquareClick()
	for (let i = 0; i < 64; i++) {
		grid[i].removeEventListener('click', onSquareClick);
		if (stateGrid[i] < 0 && pieceColor === 'black') { // 
			grid[i].addEventListener('click', moveToDestination);
			clickOnPieceToReset.push(i);
		} else if (0 < stateGrid[i] && pieceColor === 'white') {
			grid[i].addEventListener('click', moveToDestination);
			clickOnPieceToReset.push(i);
		} 
	}
	availablePieceMovesObject[pieceType]();
}

function resetOnSquareClick() {
	// reset array
	while (0 < clickOnPieceToReset.length) {
		clickOnPieceToReset.pop();
	}
	selectedSquare.style.filter = "brightness(1)";
	isClicked = false;
	selectedSquare = null;
	selectedSquareId = null;
	destinationSquare = null;

	selectedPiece = null; 
	selectedPieceArray = null;
	selectedPieceIndex = null;
	pieceType = null;
	valueInSquare = null;
	pieceColor = null;

	x_squareCoordinate = null;
	y_squareCoordinate = null;
	for (let i = 0; i < 64; i++) {
		grid[i].removeEventListener('click', moveToDestination)
		grid[i].addEventListener('click', onSquareClick);
		grid[i].style.boxShadow = "";
	}
}

function moveToDestination(destination) {
	// register destination square
	destinationSquare = destination.target;

	// if user clicks on a piece with same color, activate resetOnSquareClick()
	for (let i = 0; i < clickOnPieceToReset.length; i++) {
		if (Number(destinationSquare.id) === clickOnPieceToReset[i]) {
			resetOnSquareClick();
			return;
		}
	}
	x_squareCoordinate = parseInt(centerPositionSqaure[destinationSquare.id].x_coordinate);
	y_squareCoordinate = parseInt(centerPositionSqaure[destinationSquare.id].y_coordinate);
	console.log(x_squareCoordinate + ", " + y_squareCoordinate);

	// move piece to destination square
	selectedSquare.style.filter = "brightness(1)";
	selectedPiece.style.left = (x_squareCoordinate - subtractBoardDimentionWidth) + "px"; // FIND better way, than to subtract
	selectedPiece.style.top = (y_squareCoordinate - subtractBoardDimentionHeight) + "px"; 

	// update stateGrid
	stateGrid[selectedSquareId] = 0;
	stateGrid[destinationSquare.id] = valueInSquare;
	console.log(stateGrid);

	// update pieceSquarePositionArray
	pieceSquarePositionArray[pieceColor][pieceType][selectedPieceIndex] = Number(destinationSquare.id);
	console.log("Black " + pieceType + ":  " +  pieceSquarePositionArray.black[pieceType]);
	console.log("White " + pieceType + ":  " + pieceSquarePositionArray.white[pieceType]);

	// pawn's double step rule: (Article 3.7.b), a pawn may move two squares forward on its very first move
	if (pieceType === 'pawn') pawnHasNotMoved[pieceColor][selectedPieceIndex] = false;
	
	// the other player's turn
	turnCounter++;
	turnCounterElement.innerText = "Turn counter:  " + turnCounter;
	alternatingTurn();

	// reset after piece has been moved
	for (let i = 0; i < 64; i++) {
		grid[i].removeEventListener('click', moveToDestination)
		grid[i].addEventListener('click', onSquareClick);
		grid[i].style.boxShadow = "";
	}
	selectedSquare = null;
	selectedSquareId = null;
	destinationSquare = null;

	selectedPiece = null;
	selectedPieceArray = null;
	selectedPieceIndex = null;
	pieceType = null;

	x_squareCoordinate = null;
	y_squareCoordinate = null;
	isClicked = false;
}

const highlightDestinationSquares = "inset 0 0 0 0.25em #80EF80";
const availablePieceMovesObject = {
	pawn: function() {
		if (pieceColor == 'black' && (selectedSquareId + 8) < 64) {
			grid[selectedSquareId + 8].addEventListener('click', moveToDestination);
			grid[selectedSquareId + 8].style.boxShadow = highlightDestinationSquares;
			if (pawnHasNotMoved.black[selectedPieceIndex] === true) {
				grid[selectedSquareId + 16].addEventListener('click', moveToDestination);
				grid[selectedSquareId + 16].style.boxShadow = highlightDestinationSquares;
			}
		} else if(pieceColor == 'white' && 0 <= (selectedSquareId - 8)) {
			grid[selectedSquareId - 8].addEventListener('click', moveToDestination);
			grid[selectedSquareId - 8].style.boxShadow = highlightDestinationSquares;
			if (pawnHasNotMoved.white[selectedPieceIndex] === true) {
				grid[selectedSquareId - 16].addEventListener('click', moveToDestination);
				grid[selectedSquareId - 16].style.boxShadow = highlightDestinationSquares
			}	
		}
	},
	bishop: function() {
		for (let i = (selectedSquareId + 9); (selectedSquareId % 8) < (i % 8) && i < 64; i+=9) {
			if (checkIfPieceOnSquare(i) === false) break;
			grid[i].addEventListener('click', moveToDestination);
			grid[i].style.boxShadow = highlightDestinationSquares;
		}
		for (let i = (selectedSquareId + 7); (i % 8) < (selectedSquareId % 8) && i < 64; i+=7) {
			if (checkIfPieceOnSquare(i) === false) break;
			grid[i].addEventListener('click', moveToDestination);
			grid[i].style.boxShadow = highlightDestinationSquares;
		}
		for (let i = (selectedSquareId - 9); (i % 8) < (selectedSquareId % 8) && 0 <= i; i-=9) {
			if (checkIfPieceOnSquare(i) === false) break;
			grid[i].addEventListener('click', moveToDestination);
			grid[i].style.boxShadow = highlightDestinationSquares;
		}
		for (let i = (selectedSquareId - 7); (selectedSquareId % 8) < (i % 8) && 0 < i; i-=7) {
			if (checkIfPieceOnSquare(i) === false) break;
			checkIfPieceOnSquare(i);
			grid[i].addEventListener('click', moveToDestination);
			grid[i].style.boxShadow = highlightDestinationSquares;
		}
	},
	rook: function() {
		for (let i = (selectedSquareId + 1); (selectedSquareId % 8) < (i % 8) && i < 64; i++) {
			if (checkIfPieceOnSquare(i) === false) break;
			grid[i].addEventListener("click", moveToDestination);
			grid[i].style.boxShadow = highlightDestinationSquares;
		}
		
		for (let i = (selectedSquareId - 1); (selectedSquareId) % 8 > (i % 8) && 0 <= i; i--) {
			if (checkIfPieceOnSquare(i) === false) break;
			grid[i].addEventListener("click", moveToDestination);
			grid[i].style.boxShadow = highlightDestinationSquares;
		}
		for (let i = (selectedSquareId + 8); i < 64; i+=8) {
			if (checkIfPieceOnSquare(i) === false) break;
			grid[i].addEventListener("click", moveToDestination);
			grid[i].style.boxShadow = highlightDestinationSquares;
		}
		for (let i = (selectedSquareId - 8); 0 <= i ; i-=8) {
			if (checkIfPieceOnSquare(i) === false) break;
			grid[i].addEventListener("click", moveToDestination);
			grid[i].style.boxShadow = highlightDestinationSquares;
		}
	},
	knight: function(){
		function RD (){
			let i = selectedSquareId + 10;
			if ((selectedSquareId % 8) < (i % 8) && i < 64 && checkIfPieceOnSquare(i) === true){
				grid[i].addEventListener("click", moveToDestination);
				grid[i].style.boxShadow = highlightDestinationSquares;
			}
		}; RD();
		function RU (){
			let i = selectedSquareId - 10;
			if ((selectedSquareId % 8) > (i % 8) && i >= 0 && checkIfPieceOnSquare(i) == true){
				grid[i].addEventListener("click", moveToDestination);
				grid[i].style.boxShadow = highlightDestinationSquares;
			}
		}; RU();
		function LD (){
			let i = selectedSquareId + 6;
			if ((selectedSquareId % 8) > (i % 8) && i < 64 && checkIfPieceOnSquare(i) === true){
				grid[i].addEventListener("click", moveToDestination);
				grid[i].style.boxShadow = highlightDestinationSquares;
			}
		}; LD();
		function LU (){
			let i = selectedSquareId - 6;
			if ((selectedSquareId % 8) < (i % 8)  && i >= 0 && checkIfPieceOnSquare(i) == true){
				grid[i].addEventListener("click", moveToDestination);
				grid[i].style.boxShadow = highlightDestinationSquares;
			}
		}; LU();
		function RDD (){
			let i = selectedSquareId + 17;
			if ((selectedSquareId % 8) < (i % 8) && i < 64 && checkIfPieceOnSquare(i) == true){
				grid[i].addEventListener("click", moveToDestination);
				grid[i].style.boxShadow = highlightDestinationSquares;
			}
		}; RDD();
		function LDD (){
			let i = selectedSquareId + 15;
			if ((selectedSquareId % 8) > (i % 8) && i < 64 && checkIfPieceOnSquare(i) === true){
				grid[i].addEventListener("click", moveToDestination);
				grid[i].style.boxShadow = highlightDestinationSquares;
			}
		}; LDD();
		function LUU (){
			let i = selectedSquareId - 17;
			if ((selectedSquareId % 8) > (i % 8)  && i >= 0 && checkIfPieceOnSquare(i) === true){
				grid[i].addEventListener("click", moveToDestination);
				grid[i].style.boxShadow = highlightDestinationSquares;
			}
		}; LUU();
		function RUU (){
			let i = selectedSquareId - 15;
			if ((selectedSquareId % 8) < (i % 8) && i >= 0 && checkIfPieceOnSquare(i) === true){
				grid[i].addEventListener("click", moveToDestination);
				grid[i].style.boxShadow = highlightDestinationSquares;
			}
		}; RUU();
	},
	queen: function (){
		for (let i = (selectedSquareId + 9); (selectedSquareId % 8) < (i % 8) && i < 64; i+=9) {
			if (checkIfPieceOnSquare(i) === false) break;
			grid[i].addEventListener('click', moveToDestination);
			grid[i].style.boxShadow = highlightDestinationSquares;
		}
		for (let i = (selectedSquareId + 7); (i % 8) < (selectedSquareId % 8) && i < 64; i+=7) {
			if (checkIfPieceOnSquare(i) === false) break;
			grid[i].addEventListener('click', moveToDestination);
			grid[i].style.boxShadow = highlightDestinationSquares;
		}
		for (let i = (selectedSquareId - 9); (i % 8) < (selectedSquareId % 8) && 0 <= i; i-=9) {
			if (checkIfPieceOnSquare(i) === false) break;
			grid[i].addEventListener('click', moveToDestination);
			grid[i].style.boxShadow = highlightDestinationSquares;
		}
		for (let i = (selectedSquareId - 7); (selectedSquareId % 8) < (i % 8) && 0 < i; i-=7) {
			if (checkIfPieceOnSquare(i) === false) break;
			checkIfPieceOnSquare(i);
			grid[i].addEventListener('click', moveToDestination);
			grid[i].style.boxShadow = highlightDestinationSquares;
		}
		for (let i = (selectedSquareId + 1); (selectedSquareId % 8) < ( i % 8) && i < 64; i++) {
			if (checkIfPieceOnSquare(i) === false) break;
			grid[i].addEventListener("click", moveToDestination);
			grid[i].style.boxShadow = highlightDestinationSquares;
		}
		
		for (let i = (selectedSquareId - 1); (selectedSquareId) % 8 > (i % 8) && 0 <= i; i--) {
			if (checkIfPieceOnSquare(i) === false) break;
			grid[i].addEventListener("click", moveToDestination);
			grid[i].style.boxShadow = highlightDestinationSquares;
		}
		for (let i = (selectedSquareId + 8); i < 64; i+=8) {
			if (checkIfPieceOnSquare(i) === false) break;
			grid[i].addEventListener("click", moveToDestination);
			grid[i].style.boxShadow = highlightDestinationSquares;
		}
		for (let i = (selectedSquareId - 8); 0 <= i ; i-=8) {
			if (checkIfPieceOnSquare(i) === false) break;
			grid[i].addEventListener("click", moveToDestination);
			grid[i].style.boxShadow = highlightDestinationSquares;
		}
	},
	king: function() {
		if (0 <= (selectedSquareId - 9) && (selectedSquareId - 9) % 8 < selectedSquareId % 8 && checkIfPieceOnSquare(selectedSquareId - 9) === true) {
			grid[selectedSquareId - 9].addEventListener('click', moveToDestination);
			grid[selectedSquareId - 9].style.boxShadow = highlightDestinationSquares;
		}
		if (0 <= (selectedSquareId - 1) && (selectedSquareId - 1) % 8 < selectedSquareId % 8 && checkIfPieceOnSquare(selectedSquareId - 1) === true) {
			grid[selectedSquareId - 1].addEventListener('click', moveToDestination);
			grid[selectedSquareId - 1].style.boxShadow = highlightDestinationSquares;
		}
		if ((selectedSquareId + 7) < 64 && (selectedSquareId + 7) % 8 < selectedSquareId % 8 && checkIfPieceOnSquare(selectedSquareId + 7) === true) {
			grid[selectedSquareId + 7].addEventListener('click', moveToDestination);
			grid[selectedSquareId + 7].style.boxShadow = highlightDestinationSquares;
		}
		if ((selectedSquareId + 8) < 64) {
			if (checkIfPieceOnSquare(selectedSquareId + 8) === true) {
				grid[selectedSquareId + 8].addEventListener('click', moveToDestination);
				grid[selectedSquareId + 8].style.boxShadow = highlightDestinationSquares;
			}
		}
		if ((selectedSquareId + 9) < 64 && selectedSquareId % 8 < (selectedSquareId + 9) % 8) {
			if (checkIfPieceOnSquare(selectedSquareId + 9) === true) {
				grid[selectedSquareId + 9].addEventListener('click', moveToDestination);
				grid[selectedSquareId + 9].style.boxShadow = highlightDestinationSquares;
			} // if false, capturePiece()
		}
		if ((selectedSquareId + 1) < 64 && selectedSquareId % 8 < (selectedSquareId + 1) % 8) {
			if (checkIfPieceOnSquare(selectedSquareId + 1) === true) {
				grid[selectedSquareId + 1].addEventListener('click', moveToDestination);
				grid[selectedSquareId + 1].style.boxShadow = highlightDestinationSquares;
			}
		}
		if (0 <= (selectedSquareId - 7) && selectedSquareId % 8 < (selectedSquareId - 7) % 8) {
			if (checkIfPieceOnSquare(selectedSquareId - 7) === true) {
				grid[selectedSquareId - 7].addEventListener('click', moveToDestination);
				grid[selectedSquareId - 7].style.boxShadow = highlightDestinationSquares;
			}
		}
		if (0 <= selectedSquareId - 8) {
			if (checkIfPieceOnSquare(selectedSquareId - 8) === true) {
				grid[selectedSquareId - 8].addEventListener('click', moveToDestination); 
				grid[selectedSquareId - 8].style.boxShadow = highlightDestinationSquares;
			}
		}
	}
}

function checkIfPieceOnSquare(i) {
	let otherPieceColor = 0;
	let otherPieceValue = stateGrid[i];
	if (otherPieceValue < 0) otherPieceColor = 'black';
	else if (0 < otherPieceValue) otherPieceColor = 'white';
	console.log(otherPieceValue);
	console.log(otherPieceColor);
	console.log("du kan ikke bevege deg her")
	if (pieceColor === otherPieceColor) return false;
	else return true;
}
