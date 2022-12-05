const fileContents = await Deno.readTextFile("assignmentPairs.txt");

const getSections = (assignment: string) => {
  const [start, end] = assignment.split("-").map(Number);
  const sections = [];
  for (let i = start; i <= end; i++) {
    sections.push(Number(i));
  }
  return sections;
};

let overlapCounter = 0;
fileContents.split("\n").map((pair) => {
  if (!pair) return;
  const [elf1Sections, elf2Sections] = pair.split(",").map(getSections);
  if (
    elf1Sections.every((section) => elf2Sections.includes(section)) ||
    elf2Sections.every((section) => elf1Sections.includes(section))
  )
    overlapCounter++;
});
console.log("overlapping assignments", overlapCounter);
