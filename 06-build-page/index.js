const fs = require('fs').promises;
const path = require('path');

async function createProject() {
  try {
    const projectPath = path.join(__dirname, 'project-dist');
    await fs.mkdir(projectPath, { recursive: true });

    const newPage = path.join(projectPath, 'index.html');
    const newStyleFile = path.join(projectPath, 'style.css');
    const assetsPath = path.join(__dirname, 'assets');
    const copyAssetsPath = path.join(projectPath, 'assets');
    const componentsPath = path.join(__dirname, 'components');
    const stylesDir = path.join(__dirname, 'styles');

    let pageData = await fs.readFile(
      path.join(__dirname, 'template.html'),
      'utf-8',
    );

    const componentFiles = await fs.readdir(componentsPath);
    for (const componentFile of componentFiles) {
      const componentPath = path.join(componentsPath, componentFile);
      const componentExtName = path.extname(componentFile);

      if (componentExtName === '.html') {
        const componentData = await fs.readFile(componentPath, 'utf-8');
        const componentName = path.basename(componentFile, componentExtName);
        pageData = pageData.replace(`{{${componentName}}}`, componentData);
      }
    }

    await fs.writeFile(newPage, pageData);
    console.log('Index.html создан успешно.');

    let allStyleData = '';
    const styleFiles = await fs.readdir(stylesDir);
    for (const styleFile of styleFiles) {
      const filePath = path.join(stylesDir, styleFile);
      const fileData = await fs.readFile(filePath, 'utf-8');
      allStyleData += fileData;
    }

    await fs.writeFile(newStyleFile, allStyleData);
    console.log('Style.css создан успешно.');

    await copyDir(assetsPath, copyAssetsPath);
    console.log('Папка "assets" скопирована успешно.');

    console.log('Проект создан успешно.');
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

async function copyDir(srcDir, destDir) {
  await fs.mkdir(destDir, { recursive: true });
  const files = await fs.readdir(srcDir);

  for (const file of files) {
    const sourcePath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);
    const stat = await fs.stat(sourcePath);

    if (stat.isFile()) {
      await fs.copyFile(sourcePath, destPath);
    } else if (stat.isDirectory()) {
      await copyDir(sourcePath, destPath);
    }
  }
}

createProject();
