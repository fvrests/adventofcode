const motions = await Deno.readTextFile("motions.txt");

type Coords = number[];

let headPosition: Coords = [0, 0];
let tailPosition: Coords = [0, 0];

const uniqueCoords = new Set();
uniqueCoords.add(tailPosition.toString());

const moveRight = (pos: Coords) => pos[0]++;
const moveLeft = (pos: Coords) => pos[0]--;
const moveUp = (pos: Coords) => pos[1]++;
const moveDown = (pos: Coords) => pos[1]--;

const moveHead = (direction: string) => {
	if (direction == "R") moveRight(headPosition);
	if (direction == "L") moveLeft(headPosition);
	if (direction == "U") moveUp(headPosition);
	if (direction == "D") moveDown(headPosition);
};

const moveTail = ([headX, headY]: Coords, [tailX, tailY]: Coords) => {
	const [dX, dY] = [headX - tailX, headY - tailY];

	const touching = Math.abs(dX) <= 1 && Math.abs(dY) <= 1;
	if (touching) return;

	if (dX >= 2 || (Math.abs(dY) >= 2 && dX >= 1)) moveRight(tailPosition);
	if (dX <= -2 || (Math.abs(dY) >= 2 && dX <= -1)) moveLeft(tailPosition);
	if (dY >= 2 || (Math.abs(dX) >= 2 && dY >= 1)) moveUp(tailPosition);
	if (dY <= -2 || (Math.abs(dX) >= 2 && dY <= -1)) moveDown(tailPosition);

	uniqueCoords.add(tailPosition.toString());
};

const moveKnots = (direction: string, count: number) => {
	for (let i = 0; i <= count - 1; i++) {
		moveHead(direction);
		moveTail(headPosition, tailPosition);
	}
};

motions
	.trim()
	.split("\n")
	.map((line) => {
		const [direction, count] = line.split(" ");
		moveKnots(direction, Number(count));
	});

console.log("tail positions", uniqueCoords.size);
