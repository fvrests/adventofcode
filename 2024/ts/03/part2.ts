// sample data
// let data = await Bun.file("./03/sample2.txt").text();
let data = await Bun.file("./03/input.txt").text();

const regex = /mul\((\d{1,3})\,(\d{1,3})\)|(do\(\))|(don\'t\(\))/g;
let enabled: boolean = true;
let result = [...data.matchAll(regex)].reduce((sum, match) => {
	if (match[0] === "do()") {
		enabled = true;
		return sum;
	}
	if (match[0] === "don't()") {
		enabled = false;
		return sum;
	}
	if (!enabled) return sum;
	let [x, y] = [Number(match[1]), Number(match[2])];
	return sum + x * y;
}, 0);
console.log("result", result);
