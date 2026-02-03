import * as TurnRegister from "./turnRegister.js";
import * as OnSquareClick from './onSquareClick.js';
import { resetChessboard,resetChessboardButtonElements } from "./resetChessboard.js";
import { resizeGame } from "./resizeGame.js";

export const chessboard = document.getElementById('chessboard');
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

export let chessboardBoard = {
	chessboardDimentions: chessboard.getBoundingClientRect(),
	centerPositionSqaure: [],
}
console.log("Width of chessboard:  " + chessboardBoard.chessboardDimentions.width);
console.log("Height of chessboard:  " + chessboardBoard.chessboardDimentions.height);

let squareXValue = (chessboardBoard.chessboardDimentions.width / 16);
let squareYValue = (chessboardBoard.chessboardDimentions.height / 16);
for (let row = 1; row < 9; row++) {
	for (let column = 1; column < 9; column++) {
		chessboardBoard.centerPositionSqaure.push({x_coordinate: squareXValue * ((column * 2) - 1), y_coordinate: squareYValue * ((row * 2) - 1)});
	}
}
export let subtractChessboardPixels = {
	width: chessboardBoard.chessboardDimentions.width / 16,
	height: chessboardBoard.chessboardDimentions.height / 17
}
console.log("Center position square object:  " + chessboardBoard.centerPositionSqaure[0].y_coordinate)

export const stateGrid = [];
for (let i = 0; i < 64; i++) {
	stateGrid.push(null);
}

TurnRegister.alternatingTurn();

// grid-array with all square elements
export const grid = Array.from(document.querySelectorAll('.square'));

// chessboard styling
grid[0].style.borderTopLeftRadius = "1.5mm"
grid[7].style.borderTopRightRadius = "1.5mm"
grid[56].style.borderBottomLeftRadius = "1.5mm";
grid[63].style.borderBottomRightRadius = "1.5mm";

resetChessboardButtonElements.resetChessboardButton.addEventListener('click', resetChessboard);
resetChessboard();

export const mapPieces = {
	1: "pawn",
	2: "knight",
	3: "bishop",
	4: "rook",
	5: "queen",
	6: "king"
  };

resizeGame();
console.log("Width of window:  " + window.innerWidth)

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
const colorHeaderLogBook = document.getElementById('columnHeader');
let colorwayArray = [];
const colorwayElements = Array.from(document.querySelectorAll('.options span'));
let colorIndicator = document.querySelector('.selected');
for (let i = 1; i <= colorwayElements.length; i++) colorwayArray.push(i);
for (let i = 0;  i < colorwayArray.length; i++) {
	colorwayElements[i].addEventListener('click', (event) => {
		let oldSelectedColorway = chessboard.className;
		let selectedColorway = event.target.id;
		let selectedColorwayText = event.target.innerText;

		chessboard.className = selectedColorway;
		colorIndicator.innerText = selectedColorwayText;

		colorHeaderLogBook.classList.remove(oldSelectedColorway);
		colorHeaderLogBook.classList.add(selectedColorway);

		resetChessboardButtonElements.topLayerButton.classList.remove(oldSelectedColorway);
		resetChessboardButtonElements.topLayerButton.classList.add(selectedColorway);
	})
}

console.log(chessboardBoard.centerPositionSqaure)

// adding event listeners to all square elements in the chessboard. If square get clicked, go to the function onSquareClick
for (let i = 0; i < 64; i++) {
	grid[i].addEventListener('click', OnSquareClick.onSquareClick);
};

window.addEventListener('resize', resizeGame);