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

// get chessboard dimentions
//function to make the middle of the squares be the "default" position for the pieces
	//firstly, record the center of each square so that the pieces may "read" what square they will go to, ideally, relative to the chessboard
const chessboardDimentions = chessboard.getBoundingClientRect();
console.log("Height of chessboard:  " + chessboardDimentions.height);
console.log("Width of chessboard:  " + chessboardDimentions.width);

//centerPositionSquare stores the coordinates for the center of each square with their corresponding x- and y-aksis coordinate, relative to the chessboard
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
const pieceIcons = {
	black: {
		pawn: "pieces-basic-png/black-pawn.png",
		knight: "pieces-basic-png/black-knight.png",
		bishop: "pieces-basic-png/black-bishop.png",
		rook: "pieces-basic-png/black-rook.png",
		queen: "pieces-basic-png/black-queen.png",
		king: "pieces-basic-png/black-king.png"
	},
	white: {
		pawn: "pieces-basic-png/white-pawn.png",
		knight: "pieces-basic-png/white-knight.png",
		bishop: "pieces-basic-png/white-bishop.png",
		rook: "pieces-basic-png/white-rook.png",
		queen: "pieces-basic-png/white-queen.png",
		king: "pieces-basic-png/white-king.png"
	}
};
const pieceIconAlt = {
	black: {
		pawn: "blackPawn",
		knight: "blackKnight",
		bishop: "blackBishop",
		rook: "blackRook",
		queen: "blackQueen",
		king: "blackKing"
	},
	white: {
		pawn: "whitePawn",
		knight: "whiteKnight",
		bishop: "whiteBishop",
		rook: "whiteRook",
		queen: "whiteQueen",
		king: "whiteKing"
	}
}

let classNamePieceArray = null;
let pawnElements = null;
function resetChessboard() {
	let pieceElements = null; 
	let centerOfPawn = null;

	// remove all pieces with class name "piece"

	// create pawn elements
	for (let i = 0; i < 8; i++) {
		let blackPawnElements = document.createElement('span');
		let blackPawnIcon = document.createElement('img');
		blackPawnElements.classList.add('piece', 'black', 'pawn');
		blackPawnIcon.src = pieceIcons.black.pawn;
		blackPawnIcon.alt = pieceIconAlt.black.pawn;
		blackPawnElements.appendChild(blackPawnIcon);

		let whitePawnElement = document.createElement('span');
		let whitePawnIcon = document.createElement('img');
		whitePawnElement.classList.add('piece', 'white', 'pawn');
		whitePawnIcon.src = pieceIcons.white.pawn;
		whitePawnIcon.alt = pieceIconAlt.white.pawn;
		whitePawnElement.appendChild(whitePawnIcon);
	}

	// create bishop elements
	for (let i = 0; i < 2; i++) {
		let blackBishopElement = document.createElement('span');
		let blackBishopElementIcon = document.createElement('img');
		blackBishopElement.classList.add('piece', 'black', 'bishop');
		blackBishopElementIcon.src = pieceIcons.black.bishop;
		blackBishopElementIcon.alt = pieceIconAlt.black.bishop;
		blackBishopElement.appendChild(blackBishopElementIcon);

		let whiteBishopElement = document.createElement('span');
		let whiteBishopElementIcon = document.createElement('img');
		whiteBishopElement.classList.add('piece', 'white', 'bishop');
		whiteBishopElementIcon.src = pieceIcons.white.bishop;
		whiteBishopElementIcon.alt = pieceIconAlt.white.bishop;
		whiteBishopElement.appendChild(whiteBishopElementIcon);
	}

	// create knights elements
	for (let i = 0; i < 2; i++) {
		let blackKnightElement = document.createElement('span');
		let blackKnightElementIcon = document.createElement('img');
		blackKnightElement.classList.add('piece', 'black', 'knight');
		blackKnightElementIcon.src = pieceIcons.black.knight;
		blackKnightElementIcon.alt = pieceIconAlt.black.knight;
		blackKnightElement.appendChild(blackKnightElementIcon);

		let whiteKnightElement = document.createElement('span');
		let whiteKnightElementIcon = document.createElement('img');
		whiteKnightElement.classList.add('piece', 'white', 'knight');
		whiteKnightElementIcon.src = pieceIcons.white.knight;
		whiteKnightElementIcon.alt = pieceIconAlt.white.knight;
		whiteKnightElement.appendChild(whiteKnightElementIcon);
		
	}

	// create rook elements
	for (let i = 0; i < 2; i++) {
		let blackRookElements = document.createElement('span');
		let blackRookElementsIcon = document.createElement('img');
		blackRookElements.classList.add('piece', 'black', 'rook');
		blackRookElementsIcon.src = pieceIcons.black.rook;
		blackRookElementsIcon.alt = pieceIconAlt.black.rook;
		blackRookElements.appendChild(blackRookElementsIcon);

		let whiteRookElements = document.createElement('span');
		let whiteRookElementsIcon = document.createElement('img');
		whiteRookElements.classList.add('piece', 'white', 'rook');
		whiteRookElementsIcon.src = pieceIcons.white.rook;
		whiteRookElementsIcon.alt = pieceIconAlt.white.rook;
		whiteRookElements.appendChild(whiteRookElementsIcon);
	}
	
	//create queen elements
	let blackQueenElement = document.createElement('span');
	let blackQueenElementIcon = document.createElement('img');
	blackQueenElement.classList.add('piece', 'black', 'queen');
	blackQueenElementIcon.src = pieceIcons.black.queen;
	blackQueenElementIcon.alt = pieceIconAlt.black.queen;
	blackQueenElement.appendChild(blackQueenElementIcon);

	let whiteQueenElement = document.createElement('span');
	let whiteQueenElementIcon = document.createElement('img');
	whiteQueenElement.classList.add('piece', 'white', 'queen');
	whiteQueenElementIcon.src = pieceIcons.white.queen;
	whiteQueenElementIcon.alt = pieceIconAlt.white.queen;
	whiteQueenElement.appendChild(whiteQueenElementIcon);

	//create king elements
	let blackKingElement = document.createElement('span');
	let blackKingElementIcon = document.createElement('img');
	blackKingElement.classList.add('piece', 'black', 'king');
	blackKingElementIcon.src = pieceIcons.black.king;
	blackKingElementIcon.alt = pieceIconAlt.black.king;
	blackKingElement.appendChild(blackKingElementIcon);

	let whiteKingElement = document.createElement('span');
	let whiteKingElementIcon = document.createElement('img');
	whiteKingElement.classList.add('piece', 'white', 'king');
	whiteKingElementIcon.src = pieceIcons.white.king;
	whiteKingElementIcon.alt = pieceIconAlt.white.king;
	whiteKingElement.appendChild(whiteKingElementIcon);

	pieceElements = {
		black: {
			pawn: Array.from(document.querySelectorAll('.black.pawn')),
		},
		white: {
			pawn: Array.from(document.querySelectorAll('.white.pawn'))
		}
	};
	centerOfPawn = centerOfPiece(pieceElements.pawn[0]);
	// place pawns in corresponding square in chessboard — white & black
	for (let i = 0, j = 8, k = 48; i < 8; i++, j++, k++) {
		pieceElements.black.pawn[i].style.left = (centerPositionSqaure[j].x_coordinate - subtractBoardDimentionWidth) + "px";
		pieceElements.black.pawn[i].style.top = (centerPositionSqaure[j].y_coordinate - subtractBoardDimentionHeight) + "px";
		pieceElements.white.pawn[i].style.left = (centerPositionSqaure[k].x_coordinate - subtractBoardDimentionWidth) + "px";
		pieceElements.white.pawn[i].style.top = (centerPositionSqaure[k].y_coordinate - subtractBoardDimentionHeight) + "px";

		// reset "background" information about pawns
		pawnHasNotMoved.black[i] = true;
		pawnHasNotMoved.white[i] = true;
		pieceSquarePositionArray.black.pawn[i] = j;
		pieceSquarePositionArray.white.pawn[i] = k;
		stateGrid[j] = pieceNumberIdentifier.black.pawn;
		stateGrid[k] = pieceNumberIdentifier.white.pawn;
	}

	// reset pieceSquarePositionArray for pawns
}

