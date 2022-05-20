const fs = require('fs');
const path = require('path');
const readline = require ('readline');

const file = path.join(__dirname, 'myText.txt');
const newFile = fs.createWriteStream(file);

const { stdin: input, stdout: output } = require('process');
console.log('Hi! Write something...');
const rl = readline.createInterface({ input, output });
rl.on('line', (input) => {
  if (input === 'exit' || input === 'SIGINT') {
    rl.close();
  }
  if (input !== 'exit') {
    newFile.write(`${input}\n`);
  }
 
});
rl.on('close', () => {  
  console.log('Have a good day!!!');
  rl.close();
});
