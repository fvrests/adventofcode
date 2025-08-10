const inputFile = Bun.file("./input.txt");
const calibration = await inputFile.text();

const numbers = {
	one: 1,
	two: 2,
	three: 3,
	four: 4,
	five: 5,
	six: 6,
	seven: 7,
	eight: 8,
	nine: 9,
};

const isNumber = (char: string) => {
	return char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57;
};

const parseLine = (line: string): string => {
	let newLine = line;
	Object.keys(numbers).map((key) => {
		newLine = newLine.replaceAll(
			key,
			`${key[0] + numbers[key] + key[key.length - 1]}`,
		);
	});
	return newLine;
};

const lines = calibration.trim().split("\n");
const summedValues = lines.reduce((sum, line) => {
	const lineArr = [...parseLine(line)];
	const digits = lineArr.filter(isNumber);
	const calibrationValue = Number(`${digits[0]}${digits[digits.length - 1]}`);
	return sum + calibrationValue;
}, 0);

console.log("answer", summedValues);
