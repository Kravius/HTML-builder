const fs = require('fs').promises;
const path = require('path');

async function combineStyles() {
  const stylesOriginalDir = path.join(__dirname, 'styles');
  const bundleCopyDir = path.join(__dirname, './project-dist/bundle.css');

  try {
    const files = await fs.readdir(stylesOriginalDir);

    const stylePromises = files.map(async (file) => {
      const filePath = path.join(stylesOriginalDir, file);

      const stat = await fs.stat(filePath);
      if (stat.isFile() && path.extname(filePath).toLowerCase() === '.css') {
        const styleData = await fs.readFile(filePath, 'utf-8');
        return styleData;
      } else {
        return '';
      }
    });

    const stylesArray = await Promise.all(stylePromises);

    await fs.writeFile(bundleCopyDir, stylesArray.join('\n'), 'utf-8');
  } catch (err) {
    console.error(err);
  }
}

combineStyles();
