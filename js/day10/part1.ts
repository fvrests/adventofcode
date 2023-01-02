const program = await Deno.readTextFile("program.txt");

let cycle = 0;
let targetSum = 0;

program.split("\n").reduce((accumulator, line) => {
	const [command, v] = line.split(" ");
	const checkSignal = () => {
		const isTargetCycle = cycle % 40 == 20;
		if (isTargetCycle) targetSum += cycle * accumulator;
	};

	if (command === "addx" && v) {
		cycle += 1;
		checkSignal();
		cycle += 1;
	} else cycle += 1;

	checkSignal();

	return v ? accumulator + Number(v) : accumulator;
}, 1);
console.log({ targetSum });
