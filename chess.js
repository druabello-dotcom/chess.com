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


const pawnValue = 1;
const pieceValue = {
	pawn: 1,
	knight: 3,
	bishop: 3,
	rook: 5,
	queen: 9
}

// grid with elements
const grid = [];
for (let i = 0; i < 64; i++) {
	grid.push(chessboard.children[i]);
}

const stateGrid = [];
for (let i = 0; i < 64; i++) {
	stateGrid.push(null);
}
stateGrid[9] = pawnValue;
console.log(stateGrid);

function pointToGridIdx(x, y) {
	return y * 8 + x;
}

pawnSquarePosition = [9];

//make element draggable function
const pawn = document.getElementsByClassName('pawn')[0];

/* function dragElement(elmnt) {
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

	//Activates when element is clicked
	elmnt.onmousedown = dragMouseDown;

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
		elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
	}

	function closeDragElement() {
		document.onmouseup = null;
		document.onmousemove = null;
	}
}
dragElement(pawn); */

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
const pawnDimention = pawn.getBoundingClientRect();
console.log("Height of pawn:  " + pawnDimention.height);
console.log("Width of pawn:  " + pawnDimention.width);

function centerOfPiece(piece) {
	let centerPieceCoordinates = {};
	let pieceDimention = piece.getBoundingClientRect();
	let centerWidth = (pieceDimention.width) / 1.775;
	let centerHeight = (pieceDimention.height) / 2.3;
	centerPieceCoordinates.x_coordinate = centerWidth;
	centerPieceCoordinates.y_coordinate = centerHeight;
	return centerPieceCoordinates;
}

const centerOfPawn = centerOfPiece(pawn);
pawn.style.top = (centerPositionSqaure[9].y_coordinate - centerOfPawn.x_coordinate) + "px";
pawn.style.left = (centerPositionSqaure[9].x_coordinate - Math.ceil(centerOfPawn.y_coordinate)) + "px";
// square needs to know if there is a piece inside of it
console.log(document.getElementById(9));
document.getElementById(9).classList.add(pawnValue);

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

pawn.addEventListener('click', onPieceClick);

let isClicked = false;

function onPieceClick(event) {
	event.stopPropagation();
	let selectedPiece = null;
	let x_positionPiece = null;
	let y_positionPiece = null;
	
	let x_squareCoordinate = null;
	let y_squareCoordinate = null;

	if (!isClicked) {
		pieceSelected(event);
	}
	for (let i = 0; i < 64; i++) {
		grid[i].addEventListener('click', moveToDestination);
	}

	// reset after
	selectedPiece = null;
	x_positionPiece = null;
	y_positionPiece = null;
	
	x_squareCoordinate = null;
	y_squareCoordinate = null;
	isClicked = false;

}

function pieceSelected(piece) {
	isClicked = true;
	selectedPiece = piece.target;

	x_positionPiece = selectedPiece.style.left;
	y_positionPiece = selectedPiece.style.top;
	console.log(x_positionPiece);
	console.log(y_positionPiece);
	selectedPiece.style.filter = "brightness(0.5)";
}

function moveToDestination(destination) {
	// register destination square
	let selectedSquare = destination.target;
	y_squareCoordinate = parseInt(centerPositionSqaure[selectedSquare.id].y_coordinate);
	x_squareCoordinate = parseInt(centerPositionSqaure[selectedSquare.id].x_coordinate);

	// update stateGrid

	// move piece to destination square
	selectedPiece.style.filter = "brightness(1)";
	selectedPiece.style.left = (x_squareCoordinate - (chessboardDimentions.width / 22)) + "px"; // DO NOT NEED TO SUBRACT
	selectedPiece.style.top = (y_squareCoordinate - (chessboardDimentions.width / 20)) + "px";
	console.log("Piece moved to square:  " + selectedSquare.id);

	for (let i = 0; i < 64; i++) {
		grid[i].removeEventListener('click', moveToDestination);
	}
}

/* function movePiece (piece) {
	// flytte brikken til destination square
	let positionPiece = event.getBoundingClientRect();
	x_positionPiece = event.left;
	y_positionPiece = event.top;
	
	isClicked = false;

} */


/* NOTATER
- kanskje jeg blir nødt til å lage en funksjon som har 3 FUNKSJONER INNI SEG
	- Brikken blir klikket
	- Registrere destinaiton square
	- flytte brikken til desination square
- jeg har allerede brukt piece.getBoundingClientRect tidligere, og da kan jeg ikke gjøre det igjen
- jeg sliter med å lage funksjonen så at det blir mer generell

- gjøre at stateGrid blir oppdatert

—————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

/* function selectPiece(event) { // destination = next square
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














// function to make pieces snap to middle of square
	// record mouse movement when clicked. When released, calculate current position. Snap to middle of the square.
	// remomve the number in the class of the square, and register the current square the piece is in

	// record the new position of the piece

/*	
Plan for how to build snapping function
	record center coordinate for each square
	this coordinate acts as a provider for the pieces to snap to when mouse i released
		make the pieces spawn inside the chess board

	activate drag function
	when realsed, snap to nearest valid square

MAKE CENTER OF EACH SQUARE DEFAULT COORDINATES
	compute bounding box
	calculate the center
	when user releases mouse, calculate it's position
		the calculation of the mouse's position will act as the "input" for where to put the piece
*/


// make array with objects that assigns values to the pieces
const knight = 2;
const bishop = 3;
const rook = 5;
const queen = 9;


