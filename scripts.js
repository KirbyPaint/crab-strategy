let img;
const width = 1366;
const height = 768;
let crabX = width / 2;
let crabY = height / 2;
const tileSize = 75;
const boardSize = 675;
const scoreboardWidth = 400;
const centerTilePixel = 375;

// Setup happens ONCE
function setup() {
	createCanvas(boardSize + scoreboardWidth, boardSize);
	img = loadImage(`./crab.svg`);
	background(`white`);
	
	// render initial crab
	crab(centerTilePixel + 10, centerTilePixel + 10);
}

// Draw happens EVERY FRAME
function draw() {
	scoreboard();
	// draw 20x20 tile grid
	for (let x = 0; x <= boardSize; x += tileSize) {
		for (let y = 0; y <= boardSize; y += tileSize) {
			fill('white');
			stroke(`black`);
			line(x, 0, x, boardSize);
			line(0, y, boardSize, y);
		}
	}
}

// Handles all key press conditions
function keyPressed() {
	let direction = '';
	switch (keyCode) {
		// w
		case 87:
			direction = 'up';
			if (moveIsValid(crabX, crabY - tileSize)) {
				crab(crabX, crabY - tileSize);
			} else {
				direction = `oob`;
			}
			break;
		// a
		case 65:
			direction = 'left';
			if (moveIsValid(crabX - tileSize, crabY)) {
				crab(crabX - tileSize, crabY);
			} else {
				direction = `oob`;
			}
			break;
		// s
		case 83:
			direction = 'down';
			if (moveIsValid(crabX, crabY + tileSize)) {
				crab(crabX, crabY + tileSize);
			} else {
				direction = `oob`;
			}
			break;
		// d
		case 68:
			direction = 'right';
			if (moveIsValid(crabX + tileSize, crabY)) {
				crab(crabX + tileSize, crabY);
			} else {
				direction = `oob`;
			}
			break;
	}
	text(`${direction}`, 10, 700);
}

function crab(x, y) {
	// causes flicker - look into this
	clear();
	image(img, x, y, 50, 50);
	crabX = x;
	crabY = y;
}

function moveIsValid(newX, newY) {
	if (newX < 0 || newX > boardSize || newY < 0 || newY > boardSize) {
		return false;
	}
	return true;
}

function scoreboard() {
	fill(`green`);
	rect(boardSize, 0, scoreboardWidth, boardSize);
	fill(`white`);
	textSize(32);
	// very specifically measured text placement
	text(`Scoreboard`, boardSize + (scoreboardWidth / 2) - 80, 50);
	// 4 crab names
	// Clawdia
	text(`Clawdia`, boardSize + 10, 112);
	// Shelldon
	text(`Shelldon`, boardSize + 10, 187);
	// Sandy
	text(`Sandy`, boardSize + 10, 262);
	// Eugene
	text(`Eugene`, boardSize + 10, 337);
}