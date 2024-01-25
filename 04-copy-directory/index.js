const fs = require('fs').promises;
const path = require('path');

const originalDir = path.join(__dirname, 'files');
const copyDir = path.join(__dirname, 'copyDir');

async function copyDirectory(fromFile, toFile) {
  try {
    await fs.mkdir(toFile, { recursive: true });
    const files = await fs.readdir(fromFile, { withFileTypes: true });

    for (const file of files) {
      const fromFilePath = path.join(fromFile, file.name);
      const toFilePath = path.join(toFile, file.name);

      if (file.isDirectory()) {
        await copyDirectory(fromFilePath, toFilePath);
      } else {
        try {
          await fs.access(toFilePath, fs.constants.F_OK);
          await fs.unlink(toFilePath);
        } catch (err) {
          console.error(err);
        }
        await fs.copyFile(fromFilePath, toFilePath);
      }
    }

    console.log('Files copied successfully.');
  } catch (err) {
    console.error('Error:', err);
  }
}

copyDirectory(originalDir, copyDir);
