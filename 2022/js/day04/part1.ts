const fileContents = await Deno.readTextFile("assignmentPairs.txt");

const getSections = (assignment: string) => {
  const [start, end] = assignment.split("-").map(Number);
  const sections: number[] = [];
  for (let i = start; i <= end; i++) {
    sections.push(Number(i));
  }
  return sections;
};

const findOverlaps = (partial = false) => {
  let overlapCounter = 0;
  fileContents.split("\n").map((pair) => {
    if (!pair) return;
    const [elf1Sections, elf2Sections] = pair.split(",").map(getSections);
    const overlap = partial
      ? elf1Sections.some((section) => elf2Sections.includes(section)) ||
        elf2Sections.some((section) => elf1Sections.includes(section))
      : elf1Sections.every((section) => elf2Sections.includes(section)) ||
        elf2Sections.every((section) => elf1Sections.includes(section));
    if (overlap) overlapCounter++;
  });

  return overlapCounter;
};

console.log("fully overlapping", findOverlaps());

console.log("partially overlapping", findOverlaps(true));
