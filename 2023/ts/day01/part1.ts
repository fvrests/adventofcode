const inputFile = Bun.file("./input.txt");
const calibration = await inputFile.text();

const isNumber = (char: string) => {
	return char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57;
};

const lines = calibration.trim().split("\n");
const summedValues = lines.reduce((sum, line) => {
	const lineArr = [...line];
	const digits = lineArr.filter(isNumber);
	const calibrationValue = Number(`${digits[0]}${digits[digits.length - 1]}`);
	return sum + calibrationValue;
}, 0);

console.log("answer", summedValues);
