const fs = require('fs');
const readline = require('readline');

const inputFile = 'file.txt';
const outputFile = 'output.txt';

const readStream = fs.createReadStream(inputFile);
const writeStream = fs.createWriteStream(outputFile);

const rl = readline.createInterface({
  input: readStream,
  crlfDelay: Infinity
});

let lineNumber = 0;

rl.on('line', (line) => {
  const prefix = " *"; // Wrap around if more than 26 lines
  writeStream.write(`${prefix} ${line}\n`);
  lineNumber++;
});

rl.on('close', () => {
  console.log('Finished processing file.');
});
