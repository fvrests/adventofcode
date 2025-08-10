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

console.log(
	leftNums.reduce((sum, leftNum) => {
		let similarityScore =
			leftNum * rightNums.filter((num) => num === leftNum).length;
		return sum + similarityScore;
	}, 0)
);
