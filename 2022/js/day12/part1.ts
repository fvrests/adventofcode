const heightMap = await Deno.readTextFile("heightmap.txt");

interface Data {
	heights: string[];
	start: number[];
	end: number[];
}

const getMapData = (heightMap: string) => {
	const data = { heights: [], start: [], end: [] };
	heightMap
		.trim()
		.split("\n")
		.reduce((data: Data, line: string, i: number) => {
			data.heights.push(line);
			if (line.includes("S")) {
				data.start = [line.indexOf("S"), i];
			}
			if (line.includes("E")) {
				data.end = [line.indexOf("E"), i];
			}
			return data as Data;
		}, data);
	return data;
};

const navigate = (data: Data) => {
	const getHeight = (x: number, y: number) => {
		if (data.heights[x][y] === "S") {
			return alphabet.indexOf("a");
		}
		if (data.heights[x][y] === "E") {
			return alphabet.indexOf("z");
		}
		return alphabet.indexOf(data.heights[x][y]) || -1;
	};

	let [x, y] = data.start;
	const [endX, endY] = data.end;
	const alphabet = "abcdefghijklmnopqrstuvwxyz";

	console.log(getHeight(x, y));

	if (endX > x && getHeight(x + 1, y) <= getHeight(x, y) + 1) {
		x += 1;
	}

	if (endY > y && getHeight(x, y + 1) <= getHeight(x, y) + 1) {
		y += 1;
	}

	return [x, y];
};

console.log(getMapData(heightMap));

// const mapWidth = heights[0].length;
