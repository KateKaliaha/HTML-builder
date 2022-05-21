const fs = require('fs');
const path = require ('path');


fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
  if (err) throw err;
});
fs.readdir(path.join(__dirname, 'files-copy'), (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    fs.unlink(path.join(__dirname, 'files-copy', file),  (err) => {
      if (err) throw err;
    });
  });
});
      
async function copyDir () {
  await fs.readdir(path.join(__dirname, 'files'), {withFileTypes: true}, (err, data) => {
    if (err) {
      console.log(err);
    }
    data.forEach(file => {
      fs.copyFile(path.join(__dirname, 'files', file.name), path.join(__dirname, 'files-copy', file.name), (err) => {
        if (err) throw err;         
      });
    });
       
  });
}

copyDir();
