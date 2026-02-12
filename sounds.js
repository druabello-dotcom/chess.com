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