// this module is regarding creating directory 

const fs = require('fs');

// to create a directory
fs.mkdir('./new', err => {
    if(err) throw err;
    console.log('New directory created');
});

// checking if directory exists already, create only if not exists
if(!fs.existsSync('./new2')){  // it prevents the error thrown if directory already exists
    fs.mkdir('./new2', err => {
        if(err) throw err;
        console.log('new2 directory created');
    })
}

if(fs.existsSync('./new2'))
{
    fs.rmdir('./new2', err => {
        if(err) throw err;
        console.log(`new2 directory removed`);
    })
}





