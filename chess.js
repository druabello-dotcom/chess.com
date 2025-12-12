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


//make element draggable function
const pawn = document.getElementById("pawn");

function dragElement(elmnt) {
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  
	// Use mousedown, not mouseover
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
  

//assign values to chess piece
const knight = 2;
const bishop = 3;
const rook = 5;
const queen = 9;


//notater