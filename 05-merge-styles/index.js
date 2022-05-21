const fs = require('fs');
const path = require ('path');

const fileBund = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));
async function write () {
  fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, data) => {

    if (err) {
      console.log(err);
    }
    data.forEach(file => {
      if (file.isFile() && path.extname(file.name) === '.css') {
        const readableStream = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf-8');
        readableStream.on('data', chunk => fileBund.write(chunk + '\n'));
        readableStream.on('error', error => console.log('Error', error.message));
      }
    });
  });
}

write();
