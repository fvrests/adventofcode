const treeMap = await Deno.readTextFile("tree-map.txt");

const rowsMap: number[][] = [];
// row: ------1------    ----2----
// col: 1  2  3  4  5    1  2
//    [[3, 0, 3, 7, 3], [2, 5, ...], ...]

const colsMap: number[][] = [];
// col: ------1------    ----2----
// row: 1  2  3  4  5    1  2
//    [[3, 2, 6, 3, 3], [0, 5, ...], ...]

let topScenicScore = 0;

const wholeNumber = (value: number) => Math.max(0, value);

const getScenicScore = (
	diagram: number[][],
	currentTree: number,
	row: number,
	col: number
) => {
	const treesBefore = diagram[row].slice(0, col);
	const visibleBefore =
		treesBefore.length -
		wholeNumber(treesBefore.findLastIndex((tree) => tree >= currentTree));

	const treesAfter = diagram[row].slice(col + 1);
	const lastVisible = treesAfter.findIndex((tree) => tree >= currentTree);
	const visibleAfter = lastVisible === -1 ? treesAfter.length : lastVisible + 1;

	return visibleBefore * visibleAfter;
};

const treeScenicScore = (height: number, row: number, col: number) =>
	getScenicScore(rowsMap, height, row, col) *
	getScenicScore(colsMap, height, col, row);

treeMap
	.trim()
	.split("\n")
	.map((line, row) => {
		line
			.split("")
			.map(Number)
			.map((height, col) => {
				rowsMap[row] ? rowsMap[row].push(height) : (rowsMap[row] = [height]);
				colsMap[col] ? colsMap[col].push(height) : (colsMap[col] = [height]);
			});
	});

rowsMap.map((line, row) => {
	line.map((height, col) => {
		const currentScore = treeScenicScore(height, row, col);
		if (currentScore > topScenicScore) topScenicScore = currentScore;
	});
});

console.log({ topScenicScore });
