const datastream = await Deno.readTextFile("datastream.txt");

const allLetters: string[] = [];

console.log(
	datastream
		.trim()
		.split("")
		.findIndex((currentLetter) => {
			allLetters.push(currentLetter);
			if (allLetters.length < 14) return;
			const currentGroup = allLetters.slice(-14);
			return currentGroup.every(
				(letter) =>
					currentGroup.indexOf(letter) == currentGroup.lastIndexOf(letter)
			);
		}) + 1
);
