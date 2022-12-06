const stacks: string[][] = [];

const writeStacks = (line: string) => {
	for (let position = 0; position <= line.length; position += 4) {
		const currentCrate = line.slice(position, position + 4)[1];
		if (currentCrate !== " ") {
			if (!stacks[position / 4]) {
				stacks[position / 4] = [currentCrate];
			} else {
				stacks[position / 4].push(currentCrate);
			}
		}
	}
};

const getProcedures = (procedure: string) =>
	procedure.split(" ").filter(Number).map(Number);

const rearrange = ([quantity, from, to]: number[]) => {
	for (let i = 0; i <= quantity - 1; i++) {
		stacks[to - 1].unshift(stacks[from - 1].shift() ?? "");
	}
};

const fileContents = await Deno.readTextFile("crates.txt");

fileContents.split("\n").map((line) => {
	if (line.includes("[")) {
		writeStacks(line);
	} else if (line.includes("move")) {
		rearrange(getProcedures(line));
	}
});

const topCrates = stacks.reduce(
	(topCrates, stack) => (topCrates += stack[0]),
	""
);

console.log(stacks);
console.log({ topCrates });
