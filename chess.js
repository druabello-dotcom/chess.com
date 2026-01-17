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
const stateGrid = [];
for (let i = 0; i < 64; i++) {
	stateGrid.push(null);
}

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
function resetChessboard() {
	stateGrid.fill(null);
	// remove all pieces with class name "piece"
	for (let i = 0; i < classNamePieceArray.length; i++) {
		classNamePieceArray[i].remove();
	}

	// create the piece elements. Append them as childs of the chessboard
	const visualPieceElements = CreatePieceElements.createPieceElements();
	for (let i = 0; i < visualPieceElements.length; i++) {
		chessboard.appendChild(visualPieceElements[i]);
	}
	classNamePieceArray = document.querySelectorAll('.piece');

	// make loop for making pieceElements Object
/* 	for (let c = 0; c < 2; c++) {
		let colorArray = ['black', 'white'];
		let color = colorArray[c];

		for (let t = 0; t < CreatePieceElements.pieceTypeArray.length; t++) {
			let type = CreatePieceElements.pieceTypeArray[t];
			pieceElementsObject[color][type] = Array.from(document.querySelectorAll(`.${color}.${type}`));
		}
	} */

	for (let t = 0; t < CreatePieceElements.pieceTypeArray.length; t++) {
		let type = CreatePieceElements.pieceTypeArray[t];
		pieceElementsObject.black[type] = Array.from(document.querySelectorAll(`.black.${type}`));
		pieceElementsObject.white[type] = Array.from(document.querySelectorAll(`.white.${type}`));
	}
	console.log(pieceElementsObject);

	let pieceSquareIncrementation = {
		pawn: 1,
		knight: 5,
		bishop: 3,
		rook: 7,
		queen: 0,
		king: 0
	}
	let pieceStartingSquare = {
		black: {
			pawn: 8,
			knight: 1,
			bishop: 2,
			rook: 0,
			queen: 3,
			king: 4,
		},
		white: {
			pawn: 48,
			knight: 57,
			bishop: 58,
			rook: 56,
			queen: 59,
			king: 60
		}
	}
	// reset pieces visually (and in background)
	pawnHasNotMoved.black = Array(8).fill(true);
	pawnHasNotMoved.white = Array(8).fill(true);
	for (let t = 0; t < CreatePieceElements.pieceTypeArray.length; t++) {
		let type = CreatePieceElements.pieceTypeArray[t];
		for (let counts = 0, blackStartingSquare = pieceStartingSquare.black[type], whiteStartingSquare = pieceStartingSquare.white[type]; counts < CreatePieceElements.pieceCounts[type]; counts++) {
			console.log("Piece type:  " + type + "     Count:  " + counts);

			// reset background information
			pieceSquarePositionArray.black[type][counts] = blackStartingSquare;
			pieceSquarePositionArray.white[type][counts] = whiteStartingSquare;

			stateGrid[blackStartingSquare] = pieceNumberIdentifier.black[type];
			stateGrid[whiteStartingSquare] = pieceNumberIdentifier.white[type];

			// reset visual information
			pieceElementsObject.black[type][counts].style.left = (centerPositionSqaure[blackStartingSquare].x_coordinate - subtractBoardDimentionWidth) + "px";
			pieceElementsObject.black[type][counts].style.top = (centerPositionSqaure[blackStartingSquare].y_coordinate - subtractBoardDimentionWidth) + "px";
			pieceElementsObject.white[type][counts].style.left = (centerPositionSqaure[whiteStartingSquare].x_coordinate - subtractBoardDimentionWidth) + "px"; 
			pieceElementsObject.white[type][counts].style.top = (centerPositionSqaure[whiteStartingSquare].y_coordinate - subtractBoardDimentionWidth) + "px";

			pieceElementsObject.black[type][counts].style.backgroundColor = "transparent";
			pieceElementsObject.white[type][counts].style.backgroundColor = "transparent";

			blackStartingSquare += pieceSquareIncrementation[type];
			whiteStartingSquare += pieceSquareIncrementation[type];
		}
	}
	console.log(stateGrid);
}
/* 
const pieceSquarePositionArray = {
	black: {
		pawn: [9, null, null, null, null, null, null, null],
		bishop: [2, null]
	},
	white: {
		pawn: [null, null, null, null, null, null, null, null],
		bishop: [null, null]
	}

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

// grid-array with all square elements
const grid = Array.from(document.querySelectorAll('.square'));


stateGrid[2] = pieceNumberIdentifier.black.bishop;
stateGrid[9] = pieceNumberIdentifier.black.pawn;
console.log(stateGrid);

function pointToGridIdx(x, y) {
	return y * 8 + x;
}


/* const pieceElements = {
	pawn: Array.from(document.querySelectorAll('.pawn')),
	bishop: Array.from(document.querySelectorAll('.bishop'))
};
console.log(pieceElements); */

