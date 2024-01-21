const fs = require('fs');
const path = require('path');

const createPath = path.resolve(__dirname, 'text.txt');

const readStream = fs.createReadStream(createPath, 'utf-8');

readStream.pipe(process.stdout);
