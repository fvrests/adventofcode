const motions = await Deno.readTextFile("motions.txt");

type Coords = { x: number; y: number };
type Direction = "R" | "L" | "U" | "D";

const headPosition: Coords = { x: 0, y: 0 };

const knots: { [key: number]: Coords } = {
	0: { x: 0, y: 0 },
};

const uniqueCoords = new Set();
uniqueCoords.add("0,0");

const move = (direction: Direction, pos: Coords) =>
	({
		R: (pos: Coords) => pos.x++,
		L: (pos: Coords) => pos.x--,
		U: (pos: Coords) => pos.y++,
		D: (pos: Coords) => pos.y--,
	}[direction](pos));

const moveHead = (direction: Direction) => {
	move(direction, headPosition);
};

const follow = (leader: Coords, follower: Coords) => {
	const [dX, dY] = [leader.x - follower.x, leader.y - follower.y];

	const touching = Math.abs(dX) <= 1 && Math.abs(dY) <= 1;
	if (touching) return;

	if (dX >= 2 || (Math.abs(dY) >= 2 && dX >= 1)) {
		move("R", follower);
	}
	if (dX <= -2 || (Math.abs(dY) >= 2 && dX <= -1)) {
		move("L", follower);
	}
	if (dY >= 2 || (Math.abs(dX) >= 2 && dY >= 1)) {
		move("U", follower);
	}
	if (dY <= -2 || (Math.abs(dX) >= 2 && dY <= -1)) {
		move("D", follower);
	}
};

const moveKnots = (direction: Direction, count: number) => {
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
		const [direction, count] = line.split(" ") as [Direction, string];
		moveKnots(direction, Number(count));
	});

console.log("tail positions", uniqueCoords.size);
