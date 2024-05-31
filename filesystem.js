const fs = require('fs') // importing file system module 

// writing the code to file if file does not exists it will create new file
fs.writeFile('./files/newfile.txt', 'welcome to writing file code', err => {
    if (err) throw err;
    console.log('Writing File Completed');
})