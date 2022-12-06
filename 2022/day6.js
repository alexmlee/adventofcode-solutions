const { processInputAndExecuteCallback } = require("./util");

async function getIndexOfFirstCharacterAfterMarker() {
  let input;
  const callback = (line) => {
    input = line;
  };
  await processInputAndExecuteCallback("day6.input.txt", callback);

  let trailingIndex = 0;
  let forwardIndex = 0;
  let currentChars = [input[0]];

  while (forwardIndex - trailingIndex !== 3) {
    if (currentChars.includes(input[forwardIndex])) {
      const stepsAheadToJump = currentChars.indexOf(input[forwardIndex]) + 1;
      trailingIndex = trailingIndex + stepsAheadToJump;
      for (let i = 0; i < stepsAheadToJump; i++) {
        currentChars.shift();
      }
    }
    currentChars.push(input[forwardIndex]);
    forwardIndex++;
  }
  console.log(forwardIndex);
}

// getIndexOfFirstCharacterAfterMarker();

async function getIndexOfFirstCharacterAfterMessageMarker() {
  let input;
  const callback = (line) => {
    input = line;
  };
  await processInputAndExecuteCallback("day6.input.txt", callback);

  let trailingIndex = 0;
  let forwardIndex = 0;
  let currentChars = [input[0]];

  while (forwardIndex - trailingIndex !== 13) {
    const incomingChar = input[forwardIndex];

    if (currentChars.includes(incomingChar)) {
      const stepsAheadToJump = currentChars.indexOf(incomingChar) + 1;
      trailingIndex = trailingIndex + stepsAheadToJump;
      for (let i = 0; i < stepsAheadToJump; i++) {
        currentChars.shift();
      }
    }
    currentChars.push(input[forwardIndex]);
    forwardIndex++;
  }
  console.log(forwardIndex);
}

getIndexOfFirstCharacterAfterMessageMarker();
