const fs = require('fs');
const fsPromises = fs.promises;
const path = require ('path');


async function createHTML () {
  let HTML = await fsPromises.readFile(path.join(__dirname, 'template.html'), 'utf8');
  const components = await fsPromises.readdir(path.join(__dirname, 'components'));
  let inner = HTML.toString();
  for (let file of components) {
    const fileComponents = await fsPromises.stat(path.join(__dirname, 'components', file));
    let name = file.replace(/\..*/, '');
    if (fileComponents.isFile() && path.extname((__dirname, 'components', file)) === '.html') {
      let fileContent = await fsPromises.readFile(path.join(__dirname, 'components', file));
      inner = inner.replace(new RegExp (`{{${name}}}`), fileContent.toString());
    }
  }
  await fsPromises.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });
  await fsPromises.writeFile(path.join(__dirname, 'project-dist', 'index.html'), inner);
  await write();
}
  


async function write () {
  const fileBund = await fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
  const data = await fsPromises.readdir(path.join(__dirname, 'styles'), {withFileTypes: true});
  for (let file of data) {
    if (file.isFile() && path.extname(file.name) === '.css') {
      const readableStream = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf-8');
      readableStream.on('data', chunk => fileBund.write(chunk + '\n'));
      readableStream.on('error', error => console.log('Error', error.message));
    }
  }
}
        
async function copyDirStyles (basePath, copyPath) {
  await fsPromises.rm(copyPath, { force: true, recursive: true });
  await fsPromises.mkdir(copyPath, { recursive: true });
  let copyDirectory = await fsPromises.readdir(basePath);
 
  for (let file of copyDirectory) {
    let fileComponents = await fsPromises.stat(path.join(basePath, file));
    if (fileComponents.isFile()) {
      await fsPromises.copyFile(path.join(basePath, file), path.join(copyPath, file));
    }
    else {
      await copyDirStyles(path.join(basePath, file), path.join(copyPath, file) );
    }
  }
}

async function createDocument () {
  createHTML();
  copyDirStyles(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets') );
}

createDocument();
