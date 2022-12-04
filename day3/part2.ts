const fileContents = await Deno.readTextFile("rucksackContents.txt");

const getCommonItem = (data: string[]) =>
  [...data[0]].find(
    (item) => data[1].includes(item) && data[2].includes(item)
  ) ?? "";

const commonItems: string[] = [];
let currentGroup: string[] = [];
fileContents.split("\n").map((rucksackItems, i) => {
  if (!rucksackItems) return;
  currentGroup.push(rucksackItems);
  if (i % 3 === 2) {
    commonItems.push(getCommonItem(currentGroup));
    currentGroup = [];
  }
});

const alphabet = "abcdefghijklmnopqrstuvwxyz";
const prioritySum = commonItems.reduce((accumulator, item) => {
  const uppercase = item.toUpperCase() === item;
  return (
    accumulator +
    (uppercase
      ? alphabet.indexOf(item.toLowerCase()) + 1 + 26
      : alphabet.indexOf(item) + 1)
  );
}, 0);
console.log("sum of priorities", prioritySum);
