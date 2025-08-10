// sample data
// let data = await Bun.file("./01/sample.txt").text();
let data = await Bun.file("./01/input.txt").text();

const leftNums: number[] = [];
const rightNums: number[] = [];
data
	.trim()
	.split("\n")
	.forEach((line) => {
		const nums = line.split("   ");
		leftNums.push(Number(nums[0]));
		rightNums.push(Number(nums[1]));
	});

leftNums.sort((a, b) => a - b);
rightNums.sort((a, b) => a - b);

console.log(
	leftNums.reduce((sum, leftNum, i) => {
		let difference = Math.abs(leftNum - rightNums[i]);
		return sum + difference;
	}, 0)
);
