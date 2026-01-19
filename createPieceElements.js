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

export const pieceTypeArray = ["pawn", "knight", "bishop", "rook", "queen", "king"];
export const pieceCounts = {
	pawn: 8,
	knight: 2,
	bishop: 2,
	rook: 2,
	queen: 1,
	king: 1,
}

export function createPieceElements() {
	const colorArray = ["black", "white"];
	let pieceElementsArray = [];
	for (let c = 0; c < 2; c++) {
		const color = colorArray[c];

		for (let t = 0; t < pieceTypeArray.length; t++) {
			let type = pieceTypeArray[t];

			for (let i = 0; i < pieceCounts[type]; i++) {
				let spanElement = document.createElement('span');
				let iconElement = document.createElement('img');

				spanElement.classList.add('piece', color, type);
				iconElement.src = pieceIcons[color][type];
				iconElement.alt = pieceIconAlt[color][type];

				spanElement.appendChild(iconElement);
				pieceElementsArray.push(spanElement);
			}
		}
	}
	return pieceElementsArray;
}