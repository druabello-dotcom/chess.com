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

/* const whiteNumberIdentifierPiece = {
	Pawn: 1,
	Knight: 2,
	Bishop: 3,
	Rook: 4,
	Queen: 5,
	King: 6,
}
const blackNumberIdentifierPiece = {
	Pawn: -1,
	Knight: -2,
	Bishop: -3,
	Rook: -4,
	Queen: -5,
	King: -6,
} */

/* const pawnValue = 0; */

/* const pieceIdentifier = {
	pawn: 1,
	knight: 3,
	bishop: 3,
	rook: 5,
	queen: 9
} */


/* const pawnGridPosition = [
	{ type: "black", square: 9 }
]; */

/* let pieceIndexPosition = {
	pawn: [9]
} */

// grid with elements
const grid = Array.from(document.querySelectorAll('.square'));

const stateGrid = [];
for (let i = 0; i < 64; i++) {
	stateGrid.push(null);
}

stateGrid[9] = pieceNumberIdentifier.black.pawn;

/* stateGrid[9] = pieceSquarePositionArray.whitePawnSquarePosition[0]; */
console.log(stateGrid);

function pointToGridIdx(x, y) {
	return y * 8 + x;
}

//make element draggable function
const pieceElements = {
	pawn: Array.from(document.querySelectorAll('.pawn')) 
};
/* const pawnElement = Array.from(document.querySelectorAll('.pawn')); */
/* const pawnElement = document.getElementsByClassName('pawn')[0]; */

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

/*
function for making piece to another square —> algorithm
steps:
select piece —> prepare the piece to be moved
select square —> add event listeners to every square of the chessboard
 */
// add event listeners to every square
/* for (let i = 0; i < 64; i++) {
	grid[i].addEventListener('click', onPieceClick);
} */






/* 
NOTATER: addEventListeners to square elements, instead of piece elements
- click on a square
- check if the corresponing stateGrid has the value === null
- if not: activate movePiece function

eksempel: 
- is stateGrid in position/square = 1. Then it's a pawn —> but how does the function that it is a pawn. —> use .findIndex();
*/

/* pawn.addEventListener('click', onPieceClick); */

/* [(Math.abs(valueInSquare) - 1)] */

for (let i = 0; i < 64; i++) {
	grid[i].addEventListener('click', onSquareClick);
};
	
let isClicked = false;

function onSquareClick(event) {
	// the square that got clicked
	let selectedSquare = event.target;
	let selectedSquareId = event.target.id;

	let destinationSquare = null;

	// information about the piece inside the square
	let selectedPiece = null; 
	let selectedPieceIndex = null;
	let pieceColor = null;
	let pieceType = null;
	let pieceIndex = null;
	let pieceKey = null;

	let valueInSquare = null;

	// change position of the piece
	let x_positionPiece = null;
	let y_positionPiece = null;
	let x_squareCoordinate = null;
	let y_squareCoordinate = null;

	if (!isClicked) {
		/* pieceSelected(event); */
		// check if the corresponign statGrid position has value === null
		if (stateGrid[selectedSquareId] == null) {
			return;
		} else {
			isClicked = true;
			selectedSquare.style.filter = "brightness(0.4)";
			valueInSquare = stateGrid[selectedSquareId];
			pieceType = mapPieces[Math.abs(valueInSquare)];
			if (valueInSquare < 0) { // if value inside of square is negative
				selectedPieceIndex = pieceSquarePositionArray.black[pieceType].findIndex(i => i === selectedSquareId);

			} else if(0 < valueInSquare) {
				selectedPieceIndex = pieceSquarePositionArray.white[pieceType].findIndex(i => i === selectedSquareId);
			}
			selectedPiece = pieceElements.pieceType[selectedPieceIndex];
			// find out what piece is inside of the square
			/* 
			NOTATER: know what piece is inside of the square 
			WHY need information of the piece being selected:
			- update stateGrid

			- check what color it is —> if value of stateGrid[i] is negative –> black
			- determine what specific piece it is via Math.abs(x)
			-


			*/



			// make moving available for the piece element
			for (let i = 0; i < 64; i++ ){
				grid[i].removeEventListener('click', onSquareClick);
				grid[i].addEventListener('click', moveToDestination)
			}
		}
	}

	// reset after piece has been moved
	for (let i = 0; i < 64; i++) {
		grid[i].removeEventListener('click', moveToDestination);
		grid[i].addEventListener('click', onSquareClick);
	}
	selectedSquare = null;
	selectedSquareId = null;
	destinationSquare = null;

	selectedPiece = null;
	pieceColor = null;
	pieceType = null;
	pieceIndex = null;

	x_positionPiece = null;
	y_positionPiece = null;
	x_squareCoordinate = null;
	y_squareCoordinate = null;
	isClicked = false;
}

/* function pieceSelected(piece) {
	isClicked = true;
	selectedPiece = piece.target;
	register what piece Type
		- make object 
	


	register piece Value -> get information from object
	register square the pawn is in

	x_positionPiece = selectedPiece.style.left;
	y_positionPiece = selectedPiece.style.top;
	console.log(x_positionPiece);
	console.log(y_positionPiece);
	selectedPiece.style.filter = "brightness(0.5)";
} */

