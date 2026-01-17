export const pieceIcons = {
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
export const pieceIconAlt = {
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

export function createPieceElements() {
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
}