export const selectPieceState = {
    isClicked: false,
    selectedSquare: null,
    selectedSquareId: null,
    destinationSquare: null,
    destinationSquareId: null,
    clickOnPieceToReset: [],

    selectedPiece: null,
    selectedPieceArray: null,
    selectedPieceIndex: null,
    pieceType: null,
    valueInSquare: null,
    pieceColor: null,

    x_squareCoordinate: null,
    y_squareCoordinate: null,

    letKingCastleLeft: false,
    letKingCastleRight:false
}

export let piecesHasNotMoved = {
	black: {
		pawn: [true, true, true, true, true, true, true, true],
		rook: [true, true],
		king: true
	},
	white: {
		pawn: [true, true, true, true, true, true, true, true], 
		rook: [true, true],
		king: true
	}
}

export let noPieceBetweenKingRook = {
	left: Array(3).fill(false),
	right: Array(2).fill(false)
}

export const pieceSquarePositionArray = {
	black: {
		pawn:   Array(8).fill(null),
		knight: Array(2).fill(null),
		bishop: Array(2).fill(null),
		rook:   Array(2).fill(null),
		queen:  Array(1).fill(null),
		king:   Array(1).fill(null)
	},
	white: {
		pawn:   Array(8).fill(null),
		knight: Array(2).fill(null),
		bishop: Array(2).fill(null),
		rook:   Array(2).fill(null),
		queen:  Array(1).fill(null),
		king:   Array(1).fill(null)
	}
}

export const pieceElementsObject = {
	black: {
		pawn: null,
		knight: null,
		bishop: null,
		rook: null,
		queen: null,
		king: null
	},
	white: {
		pawn: null,
		knight: null,
		bishop: null,
		rook: null,
		queen: null,
		king: null
	}
}

export const pieceNumberIdentifier = {
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

export const kingUnavailableaSquares = {
	black: [],
	white: []
}

export const pinnedPieces = {
	black: {
		value: [],
		square: []
	},
	white: {
		value: [],
		square: []
	}
}