function moveToDestination(destination) {
	// register destination square
	destinationSquare = destination.target;
	y_squareCoordinate = parseInt(centerPositionSqaure[destinationSquare.id].y_coordinate);
	x_squareCoordinate = parseInt(centerPositionSqaure[destinationSquare.id].x_coordinate);

	// update stateGrid

	// move piece to destination square
	selectedPiece.style.filter = "brightness(1)";
	selectedPiece.style.left = (x_squareCoordinate - (chessboardDimentions.width / 22)) + "px"; // DO NOT NEED TO SUBRACT
	selectedPiece.style.top = (y_squareCoordinate - (chessboardDimentions.width / 20)) + "px";
	console.log("Piece moved to square:  " + destinationSquare.id);

	for (let i = 0; i < 64; i++) {
		grid[i].removeEventListener('click', moveToDestination);
	}
}


/* NOTATER:		Oppdatere stateGrid
- få programmet til å forstå hvilken pawn som blir klikket. (om det er de første, andre, tredje osv pawn-en)
*/

/* GAMMEL
NOTATER: bevege brikkene
- kanskje jeg blir nødt til å lage en funksjon som har 3 FUNKSJONER INNI SEG
	- Brikken blir klikket
	- Registrere destinaiton square
	- flytte brikken til desination square
- jeg har allerede brukt piece.getBoundingClientRect tidligere, og da kan jeg ikke gjøre det igjen
- jeg sliter med å lage funksjonen så at det blir mer generell

- gjøre at stateGrid blir oppdatert
*/

// —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

/* function selectPiece(event) { 
	let selectedSquare = event.target;
	console.log(selectedSquare.id);
	let stateOfSquare = stateGrid[selectedSquare.id];

	if (stateOfSquare === null) {
		console.log("Det finnes ingen brikker i denne posisjonen");
		return;
	} else { // make function for the destination square
		// change styling later
		selectedSquare.style.border = "1px solid black";
		selectedSquare.style.outline = "3px solid #00FF00"
		selectedSquare.style.outlineOffset = "-4.5px";
		console.log("Det ligger en brikke i denne posisjonen med verdien:  " + stateOfSquare);

		selectedPiece = stateOfSquare;
		isClicked = true;
	}
}

function moveToDestination(destination) {
	let destinationSquare = destination.target ;
	let destinationPosition = destinationSquare.id;
	console.log(destinationSquare.id);
	console.log("This is square:  " + destinationSquare.id + "\n" + "Coordinates for this square:  " + centerPositionSqaure[destinationPosition].x_coordinate + ", " + centerPositionSqaure[destinationPosition].y_coordinate);
	isClicked = false;
	selectedSquare = null;
	selectPiece = null;
} */





/* function movePieceToAnotherSquare(event) {
	const clickedSquare = event.target;

	if (selectedSquareElement === null) {
		const hasPiece = clickedSquare.classList.contains('1') ||
						clickedSquare.classList.contains('2') ||
						clickedSquare.classList.contains('3') ||
						clickedSquare.classList.contains('5') ||
						clickedSquare.classList.contains('9');

		if (hasPiece) {
			selectedSquareElement = clickedSquare;
			clickedSquare.style.border = "3px solid blue";
		}
	} else {
		let pieceValue = null;
		if (selectedSquareElement.classList.contains('1')) pieceValue = '1';
        else if (selectedSquareElement.classList.contains('2')) pieceValue = '2';
        else if (selectedSquareElement.classList.contains('3')) pieceValue = '3';
        else if (selectedSquareElement.classList.contains('5')) pieceValue = '5';
        else if (selectedSquareElement.classList.contains('9')) pieceValue = '9';
        
        // Remove piece from old square
        selectedSquareElement.classList.remove(pieceValue);
        selectedSquareElement.style.border = ""; // Remove highlight
        
        // Add piece to new square
        clickedSquare.classList.add(pieceValue);
        
        // Move the pawn element visually
        const destinationSquareId = parseInt(clickedSquare.id);
        pawn.style.top = (centerPositionSqaure[destinationSquareId].y_coordinate - centerOfPawn.x_coordinate) + "px";
        pawn.style.left = (centerPositionSqaure[destinationSquareId].x_coordinate - Math.ceil(centerOfPawn.y_coordinate)) + "px";
        
        // Reset selection
        selectedSquareElement = null;
	}
} */








/* 			determine what piece is inside of the square

			
			NOTATER: know what specific piece is in the square 
			- get pieceColor
			- 
			
				check if piece is white or black
			if (stateGrid[selectedSquareId] < 0) {
				pieceColor = "black";
			} else {
				pieceColor = "white";
			}
				check what type of piece is inside the selected square
			pieceType = getKeyByValue(pieceColor+"NumberIdentifierPiece", selectedSquareId); Output: "pawn"

			pieceKey = pieceColor + pieceType + "SquarePosition";

				check which of the "pawns" the function has clicked on —> using pieceIndex;
			pieceIndex = pieceSquarePositionArray[pieceKey].findIndex(i => i === selectedSquareId);

				selected piece is now assigned as a variable
			selectedPiece = pieceSquarePositionArray[pieceKey][pieceIndex]; */
