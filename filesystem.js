const fs = require('fs'); // importing file system module 

fs.writeFile('./files/newfile.txt', 'welcome to writing file code', err =>{
    if(err) throw err;
    console.log('Writing File Completed');
})