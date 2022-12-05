const { processInputAndExecuteSolution } = require("./util");

async function getPairsWhereOneContainsOther() {
  let matchingPairCount = 0;

  const solution = (line) => {
    const [sectionRangeOne, sectionRangeTwo] = line.split(",");

    if (pairHasCompleteOverlap(sectionRangeOne, sectionRangeTwo)) {
      matchingPairCount++;
    }
  };
  await processInputAndExecuteSolution("day4.input.txt", solution);
  console.log(matchingPairCount);
}

const pairHasCompleteOverlap = (sectionRangeOne, sectionRangeTwo) => {
  const [sectionRangeOneStart, sectionRangeOneEnd] = sectionRangeOne
    .split("-")
    .map(Number);
  const [sectionRangeTwoStart, sectionRangeTwoEnd] = sectionRangeTwo
    .split("-")
    .map(Number);

  const oneContainsTwo =
    sectionRangeOneStart <= sectionRangeTwoStart &&
    sectionRangeOneEnd >= sectionRangeTwoEnd;
  const twoContainsOne =
    sectionRangeTwoStart <= sectionRangeOneStart &&
    sectionRangeTwoEnd >= sectionRangeOneEnd;

  return oneContainsTwo || twoContainsOne;
};

getPairsWhereOneContainsOther();
