// LINK TO ALL SOUND FILES: 
// https://www.chess.com/forum/view/general/chessboard-sound-files?page=2

export function soundWhenMovingPiece() {
	let movingPieceSound = new Audio("sounds_media/move-self.mp3");
	movingPieceSound.play();
}

export function captureSound() {
	let captureSound = new Audio("sounds_media/capture.mp3");
	captureSound.play();
}

export function castleSound() {
	let castleSound = new Audio("sounds_media/castle.mp3");
	castleSound.play();
}

export function endGame() {
	let endGameSound = new Audio("sounds_media/game-end.mp3");
	endGameSound.play();
}

export function giveCheckSound() {
	let checkSound = new Audio("sounds_media/give-check.mp3")
	checkSound.play();
}

export function promotionSound() {
	let promoteSound = new Audio("sounds_media/promote.mp3");
	promoteSound.play();
}

export function illegalMove() {
	let illegalMoveSound = new Audio("sounds_media/illegal-move.mp3");
	illegalMoveSound.play();
}

export function lowTime() {
	let lowTimeSound = new Audio("sounds_media/low-time.mp3");
	lowTimeSound.play();
}