const fs = require("fs");
const readline = require("readline");

async function processInputAndExecuteSolution(inputFile, solution) {
  const rl = readline.createInterface({
    input: fs.createReadStream(inputFile),
    crlfDelay: Infinity,
  });
  rl.on("line", solution);
  await new Promise((res) => rl.once("close", res));
}

module.exports = { processInputAndExecuteSolution };
