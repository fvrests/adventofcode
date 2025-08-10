const fileContents = await Deno.readTextFile("strategyguide.txt");

// rock, paper, scissors
const opponentMoves = ["a", "b", "c"];
// lose, draw, win
const heroMoves = ["x", "y", "z"];
// rock, paper, scissors
const shapeValues = [1, 2, 3];

const totalPoints = fileContents
  .split("\n")
  .map((line) => {
    const [opponentMove, heroMove] = line.split(" ");
    if (!opponentMove || !heroMove) return 0;

    const opponentIndex = opponentMoves.indexOf(opponentMove.toLowerCase());
    const heroIndex = heroMoves.indexOf(heroMove.toLowerCase());

    const getWinningShapeIndex = (opponentIndex: number) =>
      opponentIndex == 2 ? 0 : opponentIndex + 1;

    const getLosingShapeIndex = (opponentIndex: number) =>
      opponentIndex == 0 ? 2 : opponentIndex - 1;

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
  .reduce((accumulator, pointsPerTurn) => accumulator + pointsPerTurn);

console.log("total points:", totalPoints);
