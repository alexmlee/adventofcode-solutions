const { processInputAndExecuteCallback } = require("./util");

async function getTopCrateForAllStacks() {
  let stateArray = [];
  let inInitialStateSection = true;
  let initialStateColumnIndices = [1, 5, 9, 13, 17, 21, 25, 29, 33];

  const callback = (line) => {
    // handle line between initial state and instructions
    if (line === "") {
      return;
    }

    // don't process column numbers
    if (lineIsEndOfInitialState(line)) {
      inInitialStateSection = false;
      return;
    }

    if (inInitialStateSection) {
      // for (const index of initialStateColumnIndices) {
      for (let i = 0; i < initialStateColumnIndices.length; i++) {
        const lineIndex = initialStateColumnIndices[i];
        if (lineIndex > line.length) {
          break;
        }
        const char = line[lineIndex];
        if (char !== " ") {
          // could move this array instantiation up, but difference between test and real data is the # of columns, so doing it dynamically makes sense
          if (!stateArray[i]) {
            stateArray[i] = [];
          }
          stateArray[i].unshift(char);
        }
      }
      return;
    }

    const { moveCount, fromColumn, toColumn } = parseInstructionLine(line);
    const movedElements = stateArray[fromColumn - 1].splice(
      -1 * moveCount,
      moveCount
    );
    stateArray[toColumn - 1].push(...movedElements);
  };
  await processInputAndExecuteCallback("day5.input.txt", callback);

  let resultString = "";
  for (const column of stateArray) {
    if (column.length) {
      resultString += column[column.length - 1];
    }
  }
  console.log(resultString);
}

const lineIsEndOfInitialState = (line) => {
  return line.slice(0, 2) === " 1";
};

const parseInstructionLine = (line) => {
  const moveCount = parseInt(
    line.slice(line.indexOf("move") + 5, line.indexOf("from") - 1)
  );
  const fromColumn = parseInt(
    line.slice(line.indexOf("from") + 5, line.indexOf("to") - 1)
  );
  const toColumn = parseInt(line.slice(line.indexOf("to") + 3, line.length));
  return { moveCount, fromColumn, toColumn };
};

getTopCrateForAllStacks();
//not DJ
