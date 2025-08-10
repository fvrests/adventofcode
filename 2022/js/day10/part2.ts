const program = await Deno.readTextFile("program.txt");

const output: string[] = [""];
let cycle = 0;

program.split("\n").reduce((spritePosition: number, line: string) => {
	while (cycle < 240) {
		const [command, v] = line.split(" ");

		const write = () => {
			cycle += 1;
			const row = Math.floor((cycle - 1) / 40);
			const column = (cycle - 1) % 40;
			const spriteColumn = (spritePosition - 1) % 40;
			const isSpriteVisible =
				column >= spriteColumn - 1 && column <= spriteColumn + 1;

			if (!output[row]) output[row] = "";
			const pixel = isSpriteVisible ? "#" : ".";
			output[row] = output[row] + pixel;
		};

		if (command === "addx" && v) {
			write();
		}
		write();

		return v ? Number(spritePosition) + Number(v) : Number(spritePosition);
	}
	return spritePosition;
}, 2);

console.log({ output });
