const fs = require("fs");
const readline = require("readline");
const { processInputAndExecuteSolution } = require("./util");

async function calculateScoreFromGuide() {
  let prioritySum = 0;
  const rl = readline.createInterface({
    input: fs.createReadStream("day3.input.txt"),
    crlfDelay: Infinity,
  });

  rl.on("line", (line) => {
    // split line in half

    const firstHalf = line.slice(0, line.length / 2);
    const secondHalf = line.slice(line.length / 2, line.length);

    // find character that is repeated in both
    const repeatedCharacter = getRepeatedCharacter(firstHalf, secondHalf);

    // then determine priority value of repeated character
    prioritySum += getPriorityValue(repeatedCharacter);
    // add priority value to running sum
  });
  await new Promise((res) => rl.once("close", res));
  console.log(prioritySum);
}

async function calculateScoreFromGuideUsingUtil() {
  let prioritySum = 0;

  const solution = (line) => {
    // split line in half

    const firstHalf = line.slice(0, line.length / 2);
    const secondHalf = line.slice(line.length / 2, line.length);

    // find character that is repeated in both
    const repeatedCharacter = getRepeatedCharacter(firstHalf, secondHalf);

    // then determine priority value of repeated character
    prioritySum += getPriorityValue(repeatedCharacter);
    // add priority value to running sum
  };

  await processInputAndExecuteSolution("day3.input.txt", solution);
  console.log(prioritySum);
}

const LOWERCASE_PRIORITY_ASCII_CODE_OFFSET = 96;
const UPPERCASE_PRIORITY_ASCII_CODE_OFFSET = 38;

const getPriorityValue = (repeatedCharacter) => {
  // is repeatedCharacter upper or lowercase
  const isUppercase = repeatedCharacter === repeatedCharacter.toUpperCase();
  if (isUppercase) {
    return (
      repeatedCharacter.charCodeAt() - UPPERCASE_PRIORITY_ASCII_CODE_OFFSET
    );
  } else {
    return (
      repeatedCharacter.charCodeAt() - LOWERCASE_PRIORITY_ASCII_CODE_OFFSET
    );
  }
};

const getRepeatedCharacter = (firstHalf, secondHalf) => {
  const charHash = {};

  for (let i = 0; i < firstHalf.length; i++) {
    if (!charHash[firstHalf[i]]) {
      charHash[firstHalf[i]] = { firstHalf: 0, secondHalf: 0 };
    }
    if (!charHash[secondHalf[i]]) {
      charHash[secondHalf[i]] = { firstHalf: 0, secondHalf: 0 };
    }
    charHash[firstHalf[i]].firstHalf += 1;
    charHash[secondHalf[i]].secondHalf += 1;
  }
  let repeatedCharacter;
  Object.keys(charHash).forEach((char) => {
    if (charHash[char].firstHalf > 0 && charHash[char].secondHalf > 0) {
      repeatedCharacter = char;
    }
  });
  return repeatedCharacter;
};

// calculateScoreFromGuide();
// calculateScoreFromGuideUsingUtil();

module.exports = { getPriorityValue };
