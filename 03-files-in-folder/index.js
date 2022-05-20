const fs = require('fs');
const path = require ('path');

fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}, (err, data) => {
  if (err) {
    console.log(err);
  }
  data.forEach(file => {
    fs.stat(path.join(__dirname, 'secret-folder', file.name), (err, stats) => {
      if (err) {
        console.log(err);
      }
      if (stats.isFile()) {
        console.log(file.name.replace(/\..*/, '') + ' - ' + path.extname(file.name).replace('.', '') + ' - ' + (stats.size / 1000) + 'kb');
      }  
    }
    );
  });
});
    