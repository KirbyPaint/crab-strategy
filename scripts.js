let redCrab;
let blueCrab;
let greenCrab;
let yellowCrab;
const width = 1366;
const height = 768;

let redCrabX = width / 2;
let redCrabY = height / 2;
let blueCrabX = width / 2;
let blueCrabY = height / 2;
let greenCrabX = width / 2;
let greenCrabY = height / 2;
let yellowCrabX = width / 2;
let yellowCrabY = height / 2;

const tileSize = 75;
const boardSize = 675;
const scoreboardWidth = 400;
const centerTilePixel = 375;
let p1Score = 0;
let p2Score = 0;
let p3Score = 0;
let p4Score = 0;

// Setup happens ONCE
function setup() {
	createCanvas(boardSize + scoreboardWidth, boardSize);
	redCrab = loadImage(`./assets/red.svg`);
	blueCrab = loadImage(`./assets/blue.svg`);
	greenCrab = loadImage(`./assets/green.svg`);
	yellowCrab = loadImage(`./assets/yellow.svg`);
	background(`white`);

	grid();
	staticScoreboard();
	redCrabMove(redCrab, centerTilePixel + 10, centerTilePixel + 10);
}


function redCrabMove(img, x, y) {
	image(img, x, y, 50, 50);
	redCrabX = x;
	redCrabY = y;
}
function blueCrabMove(img, x, y) {
	image(img, x, y, 50, 50);
	blueCrabX = x;
	blueCrabY = y;
}
function greenCrabMove(img, x, y) {
	image(img, x, y, 50, 50);
	greenCrabX = x;
	greenCrabY = y;
}
function yellowCrabMove(img, x, y) {
	image(img, x, y, 50, 50);
	yellowCrabX = x;
	yellowCrabY = y;
}

function ai() {
	// Every time the player moves, the AI moves
	// AI teleports to random square (in chunks of 75)
	let randomX;
	let randomY;

	clearSquare(blueCrabX, blueCrabY);
	randomX = Math.floor(Math.random() * 9) * 75;
	randomY = Math.floor(Math.random() * 9) * 75;
	blueCrabMove(blueCrab, randomX + 10, randomY + 10);

	clearSquare(greenCrabX, greenCrabY);
	randomX = Math.floor(Math.random() * 9) * 75;
	randomY = Math.floor(Math.random() * 9) * 75;
	greenCrabMove(greenCrab, randomX + 10, randomY + 10);

	clearSquare(yellowCrabX, yellowCrabY);
	randomX = Math.floor(Math.random() * 9) * 75;
	randomY = Math.floor(Math.random() * 9) * 75;
	yellowCrabMove(yellowCrab, randomX + 10, randomY + 10);
}

function score() {
	// if red's coords ever match another crab's coords
	// red gains a point

	const blue = blueCrabX === redCrabX && blueCrabY === redCrabY;
	const green = greenCrabX === redCrabX && greenCrabY === redCrabY;
	const yellow = yellowCrabX === redCrabX && yellowCrabY === redCrabY;

	if (blue) {
		p1Score++;
		p2Score--;
	}
	if (yellow) {
		p1Score++;
		p3Score--;
	}
	if (green) {
		p1Score++;
		p4Score--;
	}
}

function resetCrabs() {
	background(`white`);
	grid();
	staticScoreboard();
	blueCrabMove(blueCrab, 10, 10);
	greenCrabMove(greenCrab, boardSize - 65, boardSize - 65);
	yellowCrabMove(yellowCrab, boardSize - 65, 10);
	redCrabMove(redCrab, centerTilePixel + 10, centerTilePixel + 10);
}

// Draw happens EVERY FRAME
function draw() {
	dynamicScoreboard();
}

function grid() {
	// some squares green, some brown
	// 9x9 grid
	for (let x = 0; x <= boardSize; x += tileSize) {
		for (let y = 0; y <= boardSize; y += tileSize) {
			x > y ? fill(`#f5f5f5`) : fill(`#d5d5d5`);
			stroke(`black`);
			line(x, 0, x, boardSize);
			line(0, y, boardSize, y);
		}
	}
}

// Handles all key press conditions
function keyPressed() {
	ai();
	score();
	let direction = '';
	switch (keyCode) {
		// w
		case 87:
			direction = 'up';
			if (moveIsValid(redCrabX, redCrabY - tileSize)) {
				clearSquare(redCrabX, redCrabY);
				redCrabMove(redCrab, redCrabX, redCrabY - tileSize);
			} else {
				direction = `oob`;
			}
			break;
		// a
		case 65:
			direction = 'left';
			if (moveIsValid(redCrabX - tileSize, redCrabY)) {
				clearSquare(redCrabX, redCrabY);
				redCrabMove(redCrab, redCrabX - tileSize, redCrabY);
			} else {
				direction = `oob`;
			}
			break;
		// s
		case 83:
			direction = 'down';
			if (moveIsValid(redCrabX, redCrabY + tileSize)) {
				clearSquare(redCrabX, redCrabY);
				redCrabMove(redCrab, redCrabX, redCrabY + tileSize);
			} else {
				direction = `oob`;
			}
			break;
		// d
		case 68:
			direction = 'right';
			if (moveIsValid(redCrabX + tileSize, redCrabY)) {
				clearSquare(redCrabX, redCrabY);
				redCrabMove(redCrab, redCrabX + tileSize, redCrabY);
			} else {
				direction = `oob`;
			}
			break;
		// spacebar
		case 32:
			resetCrabs();
			break;
	}
	text(`${direction}`, 10, 700);
}

// Pastes white blob over crab's last point
// illusion of true movement
function clearSquare(x, y) {
	fill(`white`);
	noStroke();
	rect(x, y, 50, 50);
}

function attackSquare(x, y) {
	fill(`red`);
	noStroke();
	rect(x, y, 50, 50);
}

function moveIsValid(newX, newY) {
	if (newX < 0 || newX > boardSize || newY < 0 || newY > boardSize) {
		return false;
	}
	return true;
}

function dynamicScoreboard() {
	// Clawdia
	fill(`gray`);
	noStroke();
	rect(boardSize + 190, 80, 200, 75);
	fill(`red`);
	text(`${p1Score}`, boardSize + 200, 112)

	// Shelldon
	fill(`gray`);
	noStroke();
	rect(boardSize + 190, 155, 200, 75);
	fill(`blue`);
	text(`${p2Score}`, boardSize + 200, 187)

	// Sandy
	fill(`gray`);
	noStroke();
	rect(boardSize + 190, 230, 200, 75);
	fill(`yellow`);
	text(`${p3Score}`, boardSize + 200, 262)

	// Eugene
	fill(`gray`);
	noStroke();
	rect(boardSize + 190, 305, 200, 75);
	fill(`green`);
	text(`${p4Score}`, boardSize + 200, 337)
	// clear previous numbers
}

function staticScoreboard() {
	fill(`gray`);
	rect(boardSize, 0, scoreboardWidth, boardSize);
	fill(`white`);
	textSize(32);
	text(`Scoreboard`, boardSize + (scoreboardWidth / 2) - 80, 50);

	// 4 crab names
	// Clawdia
	fill(`red`);
	text(`Clawdia`, boardSize + 10, 112);

	// Shelldon
	fill(`blue`);
	text(`Shelldon`, boardSize + 10, 187);

	// Sandy
	fill(`yellow`);
	text(`Sandy`, boardSize + 10, 262);

	// Eugene
	fill(`green`);
	text(`Eugene`, boardSize + 10, 337);
}