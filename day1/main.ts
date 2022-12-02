const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync("calories.txt");
const fileContents = decoder.decode(data);

const caloriesPerElf = [];
let currentElfCalories = [];

fileContents.split("\n").map((calorieCount) => {
  if (calorieCount !== "") {
    currentElfCalories.push(calorieCount);
  } else {
    caloriesPerElf.push(currentElfCalories);
    currentElfCalories = [];
  }
});

const calorieSums = caloriesPerElf.map((calorieGroup) => {
  return calorieGroup.reduce((accumulator, calorieCount) => {
    return accumulator * 1 + calorieCount * 1;
  });
});

function sumTopValues(data, count = 1) {
  const sortedData = data.sort((a, b) => b - a);
  let result = 0;
  for (let i = 0; i <= count - 1; i++) {
    result += sortedData[i] * 1;
  }
  return result;
}
console.log("top elf", sumTopValues(calorieSums, 1));
console.log("top three elves", sumTopValues(calorieSums, 3));
