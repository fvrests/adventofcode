// sample data
// let data = await Bun.file("./02/sample.txt").text();
let data = await Bun.file("./02/input.txt").text();

type Direction = "increasing" | "decreasing";
const getDirection = (num1: number, num2: number) => {
	let direction: Direction;
	if (num2 - num1 > 0) direction = "decreasing";
	else direction = "increasing";
	return direction;
};

console.log(
	data
		.trim()
		.split("\n")
		.filter((line) => {
			let direction: Direction;
			let lineArr = line.split(" ").map(Number);
			return lineArr.every((num, i) => {
				if (i === 0) return true;
				let prev = lineArr[i - 1];
				if (i === 1) {
					direction = getDirection(prev, num);
				}
				return (
					Math.abs(num - prev) <= 3 &&
					num !== prev &&
					direction === getDirection(prev, num)
				);
			});
		}).length
);
