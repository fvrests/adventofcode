const program = await Deno.readTextFile("program.txt");

const output: string[] = [""];
let cycle = 0;

// fix: address type error on below line
program.split("\n").reduce((spritePosition: number, line: string) => {
	while (cycle < 240) {
		const [command, v] = line.split(" ");

		const writeOutput = () => {
			const currentLine = Math.floor((cycle - 1) / 40);
			const currentIndex = (cycle - 1) % 40;
			const spriteIndex = spritePosition % 40;

			const isSpriteVisible =
				currentIndex >= spriteIndex - 1 && currentIndex <= spriteIndex + 1;

			if (!output[currentLine]) output[currentLine] = "";
			if (isSpriteVisible) output[currentLine] = output[currentLine] + "#";
			else output[currentLine] = output[currentLine] + ".";
		};

		if (command === "addx" && v) {
			cycle += 1;
			writeOutput();
			cycle += 1;
		} else cycle += 1;
		writeOutput();

		return v ? Number(spritePosition) + Number(v) : Number(spritePosition);
	}
	return;
}, 1);

console.log({ output });
