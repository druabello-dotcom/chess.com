import { selectPieceState } from "./gameState.js";
import * as CreatePieceElements from "./createPieceElements.js";

//—————————————————————————————————————————————————————————————————————————————————————

export let registerTurnVariables = {
    turnCounter: 0,
	turnCounterElement: document.getElementById('turn-counter'),
    turnDeciderText: document.getElementById('turnDecider'),
    turnDeciderColorIndicator: document.getElementById('turnDeciderColorIndicator'),
	turnDecider: 'white'
}
export let logBookVariables = {
	logBookRowCounter: 0,
	loggedMoves: document.getElementById('loggedContent'),
    moveCountColumn: document.getElementById('moveCountColumn'),
    whiteMoveColumn: document.getElementById('whiteMoveColumn'),
    blackMoveColumn: document.getElementById('blackMoveColumn'),
}


export function alternatingTurn() {
	if (registerTurnVariables.turnCounter % 2 === 0) {
		registerTurnVariables.turnDecider = 'white'
		registerTurnVariables.turnDeciderText.innerText = "White to move";
		registerTurnVariables.turnDeciderColorIndicator.className = "turn-white";
	} else {
		registerTurnVariables.turnDecider = 'black'
		registerTurnVariables.turnDeciderText.innerText = "Black to move";
		registerTurnVariables.turnDeciderColorIndicator.className = "turn-black";
	};
}

//—————————————————————————————————————————————————————————————————————————————————————

export function registerTurn() {
	// the other player's turn
	registerTurnVariables.turnCounter++;
	registerTurnVariables.turnCounterElement.innerText = "Turn counter:  " + registerTurnVariables.turnCounter;
	let pieceMovedToSquareSpan = document.createElement('span');
	let loggedPieceElementIcon = document.createElement('img');

	loggedPieceElementIcon.src = CreatePieceElements.pieceIcons[selectPieceState.pieceColor][selectPieceState.pieceType];
	loggedPieceElementIcon.alt = CreatePieceElements.pieceIconAlt[selectPieceState.pieceColor][selectPieceState.pieceType];
	loggedPieceElementIcon.classList.add('movedPiece');

	/* pieceMovedToSquareSpan.innerText = pointToGridIdx(); */
	pieceMovedToSquareSpan.innerText = `${whatPieceLetter()}${pointToGridIdx()}`;
	pieceMovedToSquareSpan.appendChild(loggedPieceElementIcon);
	
	if (registerTurnVariables.turnCounter % 2 === 1) {
		logBookVariables.logBookRowCounter++;
		let logBookRowCounterElement = document.createElement('span');
		logBookRowCounterElement.innerText = `${logBookVariables.logBookRowCounter}.`;
		moveCountColumn.appendChild(logBookRowCounterElement)
		whiteMoveColumn.appendChild(pieceMovedToSquareSpan);
	} else {
		blackMoveColumn.appendChild(pieceMovedToSquareSpan);
	}
	logBookVariables.loggedMoves.scrollTop = logBookVariables.loggedMoves.scrollHeight;
	alternatingTurn();
}

//—————————————————————————————————————————————————————————————————————————————————————

const pieceNotation = {
	black: {
		pawn: "p",
		knight: "n",
		bishop: "b", 
		rook: "r",
		queen: "q",
		king: "k"
	},
	white: {
		pawn: "P",
		knight: "N",
		bishop: "B", 
		rook: "R",
		queen: "Q",
		king: "K"
	}
}
const fileNumberIdentifier = {
	1: "a",
	2: "b",
	3: "c",
	4: "d",
	5: "e",
	6: "f",
	7: "g",
	8: "h"
}

//—————————————————————————————————————————————————————————————————————————————————————

function whatPieceLetter() {
	if (selectPieceState.pieceType === 'pawn') return "";
	else return pieceNotation[selectPieceState.pieceColor][selectPieceState.pieceType];
}
function whatRank() {
	let identifiedRankNumber = null;
	if (0 <= selectPieceState.destinationSquareId && selectPieceState.destinationSquareId < 8) identifiedRankNumber = 8;
	else if (8 <= selectPieceState.destinationSquareId && selectPieceState.destinationSquareId < 16) identifiedRankNumber = 7;
	else if (16 <= selectPieceState.destinationSquareId && selectPieceState.destinationSquareId < 24) identifiedRankNumber = 6;
	else if (24 <= selectPieceState.destinationSquareId && selectPieceState.destinationSquareId < 32) identifiedRankNumber = 5;
	else if (32 <= selectPieceState.destinationSquareId && selectPieceState.destinationSquareId < 40) identifiedRankNumber = 4;
	else if (40 <= selectPieceState.destinationSquareId && selectPieceState.destinationSquareId < 48) identifiedRankNumber = 3;
	else if (48 <= selectPieceState.destinationSquareId && selectPieceState.destinationSquareId < 56) identifiedRankNumber = 2;
	else if (56 <= selectPieceState.destinationSquareId && selectPieceState.destinationSquareId < 64) identifiedRankNumber = 1;
	return identifiedRankNumber;
}
function whatFile() {
	let identifiedFileNumber = null;
	if (selectPieceState.destinationSquareId % 8 === 0) identifiedFileNumber = 1;
	else if (selectPieceState.destinationSquareId % 8 === 1) identifiedFileNumber = 2;
	else if (selectPieceState.destinationSquareId % 8 === 2) identifiedFileNumber = 3;
	else if (selectPieceState.destinationSquareId % 8 === 3) identifiedFileNumber = 4;
	else if (selectPieceState.destinationSquareId % 8 === 4) identifiedFileNumber = 5;
	else if (selectPieceState.destinationSquareId % 8 === 5) identifiedFileNumber = 6;
	else if (selectPieceState.destinationSquareId % 8 === 6) identifiedFileNumber = 7;
	else if (selectPieceState.destinationSquareId % 8 === 7) identifiedFileNumber = 8;
	return fileNumberIdentifier[identifiedFileNumber];
}
function pointToGridIdx() {
	let identifiedFile = whatFile();
	let identifiedRank = whatRank();
	let squareNotation = `${identifiedFile}${identifiedRank}`;
	return squareNotation;
	/* return y * 8 + x; */
}