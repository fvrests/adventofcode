const notes = await Deno.readTextFile("notes.txt");

const caughtItems: number[][] = [];
const inspections: number[] = [];

const inspectItem = (item: number, operator: string, value: number) => {
	let worry = item;
	if (operator === "+") {
		worry = item + value;
	}
	if (operator === "*") {
		worry = item * value;
	}
	return Math.floor(worry / 3);
};

const throwItem = (worry: number, recipient: number) => {
	if (!caughtItems[recipient]) caughtItems[recipient] = [];
	caughtItems[recipient].push(worry);
};

const playTurn = (specs: string, monkey: number) => {
	const items = specs
		.match(/Starting items: (.*)/)![1]
		.split(",")
		.map(Number);
	const [_, operator, v] = specs.match(
		/Operation: new = old (\+|\*) (\d+|old)/
	)!;
	const divisor = Number(specs.match(/Test: divisible by (\d+)/)![1]);
	const ifTrue = Number(specs.match(/If true: throw to monkey (\d+)/)![1]);
	const ifFalse = Number(specs.match(/If false: throw to monkey (\d+)/)![1]);

	if (caughtItems[monkey]) items.push(...caughtItems[monkey]);
	console.log("caught", caughtItems);
	console.log("inspections", inspections);
	caughtItems[monkey] = [];

	items.map((item: number) => {
		const value = Number(v.replace("old", item.toString()));
		const worry = inspectItem(item, operator, value);
		if (typeof worry === "undefined") return;

		const recipient = worry % divisor === 0 ? ifTrue : ifFalse;
		throwItem(worry, recipient);

		if (!inspections[monkey]) inspections[monkey] = 0;
		inspections[monkey]++;
	});
};

const playRounds = (count: number) => {
	for (let i = 0; i < count; i++) {
		notes.split("\n\n").map((specs, monkey) => {
			playTurn(specs, monkey);
		}, []);
	}
};

playRounds(2);
console.log({ inspections });

const getMonkeyBusiness = (arr: number[]) => {
	const sortedArr = arr.sort((a: number, b: number) => b - a);
	const [winner, runnerUp] = sortedArr.slice(0, 2);
	return winner * runnerUp;
};

console.log("monkey business", getMonkeyBusiness(inspections));
