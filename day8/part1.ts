const treeMap = await Deno.readTextFile("tree-map.txt");

const rowsMap: number[][] = [];
// row: ------1------    ----2----
// col: 1  2  3  4  5    1  2
//    [[3, 0, 3, 7, 3], [2, 5, ...], ...]

const colsMap: number[][] = [];
// col: ------1------    ----2----
// row: 1  2  3  4  5    1  2
//    [[3, 2, 6, 3, 3], [0, 5, ...], ...]

let visibleTrees = 0;

const isTreeVisibleInGroup = (
	treeHeight: number,
	diagram: number[][],
	group: number,
	index: number
) => {
	const currentTree = treeHeight;
	const isVisibleFromStart = diagram[group]
		.slice(0, index)
		.every((priorTree) => Number(priorTree) < currentTree);
	const isVisibleFromEnd = diagram[group]
		.slice(index + 1)
		.every((followingTree) => Number(followingTree) < currentTree);
	return isVisibleFromStart || isVisibleFromEnd;
};

const isVisible = (treeHeight: number, row: number, col: number) => {
	return (
		isTreeVisibleInGroup(treeHeight, rowsMap, row, col) ||
		isTreeVisibleInGroup(treeHeight, colsMap, col, row)
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
			const height = Number(tree);
			if (isVisible(height, row, col)) visibleTrees++;
		});
	});

console.log({ visibleTrees });
