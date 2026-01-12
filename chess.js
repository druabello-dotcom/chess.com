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

const pieceSquarePositionArray = {
	black: {
		pawn: [9, null, null, null, null, null, null, null],
	},
	white: {
		pawn: [null, null, null, null, null, null, null, null] }
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

stateGrid[9] = pieceNumberIdentifier.black.pawn;
console.log(stateGrid);

function pointToGridIdx(x, y) {
	return y * 8 + x;
}

//make element draggable function
const pieceElements = {
	pawn: Array.from(document.querySelectorAll('.pawn')) 
};
console.log(pieceElements);

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
console.log(centerPositionSqaure)

	// make piece spawn in the right way
const pawnDimention = pieceElements.pawn[0].getBoundingClientRect();
console.log("Height of pawn:  " + pawnDimention.height);
console.log("Width of pawn:  " + pawnDimention.width);


// make for-loop later for every piece with the same type
function centerOfPiece(piece) {
	let centerPieceCoordinates = {};
	let pieceDimention = piece.getBoundingClientRect();
	let centerWidth = (pieceDimention.width) / 1.775;
	let centerHeight = (pieceDimention.height) / 2.3;
	centerPieceCoordinates.x_coordinate = centerWidth;
	centerPieceCoordinates.y_coordinate = centerHeight;
	return centerPieceCoordinates;
}

const centerOfPawn = centerOfPiece(pieceElements.pawn[0]);
pieceElements.pawn[0].style.top = (centerPositionSqaure[9].y_coordinate - centerOfPawn.x_coordinate) + "px";
pieceElements.pawn[0].style.left = (centerPositionSqaure[9].x_coordinate - Math.ceil(centerOfPawn.y_coordinate)) + "px";
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
	selectedSquareId = event.target.id;
	if (!isClicked) {
		// check if the corresponding statGrid position has value === null
		if (stateGrid[selectedSquareId] === null) {
			return;
		} else {
			// make moving available for the piece element
			isClicked = true;
			selectedSquare.style.filter = "brightness(0.4)";
			valueInSquare = stateGrid[selectedSquareId];
			pieceType = mapPieces[Math.abs(valueInSquare)];
			if (valueInSquare < 0) { // if value inside of square is negative
				selectedPieceArray = pieceSquarePositionArray.black[pieceType];
				console.log(selectedPieceArray);
				selectedPieceIndex = selectedPieceArray.indexOf(Number(selectedSquareId));
				console.log(selectedPieceIndex);
			} else if(0 < valueInSquare) { // if value inside is positive
				selectedPieceArray = pieceSquarePositionArray.white[pieceType];
				console.log(selectedPieceArray);
				selectedPieceIndex = selectedPieceArray.indexOf(Number(selectedSquareId));
			}
			// the selected piece is now found inside program
			selectedPiece = pieceElements[pieceType][selectedPieceIndex];
			console.log(selectedPiece);

			// add event listener. Calls the function moveToDestination: select the square the piece will move to
			for (let i = 0; i < 64; i++) {
				grid[i].removeEventListener('click', onSquareClick);
				grid[i].addEventListener('click', moveToDestination);
			}
		}
	}
}

function moveToDestination(destination) {
	// register destination square
	destinationSquare = destination.target;
	x_squareCoordinate = parseInt(centerPositionSqaure[destinationSquare.id].x_coordinate);
	y_squareCoordinate = parseInt(centerPositionSqaure[destinationSquare.id].y_coordinate);
	console.log(x_squareCoordinate + ", " + y_squareCoordinate);

	// move piece to destination square
	selectedSquare.style.filter = "brightness(1)";
	selectedPiece.style.left = (x_squareCoordinate - (chessboardDimentions.width / 22)) + "px"; // FIND better way, than to subtract
	selectedPiece.style.top = (y_squareCoordinate - (chessboardDimentions.height / 20)) + "px"; 

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
		grid[i].removeEventListener('click', moveToDestination);
		grid[i].addEventListener('click', onSquareClick);
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
