const chessboard = document.getElementById('chessboard');

let posIndx = 0;
for (let row = 0; row < 8; row++) {
	for (let col = 0; col < 8; col++) {
		const square = document.createElement('div');
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


// grid with elements
const grid = [];
for (let i = 0; i < 64; i++) {
	grid.push(chessboard.children[i]);
}

//make element draggable function
const pawn = document.getElementById("pawn");

function dragElement(elmnt) {
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
dragElement(pawn);


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
console.log(centerPositionSqaure);


	// make piece spawn in the right way
const pawnDimention = pawn.getBoundingClientRect();
console.log("Height of pawn:  " + pawnDimention.height);
console.log("Width of pawn:  " + pawnDimention.width);

function centerOfPiece (piece) {
	let centerPieceCoordinates = {};
	let pieceDimention = piece.getBoundingClientRect();
	let centerWidth = (pieceDimention.width) / 2;
	let centerHeight = (pieceDimention.height) / 2;
	centerPieceCoordinates.x_coordinate = centerWidth;
	centerPieceCoordinates.y_coordinate = centerHeight;
	return centerPieceCoordinates;
}

pawn.style.top = centerPositionSqaure[0].y_coordinate + "px";
pawn.style.left = centerPositionSqaure[0].x_coordinate + "px";

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


//assign values to chess piece
const knight = 2;
const bishop = 3;
const rook = 5;
const queen = 9;


//notater