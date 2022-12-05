const fs = require("fs");
const readline = require("readline");

async function processInputAndExecuteCallback(inputFile, callback) {
  const rl = readline.createInterface({
    input: fs.createReadStream(inputFile),
    crlfDelay: Infinity,
  });
  rl.on("line", callback);
  await new Promise((res) => rl.once("close", res));
}

module.exports = { processInputAndExecuteCallback };
