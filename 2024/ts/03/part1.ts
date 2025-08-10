// sample data
// let data = await Bun.file("./03/sample.txt").text();
let data = await Bun.file("./03/input.txt").text();

const regex = /mul\((\d{1,3})\,(\d{1,3})\)/g;
let result = [...data.matchAll(regex)].reduce((sum, match) => {
	let [x, y] = [Number(match[1]), Number(match[2])];
	return sum + x * y;
}, 0);
console.log("result", result);
