const chessboard = document.getElementById('chessboard');

for (let row = 0; row < 8; row++) {
	for (let col = 0; col < 8; col++) {
	  const square = document.createElement('div');
	  square.classList.add('square');
  
	  // alternate colors
	  if ((row + col) % 2 === 0) {
		square.classList.add('white');
	  } else {
		square.classList.add('black');
	  }
  
	  chessboard.appendChild(square);
	}
}


//grid with elements
const grid = [];
for (let i = 0; i < 64; i++) {
	grid.push(chessboard.children[i]);
}

//when hovering over a square, be turn to a darker colour

//assign values to chess pieces
const pawn = 1;
const knight = 2;
const bishop = 3;
const rook = 5;
const queen = 9;

//notater