const fs = require('fs');
const readline = require('readline');

const writeStream = fs.createWriteStream('./02-write-file/output.txt', {
  flags: 'a',
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Введите текст,"exit" для выхода.');

rl.prompt();

rl.on('line', (input) => {
  if (input.toUpperCase() === 'EXIT') {
    console.log('До свидания! Завершение...');
    writeStream.end();
    rl.close();
  } else {
    writeStream.write(input + '\n');
  }
});

process.on('SIGINT', () => {
  console.log('Cигнал прерывания (Ctrl+C). Завершение...');
  writeStream.end();
  rl.close();
});
