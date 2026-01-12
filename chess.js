

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

//få hvilket grid den er på
//bevegelse blir da grid+8 fordi hver bevegelse legger til 8 for å komme på nye grid verdi
//for løkke - først gruppere hvit og svart brikker i en hel gruppe - hvis det er en mostander brikke på +-7 eller +-5 så gi en valg om å ta brikken
//for svart blir det +7 for venstre diagonal og for høyre diagonal blir det +9
//for hvit pawn blir det -9 for venster diagonal og - 7 for høyre diagonal






/*

function PawnMovement (colour) {
	let pawnPosX = centerPositionSqaure[0].x_coordinate// finn x posisjonen til brikken
	let pawnPosY = centerPositionSqaure[0].y_coordinate // finn y kordinatene

	if (colour === blackPiece) {

		const pawnMoveForward = pawnPosY + chessboardDimentions.height/8

		function pawnMoveRightDiagnoal (){
		let newPawnPosY = pawnPosy + chessboardDimentions.height/8  
		let newPawnPosX = pawnPosX + chessboardDimentions.width/8)
		} 

		function pawnMoveLeftDiagnoal(){
		let newPawnPosY =  pawnPosy + chessboardDimentions.height/8  
		let newPawnPosX = pawnPosX - chessboardDimentions.width/8 |// venstre
		}

		

		pawnPosX.element.remove // fjern brikken også legg til i ny posisjon
			if (document.querySelector (function(){ //skal sjekke om det er en brikke i diven
				let valueDiv = const elements = document.querySelectorAll('div[class$="1"||"2"||"3"||"5"||"9"]');

			}) 
				
				
				
				
				
				
				=== pawnPosy + chessboardDimentions.height/8  && pawnPosX - chessboardDimentions.width/8 || 
				document.querySelector ()=== pawnPosy + chessboardDimentions.height/8  && pawnPosX + chessboardDimentions.width/8) { 
					//her så skal den finne om det er en brikke på høyre og venstre diagonal, så der
				function capturePiece(leftDiagonal, rightDiagonal) {
					
					
					
					newPosition = pawnPosition 

				} 
			}
	}
}

//when hovering over a square, be turn to a darker colour

//assign values to chess pieces
const pawn = 1;
const knight = 2;
const bishop = 3;
const rook = 5;
const queen = 9;

//notater
// document.getById gjør at den grabber en div fra div altså den får en verdi fra en div
// document.querySelector returnerer første verdi som matcher hbva du vil finne, du kan da bruke den verdien den returner til å manupuløere 
	// feks ved  å bytte farge osv

//getElementByLastName fanger en verdi og gjør om disse verdiene om til en arrawy og indekserer, slik kan vi gå gjennom alle sammen ved en for løkke
//

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

//for å lagre kordinatene kan i fiven kand en lage en div i diven den ligger i med class name som kordinatene



*/






const bPieces = { // Define piece constants
  bPawn: "p",
  bKnight: "n",
  bBishop: "b",
  bRook: "r",
  bQueen: "q",
  bKing: "k"
};

arrBPieces= [...Object.values(bPieces)]


const wPieces = {
  wPawn: "P",
  wKnight: "N",
  wBishop: "B",
  wRook: "R",
  wQueen: "Q",
  wKing: "K"
};

arrWPieces= [...Object.values(wPieces)]

// Initialize board/ fill board with .
let states = new Array(64).fill(".");

// Pool of pieces (plus empty square)
const allPieces = [...Object.values(bPieces), ...Object.values(wPieces)];
console.log(allPieces)



// Randomly fill first 32 squares with random pieces
for (let i = 0; i < Math.min(32,allPieces.length+12); i++) {
  const randomIndex = Math.floor(Math.random() * allPieces.length);

  const removedPiece = allPieces.splice(randomIndex, 1)[0];
  states[i] = removedPiece;


}

console.log(allPieces)




// Build output string
let output = "";

for (let i = 1; i <= 64; i++) { // må ha i==1 og i-1 fordi 0:8=0 som lager ny linje med engang
  output += states[i-1] + " ";

  if (i % 8 === 0) {
    output += "/\n"; // slash at end of each row
  }
}

console.log(output);
console.log(states)



let bCountersArray = {
  turn: 0,
  castling: True,
  enPassant: True,
  movesSinceCapture: 0
};


let wCountersArray = {
  turn: 0,
  castling: True,
  enPassant: True,
  movesSinceCapture: 0
};


function queenTake() {
    for (let i = 0; i < 64; i++) {
        if (i < n && i % 2 === 0) {
            let positionOfWqueen = i;
            console.log("White queen is at index:", positionOfWqueen); // i will not need this when because the position will be knwon since we will 
			} 														   // know the position from game start

	 for (let i = 0; i < 64; i++) {
    if ( i + 4 % 8 === 0 ); {


	}
       
     
     
		
}

				}
		 
		


		
        }
    


