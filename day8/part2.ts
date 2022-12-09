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

const scenicScoreForGroup = (
	treeHeight: number,
	diagram: number[][],
	group: number,
	index: number
) => {
	const currentTree = treeHeight;
	const treesOnStartSide = diagram[group].slice(0, index);
	let firstVisibleIndex = treesOnStartSide.findLastIndex((priorTree) => {
		return Number(priorTree) >= currentTree;
	});
	firstVisibleIndex = firstVisibleIndex === -1 ? 0 : firstVisibleIndex;
	const treesVisibleTowardsStart = treesOnStartSide.length - firstVisibleIndex;

	const treesOnEndSide = diagram[group].slice(index + 1);
	let lastVisibleIndex = treesOnEndSide.findIndex(
		(followingTree) => Number(followingTree) >= currentTree
	);
	lastVisibleIndex =
		lastVisibleIndex === -1 ? treesOnEndSide.length - 1 : lastVisibleIndex;
	const treesVisibleTowardsEnd = lastVisibleIndex + 1;

	return treesVisibleTowardsStart * treesVisibleTowardsEnd;
};

const totalScenicScore = (treeHeight: number, row: number, col: number) => {
	return (
		scenicScoreForGroup(treeHeight, rowsMap, row, col) *
		scenicScoreForGroup(treeHeight, colsMap, col, row)
	);
};

treeMap
	.trim()
	.split("\n")
	.map((line, row) => {
		line.split("").map((height, col) => {
			rowsMap[row]
				? rowsMap[row].push(Number(height))
				: (rowsMap[row] = [Number(height)]);
			colsMap[col]
				? colsMap[col].push(Number(height))
				: (colsMap[col] = [Number(height)]);
		});
	});

treeMap
	.trim()
	.split("\n")
	.map((line, row) => {
		line.split("").map((tree, col) => {
			// console.log({ tree }, { row }, { col });
			const height = Number(tree);
			const currentScore = totalScenicScore(height, row, col);
			if (currentScore > topScenicScore) topScenicScore = currentScore;
		});
	});

console.log({ topScenicScore });
