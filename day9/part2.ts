const motions = await Deno.readTextFile("motions.txt");

type Coords = { x: number; y: number };

const headPosition: Coords = { x: 0, y: 0 };

const knots: { [key: number]: { x: number; y: number } } = {
	0: { x: 0, y: 0 },
};

const uniqueCoords = new Set();
uniqueCoords.add("0,0");

const moveRight = (pos: Coords) => pos.x++;
const moveLeft = (pos: Coords) => pos.x--;
const moveUp = (pos: Coords) => pos.y++;
const moveDown = (pos: Coords) => pos.y--;

const moveHead = (direction: string) => {
	if (direction == "R") moveRight(headPosition);
	if (direction == "L") moveLeft(headPosition);
	if (direction == "U") moveUp(headPosition);
	if (direction == "D") moveDown(headPosition);
};

const follow = (leader: Coords, follower: Coords) => {
	const [dX, dY] = [leader.x - follower.x, leader.y - follower.y];

	const touching = Math.abs(dX) <= 1 && Math.abs(dY) <= 1;
	if (touching) return;

	if (dX >= 2 || (Math.abs(dY) >= 2 && dX >= 1)) {
		moveRight(follower);
	}
	if (dX <= -2 || (Math.abs(dY) >= 2 && dX <= -1)) {
		moveLeft(follower);
	}
	if (dY >= 2 || (Math.abs(dX) >= 2 && dY >= 1)) {
		moveUp(follower);
	}
	if (dY <= -2 || (Math.abs(dX) >= 2 && dY <= -1)) {
		moveDown(follower);
	}
};

const moveKnots = (direction: string, count: number) => {
	for (let i = 0; i <= count - 1; i++) {
		moveHead(direction);

		follow(headPosition, knots[0]);

		for (let j = 1; j < 9; j++) {
			if (!knots[j]) knots[j] = { x: 0, y: 0 };
			follow(knots[j - 1], knots[j]);
		}

		const tailPosition = knots[8];
		uniqueCoords.add(`${tailPosition.x},${tailPosition.y}`);
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
