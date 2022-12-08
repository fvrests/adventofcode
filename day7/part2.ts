const terminalOutput = await Deno.readTextFile("terminal-output.txt");

const folders: string[] = [];
// @example: ['/', 'a', 'b']
type Sizes = Record<string, number>;
const sizes: Sizes = {};
// @example: {'/': 600, '//a': 400,'//a/b': 200}

const readLine = (line: string) => {
	// starts with cd
	const [, destination] = line.match(/\$\scd\s(.*)/) ?? [];
	// starts with number
	const [, fileSize] = line.match(/(\d+).*/) ?? [];

	if (destination) {
		if (destination === "..") folders.pop();
		else folders.push(destination);
	}

	if (fileSize) {
		const currentSize = Number(fileSize);
		for (let i = folders.length; i >= 1; i--) {
			const joinedPath = folders.slice(0, i).join("/");
			sizes[joinedPath]
				? (sizes[joinedPath] = sizes[joinedPath] + currentSize)
				: (sizes[joinedPath] = currentSize);
		}
	}
};

terminalOutput.trim().split("\n").map(readLine);

const sumSizesUnderLimit = (sizes: Sizes, limit: number) =>
	Object.entries(sizes)
		.filter(([_, size]) => size <= limit)
		.reduce((total, [_, size]) => total + size, 0);

console.log(sumSizesUnderLimit(sizes, 100000));

const getSizeOverLimit = (sizes: Sizes, limit: number) => {
	return Math.min(
		...Object.entries(sizes)
			.filter(([_, size]) => size >= limit)
			.map(([_, size]) => size)
	);
};

const totalSpace = 70_000_000;
const usedSpace = sizes["/"];
const freeSpace = totalSpace - usedSpace;
const freeSpaceNeeded = 30_000_000 - freeSpace;

console.log(getSizeOverLimit(sizes, freeSpaceNeeded));
