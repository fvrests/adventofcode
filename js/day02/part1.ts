const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync("strategyguide.txt");
const fileContents = decoder.decode(data);

// rock, paper, scissors
let opponentMoves = ["a", "b", "c"];
// rock, paper, scissors
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
