const fileContents = await Deno.readTextFile("strategyguide.txt");

// rock, paper, scissors
const opponentMoves = ["a", "b", "c"];
// rock, paper, scissors
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

    let outcomePoints = 0;
    switch (opponentIndex - heroIndex) {
      // opponent wins
      case 1:
      case -2:
        outcomePoints = 0;
        break;
      // draw
      case 0:
        outcomePoints = 3;
        break;
      // hero wins
      case -1:
      case 2:
        outcomePoints = 6;
        break;
    }
    return outcomePoints + shapeValues[heroIndex];
  })
  .reduce((accumulator, pointsPerTurn) => {
    return accumulator + pointsPerTurn;
  });
console.log("total points:", totalPoints);