const pieceSquarePositionArray = {
	black: {
		pawn: [9, null, null, null, null, null, null, null],
		bishop: [2, null]
	},
	white: {
		pawn: [null, null, null, null, null, null, null, null],
		bishop: [null, null]
	}

}
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

const stateGrid = [];
for (let i = 0; i < 64; i++) {
	stateGrid.push(null);
}

stateGrid[2] = pieceNumberIdentifier.black.bishop;
stateGrid[9] = pieceNumberIdentifier.black.pawn;
console.log(stateGrid);

function pointToGridIdx(x, y) {
	return y * 8 + x;
}


const pieceElements = {
	pawn: Array.from(document.querySelectorAll('.pawn')),
	bishop: Array.from(document.querySelectorAll('.bishop'))
};
console.log(pieceElements);

/* let squareXValue = (chessboardDimentions.width) / 8;
let squareYValue = (chessboardDimentions) / 8;
for (let row = 1; row < 9; row++) {
	for (let column = 1; column < 9; column++) {
		centerPositionSqaure.push({x_coordinate: squareXValue * column, y_coordinate: squareYValue * row});
	}
} */
console.log(centerPositionSqaure)

	// make piece spawn in the right way
const pawnDimention = pieceElements.pawn[0].getBoundingClientRect();
console.log("Height of pawn:  " + pawnDimention.height);
console.log("Width of pawn:  " + pawnDimention.width);


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
const centerOfPawn = centerOfPiece(pieceElements.pawn[0]);
pieceElements.pawn[0].style.left = (centerPositionSqaure[9].x_coordinate - subtractBoardDimentionWidth) + "px";
pieceElements.pawn[0].style.top = (centerPositionSqaure[9].y_coordinate - subtractBoardDimentionHeight) + "px";
/* pieceElements.pawn[0].style.top = ((chessboardDimentions.height / 8)) + "px";
pieceElements.pawn[0].style.left = ((chessboardDimentions.width / 8)) + "px"; */
/* pieceElements.pawn[0].style.top = (centerPositionSqaure[9].y_coordinate - centerOfPawn.x_coordinate) + "px";
pieceElements.pawn[0].style.left = (centerPositionSqaure[9].x_coordinate - Math.ceil(centerOfPawn.y_coordinate)) + "px";
 */
const centerOfBishop = centerOfPiece(pieceElements.bishop[0]);
pieceElements.bishop[0].style.left = (centerPositionSqaure[2].x_coordinate - subtractBoardDimentionWidth) + "px";
pieceElements.bishop[0].style.top = (centerPositionSqaure[2].y_coordinate - subtractBoardDimentionHeight) + "px";
/* pieceElements.bishop[0].style.top = (centerPositionSqaure[2].y_coordinate - centerOfBishop.x_coordinate) + "px";
pieceElements.bishop[0].style.left = (centerPositionSqaure[2].x_coordinate - Math.ceil(centerOfBishop.y_coordinate)) + "px";
 */
// square needs to know if there is a piece inside of it
console.log(document.getElementById(9));


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