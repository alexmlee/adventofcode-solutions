const { processInputAndExecuteSolution } = require("./util");
const { getPriorityValue } = require("./day3");

async function sumItemTypePriority() {
  let prioritySum = 0;

  let lineCounter = 0;
  let groupRucksacks = [];

  const solution = (line) => {
    groupRucksacks[lineCounter] = line;
    lineCounter++;
    if (lineCounter === 3) {
      prioritySum += calculateGroupItemPriority(groupRucksacks);
      lineCounter = 0;
    }
  };

  await processInputAndExecuteSolution("day3.input.txt", solution);
  console.log(prioritySum);
}

const calculateGroupItemPriority = (groupRucksacks) => {
  const repeatedCharacter = getRepeatedCharacter(groupRucksacks);
  return getPriorityValue(repeatedCharacter);
};
const getRepeatedCharacter = (groupRucksacks) => {
  const [rucksackOne, rucksackTwo, rucksackThree] = groupRucksacks;
  const longestItemArrayLength = getLongestString(groupRucksacks).length;
  const charHash = {};
  for (let i = 0; i < longestItemArrayLength; i++) {
    if (rucksackOne[i]) {
      if (!charHash[rucksackOne[i]]) {
        charHash[rucksackOne[i]] = {
          rucksackOne: 0,
          rucksackTwo: 0,
          rucksackThree: 0,
        };
      }
      charHash[rucksackOne[i]].rucksackOne += 1;
    }
    if (rucksackTwo[i]) {
      if (!charHash[rucksackTwo[i]]) {
        charHash[rucksackTwo[i]] = {
          rucksackOne: 0,
          rucksackTwo: 0,
          rucksackThree: 0,
        };
      }
      charHash[rucksackTwo[i]].rucksackTwo += 1;
    }
    if (rucksackThree[i]) {
      if (!charHash[rucksackThree[i]]) {
        charHash[rucksackThree[i]] = {
          rucksackOne: 0,
          rucksackTwo: 0,
          rucksackThree: 0,
        };
      }
      charHash[rucksackThree[i]].rucksackThree += 1;
    }
  }
  let repeatedCharacter;
  Object.keys(charHash).forEach((char) => {
    if (
      charHash[char].rucksackOne > 0 &&
      charHash[char].rucksackTwo > 0 &&
      charHash[char].rucksackThree > 0
    ) {
      repeatedCharacter = char;
    }
  });
  return repeatedCharacter;

  //while any word still has characters to check
  // could replace this with a check on the longest since i still have to do the existence check inside

  //
  // const charHash = {};
  // const iterator = 0;
  // while (
  //   rucksackOne[iterator] ||
  //   rucksackTwo[iterator] ||
  //   rucksackThree[iterator]
  // ) {
  //   if (rucksackOne[iterator]) {
  //     if (!charHash[rucksackOne[iterator]]) {

  //     }
  //   }
  // }
};

const getLongestString = (stringArray) => {
  return stringArray.reduce(function (a, b) {
    return a.length > b.length ? a : b;
  });
};

sumItemTypePriority();
// not 2653 - too high