/* let squareXValue = (chessboardDimentions.width) / 8;
let squareYValue = (chessboardDimentions) / 8;
for (let row = 1; row < 9; row++) {
	for (let column = 1; column < 9; column++) {
		centerPositionSqaure.push({x_coordinate: squareXValue * column, y_coordinate: squareYValue * row});
	}
} */
console.log(centerPositionSqaure)

	// make piece spawn in the right way
/* const pawnDimention = pieceElements.pawn[0].getBoundingClientRect();
console.log("Height of pawn:  " + pawnDimention.height);
console.log("Width of pawn:  " + pawnDimention.width); */


// make for-loop later for every piece with the same type
/* let centerPieceCoordinates = null;
let pieceDimention = null;
let centerWidth = null;
let centerHeight = null; */

function centerOfPiece(piece) {
	let centerPieceCoordinates = {};
	let pieceDimention = piece.getBoundingClientRect();
	let centerWidth = (pieceDimention.width) / 2;
	let centerHeight = (pieceDimention.height) / 2;
	centerPieceCoordinates.x_coordinate = centerWidth;
	centerPieceCoordinates.y_coordinate = centerHeight;
	return centerPieceCoordinates;
}


// align pieces in center —> I should use centerOfPiece = centerOfPiece(også alle elementer med "pieces" som class)
/* const centerOfPawn = centerOfPiece(pieceElements.pawn[0]); */
/* pieceElements.pawn[0].style.left = (centerPositionSqaure[9].x_coordinate - subtractBoardDimentionWidth) + "px";
pieceElements.pawn[0].style.top = (centerPositionSqaure[9].y_coordinate - subtractBoardDimentionHeight) + "px";

const centerOfBishop = centerOfPiece(pieceElements.bishop[0]);
pieceElements.bishop[0].style.left = (centerPositionSqaure[2].x_coordinate - subtractBoardDimentionWidth) + "px";
pieceElements.bishop[0].style.top = (centerPositionSqaure[2].y_coordinate - subtractBoardDimentionHeight) + "px";
console.log(document.getElementById(9)); */


// adding event listeners to all square elements in the chessboard. If square get clicked, go to the function onSquareClick
for (let i = 0; i < 64; i++) {
	grid[i].addEventListener('click', onSquareClick);
};
	
let isClicked = false;
	// the square that got clicked
	let selectedSquare = null;
	let selectedSquareId = null;
	let destinationSquare = null;

	// information about the piece inside selected square
	let selectedPiece = null; 
	let selectedPieceArray = null;
	let selectedPieceIndex = null;
	let pieceType = null;
	let valueInSquare = null;

	// change position of the piece, via destination square
	let x_squareCoordinate = null;
	let y_squareCoordinate = null;

function onSquareClick(event) {
	selectedSquare = event.target;
	selectedSquareId = Number(event.target.id);
	if (isClicked) return;

	// check if the corresponding statGrid position has value === null
	if (stateGrid[selectedSquareId] === null) {
		return;
	}
	// make moving available for the piece element
	isClicked = true;
	selectedSquare.style.filter = "brightness(0.4)";
	valueInSquare = stateGrid[selectedSquareId];
	pieceType = mapPieces[Math.abs(valueInSquare)];
	if (valueInSquare < 0) { // if value inside of square is negative
		selectedPieceArray = pieceSquarePositionArray.black[pieceType];
		console.log(selectedPieceArray);
		selectedPieceIndex = selectedPieceArray.indexOf(selectedSquareId);
		console.log(selectedPieceIndex);
	} else if(0 < valueInSquare) { // if value inside is positive
		selectedPieceArray = pieceSquarePositionArray.white[pieceType];
		console.log(selectedPieceArray);
		selectedPieceIndex = selectedPieceArray.indexOf(selectedSquareId);
	}
	// the selected piece is now found inside program
	selectedPiece = pieceElements[pieceType][selectedPieceIndex];
	console.log(selectedPiece);

	// add event listener. Calls the function moveToDestination: select the square the piece will move to
	for (let i = 0; i < 64; i++) {
		grid[i].removeEventListener('click', onSquareClick);
	}
	// add eventListeners for available square for the specific pieceType
	availablePieceMovesObject[pieceType]();
}

