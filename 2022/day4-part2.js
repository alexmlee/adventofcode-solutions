const { processInputAndExecuteSolution } = require("./util");

async function getPairsWithOverlap() {
  let matchingPairCount = 0;

  const solution = (line) => {
    const [sectionRangeOne, sectionRangeTwo] = line.split(",");

    if (pairHasAnyOverlap(sectionRangeOne, sectionRangeTwo)) {
      matchingPairCount++;
    }
  };
  await processInputAndExecuteSolution("day4.input.txt", solution);
  console.log(matchingPairCount);
}

const pairHasAnyOverlap = (sectionRangeOne, sectionRangeTwo) => {
  const [sectionRangeOneStart, sectionRangeOneEnd] = sectionRangeOne
    .split("-")
    .map(Number);
  const [sectionRangeTwoStart, sectionRangeTwoEnd] = sectionRangeTwo
    .split("-")
    .map(Number);

  const pairsOverlap = !(
    sectionRangeOneEnd < sectionRangeTwoStart ||
    sectionRangeOneStart > sectionRangeTwoEnd
  );

  return pairsOverlap;
};

getPairsWithOverlap();
