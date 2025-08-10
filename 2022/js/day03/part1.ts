const fileContents = await Deno.readTextFile("rucksackContents.txt");

const sharedItems: string[] = [];
fileContents.split("\n").map((rucksackItems) => {
  if (!rucksackItems) return;
  const midpoint = rucksackItems.length / 2;
  const compartment1Items = rucksackItems
    .slice(0, Math.floor(midpoint))
    .split("");
  const compartment2Items = rucksackItems
    .slice(Math.ceil(midpoint), rucksackItems.length)
    .split("");

  const match = compartment1Items.find((item) =>
    compartment2Items.includes(item)
  );

  if (match) sharedItems.push(match);
});
const alphabet = "abcdefghijklmnopqrstuvwxyz";
const prioritySum = sharedItems.reduce((accumulator, item) => {
  const uppercase = item.toUpperCase() === item;
  return (
    accumulator +
    (uppercase
      ? alphabet.indexOf(item.toLowerCase()) + 1 + 26
      : alphabet.indexOf(item) + 1)
  );
}, 0);
console.log("sum of priorities", prioritySum);
