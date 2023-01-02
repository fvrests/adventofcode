const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync("strategyguide.txt");
const fileContents = decoder.decode(data);

// rock, paper, scissors
let opponentMoves = ["a", "b", "c"];
// lose, draw, win
let heroMoves = ["x", "y", "z"];
// rock, paper, scissors
let shapeValues = [1, 2, 3];

let totalPoints = fileContents
  .split("\n")
  .map((line) => {
    let [opponentMove, heroMove] = line.split(" ");
    if (!opponentMove || !heroMove) return 0;

    let opponentIndex = opponentMoves.indexOf(opponentMove.toLowerCase());
    let heroIndex = heroMoves.indexOf(heroMove.toLowerCase());

    const getWinningShapeIndex = (opponentIndex) => {
      if (opponentIndex == 2) return 0;
      else return opponentIndex + 1;
    };
    const getLosingShapeIndex = (opponentIndex) => {
      if (opponentIndex == 0) return 2;
      else return opponentIndex - 1;
    };

    let outcomePoints = 0;
    let shapePoints = 0;
    switch (heroIndex) {
      // opponent wins
      case 0:
        outcomePoints = 0;
        shapePoints = shapeValues[getLosingShapeIndex(opponentIndex)];
        break;
      // draw
      case 1:
        outcomePoints = 3;
        shapePoints = shapeValues[opponentIndex];
        break;
      // hero wins
      case 2:
        outcomePoints = 6;
        shapePoints = shapeValues[getWinningShapeIndex(opponentIndex)];
        break;
    }
    return outcomePoints + shapePoints;
  })
  .reduce((accumulator, pointsPerTurn) => {
    return accumulator + pointsPerTurn;
  });
console.log("total points:", totalPoints);
