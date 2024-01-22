const fs = require('fs');
const path = require('path');

const originalDir = path.join(__dirname, 'files');
const copyDir = path.join(__dirname, 'copyDir');

function copyDirectory(fromFile, toFile) {
  fs.mkdir(toFile, { recursive: true }, (err) => {
    if (err) {
      console.error(err);
    }
    fs.readdir(fromFile, { withFileTypes: true }, (err, files) => {
      if (err) {
        console.error(err);
      }
      console.log(files);
      files.forEach((file) => {
        const fromFilePath = path.join(fromFile, file.name);
        const toFilePath = path.join(toFile, file.name);

        if (file.isDirectory()) {
          copyDirectory(fromFilePath, toFilePath);
        } else {
          fs.copyFile(fromFilePath, toFilePath, (err) => {
            if (err) {
              console.error(err);
            }
          });
        }
      });
    });
  });
}
copyDirectory(originalDir, copyDir);