function moveToDestination(destination) {
	// register destination square
	destinationSquare = destination.target;
	x_squareCoordinate = parseInt(centerPositionSqaure[destinationSquare.id].x_coordinate);
	y_squareCoordinate = parseInt(centerPositionSqaure[destinationSquare.id].y_coordinate);
	console.log(x_squareCoordinate + ", " + y_squareCoordinate);

	// move piece to destination square
	selectedSquare.style.filter = "brightness(1)";
	selectedPiece.style.left = (x_squareCoordinate - subtractBoardDimentionWidth) + "px"; // FIND better way, than to subtract
	selectedPiece.style.top = (y_squareCoordinate - subtractBoardDimentionHeight) + "px"; 

	// update stateGrid
	stateGrid[selectedSquareId] = null;
	stateGrid[destinationSquare.id] = valueInSquare;
	console.log(stateGrid);

	// update pieceSquarePositionArray
	if (valueInSquare < 0) {
		pieceSquarePositionArray.black[pieceType][selectedPieceIndex] = Number(destinationSquare.id);
	} else if(0 < valueInSquare) {
		pieceSquarePositionArray.white[pieceType][selectedPieceIndex] = Number(destinationSquare.id);
	}
	console.log("Black " + pieceType + ":  " +  pieceSquarePositionArray.black[pieceType]);
	console.log("White " + pieceType + ":  " + pieceSquarePositionArray.white[pieceType])
				
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

const pawnHasNotMoved = {
	black: [true, true, true, true, true, true, true, true],
	white: [true, true, true, true, true, true, true, true]
}

const highlightDestinationSquares = "inset 0px 0px 0px 0.25em #80EF80";
const availablePieceMovesObject = {
	pawn: function() {
		if (valueInSquare < 0 || (selectedSquareId + 8) < 64) { // if pawn is black
			grid[selectedSquareId + 8].addEventListener('click', moveToDestination);
			grid[selectedSquareId + 8].style.boxShadow = highlightDestinationSquares;
			if (pawnHasNotMoved.black[selectedPieceIndex] === true) {
				grid[selectedSquareId + 16].addEventListener('click', moveToDestination);
				grid[selectedSquareId + 16].style.boxShadow = highlightDestinationSquares;
				pawnHasNotMoved.black[selectedPieceIndex] = false; // make it false another place in the function, not here
			}
		} else if(0 < valueInSquare || -1 < (selectedSquareId - 8)) { // if pawn is white
			grid[selectedSquareId - 8].addEventListener('click', moveToDestination);
			if (pawnHasNotMoved.white[selectedPieceIndex] === true) {
				grid[selectedSquareId - 16].addEventListener('click', moveToDestination);
				pawnHasNotMoved.white[selectedPieceIndex] = false;
			}	
		}
	},
	bishop: function() {
		// kode for hvordan den skal bevege seg
		for (let i = (selectedSquareId + 9); (selectedSquareId % 8) < (i % 8) && i < 64; i+=9) {
			grid[i].addEventListener('click', moveToDestination);
			grid[i].style.boxShadow = highlightDestinationSquares;
		}
		for (let i = (selectedSquareId + 7); (i % 8) < (selectedSquareId % 8) && i < 64; i+=7) {
			grid[i].addEventListener('click', moveToDestination);
			grid[i].style.boxShadow = highlightDestinationSquares;
		}
		for (let i = (selectedSquareId - 9); (i % 8) < (selectedSquareId % 8) && 0 <= i; i-=9) {
			grid[i].addEventListener('click', moveToDestination);
			grid[i].style.boxShadow = highlightDestinationSquares;
		}
		for (let i = (selectedSquareId - 7); (selectedSquareId % 8) < (i % 8) && 0 < i; i-=7) {
			grid[i].addEventListener('click', moveToDestination);
			grid[i].style.boxShadow = highlightDestinationSquares;
		}
	}
}